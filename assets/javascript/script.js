var canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 700;
var c = canvas.getContext("2d");
var collidables = [];
var getables = [];
var phase = 1;
var spritesheet = new Image();
var floor;
var entry1, entry2, entry3, entry4;
var birthdayShow = false;
spritesheet.src = "assets/images/spritesheet.png";
spritesheet.addEventListener("load", function() {
    floor = new Image();
    floor.src = "assets/images/floor.png";
    floor.addEventListener("load", function() {
        entry1 = new Image();
        entry1.src = "assets/images/entry1.png";
        entry1.addEventListener("load", function() {
            entry2 = new Image();
            entry2.src = "assets/images/entry2.png";
            entry2.addEventListener("load", function() {
                entry3 = new Image();
                entry3.src = "assets/images/entry3.png";
                entry3.addEventListener("load", function() {
                    entry4 = new Image();
                    entry4.src = "assets/images/entry4.png";
                    entry4.addEventListener("load", function() {
                        animate();
                    })
                })
            })
        })
    });
})

function pointWithin(x, y, obj){
    var x_intersection = x <= obj.x + obj.width && x >= obj.x;
    var y_intersection = y <= obj.y + obj.height && y >= obj.y;
    return x_intersection && y_intersection;
}

function objIntersect(obj1, obj2){
    var firstCorner = pointWithin(obj1.x, obj1.y, obj2);
    var secondCorner = pointWithin(obj1.x + obj1.width, obj1.y + obj1.height, obj2);
    var thirdCorner = pointWithin(obj1.x, obj1.y + obj1.height, obj2);
    var fourthCorner = pointWithin(obj1.x + obj1.width, obj1.y, obj2);
    return firstCorner || secondCorner || thirdCorner || fourthCorner;
}

function objIntersectBoth(obj1, obj2){
    var firstTest = objIntersect(obj1, obj2);
    var secondTest = objIntersect(obj2, obj1);
    return firstTest || secondTest;
}

