var zero = {
    el2: document.getElementById("viewport"),
    el: document.getElementById("zero"),
    transformed: false,
    running: false,
    jumping:false,
    right : true,
    getPosX_zero: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left
            posX  = parseInt(left.substr(0, left.length - 2), 10);
            console.log(posX);
        return posX;
    },
    getPosX_bg: function () {
        var style = window.getComputedStyle(this.el2),
            left  = style.backgroundPosition,
            posX  = parseInt(left.substr(0, left.length - 7), 10);
            console.log(posX);
        return posX;
    },
    getPosY: function () {
        var style = window.getComputedStyle(this.el),
            top  = style.top,
            posY  = parseInt(top.substr(0, top.length - 2), 10);
        return posY;
    },
    
    standStill: function () {
        if(this.running){
            this.el.style.webkitAnimation="";
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el.classList.remove("zero-jump");
            this.el2.classList.remove("bg-move-right");
            this.el2.classList.remove("bg-move-left");   
            this.running = false;
            this.jumping = false;
            this.transformed = false;
            this.el.classList.add("zero-stand");
        }
    },
    moveRight: function () {
        var posX_bg   = this.getPosX_bg(),
            newPos = posX_bg - 10,
            posX_zero = this.getPosX_zero(),
            newPoss = posX_zero +3;
        if(newPos <=-7040)
        {
            return;
        }
        if(newPoss>=200)
        {
            newPoss=200;
        }
        if (!this.running) {
            this.el.classList.remove("zero-stand");
            this.el.classList.remove("zero-run-left");
            this.el.webkitAnimation="";
            this.el2.classList.add("bg-move-right");   
            this.el.classList.add("zero-run-right");
            this.running = true; 
            this.right = true;
            /*function findKeyframesRule(rule)
            {
                // gather all stylesheets into an array
                var ss = document.styleSheets;
                console.log(document.styleSheets[0]);
                // loop through the stylesheets
                for (var i = 0; i < ss.length; ++i) {
                    
                    // loop through all the rules
                    for (var j = 0; j < ss[i].length; ++j) {
                        
                        // find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
                        if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
                            return ss[i].cssRules[j];
                    }
                }
                
                // rule not found
                return null;
            }
            var change = function()
            {
                // find our -webkit-keyframe rule
                var keyframes = findKeyframesRule("bg-right");
                
                // remove the existing 0% and 100% rules
                // keyframes.deleteRule("0%");
                // keyframes.deleteRule("100%");
                
                // create new 0% and 100% rules with random numbers
                //keyframes.insertRule("0% from { background-position: " + newPos-1000 + " px -3px; }");
                //keyframes.insertRule("100% from { background-position: " + (newPos-100) + " px -3px; }");
                // assign the animation to our element (which will cause the animation to run)
                //document.getElementById('viewport').style.webkitAnimationName = anim;
            }
        change();*/
        }
        if (!this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPoss + "px";
    },
    moveLeft: function () {
         var posX   = this.getPosX_bg(),
            newPos = posX + 10,
            posX_zero = this.getPosX_zero(),
            newPoss = posX_zero -6;
        if(newPos >=-6570)
        {
            return;
        }
        if(newPoss<=3)
        {
            newPoss=3;
        }
        if (!this.running) {
            this.el.classList.remove("zero-stand");
            this.el.classList.remove("zero-run-right");
            this.el.webkitAnimation=""; 
            //this.el2.classList.add("bg-move-left");   
            this.el.classList.add("zero-run-left");
            this.running = true; 
            this.right = false;
        }
         
        if (!this.transformed) {
             this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        this.el.style.left = newPoss + "px";
        
    },
    moveUp:function(){
        var down=false;
        var posY = this.getPosY(),
            newPos = posY-3;
        console.log(posY);
        if(newPos<=146){
            down=true;
            newPos = 146;
        }
        else{
            down = false;
        }
        console.log(down);
        if(!this.jumping){
            if(!down){
                this.el.classList.remove("zero-stand");
                this.el.classList.remove("zero-down");
                this.el.style.webkitAnimation = "";
                this.el.classList.add("zero-jump");
                this.jumping = true;
                this.running = true;
            } else {
                this.el.classList.remove("zero-stand");
                this.el.classList.remove("zero-jump");
                this.el.style.webkitAnimation = "";
                //this.el.classList.add("zero-down");
                this.jumping = false;
                this.running = false;
            }
        }
        //this.el.style.top = newPos + "px";
        if (!this.transformed) {
            this.el.style.webkitTransform = "";
            if(!this.right)
                this.el.style.webkitTransform = "rotateY(180deg)";
            else
                this.el.style.webkitTransform = "rotateY(360deg)";
            this.transformed = !this.transformed;
        }
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
