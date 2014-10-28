var zero = {
    el: document.getElementById("zero"),
    transformed: false,
    running: false,
    jumping:false,
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
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el.classList.remove("zero-jump");
            this.el.classList.add("zero-stand");
            this.running = false;
        }
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos = posX + 3;
        
        if (posX > 600) {
            return;
        }
        
        if (!this.running) {
            
            this.el.classList.remove("zero-jump");
            this.el.classList.add("zero-run-right");
            this.el.style.webkitAnimation = "";
            this.running = true;
        }
        
        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos = posX - 3;
        
        if (posX < 0) {
            return;
        }
        
        if (!this.running) {
            this.el.classList.remove("zero-stand");
            this.el.classList.add("zero-run-left");
            this.running = true;
        }
        
        if (!this.transformed) {
            this.el.style.webkitTransform = "rotateY(180deg)";
            this.transformed = !this.transformed;
        }
        
        this.el.style.left = newPos + "px";
    },
    moveUp:function(){
        var posY = this.getPosY();
        var state = false;
        if(posY < 20)
            state = true;
        else if(posY > 50)
            state = false;
        if(state) 
            posY = posY - 3;
        else
            posY = posY + 3;
        if (!this.running) {
        this.el.classList.remove("zero-stand");
        this.el.classList.add("zero-jump");
        this.el.style.webkitAnimation = "";
        //this.el.classList.add("zero-down");
        this.running = true;
        }
        if (!this.transformed) {
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
    websocket.send("stand");
};

window.addEventListener("keydown", ProsesKeyDown);
window.addEventListener("keyup", ProsesKeyUp);
