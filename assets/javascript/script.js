var textInterval;
var startMeBaby = false;
var pichuLoad;
var animateID;
var pichu;
var collidables;
var c;
var paused;
var pauseReady;
var getables;
var thunderBolts;
var enemies;
var picMenu;
var rushMode;
var spritesheet = new Image();
var floor;
var entry1, entry2, entry3, entry4;
var canvas;

if(JSON.parse(localStorage.getItem("pichuSaveFile")) != null){
    pichuLoad = JSON.parse(localStorage.getItem("pichuSaveFile"));
} else {
    pichuLoad = {
        x: 100,
        y: 500,
        level: 0,
        exp: 0,
        picture: "assets/images/startingAvatar.png",
        phase: 0
    }
}
var map = $("#map");
function optionize(title, option1, option2, option3, option4){
    var optionsTitle, optionOne, optionTwo, optionThree, optionFour;
    if(!document.querySelector("#optionRow")){
        //create options row and the options divs
        var optionRow = $("<div id=\"optionRow\" class=\"row\"></div>");
        map.append(optionRow);
        var optionText = $("<div id=\"optionText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
        $("#optionRow").append(optionText);

        var newSpace1 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace1);
        var newOption1 = $("<div id=\"option1\" class=\"col-md-4 options\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newOption1);
        var newSpace2 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace2);

        var newSpace3 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace3);
        var newOption2 = $("<div id=\"option2\" class=\"col-md-4 options\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newOption2);
        var newSpace4 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace4);

        var newSpace5 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace5);
        var newOption3 = $("<div id=\"option3\" class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newOption3);
        var newSpace6 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace6);

        var newSpace7 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace7);
        var newOption4 = $("<div id=\"option4\" class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newOption4);
        var newSpace8 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace8);

    } else {
        var opt1, opt2, opt3, opt4;
        opt1 = document.querySelector("#option1");
        opt2 = document.querySelector("#option2");
        opt3 = document.querySelector("#option3");
        opt4 = document.querySelector("#option4");

        //clear out text and any associted events from the options
        opt1.innerText = opt1.onclick = opt2.innerText = opt2.onclick = opt3.innerText = opt3.onclick = opt4.innerText = opt4.onclick = "";
    }
    optionsTitle = document.querySelector("#optionText");
    optionsTitle.innerText = title;
    
    optionOne = document.querySelector("#option1");
    optionOne.innerText = option1;

    optionTwo = document.querySelector("#option2");
    optionTwo.innerText = option2;

    if(option3 && option3.trim() != ""){
        optionThree = document.querySelector("#option3");
        optionThree.innerText = option3;
        optionThree.className = "col-md-4 options";
    } else {
        optionThree = document.querySelector("#option3");
        optionThree.className = "col-md-4";
    }

    if(option4 && option4.trim() != ""){
        optionFour = document.querySelector("#option4");
        optionFour.innerText = option4;
        optionFour.className = "col-md-4 options";
    } else {
        optionFour = document.querySelector("#option4");
        optionFour.className = "col-md-4";
    }

    //clear out any events assigned to these options for now
    optionOne.onclick = optionTwo.onclick = optionThree.onclick = optionFour.onclick = "";
}

function mainMenunize() {
    optionize("Pichu's Adventure: Main Menu", "Story Mode (still in construction!)", "Rush Mode", "How to Play");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var option4 = document.getElementById("option4");

    option2.onclick = rushModenize;
    option3.onclick = function() {
        howToPlay(mainMenunize);
    }
}

function rushModenize() {
    optionize("Are you sure you wish to play Rush Mode?", "Yes", "No");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var option4 = document.getElementById("option4");
    option1.onclick = function() {
        startMeBaby = true;
        var newCanvas = document.createElement("canvas");
        var map = document.getElementById("map");
        map.textContent = "";
        map.append(newCanvas);
        start("rush");
    }
    option2.onclick = mainMenunize;
}

