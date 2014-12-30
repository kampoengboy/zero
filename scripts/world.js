var websocket = new WebSocket("ws://localhost:8080/"),
    zero = {
    el: document.getElementById("zero"),
    transformed: false,
    running: false,
    jumping :false,
    jumpdown :false,
    clicked : false,
    riding : false,
    facingright : true,
    getPosX: function () {
        var style = window.getComputedStyle(this.el),
            left  = style.left,
            posX  = parseInt(left.substr(0, left.length - 2), 10);
        
        return posX;
    },
    getPosY:function(){
        var style2 = window.getComputedStyle(this.el),
            top    = style2.top,
            posY   = parseInt(top.substr(0,top.length - 2),10);

        return posY;
    },
    standstill3 : function(){
            /*if (right) {
                this.el.style.left = (this.getPosX()+25) + "px";
            };*/
            this.el.style.width = "55px";
            this.el.classList.remove("zero-ride-right");
            this.el.classList.remove("zero-ride-left");
            this.riding = false;
    },
    standStill2 : function(){
        if (this.jumpdown) {
            this.el.classList.remove("zero-jump-down");
            this.el.classList.add("zero-stand");
            this.jumpdown = false;
        }
    },
    standStill: function () {
            this.el.classList.remove("zero-run-right");
            this.el.classList.remove("zero-run-left");
            this.el.classList.add("zero-stand");
            this.running = false;
    },
    moveRight: function () {
        var posX   = this.getPosX(),
            newPos;
        if (this.riding) {
            newPos = posX + 10;
            if (newPos >= 545) {
                newPos = 545;
            }
        }
        else{
            newPos = posX + 5;
            if (newPos >= 600) {
                newPos = 600;
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

        if (this.transformed) {
            this.el.style.webkitTransform = "";
            this.transformed = !this.transformed;
        }

        this.el.style.left = newPos + "px";
    },
    moveLeft: function () {
        var posX   = this.getPosX(),
            newPos;
        
        if (this.riding) {
            newPos = posX - 10;
        }
        else{
            newPos = posX - 5;
        }

        if (newPos <= 0) {
            newPos = 0;
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
    jump: function(){
        var posY   = this.getPosY(),
            newPos = posY - 5;

        this.el.style.height = "55px";
        if (newPos <= 80) {
            clearInterval(t);
            newPos = 80;
            u = setInterval(function(){zero.jump_down()},25);
            this.el.classList.remove("zero-jump-up");
            this.el.classList.add("zero-jump-down");
        }

        if(!this.jumping){
            if(this.riding){
                this.standstill3();
            }
            this.el.classList.remove("zero-stand");
            this.el.classList.add("zero-jump-up");
            this.jumping = true;
        }
        this.el.style.top = newPos + "px";
    },
    jump_down:function(){
        var posY   = this.getPosY(),
            newPos = posY + 5;

        this.el.style.height = "80px";
        if (newPos >= 120) {
            this.clicked = false;
            this.el.style.height = "50px";
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
        }
        this.el.style.top = newPos + "px";
    }
},
t,u,
jump_sound = new Audio('/javascript/SE/jump1.ogg'),
ride_sound = null;


var keypressed = {};    
 
window.addEventListener('keydown', function(e) {
    keypressed[e.keyCode] = true;
}, true);    
 
window.addEventListener('keyup', function(e) {
    keypressed[e.keyCode] = false;
    ProsesKeyUp();
},true);

var update = function() {
    if (keypressed[37]) {
        zero.facingright = false;
        zero.running = true;
        if (!zero.riding) {
            zero.moveLeft();
        }
        // websocket.send("left");
    }
    if (keypressed[38]) {
        if(!zero.clicked && !zero.riding){
            ProsesKeyUp();
            jump_sound.play();
            zero.clicked = true;
            zero.el.classList.remove("zero-stand");
            zero.el.classList.add("zero-jump-up");
            t = setInterval(function(){zero.jump()},25);
        }
        // websocket.send("jump");
    }  
    if (keypressed[39]) {
        zero.facingright = true;
        zero.running = true;
        if (!zero.riding) {
            zero.moveRight();
        }
        
        // websocket.send("right");
    }  
    if (keypressed[90]) {
        if(!zero.running && !zero.jumping && !zero.jumpdown){
            zero.riding = true;
            if(zero.facingright){
                if (ride_sound == null) {
                    ride_sound = new Audio('/javascript/SE/wind2.ogg');
                    ride_sound.volume = 0.5;
                    ride_sound.play();
                }
                if (zero.getPosX() >= 545) {
                    zero.el.style.left = "545px";
                }
                zero.moveRight();
            }
            else{
                if (ride_sound == null) {
                    ride_sound = new Audio('/javascript/SE/wind2.ogg');
                    ride_sound.volume = 0.5;
                    ride_sound.play();
                }
                zero.moveLeft();
            }
        }
    }    
    setTimeout(function(){update()}, 16);
}    
 
update();

var ProsesKeyUp = function () {
    if (zero.running) {
        zero.standStill();
    }
    if (zero.riding == true) {
        zero.standstill3();
        ride_sound = null;
    };
    if (zero.jumpdown == true) {
        if (!zero.clicked) {
            zero.standStill2();
        };
    };
    // websocket.send("stand");
};

websocket.onmessage = function (message) {
    var command = message.data;
    
    switch (command) {
        case "left":
            if (zero.riding) {
                if (zero.getPosX() >= 545) {
                    zero.el.style.left = "545px";
                };
            };
            right = false;
            zero.moveLeft();
            break;
        case "right":
            right = true;
            zero.moveRight();
            break;
        case "jump":
            if(!zero.clicked){
                ProsesKeyUp();
                zero.clicked = true;
                zero.el.classList.remove("zero-stand");
                zero.el.classList.add("zero-jump-up");
                t = setInterval(function(){zero.jump()},25);
            }
        case "stand":
             if (zero.running == true) {
                if (zero.riding == true) {
                    zero.standstill3();
                };
                zero.standStill();
            }
            if (zero.jumpdown == true) {
                if (!zero.clicked) {
                    zero.standStill2();
                };
            };
            break;
        case "ride" :
            if (zero.riding) {
                ProsesKeyUp();
                zero.riding = false;
            }
            else{
                zero.riding = true;   
            }
            break;
        case "watch":
            var wm = document.querySelector("h1#watch");
            wm.innerHTML = "Watch Mode";

            window.removeEventListener('keydown', function(e) {
                keypressed[e.keyCode] = true;
            }, true);    
 
            window.removeEventListener('keyup', function(e) {
                keypressed[e.keyCode] = false;
                ProsesKeyUp();
            },true);
            break;
    }
};