var pichu = {
    mode: "default",
    direction: "down",
    motion: false,
    x: 100,
    y: 500,
    height: 100,
    width: 100,
    speed: 5,
    i: 0,
    motionDelay: 0,
    desiredDelay: 10,
    idle_i: 0,
    idleDelay: 0,
    idleDesiredDelay: 60,
    spriteMultiplier: 1,
    downArrays: [[0, 0, 215, 215], [230, 0, 215, 215], [0, 0, 215, 215], [467, 0, 215, 215]], //first is default, second is left foot out, fourth is right foot out (third is default)
    upArrays: [[0, 290, 215, 215], [240, 293, 215, 215], [0, 290, 215, 215], [480, 290, 215, 215]], //same as above
    leftArrays: [[0, 610, 215, 215], [230, 610, 215, 215], [0, 610, 215, 215], [467, 610, 215, 215]],
    rightArrays: [[0, 900, 215, 215], [230, 900, 215, 215], [0, 900, 215, 215], [467, 900, 215, 215]],
    downIdleArrays: [[0, 0, 215, 215], [947, 0, 215, 215]],
    upIdleArrays: [[0, 290, 215, 215]],
    leftIdleArrays: [[0, 610, 215, 215], [955, 610,215, 215]],
    rightIdleArrays: [[0, 900, 215, 215], [944, 900, 215, 215]],
    myArray: undefined,
    intersect: function() {
        var answer = false;
        var pichuTest = {
            x: this.x + 25,
            y: this.y,
            width: this.width - 25,
            height: this.height
        }
        for(var i = 0;i < collidables.length;i++){
            if(objIntersectBoth(pichuTest, collidables[i])){
                answer = true;
            }
        }
        return answer;
    },
    hitWall: function() {
        var pichuTest = {
            x: this.x + 25,
            y: this.y,
            width: this.width - 25,
            height: this.height
        }
        var test1 = pichuTest.x < 0 || (pichuTest.x + pichuTest.width) >= canvas.width;
        var test2 = pichuTest.y < 0 || (pichuTest.y + pichuTest.height) >= canvas.height;
        return test1 || test2;
    },
    draw: function() {
       if(this.motion){
        i = this.i;
        this.myArray = this.myArray ? this.myArray : this.downArrays; //as myArray starts off undefined, this will change it to be equal to the down array by default
        steps = this.myArray;
        c.drawImage(spritesheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
       } else {
           idle_i = this.idle_i;
           this.myArray = this.myArray ? this.myArray : this.downIdleArrays;
           steps = this.myArray;
           c.drawImage(spritesheet, steps[idle_i][0], steps[idle_i][1], steps[idle_i][2], steps[idle_i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
       }
    },
    turnUp: function() {
        this.direction = "up";
        this.myArray = this.upArrays;
    },
    turnLeft: function() {
        this.direction = "left";
        this.myArray = this.leftArrays;
    },
    turnRight: function() {
        this.direction = "right";
        this.myArray = this.rightArrays;
    },
    turnDown: function() {
        this.direction = "down";
        this.myArray = this.downArrays;
    },
    startMoving: function() {
        this.motion = true;
        this.idle_i = 0;
        this.idleDelay = 0;
        switch(this.direction){
            case "up":
                this.myArray = this.upArrays;
                break;
            case "down":
                this.myArray = this.downArrays;
                break;
            case "left":
                this.myArray = this.leftArrays;
                break;
            case "right":
                this.myArray = this.rightArrays;
                break;
            default:
                break;
        }
    },
    stopMoving: function() {
        this.motion = false;
        this.i = 1;
        this.motionDelay = 0;
        switch(this.direction){
            case "up":
                this.myArray = this.upIdleArrays;
                break;
            case "down":
                this.myArray = this.downIdleArrays;
                break;
            case "left":
                this.myArray = this.leftIdleArrays;
                break;
            case "right":
                this.myArray = this.rightIdleArrays;
                break;
            default:
                break;
        }
    },
    update: function() {
        if(this.motion){
            this.motionDelay++;
            if(this.motionDelay >= this.desiredDelay){
                this.i++;
                this.motionDelay = 0;
                if(this.i >= this.myArray.length){
                    this.i = 0;
                }
            }
            switch(this.direction){
                case "up":
                    this.y -= this.speed;
                    if(this.intersect() || this.hitWall()){
                        this.y += this.speed;
                    }
                    break;
                case "down":
                    this.y += this.speed;
                    if(this.intersect() || this.hitWall()){
                        this.y -= this.speed;
                    }
                    break;
                case "left":
                    this.x -= this.speed;
                    if(this.intersect() || this.hitWall()){
                        this.x += this.speed;
                    }
                    break;
                case "right":
                    this.x += this.speed;
                    if(this.intersect() || this.hitWall()){
                        this.x -= this.speed;
                    }
                    break;
                default:
                    break;
            }
        } else {
            this.idleDelay++;
            if(this.idleDelay >= this.idleDesiredDelay){
                this.idle_i++;
                this.idleDelay = 0;
                this.idleDesiredDelay = 10;
                if(this.idle_i >= this.myArray.length){
                    this.idle_i = 0;
                    this.idleDesiredDelay = 100;
                }
            }
        }
        // getBox();
        if(objIntersectBoth(pichu, entry)){
            phaseCheck();
        }
        this.draw();
    }
}

function getBox() {
    if(objIntersectBoth(pichu, boxBoy)){
        alert("you win");
        pichu.x = 0;
        pichu.y = 0;
        pichu.stopMoving();
    }
}
var boxBoy = {
    x: 300,
    y: 300,
    height: 95,
    width: 95,
    draw: function() {
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
var entry = {
    x: 10,
    y: 10,
    height: 186,
    width: 145,
    stateIndex: 1,
    stateDelay: 0,
    stateDesiredDelay: 5,
    stateArray: [entry1, entry2, entry3, entry4],
    draw: function() {
        var state;
        switch(this.stateIndex){
            case 1:
                state = entry1;
                break;
            case 2:
                state = entry2;
                break;
            case 3:
                state = entry3;
                break;
            case 4:
                state = entry4;
                break;
        }
        c.drawImage(state, this.x, this.y, this.width, this.height);
    },
    update: function() {
        this.stateDelay++;
        if(this.stateDelay >= this.stateDesiredDelay){
            this.stateIndex++;
            this.stateDelay = 0;
            if(this.stateIndex > 4){
                this.stateIndex = 1;
            }
        }
        this.draw();
    }
}

//collidables.push(boxBoy);
//getables.push(boxBoy);

function collidableDraw() {
    for(var i = 0;i < collidables.length;i++){
        collidables[i].draw();
    }
}

function getableDraw()  {
    for(var i = 0;i < getables.length;i++){
        getables[i].draw();
    }
}



function phaseCheck() {
    entry.x = Math.floor(Math.random() * canvas.width);
    entry.y = Math.floor(Math.random() * canvas.height);
    if(objIntersectBoth(pichu, entry) || entry.x + entry.width > canvas.width || entry.y + entry.height > canvas.height){
        phaseCheck();
    } else {
        return;
    }
}

function movement() {
    var i_array = pichu.myArray;
    var i_index = 0;
    interval = setInterval(function() {
        i_index++;
        if(i_index >= i_array.length){
            i_index = 0;
        }
        pichu.i = i_index;
    }, 250)
}

window.addEventListener("keydown", function(event) {
    event.preventDefault();
    if(!birthdayShow){
        switch(event.key){
            case "ArrowUp":
                if(pichu.direction != "up"){
                    pichu.turnUp();
                }
                pichu.startMoving();
                break;
            case "ArrowDown":
                if(pichu.direction != "down"){
                    pichu.i = 1;
                    pichu.turnDown();
                }
                pichu.startMoving();
                break;
            case "ArrowLeft":
                if(pichu.direction != "left"){
                    pichu.i = 1;
                    pichu.turnLeft();
                }
                pichu.startMoving();
                break;
            case "ArrowRight":
                if(pichu.direction != "right"){
                    pichu.i = 1;
                    pichu.turnRight();
                }
                pichu.startMoving();
                break;
            default:
                break;
        }
    }
})

window.addEventListener("keyup", function(event){
    if(!birthdayShow){
        var possibleDirection = event.key.slice(5).toLowerCase();
    if(pichu.direction === possibleDirection){
        pichu.stopMoving();
    }
    }
});

// function defaultMove() {
//     var i_array = [pichu.downArrays, pichu.upArrays, pichu.leftArrays, pichu.rightArrays];
//     i_array = [pichu.leftArrays, pichu.rightArrays];
//     var i_index = 0;
//     var interval = setInterval(function() {
//         i_index++;
//         if(i_index >= i_array.length){
//             i_index = 0;
//         }
//         pichu.myArray = i_array[i_index];
//     }, 500)
// }

// //defaultMove();



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(floor, 0, 0, canvas.width, canvas.height);
    //collidableDraw();
    // getableDraw();
    entry.update();
    pichu.update();
}