function howToPlay(backFunction) {
    //creates a directions page
    var optionRow = $("#optionRow");
    optionRow.empty();

    //pseudo header
    var directionsText = $("<div id=\"directionsText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\">Directions: How to Play</div>");
    optionRow.append(directionsText);

    //setting up an array to setup multiple divs for each category
    var directionsArray = ["movement", "attack", "pause"];
    for(var i = 0;i < directionsArray.length;i++){
        var buttonDiv = $(`<div id=\"${directionsArray[i]}Button\" class=\"col-md-3\"></div>`);
        optionRow.append(buttonDiv);
        var buttonPic = $("<img>");
        buttonPic.css({"height":"6em", "width":"auto"});
        switch(directionsArray[i]){
            case "movement":
                buttonPic.attr("src", "assets/images/arrowKeys.png");
                break;
            case "attack":
                buttonPic.attr("src", "assets/images/spacebar.png");
                break;
            case "pause":
                buttonPic.attr("src", "assets/images/enterKey.png");
                break;
            default:
                buttonPic.attr("src", "assets/images/pichu%20front%20potential%20annoyed.png");
                break;
        }
        $(`#${directionsArray[i]}Button`).append(buttonPic);

        var displayDiv = $(`<div id=\"${directionsArray[i]}Display\" class=\"col-md-3\"></div>`);
        optionRow.append(displayDiv);
        var displayPic = $("<img>");
        displayPic.css({"height":"6em", "width":"auto"});
        switch(directionsArray[i]){
            case "movement":
                displayPic.attr("src", "assets/images/moveHowTo.gif");
                break;
            case "attack":
                displayPic.attr("src", "assets/images/attackHowTo.png");
                break;
            case "pause":
                displayPic.attr("src", "assets/images/pause.png");
                break;
            default:
                displayPic.attr("src", "assets/images/pichu%20front%20potential%20annoyed.png");
                break;
        }
        $(`#${directionsArray[i]}Display`).append(displayPic);

        var directionsDiv = $(`<div id=\"${directionsArray[i]}Directions\" class=\"col-md-6\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>`);
        switch(directionsArray[i]){
            case "movement":
                directionsDiv.text("Use the arrow keys to move around!");
                break;
            case "attack":
                directionsDiv.text("Use the Spacebar to fire a Thunderbolt at enemies!");
                break;
            case "pause":
                directionsDiv.text("Use the Enter key to pause the game!");
                break;
            default:
                directionsDiv.text("Directions not found!");
                break;
        }
        optionRow.append(directionsDiv);
    }

    var spaceToBack = $("<div class=\"col-md-9\"></div>");
    optionRow.append(spaceToBack);
    var backDiv = $("<div id=\"backToMenu\" class=\"options col-md-3\" style=\"font-size: 2em; background-color: aqua; color:black\">Back</div>");
    optionRow.append(backDiv);
    var backer = document.querySelector("#backToMenu");
    backer.onclick = function() {
        $("#optionRow").remove();
        backFunction();
    }

}

