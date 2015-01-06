
    zero = {
    el: document.getElementById("zero"),
    el2 : document.getElementById("viewport"),
    el3 : document.getElementById("gauge1"),
    transformed: false,
    running: false,
    jumping :false,
    jumpdown :false,
    hasJump : false,
    riding : false,
    onground : true,
    right : true,
    hasMinus : false,
    getWidth : function(){
        var style = window.getComputedStyle(this.el),
            left = style.width,
            width = parseInt(left.substr(0,left.length-2),10);
            return width;
    },
    getPosX_bg:function(){
        var style = window.getComputedStyle(this.el2),
            left  = style.backgroundPosition,
            posX  = parseInt(left.substr(0, left.length - 7), 10);
        return posX;
    },
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0, left.length - 2), 10);
        return posX;
    },
    getPosY:function(){
        var style = window.getComputedStyle(this.el),
            top    = style.top,
            posY   = parseInt(top.substr(0,top.length - 2),10);
        return posY;
    },
    standStill: function () {
        if(this.running) {
            this.el.classList.remove("zero-jump-down");
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el2.classList.remove("bg-move-right"); 
            this.el.classList.add("zero-stand");
            this.running = false;
        }
        if (this.jumpdown) {
            this.el.classList.remove("zero-jump-down");
            //this.el2.classList.remove("bg-move-right");  
            this.el.classList.add("zero-stand");
            this.jumpdown = false;
        }
        if(this.riding) {
            this.el.style.width = "55px";
            this.el.classList.remove("zero-ride-right");
            this.el.classList.remove("zero-ride-left");
            this.el2.classList.remove("bg-move-right"); 
            this.el.classList.add("zero-stand");
            this.riding = false;
        }
        if(this.hasMinus) {
            this.hasMinus = false;
        }
    },
    moveRight: function () {
        //console.log(zero1.getPosX());
        var posX   = this.getPosX(),
            newPos,
            posX_bg = this.getPosX_bg(),
            newPoss;
        if (this.riding) {
            var state = false;
            newPos = posX + 10;
            newPoss = posX_bg - 10;

            //console.log(newPos+" "+zero1.getPosX());
            if(newPos>=zero1.getPosX()-40 && newPos<=zero1.getPosX()-40+zero1.getWidth() && zero1.onground)
            {
                //console.log(newPos+" "+zero1.getPosX());
                var width = this.el3.style.width;
                var x = parseInt(width.substr(0,width.length-1),10);
                //console.log(x);
                if(!this.hasMinus) {
                    this.hasMinus = true;
                    this.el3.style.width = (x - 5)+"%";
                    if(x-5==0)
                    {
                        window.addEventListener('keydown', function(e) {
                            keypressed[e.keyCode] = false;
                        });
                        setTimeout(function(){window.alert("Player 1 menang");},500);
                    }
                }
            }
            if (newPos >= 600) {
                newPos = 600;
            }
            if(newPoss <=-6950)
            {
                newPoss = -6800;
            }
        }
        else{
            newPos = posX + 5;
            newPoss = posX_bg - 10;
            if(this.onground && newPos==zero1.getPosX()-40)
            {
                newPos=zero1.getPosX()-40;
                return;
            }
            if (newPos >= 600 ) {
                newPos = 600;
            }
            if(newPoss <=-6950)
            {
                newPoss = -6800;
            }
        }
        if(!this.jumping && !this.jumpdown){
            if (!this.running) {
                this.el.classList.remove("zero-stand");
                if (this.riding) {
                    this.el.style.width = "110px";
                    this.el.classList.add("zero-ride-right");
                }
            }
            else{
                this.el.classList.add("zero-run-right");
                //if(newPos >=200) 
                    //this.el2.classList.add("bg-move-right");  
            }
        }
        else{
            this.el.classList.remove("zero-run-right");
        }

        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPos + "px";
        //this.el2.style.backgroundPosition = newPoss+"px -3px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos;   
        if (this.riding) {
            newPos = posX - 10;
            if(newPos>=zero1.getPosX()-40 && newPos<=zero1.getPosX()-40+zero1.getWidth() && zero1.onground)
            {
                //console.log(newPos+" "+zero1.getPosX());
                var width = this.el3.style.width;
                var x = parseInt(width.substr(0,width.length-1),10);
                //console.log(x);
                if(!this.hasMinus) {
                    this.hasMinus = true;
                    this.el3.style.width = (x - 5)+"%";
                    if(x-5==0)
                    {
                        window.addEventListener('keydown', function(e) {
                            keypressed[e.keyCode] = false;
                        });
                        setTimeout(function(){window.alert("Player 1 menang");},500);
                    }
                }
            }
        }
        else{
            newPos = posX - 5;
        }
        if (newPos <= 0) {
            newPos = 0;
        }
        if(!this.riding && this.onground && newPos==zero1.getPosX()+40)
        {
                newPos=zero1.getPosX()+40;
                return;
        }
        if(!this.jumping && !this.jumpdown){
            if (!this.running) {
                this.el.classList.remove("zero-stand");
                if (this.riding) {
                    this.el.style.width = "110px";
                    this.el.classList.add("zero-ride-left");
                }
            }
            else{
                this.el.classList.add("zero-run-left");   
            }
        }
        else{
            this.el.classList.remove("zero-run-left");
        }    
        if (!this.transformed) {
            this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPos + "px";
    },
    jumpUp: function(){
        var posY   = this.getPosY(),
            newPos = posY - 5;
        if (newPos <= 70) {
            clearInterval(t);
            newPos = 70;
            u = setInterval(function(){zero.jumpDown()},20);
            this.el.classList.remove("zero-jump-up");
            this.el.classList.add("zero-jump-down");
        }
        if(!this.jumping){
            if(this.riding){
                this.standStill();
            }
            this.el.classList.remove("zero-stand");
            this.el.classList.add("zero-jump-up");
            this.jumping = true;
            this.onground = false;
        }
        this.el.style.top = newPos + "px";
    },
    jumpDown:function(){
        var posY   = this.getPosY(),
            newPos = posY + 5;
        if (newPos >= 110) {
            this.hasJump = false;
            newPos = 145;   
            this.el.style.top = newPos + "px";
            ProsesKeyUp();
            clearInterval(u);
        }

        if (this.jumping) {
            this.el.classList.remove("zero-jump-up");
            this.el.classList.add("zero-jump-down");
            this.jumping = false;
            this.jumpdown = true;
            this.onground = true;
        }
        this.el.style.top = newPos + "px";
    }
},
zero1 = {
    el: document.getElementById("zero1"),
    el2 : document.getElementById("viewport"),
    el3 : document.getElementById("gauge"),
    transformed: false,
    running: false,
    jumping :false,
    jumpdown :false,
    hasJump : false,
    riding : false,
    right : false,
    onground:true,
    hasMinus : false,
    getWidth : function(){
        var style = window.getComputedStyle(this.el),
            left = style.width,
            width = parseInt(left.substr(0,left.length-2),10);
            return width;
    },
    getPosX_bg:function(){
        var style = window.getComputedStyle(this.el2),
            left  = style.backgroundPosition,
            posX  = parseInt(left.substr(0, left.length - 7), 10);
        return posX;
    },
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0, left.length - 2), 10);
        return posX;
    },
    getPosY:function(){
        var style = window.getComputedStyle(this.el),
            top    = style.top,
            posY   = parseInt(top.substr(0,top.length - 2),10);
        return posY;
    },
    standStill: function () {
        if(this.running) {
            this.el.classList.remove("zero-jump-down");
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el2.classList.remove("bg-move-right"); 
            this.el.classList.add("zero-stand");
            this.running = false;
        }
        if (this.jumpdown) {
            this.el.classList.remove("zero-jump-down");
            //this.el2.classList.remove("bg-move-right");  
            this.el.classList.add("zero-stand");
            this.jumpdown = false;
        }
        if(this.riding) {
            this.el.style.width = "55px";
            this.el.classList.remove("zero-ride-right");
            this.el.classList.remove("zero-ride-left");
            this.el2.classList.remove("bg-move-right"); 
            this.el.classList.add("zero-stand");
            this.riding = false;
        }
        if(this.hasMinus) {
            this.hasMinus = false;
        }
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos,
            posX_bg = this.getPosX_bg(),
            newPoss;
        if (this.riding) {
            newPos = posX + 10;
            newPoss = posX_bg - 10;
            if(newPos>=zero.getPosX()-40 && newPos<=zero.getPosX()-40+zero.getWidth() && zero.onground)
            {
                //console.log(newPos+" "+zero1.getPosX());
                var width = this.el3.style.width;
                var x = parseInt(width.substr(0,width.length-1),10);
                //console.log(x);
                if(!this.hasMinus) {
                    this.hasMinus = true;
                    this.el3.style.width = (x - 5)+"%";
                    if(x-5==0)
                    {
                        window.addEventListener('keydown', function(e) {
                            keypressed[e.keyCode] = false;
                        });
                        setTimeout(function(){window.alert("Player 2 menang");},500);
                    }
                }
            }
            if (newPos >= 600) {
                newPos = 600;
            }
            if(newPoss <=-6950)
            {
                newPoss = -6800;
            }
        }
        else{
            newPos = posX + 5;
            newPoss = posX_bg - 10;
            if(this.onground && newPos==zero.getPosX()-40)
            {
                newPos=zero.getPosX()-40;
                return;
            }
            if (newPos >= 600) {
                newPos = 600;
            }
            if(newPoss <=-6950)
            {
                newPoss = -6800;
            }
        }
        if(!this.jumping && !this.jumpdown){
            if (!this.running) {
                this.el.classList.remove("zero-stand");
                if (this.riding) {
                    this.el.style.width = "110px";
                    this.el.classList.add("zero-ride-right");
                }
            }
            else{
                this.el.classList.add("zero-run-right");
            }
        }
        else{
            this.el.classList.remove("zero-run-right");
        }

        if (!this.transformed) {
            this.el.style.webkitTransform = "rotateY(0deg)";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPos + "px";
        //this.el2.style.backgroundPosition = newPoss+"px -3px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos;   
        if (this.riding) {
            newPos = posX - 10;
            if(newPos>=zero.getPosX()-40 && newPos<=zero.getPosX()-40+zero.getWidth() && zero.onground)
            {
                //console.log(newPos+" "+zero1.getPosX());
                var width = this.el3.style.width;
                var x = parseInt(width.substr(0,width.length-1),10);
                //console.log(x);
                if(!this.hasMinus) {
                    this.hasMinus = true;
                    this.el3.style.width = (x - 5)+"%";
                    if(x-5==0)
                    {
                        window.addEventListener('keydown', function(e) {
                            keypressed[e.keyCode] = false;
                        });
                        setTimeout(function(){window.alert("Player 2 menang");},500);
                    }
                }
            }
            if (newPos <= 0) {
                newPos = 0;
            }
        }
        else{
            newPos = posX - 5;
            if(this.onground &&newPos==zero.getPosX()+40)
            {
                newPos=zero.getPosX()+40;
                return;
            }
            if (newPos <= 0) {
	       newPos = 0;
            }
        }
        
        if(!this.jumping && !this.jumpdown){
            if (!this.running) {
                this.el.classList.remove("zero-stand");
                if (this.riding) {
                    this.el.style.width = "110px";
                    this.el.classList.add("zero-ride-left");
                }
            }
            else{
                this.el.classList.add("zero-run-left");   
            }
        }
        else{
            this.el.classList.remove("zero-run-left");
        }    
        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPos + "px";
    },
    jumpUp: function(){
        var posY   = this.getPosY(),
            newPos = posY - 5;
        if (newPos <= 70) {
            clearInterval(v);
            newPos = 70;
            w = setInterval(function(){zero1.jumpDown()},25);
            this.el.classList.remove("zero-jump-up");
            this.el.classList.add("zero-jump-down");
        }
        if(!this.jumping){
            if(this.riding){
                this.standStill();
            }
            this.el.classList.remove("zero-stand");
            this.el.classList.add("zero-jump-up");
            this.jumping = true;
            this.onground = false;
        }
        this.el.style.top = newPos + "px";
    },
    jumpDown:function(){
        var posY   = this.getPosY(),
            newPos = posY + 5;
        if (newPos >= 110) {
            this.hasJump = false;
            newPos = 145;   
            this.el.style.top = newPos + "px";
            ProsesKeyUp();
            clearInterval(w);
        }

        if (this.jumping) {
            this.el.classList.remove("zero-jump-up");
            this.el.classList.add("zero-jump-down");
            this.jumping = false;
            this.jumpdown = true;
            this.onground = true;
        }
        this.el.style.top = newPos + "px";
    }
};

