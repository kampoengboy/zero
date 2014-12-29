var zero = {
    el: document.getElementById("zero"),
    transformed: false,
    running: false,
    jumping:false,
    right : true,
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0, left.length - 2), 10);
        return posX;
    },
    getPosY: function () {
        var style = window.getComputedStyle(this.el),
            top  = style.top,
            posY  = parseInt(top.substr(0, top.length - 2), 10);
        return posY;
    },
    
    standStill: function () {
        if (this.running) {
            this.el.style.webkitAnimation = "";
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el.classList.remove("zero-jump");
            this.el.classList.add("zero-stand");
            this.running = false;
            this.transformed = false;
        }
        if(this.jumping){
            this.el.style.webkitAnimation="";
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el.classList.remove("zero-jump");
            this.el.classList.add("zero-down");
            this.running = false;
            this.jumping = false;
            this.transformed = false;
        }
        var posY = this.getPosY();
        console.log(posY);
        if(posY==145)
        {
            this.el.style.webkitAnimation = "";
            this.el.classList.remove("zero-down");
            this.el.classList.add("zero-stand");
        }
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos = posX + 8;
        if (posX >=598) {
                posX=600;
                newPos=600;
            }
        if (!this.running) {
            this.el.classList.remove("zero-stand");
            this.el.classList.remove("zero-run-left");
            this.el.webkitAnimation="";    
            this.el.classList.add("zero-run-right");
            this.running = true; 
            var posX   = this.getPosX();
            if (posX >=598) {
                posX=600;
                newPos=600;
            }
            this.right = true;
        }
        
        if (!this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPos + "px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos = posX - 3;
        
        if (posX <= 0) {
            posX=0;
            newPos=0;
        }
        
        if (!this.running) {
            this.el.classList.remove("zero-stand");
            this.el.classList.remove("zero-run-right");
            this.el.style.webkitAnimation = "";
            this.el.classList.add("zero-run-left");
            this.running = true;
            var posX   = this.getPosX();
            if (posX <=0) {
                posX=0;
                newPos=0;
            }
            this.right = false;
        }
        if (!this.transformed) {
            
            this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPos + "px";
        
    },
    moveUp:function(){
        var posY = this.getPosY();
        console.log(posY);
        if(posY<=8)
        {
            if (this.jumping) {
                this.el.classList.remove("zero-stand");
                this.el.classList.remove("zero-jump");
                this.el.style.webkitAnimation = "";
                this.el.classList.add("zero-down");
                this.el.classList.add("zero-stand");
            }
        }
        else
        {
            if (!this.jumping) {
                this.el.classList.remove("zero-stand");
                this.el.classList.remove("zero-down")
                this.el.style.webkitAnimation = "";
                this.el.classList.add("zero-jump");
                this.jumping = true;
            }
        }
        /*if (!this.running) {
            this.el.classList.remove("zero-stand");
            this.el.style.webkitAnimation = "";
            this.el.classList.add("zero-jump");
            //var posY = this.getPosY();
            console.log(posY);
            if(posY <=0)
            {
                this.el.classList.remove("zero-jump");
                this.el.style.webkitAnimation = "";
                this.el.classList.add("zero-down");
            }
            this.running = true;
        }*/
        if (!this.transformed) {
            this.el.style.webkitTransform = "";
            if(!this.right)
                this.el.style.webkitTransform = "rotateY(180deg)";
            else
                this.el.style.webkitTransform = "rotateY(360deg)";
            this.transformed = !this.transformed;
        }
        this.el.style.top = posY + "px";
        if(posY<=8)
        {
            if (this.jumping) {
                this.el.classList.remove("zero-stand");
                this.el.classList.remove("zero-jump");
                this.el.style.webkitAnimation = "";
                this.el.classList.add("zero-down");
                this.jumping = false;
            }
        }
        else
        {
            if (!this.jumping) {
                this.el.classList.remove("zero-stand");
                this.el.classList.remove("zero-down");
                this.el.style.webkitAnimation = "";
                this.el.classList.add("zero-jump");
                this.jumping = true;
            }
        }
        this.el.style.top = 145 + "px";
        this.el.style.webkitAnimation = "";
        
        this.el.classList.remove("zero-down");
        this.el.classList.add("zero-stand");
    }
};

var ProsesKeyDown = function (e) {
    var code = e.keyCode;  
    switch (code) {
    case 37:
        zero.moveLeft();
        break;
    case 39:
        zero.moveRight();
        break; 
    case 38:
        zero.moveUp();
        break; 
    }
};

var ProsesKeyUp = function () {
    zero.standStill();

    //websocket.send("stand");
};

window.addEventListener("keydown", ProsesKeyDown);
window.addEventListener("keyup", ProsesKeyUp);