function emptyFn() {
    console.log("Did nothing!");
}
function skip(id, text, interval, finishingFunction){
    clearInterval(interval);
    var spot = $("#" + id);
    spot.text(text);
    finishingFunction();
}
function skipClass(class_name, text, interval, finishingFunction){
    clearInterval(interval);
    var spot = $("." + class_name);
    spot.text(text);
    finishingFunction();
}
function rollingText(id, text, finishingFunction){
    var newInterval;
    var spot = $("#" + id);
    spot.text("");
    var script = text.split("");
    var textIndex = 0;
    function tempSkip(){
        spot.off("click", tempSkip);
        skip(id, text, newInterval, finishingFunction);
    }
    spot.on("click", tempSkip);
    newInterval = setInterval(function() {
        if(textIndex < script.length){
            spot.text(spot.text() + script[textIndex]);
            textIndex++;
        } else {
            spot.off("click", tempSkip);
            skip(id, text, newInterval, finishingFunction);
        }
    }, 50);
}
function rollingTextClass(class_name, text, finishingFunction){
    var spot = $("." + class_name);
    var newInterval;
    spot.text("");
    var script = text.split("");
    var textIndex = 0;
    function tempSkip(){
        spot.off("click", tempSkip);
        skipClass(class_name, text, newInterval, finishingFunction);
    }
    spot.on("click", tempSkip);
    newInterval = setInterval(function() {
        if(textIndex < script.length){
            spot.text(spot.text() + script[textIndex]);
            textIndex++;
        } else {
            spot.off("click", tempSkip);
            skip(class_name, text, newInterval, finishingFunction);
        }
        console.log("timer is " + textIndex);
    }, 50);
}
map.css({"background-color":"black", "color":"white"});
/*var welcomeRow = $("<div id=\"welcomeRow\" class=\"row\"></div>");
map.append(welcomeRow);
var welcomeText = $("<div id=\"welcomeText\" class=\"col-md-12\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
$("#welcomeRow").append(welcomeText);*/
var mobileUsage = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(mobileUsage);
if(!mobileUsage){
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
                            mainMenunize();
                        })
                    })
                })
            })
        });
    })
} else {
    var welcomeRow = $("<div id=\"welcomeRow\" class=\"row\"></div>");
    map.append(welcomeRow);
    var welcomeText = $("<div id=\"welcomeText\" class=\"col-md-12\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
    $("#welcomeRow").append(welcomeText);
    rollingText("welcomeText", "Sorry, this game does not work on mobile browsers!", emptyFn);
}

function start(mode) {
    canvas = document.querySelector("canvas");
    var mappy = document.getElementById("map");
canvas.width = mappy.scrollWidth;
canvas.height = mappy.scrollHeight;
c = canvas.getContext("2d");
collidables = [];
paused = false;
pauseReady = true;
getables = [];
thunderBolts = [];
enemies = [];
picMenu = false;
var phase = 1;
rushModeCount = -1;
document.getElementById("player-pic").className = "options"

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


pichu = {
    mode: "default",
    direction: "down",
    motion: false,
    x: pichuLoad.x,
    y: pichuLoad.y,
    radius: 5,
    height: 100,
    width: 100,
    damaged: false,
    damageCooldown: 50,
    level: pichuLoad.level,
    exp: pichuLoad.exp,
    levelUpExp: function() {
        return 10*pichu.level;
    },
    gainExp: function(points){
        pichu.exp += points;
        console.log(pichu.exp);
        if(pichu.exp >= pichu.levelUpExp()){
            var remainingExp = pichu.exp - pichu.levelUpExp();
            console.log(remainingExp);
            pichu.level++;
            pichu.exp = 0;
            console.log(pichu.levelUpExp());
            pichu.levelUp(remainingExp);
        }
    },
    levelUp: function(remainingExp){
        console.log("remaining exp is " + remainingExp);
        pichu.health = pichu.max_Health();
        pichu.cooldown = pichu.charge_Max();
        $("#level-label").text("");
        $("#pichu_level").attr("status", "levelingUp");
        rollingText("pichu_level", "Level Up!", function() {
            $("#level-label").text("Level");
            $("#pichu_level").attr("status", "level");
            pichu.gainExp(remainingExp);
        })
    },
    live: true,
    health: 10,
    max_Health: function() {
        return 10 + 10*this.level;
    },
    speed: function() {
        return Math.min(5 + 0.5*pichu.level, 10);
    },
    i: 0,
    picture: pichuLoad.picture,
    motionDelay: 0,
    desiredDelay: 10,
    idle_i: 0,
    idleDelay: 0,
    idleDesiredDelay: 60,
    spriteMultiplier: 1,
    cooldown: 150,
    charge_Max: function() {
        return Math.max(20, 150 - 10*pichu.level);
    },
    attckWindDown: 0,
    downArrays: [[0, 0, 215, 215], [230, 0, 215, 215], [0, 0, 215, 215], [467, 0, 215, 215]], //first is default, second is left foot out, fourth is right foot out (third is default)
    upArrays: [[0, 290, 215, 215], [240, 293, 215, 215], [0, 290, 215, 215], [480, 290, 215, 215]], //same as above
    leftArrays: [[0, 610, 215, 215], [230, 610, 215, 215], [0, 610, 215, 215], [467, 610, 215, 215]],
    rightArrays: [[0, 900, 215, 215], [230, 900, 215, 215], [0, 900, 215, 215], [467, 900, 215, 215]],
    downIdleArrays: [[0, 0, 215, 215], [947, 0, 215, 215]],
    upIdleArrays: [[0, 290, 215, 215]],
    leftIdleArrays: [[0, 610, 215, 215], [955, 610,215, 215]],
    rightIdleArrays: [[0, 900, 215, 215], [944, 900, 215, 215]],
    downAttackArray: [[717, 0, 215, 215]],
    upAttackArray: [[714, 290, 215, 215]],
    leftAttackArray: [[718, 610, 215, 215]],
    rightAttackArray: [[708, 900, 215, 215]],
    damageArray: [[0, 0, 0, 0]],
    defeatedArray: [[1681, 0, 215, 215]],
    myArray: undefined,
    intersect: function() {
        var answer = [false, -5];
        var pichuTest = {
            x: this.x + this.width/2 - 5,
            y: this.y + this.height/2 - 5,
            width: 10,
            height: 10
        }
        for(var i = 0;i < collidables.length;i++){
            if(objIntersectBoth(pichuTest, collidables[i].test)){
                answer[0] = true;
                answer[1] = i;
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
    damage: function(amount){
        if(!this.damaged && this.live){
            pichu.damaged = true;
            pichu.health -= amount;
            if(pichu.health <= 0){
                pichu.live = false;
                pichu.damaged = false;
                gameOver();
            }
        }
    },
    defeat: function(){
        /*if(this.radius <= 100){
            c.beginPath();
            c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
            c.strokeStyle = "yellow";
            c.lineWidth = 100 - this.radius;
            c.stroke();
            this.radius+=2;
        } else {
            emptyFn();
        }*/
        steps = this.defeatedArray;
        c.drawImage(spritesheet, steps[0][0], steps[0][1], steps[0][2], steps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
    },
    draw: function() {
        if(!this.live){
            return;
        }
        if(this.motion){
            i = this.i;
            this.myArray = this.myArray ? this.myArray : this.downArrays; //as myArray starts off undefined, this will change it to be equal to the down array by default
            steps = this.myArray;
            if(steps.length === 1){
                i = 0;
            }
            console.log(steps);
            console.log(i);
            damageSteps = this.damageArray;
            if(this.damaged && this.damageCooldown%2 === 0){
                c.drawImage(spritesheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            } else {
                c.drawImage(spritesheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            }
        } else {
            idle_i = this.idle_i;
            this.myArray = this.myArray ? this.myArray : this.downIdleArrays;
            steps = this.myArray;
            damageSteps = this.damageArray;
            if(this.damaged && this.damageCooldown%2 === 0){
                    c.drawImage(spritesheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            } else {
                    c.drawImage(spritesheet, steps[idle_i][0], steps[idle_i][1], steps[idle_i][2], steps[idle_i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            }
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
        if(this.live){
            if(this.attckWindDown > 0){
                this.mode = "attack";
                switch(this.direction){
                    case "up":
                        this.myArray = this.upAttackArray;
                        break;
                    case "down":
                        this.myArray = this.downAttackArray;
                        break;
                    case "left":
                        this.myArray = this.leftAttackArray;
                        break;
                    case "right":
                        this.myArray = this.rightAttackArray;
                        break;
                    default:
                        break;
                }
                this.attckWindDown--;
            } else {
                this.mode = "default";
                if(this.motion){
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
                } else {
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
                }
            }
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
                        this.y -= this.speed();
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                }
                            }
                            this.y += this.speed();
                            if(index >= 0){
                                collidables[index].approach();
                            }
                        }
                        break;
                    case "down":
                        this.y += this.speed();
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                collidables[index].drawn = true;
                                }
                            }
                            this.y -= this.speed();
                            if(index >= 0){
                                collidables[index].approach();
                            }
                        }
                        break;
                    case "left":
                        this.x -= this.speed();
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                }
                            }
                            this.x += this.speed();
                            if(index >= 0){
                                collidables[index].approach();
                            }
                        }
                        break;
                    case "right":
                        this.x += this.speed();
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                }
                            }
                            this.x -= this.speed();
                            if(index >= 0){
                                collidables[index].approach();
                            }
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
            /*if(objIntersectBoth(pichu, entry)){
                phaseCheck();
            }*/
            if(this.cooldown < this.charge_Max()){
                this.cooldown++;
            }
            if(this.damaged){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.damaged = false;
                    this.damageCooldown = 50;
                }
            }
            this.draw();            
        } else {
            this.defeat();
        }
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
/*var entry = {
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
}*/

function Sign(x, y, message, additionalFunction){
this.x = x;
this.y = y;
this.width = 100;
this.height = 100;
this.drawn = false;
this.myArray = [[1058, 1258, 298, 284]];
this.message = message;
this.test = {
x: this.x + this.width/2 - 30,
y: this.y + this.height/2 - 30,
width: 60,
height: 60
}
this.draw = function() {
c.drawImage(spritesheet, this.myArray[0][0], this.myArray[0][1], this.myArray[0][2], this.myArray[0][3], this.x, this.y, this.width, this.height);
this.drawn = false;
}
this.update = function() {
var pichuTest = {
    x: pichu.x + pichu.width/2,
    y: pichu.y + pichu.height/2,
    full_y: pichu.y + pichu.height,
    width: 1,
    height: 1
}
if(objIntersectBoth(this, pichu) && pichuTest.full_y < this.y + this.height){
    this.drawn = true;
} else {
    this.drawn = false;
}
//console.log(this.drawn);
if(!this.drawn){
    this.draw();
}
}
this.approach = function() {
if(picMenu){
    return;
}
picMenu = true;
pichu.stopMoving();
$("#map").css("background-color", "transparent");
canvas.style.position = "fixed";
canvas.style.zIndex = -1;
console.log("did map");
var newDiv = $("<div>", {"class":"row bison borderMe"});
newDiv.css({"background-color":"rgb(185, 122, 87)", "color":"black"});
var newCol = $("<div>", {"class": "col-md-12 text-center"});
var newHead = $("<h1>", {"class":"sign"});
newCol.append(newHead);
newDiv.append(newCol);
$("#map").append(newDiv);
rollingTextClass("sign", this.message, function() {
    var col1 = $("<div>", {"class":"col-md-4"});
    newDiv.append(col1);
    var col2 = $("<div class='col-md-4 options closeSign text-center'><h5>Close</h5><div>");
    col2.on("click", function() {
        pictureMenu();
        additionalFunction();
    });
    newDiv.append(col2);
    var col3 = $("<div>", {"class":"col-md-4"});
    newDiv.append(col3);
    
})
}
}

//collidables.push(boxBoy);
//getables.push(boxBoy);

function collidableDraw() {
    for(var i = 0;i < collidables.length;i++){
        collidables[i].update();
    }
}

function collidableDelayDraw() {
    for(var i = 0;i < collidables.length;i++){
        if(collidables[i].drawn){
            collidables[i].draw();
        }
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

function pictureMenu() {
    if(paused){
        return;
    }
    if(picMenu){
    var menu = document.getElementsByClassName("bison");
    $(".bison").empty();
    $(".bison").remove();
    $("#map").css("background-color", "black");
    canvas.style.position = "absolute";
    canvas.style.zIndex = 1;
    picMenu = false
    } else {
    picMenu = true;
    $("#map").css("background-color", "transparent");
    canvas.style.position = "fixed";
    canvas.style.zIndex = -1;
    var newDiv = $("<div>", {"class":"row bison"});
    newDiv.css({"background-image":"url('assets/images/picMenuBG.png'", "background-repeat": "repeat"});
    var picHeader = $("<div class='col-md-12'><h1 style='color: black'>Please select what picture you would like to be your profile pic! You get new options as you level up!</h1></div>");
    newDiv.append(picHeader);
    $("#map").append(newDiv);
    var search = String("pichu");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UXUhR58v2nmQC6jMGg5vr7GbLMDZclbm&q=" + search + "&limit=25&offset=0&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("done"); //maybe try seeing if I can somehow detect wifi so I can give a "Sorry no Wi-Fi :(" message
        var index = -1;
        var limiter = Math.min(pichu.level + 1, 12);
        for(var i = 0;i < 3;i++){
            var newRow = $("<div>", {"class":"row"});
            for(var j = 0;j < 4;j++){
                var newCol = $("<div>", {"class":"col-md-3"});
                console.log("index: " + index + "\nlimiter: " + limiter);
                if(index < limiter){
                    var source;
                    if(index < 0){
                        source = "assets/images/startingAvatar.png";
                    } else {
                        source = response.data[index].images.original.url;
                    }
                    var newImage = $("<img>", {"src": source});
                    newImage.attr("class", i + "-" + j + " options");
                    newImage.css({"width":"90%", "height":"auto"});
                    newImage.on("click", function() {
                        console.log(this);
                        pichu.picture = pichuLoad.picture = $(this).attr("src");
                        $("#player-pic").attr("src", pichuLoad.picture);
                        localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
                    })
                    newCol.append(newImage);
                }
                newRow.append(newCol);
                index++;
            }
            $(".bison").append(newRow);
        }
        //$(".bison").css("height", $("#map").css("height"));
    })
    }
}

function pause(){
    if((picMenu && !paused) || !startMeBaby){ //checks to ensure that the menu won't pop up if a different menu is up or if the game is not started
        return;
    }
    if(paused){
        $("#optionRow").remove();
        $("#map").css("background-color", "black");
        canvas.style.position = "absolute";
        canvas.style.zIndex = 1;
        picMenu = false
        paused = false;
        animateID = requestAnimationFrame(animate);
    } else {
        cancelAnimationFrame(animateID);
        picMenu = true;
        paused = true;
        pichu.stopMoving();
        $("#map").css("background-color", "transparent");
        canvas.style.position = "fixed";
        canvas.style.zIndex = -1;
        console.log("did map");
        pauseMenu();
    }
}

function pauseMenu() {
    optionize("P A U S E", "How to Play", "Quit Game", "Continue Playing");
    $(".options").css("background-color", "black");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var option4 = document.getElementById("option4");

    option1.onclick = function() {
        howToPlay(pauseMenu);
    }

    option2.onclick = function() {
        optionize("Are you sure you wish to quit?", "Yes", "No");
        option2.onclick = pauseMenu;
        option1.onclick = function() {
            canvas.remove();
            cancelAnimationFrame(animateID);
            startMeBaby = false;
            $("#map").css("background-color", "black");
            var map = document.getElementById("map");
            map.textContent = "";
            document.getElementById("pichu_level").innerText = "";
            var chargebar = document.getElementById("charge_bar");
            chargebar.value = 0;
            var healthbar = document.getElementById("hp_bar");
            healthbar.value = 0;
            var expbar = document.getElementById("exp_bar");
            expbar.value = 0;
            mainMenunize();
        }
    }
    option3.onclick = pause;
}

window.addEventListener("keydown", function(event) {
event.preventDefault();
console.log(event.key);
if(canvas.style.zIndex != "" && canvas.style.zIndex < 1 && event.key != "Enter"){
console.log("Can't do anything right now, sorry!");
} else {
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
    case "Enter":
        if(pauseReady){
            pause();
            pauseReady = false;
        }
        break;
    case " ":
        if(/*pichu.level >= 2 && */pichu.live && (pichu.cooldown >= pichu.charge_Max() /*|| thunderBolts.length === 0*/)){
            var frontPichu = frontOfPichu();
            var newThunderbolt = new Thunderbolt(frontPichu.x, frontPichu.y, pichu.direction, 20);
            pichu.cooldown = 0;
            pichu.attckWindDown = 10;
            thunderBolts.push(newThunderbolt);
        }
        break;
    default:
        break;
}
}
})


window.addEventListener("keyup", function() {
    switch(event.key){
        case "Enter":
            if(!pauseReady){
                pauseReady = true;
            }
            break;
        default:
            break;
    }
})

function frontOfPichu(){
    var result = {
        x: pichu.x + pichu.width/2,
        y: pichu.y + pichu.height/2
    }
    switch(pichu.direction){
        case "up":
            result.y -= pichu.height/2;
            break;
        case "down":
            result.y += pichu.height/2;
            break;
        case "left":
            result.x -= pichu.width/2;
            break;
        case "right":
            result.x += pichu.width/2;
            break;
    }
    return result;
}

function Thunderbolt(x, y, direction, radius){
this.x = x;
this.y = y;
this.direction = direction;
this.radius = radius*2;
this.status = "go";
this.i = 0;
this.motionDelay = undefined;
this.size_i = 0;
this.size_Delay = 100;
this.bigTime = true;
this.draw = function() {
if(this.status != "stop"){
var rad;
if(this.bigTime){
    rad = this.radius;
} else {
    rad = this.radius * 0.8
}
c.beginPath();
c.arc(this.x, this.y, rad, Math.PI*2, false);
c.strokeStyle = "aqua";
c.stroke();
c.fillStyle = "aqua";
c.fill();
c.beginPath();
c.arc(this.x, this.y, this.radius/2, Math.PI*2, false);
c.strokeStyle = "blue";
c.stroke();
c.fillStyle = "blue";
c.fill();
}
}
this.update = function() {
switch(this.direction){
    case "up":
        this.y--;
        break;
    case "down":
        this.y++;
        break;
    case "right":
        this.x++;
        break;
    case "left":
        this.x--;
        break;
}
var areaOfBolt = {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
}
if(/*objIntersectBoth(areaOfBolt, entry) || */this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
    this.status = "stop";
    thunderBolts.splice(thunderBolts.indexOf(this), 1);
} else {
    var newAreaOfBolt = {
        x: this.x,
        y: this.y,
        width: 1,
        height: 1
    }
    for(var i = 0;i < enemies.length;i++){
        if(objIntersectBoth(newAreaOfBolt, enemies[i]) && enemies[i].status === "active" && this.status != "stop"){
            console.log("bolt hit");
            this.status = "stop";
            thunderBolts.splice(thunderBolts.indexOf(this), 1);
            enemies[i].status = "eliminated";
            pichu.gainExp(enemies[i].exp);
        }
    }
    this.draw();
    if(!this.bigTime){
        this.size_i++;
        if(this.size_i > this.size_Delay){
            this.bigTime = true;
        }
    } else {
        this.size_i--;
        if(this.size_i <= 0){
            this.bigTime = false;
        }
    }
}

};
}

function Voltorb(x, y, priority){
    this.status = "active";
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.radius = 5;
    this.exp = 6;
    this.innerRadius = 0.1;
    this.height = 100;
    this.width = 100;
    this.priority = priority;
    this.direction = "down";
    this.i = 0;
    this.motionDelay = 0;
    this.desiredDelay = 10;
    this.myArray = undefined;
    this.downArrays = [[44, 1166, 210, 210], [263, 1166, 210, 210]];
    this.upArrays = [[470, 1166, 210, 210], [688, 1166, 210, 210]];
    this.leftArrays = [[480, 1370, 210, 210], [694, 1370, 210, 210]];
    this.rightArrays = [[50, 1370, 210, 210], [269, 1370, 210, 210]];
    this.intersect = function() {
    var answer = false;
    /*var pichuTest = {
        x: this.x + this.width/2 - 5,
        y: this.y + this.height/2 - 5,
        width: 10,
        height: 10
    }*/
    for(var i = 0;i < collidables.length;i++){
        if(objIntersectBoth(this, collidables[i].test)){
            answer = true;
        }
    }
    return answer;
    }
    this.draw = function() {
    i = this.i;
    this.myArray = this.myArray ? this.myArray : this.downArrays;
    steps = this.myArray;
    c.drawImage(spritesheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
    }
    this.update = function(target) {
    var adjust = 50;
    var testTarget = {
        x: target.x,
        y: target.y,
        height: target.height - adjust,
        width: target.width - adjust
    }
    var testVoltorb = {
        x: this.x,
        y: this.y,
        height: this.height - adjust,
        width: this.width - adjust
    }
    if(objIntersectBoth(testTarget, testVoltorb) && this.status==="active" && !pichu.damaged){
        this.status = "succeeded";
        var damage = 5 + 10*(Math.max(0, pichu.level - 5));
        pichu.damage(damage);
    }
    for(var i = 0;i < thunderBolts.length;i++){
        var areaOfBolt = {
            x: thunderBolts[i].x,
            y: thunderBolts[i].y,
            width: 1,
            height: 1
        }
        if(objIntersectBoth(areaOfBolt, testVoltorb) && this.status==="active" && thunderBolts[i].status!="stop"){
            console.log("Voltorb hit");
            thunderBolts[i].status = "stop";
            thunderBolts.splice(i, 1);
            this.status = "eliminated";
            pichu.gainExp(this.exp);
        }
    }
    if(this.priority === 0){
        if(Math.abs(this.x - target.x) >= 30){
            if(target.x < this.x){
                if(this.direction != "left"){
                    this.direction = "left";
                    this.myArray = this.leftArrays;
                }
            } else if(target.x > this.x){
                if(this.direction != "right"){
                    this.direction = "right";
                    this.myArray = this.rightArrays;
                }
            }
        } else {
            if(target.y < this.y){
                if(this.direction != "up"){
                    this.direction = "up";
                    this.myArray = this.upArrays;
                }
            } else if(target.y > this.y){
                if(this.direction != "down"){
                    this.direction = "down";
                    this.myArray = this.downArrays;
                }
            }
        }
    }
    if(this.priority === 1){
        if(Math.abs(this.y - target.y) >= 30){
            if(target.y < this.y){
                if(this.direction != "up"){
                    this.direction = "up";
                    this.myArray = this.upArrays;
                }
            } else if(target.y > this.y){
                if(this.direction != "down"){
                    this.direction = "down";
                    this.myArray = this.downArrays;
                }
            }
        } else {
            if(target.x < this.x){
                if(this.direction != "left"){
                    this.direction = "left";
                    this.myArray = this.leftArrays;
                }
            } else if(target.x > this.x){
                if(this.direction != "right"){
                    this.direction = "right";
                    this.myArray = this.rightArrays;
                }
            }
        }
    }
    if(!pichu.live){
        this.direction = "down";
        this.myArray = this.downArrays;
    }
    if(this.status === "active"){
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
                if(this.intersect() || picMenu || !pichu.live){
                    this.y += this.speed;
                }
                break;
            case "down":
                this.y += this.speed;
                if(this.intersect() || picMenu || !pichu.live){
                    this.y -= this.speed;
                }
                break;
            case "left":
                this.x -= this.speed;
                if(this.intersect() || picMenu || !pichu.live){
                    this.x += this.speed;
                }
                break;
            case "right":
                this.x += this.speed;
                if(this.intersect() || picMenu || !pichu.live){
                    this.x -= this.speed;
                }
                break;
            default:
                break;
        }
        this.draw();
    } else if(this.status === "eliminated"){
        /*c.beginPath();
        c.arc(this.x + this.width/2, this.y + this.height/2, this.radius/4, Math.PI*2, false);
        c.strokeStyle = "aqua";
        c.stroke();
        c.beginPath();
        c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
        c.strokeStyle = "aqua";
        c.stroke();*/
        /*for(var d = 100;d > 0;d--){
            c.beginPath();
            c.arc(this.x + this.width/2, this.y + this.height/2, this.radius/d, Math.PI*2, false);
            c.strokeStyle = "aqua";
            c.stroke();
        }*/
        if(this.radius <= 50){
            c.beginPath();
            c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
            c.strokeStyle = "aqua";
            c.lineWidth = 50 - this.radius;
            c.stroke();
            this.radius+=2;
        }
        /*c.beginPath();
        c.arc(this.x + this.width/2, this.y + this.height/2, this.innerRadius, Math.PI*2, false);
        c.strokeStyle = "blue";
        c.lineWidth = 100 - this.innerRadius;
        c.stroke();*/
        if(this.radius > 50){
            this.status = "inactive";
            enemies.splice(enemies.indexOf(this), 1);
        }
    } else if(this.status === "succeeded"){
        if(this.radius <= 50){
            c.beginPath();
            c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
            c.strokeStyle = "orange";
            c.lineWidth = 50 - this.radius;
            c.stroke();
            this.radius+=2;
        }
        if(this.radius > 50){
            this.status = "inactive";
            enemies.splice(enemies.indexOf(this), 1);
        }
    }
    }
}

window.addEventListener("keyup", function(event){
    var possibleDirection = event.key.slice(5).toLowerCase();
    if(pichu.direction === possibleDirection){
        pichu.stopMoving();
    }
});

/*canvas.addEventListener("click", function(event){
console.log(event);
var newVoltorb = new Voltorb(event.layerX, event.layerY, Math.floor(Math.random() * 2));
enemies.push(newVoltorb);
})*/

function enemyRush(number){
    if(enemies.length === 0){
        rushModeCount++;
        for(var i = 0;i < rushModeCount;i++){
            var voltorb_x_coordinate;
            var voltorb_y_coordinate;
            for(var j = 0;j < 1;j++){
                var randomCoordinate = {
                    x: Math.floor(Math.random()*canvas.width),
                    y: Math.floor(Math.random()*canvas.height),
                    height: 100,
                    width: 100
                }
                if(objIntersectBoth(randomCoordinate, pichu)){
                    j--;
                } else {
                    voltorb_x_coordinate = randomCoordinate.x;
                    voltorb_y_coordinate = randomCoordinate.y;
                }
            }
            var newVoltorb = new Voltorb(voltorb_x_coordinate, voltorb_y_coordinate, Math.floor(Math.random() * 2));
            enemies.push(newVoltorb);
        }
    }
}

document.getElementById("player-pic").onclick = pictureMenu;
// document.getElementById("resetButton").onclick = function() {
// if(picMenu){
// return;
// }
// picMenu = true;
// pichu.stopMoving();
// $("#map").css("background-color", "transparent");
// canvas.style.position = "fixed";
// canvas.style.zIndex = -1;
// console.log("did map");
// var newDiv = $("<div>", {"class":"row bison borderMe"});
// newDiv.css({"background-color":"black", "color":"white"});
// var newCol = $("<div>", {"class": "col-md-12 text-center"});
// var newHead = $("<h1>", {"class":"confirmation"});
// newCol.append(newHead);
// newDiv.append(newCol);
// $("#map").append(newDiv);
// rollingTextClass("confirmation", "Are you sure you want to erase your file?", function(){
// var col1 = $("<div>", {"class": "col-md-4 options"});
// col1.html("<h5>Yes</h5>");
// var col2 = $("<div>", {"class": "col-md-4"});
// var col3 = $("<div>", {"class":"col-md-4 options"});
// col3.html("<h5>No</h5>");
// col1.on("click", function(){
//     localStorage.removeItem("pichuSaveFile");
//     col1.attr("class", "col-md-4 alwaysHighlighted");
//     col3.attr("class", "col-md-4");
//     rollingTextClass("confirmation", "Done!", function() {
//         pictureMenu();
//     })
// });
// col3.on("click", function() {
//     pictureMenu();
// });
// $(".bison").append(col1);
// $(".bison").append(col2);
// $(".bison").append(col3);
// })

// }

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
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(floor, 0, 0, canvas.width, canvas.height);
    collidableDraw();
    // getableDraw();
    //entry.update();
    pichu.update();
    collidableDelayDraw();
    if(rushModeCount >= 0){
    enemyRush(rushModeCount);
    }
    for(var i = 0;i < enemies.length;i++){
    enemies[i].update(pichu);
    }
    for(var i = 0;i < thunderBolts.length;i++){
    for(var j = 0;j < 5;j++){
        if(thunderBolts[i]){
            thunderBolts[i].update();
        }
    }
    }
    var levelTag = document.getElementById("pichu_level");
    if(levelTag.getAttribute("status") === "level"){
        document.getElementById("pichu_level").innerText = pichu.level;
    }
    var chargebar = document.getElementById("charge_bar");
    chargebar.max = pichu.charge_Max();
    chargebar.value = pichu.cooldown;
    var healthbar = document.getElementById("hp_bar");
    healthbar.max = pichu.max_Health();
    healthbar.value = pichu.health;
    var expbar = document.getElementById("exp_bar");
    expbar.max = pichu.levelUpExp();
    expbar.value = pichu.exp;
    animateID = requestAnimationFrame(animate);
}