var keypressed = {};    
 
window.addEventListener('keydown', function(e) {
    keypressed[e.keyCode] = true;
});
 
window.addEventListener('keyup', function(e) {
    keypressed[e.keyCode] = false;
    ProsesKeyUp();
});

var ProsesKeyDown = function() {
    //zero
    if (keypressed[37]) {
        zero.right = false;
        zero.running = true;
        if (!zero.riding) {
            zero.moveLeft();
        }

    }
    if (keypressed[38]) {
        if(!zero.hasJump) {
            ProsesKeyUp();
            zero.hasJump = true;
            zero.el.classList.remove("zero-stand");
            zero.el.classList.add("zero-jump-up");
            t = setInterval(function(){zero.jumpUp()},25);
        }

    }  
    if (keypressed[39]) {
        zero.right = true;
        zero.running = true;
        if (!zero.riding) {
            zero.moveRight();
        }
       
    }
    if (keypressed[191]) {
        if(!zero.running && !zero.jumping && !zero.jumpdown){
            zero.riding = true;
            if(zero.right){
                if (zero.getPosX() >= 545) {
                    zero.el.style.left = "545px";
                }
                zero.moveRight();
            }
            else{
                zero.moveLeft();
            }
        }
    }
    //zero1
    if (keypressed[65]) {
        zero1.right = false;
        zero1.running = true;
        if (!zero1.riding) {
            zero1.moveLeft();
        }
        
    }
    if (keypressed[87]) {
        if(!zero1.hasJump) {
            ProsesKeyUp();
            zero1.hasJump = true;
            zero1.el.classList.remove("zero-stand");
            zero1.el.classList.add("zero-jump-up");
            v = setInterval(function(){zero1.jumpUp()},25);
        }
        
    }  
    if (keypressed[68]) {
        zero1.right = true;
        zero1.running = true;
        if (!zero1.riding) {
            zero1.moveRight();
        }
        
    }  
    if (keypressed[90]) {
        if(!zero1.running && !zero1.jumping && !zero1.jumpdown){
            zero1.riding = true;
            if(zero1.right){
                if (zero1.getPosX() >= 545) {
                    zero1.el.style.left = "545px";
                }
                zero1.moveRight();
            }
            else{
                zero1.moveLeft();
            }
        }
    }
    setTimeout(function(){ProsesKeyDown()}, 16);
}    
 
ProsesKeyDown();

var ProsesKeyUp = function () {
    //zero
    zero.standStill();
    //zero1
    zero1.standStill();
};