function rushMode() {
    pichu.health = 10;
    pichu.level = 0;
    pichu.exp = 0;
    $("#player-pic").attr("src", pichu.picture);
    var testSign = new Sign(300, 300, "Directions: attack and evade the enemies coming for you! You can click the picture at the bottom-left to change it. You obtain more options by leveling up! Once you close this box, the game will start! Good luck!", function() {
        collidables.splice(collidables.indexOf(testSign),1);
        $("#arrowDirections").text("");
        rushModeCount++;
        }
    );
    collidables.push(testSign);
    animateID = requestAnimationFrame(animate);
}

if(mode === "rush"){
    rushMode();
}

function gameOver(){
    startMeBaby = false;
    picMenu = true;
    paused = true;
    $("#map").css("background-color", "transparent");
    canvas.style.position = "fixed";
    canvas.style.zIndex = -1;
    optionize("G A M E  O V E R", "Restart?", "Return to Main Menu");
    $(".options").css("background-color", "black");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var option4 = document.getElementById("option4");
    option1.onclick = function() {
        cancelAnimationFrame(animateID);
        $("#optionRow").remove();
        $("#map").css("background-color", "black");
        canvas.style.position = "absolute";
        canvas.style.zIndex = 1;
        picMenu = false
        paused = false;
        startMeBaby = true;
        start(mode);
    }
    option2.onclick = function() {
        canvas.remove();
        cancelAnimationFrame(animateID);
        $("#map").css("background-color", "black");
        var map = document.getElementById("map");
        map.textContent = "";
        document.getElementById("pichu_level").innerText = "";
        var chargebar = document.getElementById("charge_bar");
        chargebar.value = 0;
        var healthbar = document.getElementById("hp_bar");
        healthbar.value = 0;
        var expbar = document.getElementById("exp_bar");
        expbar.value = 0;
        mainMenunize();
    }


}
}

