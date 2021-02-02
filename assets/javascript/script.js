//ADJUST HITBOXES FOR VOLTORB AND WOOPER, MIGHT AS WELL AS A HITBOX FUNCTION FOR THEM TOO (and snorlax)
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
var attacks;
var enemyAttacks; //yes I made separate variables for enemy attacks and Pichu's attacks, because I coded enemies to respond to any attack in the attack array
var enemies;
var picMenu;
var rushMode;
var spritesheet = new Image();
var snorlaxSpritesheet = new Image(); //made the snorlax sprites too big so had to use a new spritesheet (decided JUST to that snorlax...)
var gengarSpritesheet = new Image();
var dragoniteSpritesheet = new Image();
var miscItemsSpritesheet = new Image();
var shinySpritesheet = new Image();
var floor;
var basicFloor = new Image();
var grassFloor = new Image();
var battleFloor = new Image();
var blackFloor = new Image();
var whiteFloor = new Image();
var alolanRaichuSpritesheet = new Image();
var aquaSpritesheet = new Image();
var candySpritesheet = new Image();
var grapeSpritesheet = new Image();
var grayscaleSpritesheet = new Image();
var pumpkinSpritesheet = new Image();
var shadowSpritesheet = new Image();
var snowSpritesheet = new Image();
var togemaruSpritesheet = new Image();
var shinxSpritesheet = new Image();
var mintheSpritesheet = new Image();
var electrodeSpritesheet = new Image();
var shinyElectrodeSpritesheet = new Image();
var arrayOfPaints = ["alolanRaichu.png", "aqua.png", "candy.png", "grape.png", "grayscale.png", "pumpkin.png", "shadow.png", "snow.png", "togemaru.png", "shinx.png", "minthe.png"];
var entry1, entry2, entry3, entry4;
var canvas;


var spikyEar = {
    x_adjust: 0,
    y_adjust: 0,
    downArrays: [[2559, 29, 215, 215], [2543, 29, 215, 215], [2559, 29, 215, 215], [2549, 27, 215, 215]],
    leftArrays: [[2559, 29, 215, 215], [2531, 24, 215, 215], [2559, 29, 215, 215], [2540, 24, 215, 215]],
    upArrays: [[2338, 239, 215, 215], [2334, 240, 215, 215], [2338, 239, 215, 215], [2340, 239, 215, 215]],
    rightArrays: [[0, 0, 1, 1]],
    myArray: undefined,
    draw: function(){
        switch(pichu.direction){
            case "down":
                this.myArray = this.downArrays;
                this.x_adjust = 32;
                this.y_adjust = -44;
                break;
            case "left":
                this.myArray = this.leftArrays;
                this.x_adjust = 30;
                this.y_adjust = -47;
                break;
            case "up":
                this.myArray = this.upArrays;
                this.x_adjust = -27;
                this.y_adjust = -38;
                break;
            case "right":
                this.myArray = this.rightArrays;
                this.x_adjust = 0;
                this.y_adjust = 0;
                break;
            default:
                this.myArray = this.downArrays;
                this.x_adjust = 32;
                this.y_adjust = -44;
                break;
        }
        if(pichu.damaged && pichu.damageCooldown%2 === 0){
            this.myArray = this.rightArrays;
        }
        if(!pichu.live){
            this.myArray = this.downArrays;
            this.x_adjust = 32;
            this.y_adjust = -44;
        }
        var i = pichu.motion ? pichu.i : pichu.idle_i;
        if(i >= this.myArray.length || !pichu.motion || pichu.attacking){
            i = 0;
        }
        steps = this.myArray;
        c.drawImage(spritesheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], pichu.x + this.x_adjust, pichu.y + this.y_adjust, pichu.width, pichu.height);
    }
}
var map = $("#map");

function optionizeArrayVer(title, array){
    var optionsTitle;
    var fontSize;
    if(array.length <= 5){
        fontSize = 2;
    } else {
        fontSize = 1.5
    }
    if(!document.querySelector("#optionRow") || !document.querySelector(`#option${array.length}`)){
        $("#optionRow").remove();
        var optionRow = $("<div id=\"optionRow\" class=\"row\"></div>");
        map.append(optionRow);
        var optionText = $("<div id=\"optionText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
        $("#optionRow").append(optionText);
        for(var i = 0;i < array.length;i++){
            var newSpace = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
            $("#optionRow").append(newSpace);
            var newOption = $(`<div id=\"option${i+1}\" class=\"col-md-4\" style=\"font-size: ${fontSize}em; color:white\"></div>`);
            $("#optionRow").append(newOption);
            var newSpace2 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
            $("#optionRow").append(newSpace2);
        }
    } else {
        for(var i = 0;i < array.length;i++){
            var opt = document.querySelector(`#option${i+1}`);
            opt.innerText = opt.onclick = "";
        }
    }

    optionsTitle = document.querySelector("#optionText");
    optionsTitle.innerText = title;
    optionsTitle.onclick = "";

    for(var i = 0;i < array.length;i++){
        if(array[i] && array[i].trim() != ""){
            var option = document.querySelector(`#option${i+1}`);
            option.innerText = array[i];
            option.className = "col-md-4 options";
            option.onclick = "";
        }
    }

    $(".options").css("background-color", "black");
}

function optionize(title, option1, option2, option3, option4, option5, option6){
    var optionsTitle, optionOne, optionTwo, optionThree, optionFour, optionFive, optionSix;
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

        var newSpace9 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace9);
        var newOption5 = $("<div id=\"option5\" class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newOption5);
        var newSpace10 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace10);

        var newSpace11 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace11);
        var newOption6 = $("<div id=\"option6\" class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newOption6);
        var newSpace12 = $("<div class=\"col-md-4\" style=\"font-size: 2em; color:white\"></div>");
        $("#optionRow").append(newSpace12);

    } else {
        var opt1, opt2, opt3, opt4, opt5, opt6;
        opt1 = document.querySelector("#option1");
        opt2 = document.querySelector("#option2");
        opt3 = document.querySelector("#option3");
        opt4 = document.querySelector("#option4");
        opt5 = document.querySelector("#option5");
        opt6 = document.querySelector("#option6");

        //clear out text and any associted events from the options
        if(opt1){
            opt1.innerText = opt1.onclick = "";
        }
        if(opt2){
            opt2.innerText = opt2.onclick = "";
        }
        if(opt3){
            opt3.innerText = opt3.onclick = "";
        }
        if(opt4){
            opt4.innerText = opt4.onclick = "";
        }
        if(opt5){
            opt5.innerText = opt5.onclick = "";
        }
        if(opt6){
            opt6.innerText = opt6.onclick = "";
        }
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
        if(optionThree){
            optionThree.className = "col-md-4";
        }
    }

    if(option4 && option4.trim() != ""){
        optionFour = document.querySelector("#option4");
        optionFour.innerText = option4;
        optionFour.className = "col-md-4 options";
    } else {
        optionFour = document.querySelector("#option4");
        if(optionFour){
            optionFour.className = "col-md-4";
        }
    }

    if(option5 && option5.trim() != ""){
        optionFive = document.querySelector("#option5");
        optionFive.innerText = option5;
        optionFive.className = "col-md-4 options";
    } else {
        optionFive = document.querySelector("#option5");
        if(optionFive){
            optionFive.className = "col-md-4";
        }
    }

    if(option6 && option6.trim() != ""){
        optionSix = document.querySelector("#option6");
        optionSix.innerText = option6;
        optionSix.className = "col-md-4 options";
    } else {
        optionSix = document.querySelector("#option6");
        if(optionSix){
            optionSix.className = "col-md-4";
        }
    }

    //clear out any events assigned to these options for now
    optionOne.onclick = optionTwo.onclick =  "";
    if(optionThree){
        optionThree.onclick = "";
    }
    if(optionFour){
        optionFour.onclick = "";
    }
    if(optionFive){
        optionFive.onclick = "";
    }
    if(optionSix){
        optionSix.onclick = "";
    }
    $(".options").css("background-color", "black");
}

function modifyPichu() {
    $("#optionRow").remove();
    var optionsArray = [];
    optionsArray.push("Change Color");
    var spikyEars = pichuLoad.hasSpikyEar;
    if(spikyEars){
        var spikyEarText = "Spiky Ear: ";
        if(pichuLoad.usingSpikyEar){
            spikyEarText += "ON";
        } else {
            spikyEarText += "OFF";
        }
        optionsArray.push(spikyEarText);
    }
    optionsArray.push("Back");
    optionizeArrayVer("Pichu Customization Area: Pick a look that best suits you!", optionsArray);
    if(spikyEars){
        var spikyEarDiv = $(".col-md-4")[5];
        var spikyEarPic = document.createElement("img");
        spikyEarPic.src = "assets/images/displays/spikyEar.png";
        spikyEarPic.alt = "picture of spiky-eared Pichu";
        spikyEarPic.height = "114";
        spikyEarPic.width = "100";
        spikyEarDiv.appendChild(spikyEarPic);
    }
    var paintedDiv = $(".col-md-4")[2];
    var paintedPic = document.createElement("img");
    paintedPic.src = "assets/images/displays/painty.png";
    paintedPic.alt = "picture of spiky-eared Pichu";
    paintedPic.height = "123";
    paintedPic.width = "118";
    paintedDiv.appendChild(paintedPic);

    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    if(spikyEars){
        option3.onclick = mainMenunize;
        option1.onclick = changePaint;
        option2.onclick = function(){
            if(pichuLoad.usingSpikyEar){
                pichuLoad.usingSpikyEar = false;
                localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
                modifyPichu();
            } else {
                pichuLoad.usingSpikyEar = true;
                localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
                modifyPichu();
            }
        }
    } else {
        option1.onclick = changePaint;
        option2.onclick = mainMenunize;
    }
}

function changePaint(){
    $("#optionRow").remove();
    $("#backToChangePaint").remove();
    var optionRow = $("<div id=\"optionRow\" class=\"row\"></div>");
    map.append(optionRow);
    var optionText = $("<div id=\"optionText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
    $("#optionRow").append(optionText);
    var optionsTitle = document.querySelector("#optionText");
    optionsTitle.innerText = "Pick the option that shows your true colors!";
    optionsTitle.onclick = "";
    var defaultDiv = $("<div class=\"col-md-2 options spritesheet\" style=\"font-size: 2em; color:white\"></div>");
    var defaultPic = $("<img class='changePaint' value=\"assets/images/spritesheet.png\" src='assets/images/displays/default.png' style='width: 100%; height: auto'>");
    defaultDiv.append(defaultPic);
    $("#optionRow").append(defaultDiv);
    //var paintArrays = ["alolanRaichu.png", "aqua.png", "candy.png", "grape.png", "grayscale.png", "pumpkin.png", "shadow.png", "snow.png", "togemaru.png"];
    var paintArrays = pichuLoad.paintjobs;
    for(var i = 0;i < paintArrays.length;i++){
        var newDiv = $(`<div class=\"col-md-2 options ${paintArrays[i].replace(".png","")}\" style=\"font-size: 2em; color:white\"></div>`);
        var newPic = $(`<img class='changePaint' value=${"assets/images/paintjobs/" + paintArrays[i]} src='assets/images/displays/${paintArrays[i]}' style='width: 100%; height: auto'>`);
        newDiv.append(newPic);
        $("#optionRow").append(newDiv);
    }
    var chosenDiv = document.querySelector(`.${pichuLoad.pichuSheet}`);
    chosenDiv.style.borderColor = "red";
    chosenDiv.style.borderWidth = "0.2em";
    var paintDivs = document.querySelectorAll(".changePaint");
    for(var i = 0;i < paintDivs.length;i++){
        var pd = paintDivs[i];
        if(pd){
            pd.onclick = function(){
                var self = this;
                pichuLoad.pichuSheet = self.getAttribute("value").replace("assets/images/","").replace("paintjobs/", "").replace(".png","");
                localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
                changePaint();
            }
        }
    }
    var backToChangePaintDiv = $("<div class=\"row\" id=\"backToChangePaint\"></div>");
    map.append(backToChangePaintDiv);
    var backDiv = $("<div class=\"col-md-3 options\" style=\"font-size: 2em; color:white; background-color:black\">Back</div>");
    backDiv.on("click", function(){
        $("#optionRow").remove();
        $("#backToChangePaint").remove();
        modifyPichu();
    })
    $("#backToChangePaint").append(backDiv);
}

function sheetSelector(sheetname){
    var sheet;
    switch(sheetname){
        case "spritesheet":
            sheet = spritesheet;
            break;
        case "alolanRaichu":
            sheet = alolanRaichuSpritesheet;
            break;
        case "aqua":
            sheet = aquaSpritesheet;
            break;
        case "candy":
            sheet = candySpritesheet;
            break;
        case "grape":
            sheet = grapeSpritesheet;
            break;
        case "grayscale":
            sheet = grayscaleSpritesheet;
            break;
        case "pumpkin":
            sheet = pumpkinSpritesheet;
            break;
        case "shadow":
            sheet = shadowSpritesheet;
            break;
        case "snow":
            sheet = snowSpritesheet;
            break;
        case "togemaru":
            sheet = togemaruSpritesheet;
            break;
        case "shinx":
            sheet = shinxSpritesheet;
            break;
        case "minthe":
            sheet = mintheSpritesheet;
            break;
        default:
            sheet = spritesheet;
            break;
    }
    return sheet;
}

function pichuSheet(){
    return sheetSelector(pichuLoad.pichuSheet);
}

function mainMenunize() {
    if(pichuLoad.pichuSheet === undefined){
        console.log("source not found")
        console.log(pichuLoad);
        pichuLoad.pichuSheet = "spritesheet";
        localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
    }
    if(typeof pichuLoad.pichuSheet != "string"){
        console.log("string not found");
        pichuLoad.pichuSheet = "spritesheet";
        localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
    }
    if(!pichuLoad.paintjobs || pichuLoad.paintjobs === undefined){
        pichuLoad.paintjobs = [];
        localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
    }
    $("#player-pic").attr("src", pichuLoad.picture);
    map.css({"background-image":"url('assets/images/picMenuBG.png'", "background-repeat": "repeat"});
    //optionize("Pichu's Adventure: Main Menu", "Story Mode (still in construction!)", "Rush Mode", "How to Play", "Sprite Testing");
    var mainMenuArray = ["Story Mode (still in construction)", "Rush Mode", "How to Play", "Sprite Testing"];
    var loadChangeOption = pichuLoad.hasSpikyEar || pichuLoad.paintjobs.length > 0;
    if(loadChangeOption){
        mainMenuArray.push("Change Avatar");
    }
    optionizeArrayVer("Pichu's Adventure: Main Menu", mainMenuArray);
    $(".options").css("background-color", "black");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var option4 = document.getElementById("option4");
    var option5 = document.getElementById("option5");
    if(option5){
        option5.onclick = modifyPichu;
    }

    option2.onclick = rushModenize;
    option3.onclick = function() {
        howToPlay(mainMenunize);
    }
    option4.onclick = spriteTesternize;
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
        startRush();
    }
    option1.oncontextmenu = function(event) {
        event.preventDefault();
        startMeBaby = true;
        var newCanvas = document.createElement("canvas");
        var map = document.getElementById("map");
        map.textContent = "";
        map.append(newCanvas);
        startRush(true);
    }
    option2.onclick = mainMenunize;
}

function spriteTesternize(){
    optionize("Are you sure you wish to use Sprite Testing? (NOTE: This mode is mainly for the creator to test animations and is not intended for regular play.)", "Yes", "No");
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
        spriteTest();
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
    var directionsArray = ["movement", "attack", "pause", "z-attack"];
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
            case "z-attack":
                buttonPic.attr("src", "assets/images/zKey.png");
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
            case "z-attack":
                displayPic.attr("src", "assets/images/attackHowTo.png");
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
                directionsDiv.text("Use the Spacebar to fire an attack at enemies!");
                break;
            case "pause":
                directionsDiv.text("Use the Enter key to pause the game!");
                break;
            case "z-attack":
                directionsDiv.text("Use the Z key to fire an attack (that is mapped to the Z key) at enemies!");
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
function rollingText(id, text, finishingFunction, clickToEnd){
    var newInterval;
    var spot = $("#" + id);
    console.log(spot.text());
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
            if(!clickToEnd){
                spot.off("click", tempSkip);
                skip(id, text, newInterval, finishingFunction);
            }
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
    }, 50);
}
map.css({"background-color":"black", "color":"white"});
/*var welcomeRow = $("<div id=\"welcomeRow\" class=\"row\"></div>");
map.append(welcomeRow);
var welcomeText = $("<div id=\"welcomeText\" class=\"col-md-12\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
$("#welcomeRow").append(welcomeText);*/
// function loadSpritesheets(){
//     spritesheet.src = "assets/images/spritesheet.png";
//     spritesheet.addEventListener("load", function() {
//         loadShinies();
//     })
// }
// function loadShinies() {
//     shinySpritesheet.src = "assets/images/special_spritesheet.png";
//     shinySpritesheet.addEventListener("load", function() {
//         miscItemsSpritesheet.src = "assets/images/miscItems.png";
//         miscItemsSpritesheet.addEventListener("load", function() {
//             loadFloors();
//         })
//     })
// }
// function loadFloors(){
//     $("#loadingText").html("<h1>Loading floors...</h1>");
//     basicFloor = new Image();
//     basicFloor.src = "assets/images/floor.png";
//     basicFloor.addEventListener("load", function() {
//         grassFloor = new Image();
//         grassFloor.src = "assets/images/floor2.png";
//         grassFloor.addEventListener("load", function() {
//             battleFloor = new Image();
//             battleFloor.src = "assets/images/floor3.png";
//             battleFloor.addEventListener("load", function() {
//                 loadBosses();
//             })
//         })
//     })
// }
// function loadBosses(){
//     $("#loadingText").html("<h1>Loading bosses...</h1>");
//     snorlaxSpritesheet.src = "assets/images/snorlaxSpritesheet.png";
//     snorlaxSpritesheet.addEventListener("load", function() {
//         gengarSpritesheet.src = "assets/images/gengarSpritesheet.png";
//         gengarSpritesheet.addEventListener("load", function() {
//             dragoniteSpritesheet.src = "assets/images/dragoniteSpritesheet.png";
//             dragoniteSpritesheet.addEventListener("load", function() {
//                 $("#loadingText").html("<h1>Done!</h1>");
//                 $("#loadingText").remove();
//                 mainMenunize();
//             })
//         })
//     })
// }
var arraySheets = [spritesheet, shinySpritesheet, miscItemsSpritesheet, snorlaxSpritesheet, gengarSpritesheet, dragoniteSpritesheet, electrodeSpritesheet, shinyElectrodeSpritesheet, basicFloor, grassFloor, battleFloor, blackFloor, whiteFloor, alolanRaichuSpritesheet, aquaSpritesheet, candySpritesheet, grapeSpritesheet, grayscaleSpritesheet, pumpkinSpritesheet, shadowSpritesheet, snowSpritesheet, togemaruSpritesheet, shinxSpritesheet, mintheSpritesheet];
var arraySources = ["assets/images/spritesheet.png", "assets/images/special_spritesheet.png", "assets/images/miscItems.png", "assets/images/snorlaxSpritesheet.png", "assets/images/gengarSpritesheet.png", "assets/images/dragoniteSpritesheet.png", "assets/images/electrodeSpritesheet.png", "assets/images/shiny_electrode_spritesheet.png", "assets/images/floor.png", "assets/images/floor2.png", "assets/images/floor3.png", "assets/images/floor4.png", "assets/images/floor5.png","assets/images/paintjobs/alolanRaichu.png", "assets/images/paintjobs/aqua.png", "assets/images/paintjobs/candy.png", "assets/images/paintjobs/grape.png", "assets/images/paintjobs/grayscale.png", "assets/images/paintjobs/pumpkin.png", "assets/images/paintjobs/shadow.png", "assets/images/paintjobs/snow.png", "assets/images/paintjobs/togemaru.png", "assets/images/paintjobs/shinx.png", "assets/images/paintjobs/minthe.png"];
function loadSprites() {
    var loadingText = $("<div id='loadingText'><h1>Loading spritesheets...</h1></div>");
    map.append(loadingText);
    // loadSpritesheets();
    loadImages(arraySheets, arraySources, function(){
        $("#loadingText").html("<h1>Done!</h1>");
        $("#loadingText").remove();
        mainMenunize();
    });
}
function loadImages(names, files, onAllLoaded){
    var i, numLoading = names.length;
    const onload = () => --numLoading === 0 && onAllLoaded(); //if numLoading (minus 1) is 0, it performs the onAllLoaded function
    for(i = 0;i < names.length;i++){
        if(names[i] === undefined){
            names[i] = new Image();
        }
        names[i].src = files[i];
        console.log(names[i]);
        names[i].onload = onload;
    }
}
var mobileUsage = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log(mobileUsage);
if(!mobileUsage){
    if(JSON.parse(localStorage.getItem("pichuSaveFile")) != null){
        pichuLoad = JSON.parse(localStorage.getItem("pichuSaveFile"));
        console.log(pichuLoad);
    } else {
        pichuLoad = {
            x: 100,
            y: 500,
            level: 0,
            exp: 0,
            picture: "assets/images/startingAvatar.png",
            hasSpikyEar: false,
            usingSpikyEar: false,
            paintjobs: [],
            pichuSheet: undefined
        }
    }
    loadSprites();
} else {
    var welcomeRow = $("<div id=\"welcomeRow\" class=\"row\"></div>");
    map.append(welcomeRow);
    var welcomeText = $("<div id=\"welcomeText\" class=\"col-md-12\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
    $("#welcomeRow").append(welcomeText);
    rollingText("welcomeText", "Sorry, this game does not work on mobile browsers!", emptyFn);
}


/**************************************** MISCELLANEOUS FUNCTIONS **************************************************************/
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

function frontOfEnemy(enemy){
    var result = {
        x: enemy.x + enemy.width/2,
        y: enemy.y + enemy.height/2
    }
    switch(enemy.direction){
        case "up":
            result.y -= enemy.height/2;
            break;
        case "down":
            result.y += enemy.height/2;
            break;
        case "left":
            result.x -= enemy.width/2;
            break;
        case "right":
            result.x += enemy.width/2;
            break;
    }
    return result;
}


/**************************************** ITEM FUNCTIONS **************************************************************/
function oranBerry(x, y, size){
    this.x = x;
    this.y = y;
    this.edible = true; //mainly for Snorlax
    this.intangible = true; //so enemy pokemon can just walk over it
    this.drawn = false;
    this.height = 225;
    this.width = 254;
    this.size = function() {
        var testSize = parseInt(size);
        if(testSize < 3 || !size){
            return 3;
        } else {
            return testSize;
        }
    };
    this.testWidth = function() {
        return parseFloat(this.width)/parseFloat(this.size());
    }
    this.testHeight = function() {
        return parseFloat(this.height)/parseFloat(this.size());
    }
    this.test = {
        x: this.x,
        y: this.y,
        width: this.testWidth(),
        height: this.testHeight()
    }
    //144, 100, 268, 268, actual size: 148, 124, 254, 225
    this.draw = function() {
        var s = this.size();
        c.drawImage(miscItemsSpritesheet, 148, 124, this.width, this.height, this.x, this.y, this.width/s, this.height/s);
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
        if(objIntersectBoth(this, pichu) && pichuTest.full_y < this.y + this.testHeight()){
            this.drawn = true;
        } else {
            this.drawn = false;
        }
        if(!this.drawn){
            this.draw();
        }
    }
    this.approach = function() {
        var amountGain = 0;
        switch(this.size()){
            case 7:
                amountGain = pichu.max_Health()/10;
                break;
            case 6:
                amountGain = pichu.max_Health()/5;
                break;
            case 5:
                amountGain = pichu.max_Health()/3;
                break;
            case 4:
                amountGain = pichu.max_Health()/2;
                break;
            case 3:
                amountGain = pichu.max_Health();
                break;
            default:
                break;
        }
        pichu.gainHealth(amountGain);
        collidables.splice(collidables.indexOf(this), 1);
        return;
    }
}

function leppaBerry(x, y, size){
    this.x = x;
    this.y = y;
    this.edible = true; //mainly for Snorlax
    this.intangible = true; //so enemy pokemon can just walk over it
    this.drawn = false;
    this.height = 320;
    this.width = 220;
    this.size = function() {
        var testSize = parseInt(size);
        if(testSize < 3 || !size){
            return 3;
        } else {
            return testSize;
        }
    };
    this.testWidth = function() {
        return parseFloat(this.width)/parseFloat(this.size());
    }
    this.testHeight = function() {
        return parseFloat(this.height)/parseFloat(this.size());
    }
    this.test = {
        x: this.x,
        y: this.y,
        width: this.testWidth(),
        height: this.testHeight()
    }
    // actual size: 586, 60, 220, 320
    this.draw = function() {
        var s = this.size();
        c.drawImage(miscItemsSpritesheet, 586, 60, this.width, this.height, this.x, this.y, this.width/s, this.height/s);
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
        if(objIntersectBoth(this, pichu) && pichuTest.full_y < this.y + this.testHeight()){
            this.drawn = true;
        } else {
            this.drawn = false;
        }
        if(!this.drawn){
            this.draw();
        }
    }
    this.approach = function() {
        var amountGain = 0;
        switch(this.size()){
            case 7:
                amountGain = pichu.charge_Max()/10;
                break;
            case 6:
                amountGain = pichu.charge_Max()/7;
                break;
            case 5:
                amountGain = pichu.charge_Max()/5;
                break;
            case 4:
                amountGain = pichu.charge_Max()/2;
                break;
            case 3:
                amountGain = pichu.charge_Max();
                break;
            default:
                break;
        }
        pichu.gainCharge(amountGain);
        collidables.splice(collidables.indexOf(this), 1);
        return;
    }
}

function berryPlace(berry){
    var varianceFactor = 5;
    var canWidth = parseFloat(canvas.width);
    var canHeight = parseFloat(canvas.height);
    if(berry === "oran"){
        var difference = pichu.max_Health() - pichu.health;
        if(difference > (pichu.max_Health() * 0.5)){
            varianceFactor--;
        }
        if(difference > (pichu.max_Health() * 0.75)){
            varianceFactor--;
        }
        if(difference > (pichu.max_Health() * 0.90)){
            varianceFactor--;
        }
        var randomX = Math.min((canWidth - 100), Math.max(Math.floor(Math.random()*canWidth), 100));
        var randomY = Math.min((canHeight - 100), Math.max(Math.floor(Math.random()*canHeight), 100));
        var newBerry = new oranBerry(randomX, randomY, (3 + Math.floor(Math.random()*varianceFactor)));
        collidables.push(newBerry);
    }
    if(berry === "leppa"){
        var difference = pichu.charge_Max() - pichu.charge;
        if(difference > (pichu.charge_Max() * 0.5)){
            varianceFactor--;
        }
        if(difference > (pichu.charge_Max() * 0.75)){
            varianceFactor--;
        }
        if(difference > (pichu.charge_Max() * 0.90)){
            varianceFactor--;
        }
        var randomX = Math.min((canWidth - 100), Math.max(Math.floor(Math.random()*canWidth), 100));
        var randomY = Math.min((canHeight - 100), Math.max(Math.floor(Math.random()*canHeight), 100));
        var newBerry = new leppaBerry(randomX, randomY, (3 + Math.floor(Math.random()*varianceFactor)));
        collidables.push(newBerry);
    }
}

function Tm(x, y, move, additionalFunction, special){
    this.myArray = [[1396, 1236, 292, 292], [1714, 1251, 292, 292], [2016, 1252, 292, 292], [2306, 1259, 292, 292], [2661, 1265, 292, 292], [2306, 1259, 292, 292], [2016, 1252, 292, 292], [1714, 1251, 292, 292]];
    this.i = 0;
    this.iDelay = 0;
    this.x = x;
    this.y = y;
    this.special = special;
    this.drawn = false;
    this.desiredDelay = 10;
    this.height = 100;
    this.width = 100;
    this.move = move;
    this.test = {
        x: this.x + this.width/2 - 30,
        y: this.y + this.height/2 - 30,
        width: 60,
        height: 60
    }
    this.draw = function() {
        i = this.i;
        steps = this.myArray;
        var sheet = this.special ? shinySpritesheet : spritesheet;
        c.drawImage(sheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
        this.drawn = false;
    }
    this.update = function() {
        this.iDelay++;
        if(this.iDelay > this.desiredDelay){
            this.i++;
            if(this.i >= this.myArray.length){
                this.i = 0;
            }
            this.iDelay = 0;
        }
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
        
        if(!this.drawn){
            this.draw();
        }
    }
    this.approach = function() {
        function actualApproach(){
            $("#optionRow").remove();
            picMenu = true;
            pichu.stopMoving();
            $("#map").css("background-color", "transparent");
            canvas.style.position = "fixed";
            canvas.style.zIndex = -1;
            optionizeArrayVer(`Do you wish to learn ${move}?`, ["Yes", "No"]);
            var option1 = document.querySelector("#option1");
            var option2 = document.querySelector("#option2");
            option1.onclick = function() {
                $("#option1").remove();
                $("#option2").remove();
                rollingText("optionText", `Congrats! You learned ${move}! (Click to continue)`, function(){
                    pichu.attacks.push(move);
                    collidables.splice(collidables.indexOf(this), 1);
                    $("#optionRow").remove();
                    $("#map").css("background-color", "black");
                    canvas.style.position = "absolute";
                    canvas.style.zIndex = 1;
                    picMenu = false;
                    if(additionalFunction){
                        additionalFunction();
                    }
                }, true)
            }

            option2.onclick = function() {
                optionizeArrayVer(`Are you sure you don't want to learn ${move}?`, ["Yes", "No"])
                option1.onclick = function(){
                    $("#option1").remove();
                    $("#option2").remove();
                    rollingText("optionText", `You did not learn ${move}! (Click to continue)`, function(){
                        $("#optionRow").remove();
                        collidables.splice(collidables.indexOf(this), 1);
                        $("#optionRow").remove();
                        $("#map").css("background-color", "black");
                        canvas.style.position = "absolute";
                        canvas.style.zIndex = 1;
                        picMenu = false;
                        if(additionalFunction){
                            additionalFunction();
                        }
                    }, true)
                }
                option2.onclick = actualApproach;
            }
       }
       actualApproach();
    }
}

function Pokeball(x, y, isVoltorb, openingFn){
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100; //coordinates: 952, 132, 262, 262
    this.opened = false;
    this.drawn = false;
    this.test = {
        x: isVoltorb ? this.x - 100 : this.x,
        y: isVoltorb ? this.y - 100 : this.y,
        width: isVoltorb ? this.width * 3 : this.width,
        height: isVoltorb ? this.height * 3 : this.height
    }
    this.open = function(){
        if(isVoltorb){
            var newVoltorb = new Voltorb(this.x, this.y, Math.floor(Math.random() * 2));
            enemies.push(newVoltorb);
        }
        collidables.splice(collidables.indexOf(this), 1);
        if(openingFn){
            openingFn();
        }
    }
    this.draw = function(){
        c.drawImage(miscItemsSpritesheet, 952, 132, 262, 262, this.x, this.y, this.width, this.height);
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
        for(var i = 0;i < attacks.length;i++){
            var areaOfAttack = {
                x: attacks[i].x,
                y: attacks[i].y,
                width: attacks[i].width,
                height: attacks[i].height
            }
            console.log(objIntersectBoth(areaOfAttack, this));
            if(objIntersectBoth(areaOfAttack, this) && !this.opened && attacks[i].status!="stop" && attacks[i].damage() > 0){
                console.log("ding dong");
                attacks[i].status = "stop";
                attacks.splice(i, 1);
                this.opened = true;
                this.open();
            }
        }
        if(!this.opened && !this.drawn){
            this.draw();
        }
    }
    this.approach = function() {
        if(isVoltorb){
            this.open();
        } else {
            return;
        }
    }
}

function SpikyEarOrb(x, y, additionalFunction){
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.intangible = true;
    this.drawn = false;
    this.test = {
        x: this.x + this.width/2 - 30,
        y: this.y + this.height/2 - 30,
        width: 60,
        height: 60
    }
    this.draw = function(){
        c.drawImage(spritesheet, 2370, 760, 150, 150, this.x, this.y, this.width, this.height);
        this.drawn = false;
    }
    this.update = function(){
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
        if(!this.drawn){
            this.draw();
        }
    }
    this.approach = function(){
        if(!pichuLoad.hasSpikyEar){
            pichuLoad.hasSpikyEar = true;
            localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
        }
        collidables.splice(collidables.indexOf(this), 1);
        if(additionalFunction){
            additionalFunction();
        }
    }
}

function PaintBucket(x, y, paint, additionalFunction){
    this.x = x;
    this.y = y;
    this.width = 75; //75 * 4/3
    this.height = 90; //90 * 4/3
    this.paint = paint;
    this.sheet = sheetSelector(paint.replace(".png", ""));
    this.intangible = true;
    this.drawn = false;
    this.test = {
        x: this.x + this.width/2 - 20,
        y: this.y + this.height/2 - 20,
        width: 40,
        height: 40
    }
    this.draw = function(){
        c.drawImage(this.sheet, 2425, 798, 75, 90, this.x, this.y, this.width, this.height);
        this.drawn = false;
    }
    this.update = function(){
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
        if(!this.drawn){
            this.draw();
        }
    }
    this.approach = function(){
        if(!pichuLoad.paintjobs.includes(this.paint)){
            pichuLoad.paintjobs.push(this.paint);
            localStorage.setItem("pichuSaveFile", JSON.stringify(pichuLoad));
        }
        collidables.splice(collidables.indexOf(this), 1);
        if(additionalFunction){
            additionalFunction();
        }
    }
}

function Blank(x, y){
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 91;
    this.intangible = true;
    this.drawn = false;
    this.test = {
        x: this.x,
        y: this.y,
        width: 1,
        height: 1
    }
    this.draw = function(){
        c.drawImage(spritesheet, 0, 0, 1, 1, this.x, this.y, this.width, this.height);
        this.drawn = false;
    }
    this.update = function(){
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
        if(!this.drawn){
            this.draw();
        }
    }
    this.approach = function(){
        return;
    }
}

/**************************************** ATTACK FUNCTIONS **************************************************************/
function Thunderbolt(x, y, direction, radius, enemyAttack){
    this.name = "Thunderbolt";
    this.type = "Electric";
    this.x = x;
    this.y = y;
    this.damage = function() {
        if(enemyAttack){
            return 6 + 0.5*(pichu.level - 5);
        } else {
            return 9 + 0.5*pichu.level;
        }
    }
    this.width = 1;
    this.height = 1;
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
    c.lineWidth = 1;
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
    var areaOfAttack = {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
    }
    if(this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
        if(enemyAttack){
            this.status = "stop";
            enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
        } else {
            this.status = "stop";
            attacks.splice(attacks.indexOf(this), 1);
        }
    } else {
        var newAreaOfAttack = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        if(enemyAttack){
            if(objIntersectBoth(newAreaOfAttack, pichu.hitbox()) && this.status!="stop" && !pichu.damaged){
                this.status = "stop";
                enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
                pichu.damage(this.damage());
            }
        } else {
            for(var i = 0;i < enemies.length;i++){
                var enemyHitbox;
                if(enemies[i].big){
                    enemyHitbox = enemies[i].hitbox();
                } else {
                    enemyHitbox = enemies[i];
                }
                if(objIntersectBoth(newAreaOfAttack, enemyHitbox) && enemies[i].status === "active" && this.status != "stop"){
                    this.status = "stop";
                    attacks.splice(attacks.indexOf(this), 1);
                    enemies[i].damage(this.damage());
                }
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

    function Swift(x,y,spikes,outerRadius,innerRadius){
        this.name = "Swift";
        this.type = "Normal";
        this.x = x;
        this.y = y;
        this.damage = function() {
            return 6 + 0.25*pichu.level;
        }
        this.ready = false;
        this.width = outerRadius*2;
        this.height = outerRadius*2;
        this.dx = 0;
        this.dy = 0;
        this.spikes = spikes;
        this.status = "go";
        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.targetEnemyIndex = undefined;
        this.frame = 0;
        this.changeFrame = 22;
        this.changeFrameTarget = 4;
        this.piMultiplier = 3;
        this.draw = function() {
            var rot=Math.PI/2 * this.piMultiplier;
            var xAdj = this.x;
            var yAdj = this.y;
            var step=Math.PI/spikes;
            c.beginPath();
            switch(this.piMultiplier){
                case 1:
                    c.moveTo(this.x, this.y+this.outerRadius);
                    break;
                case 2:
                    c.moveTo(this.x-this.outerRadius, this.y);
                    break;
                case 3:
                    c.moveTo(this.x, this.y-this.outerRadius);
                    break;
                case 4:
                    c.moveTo(this.x+this.outerRadius, this.y);
                    break;
                default:
                    break;
            }
            for(i=0;i<this.spikes;i++){
                xAdj=this.x+Math.cos(rot)*this.outerRadius;
                yAdj=this.y+Math.sin(rot)*this.outerRadius;
                c.lineTo(xAdj,yAdj)
                rot+=step
    
                xAdj=this.x+Math.cos(rot)*this.innerRadius;
                yAdj=this.y+Math.sin(rot)*this.innerRadius;
                c.lineTo(xAdj,yAdj)
                rot+=step
            }
            switch(this.piMultiplier){
                case 1:
                    c.lineTo(this.x, this.y+this.outerRadius);
                    break;
                case 2:
                    c.lineTo(this.x-this.outerRadius, this.y);
                    break;
                case 3:
                    c.lineTo(this.x, this.y-this.outerRadius);
                    break;
                case 4:
                    c.lineTo(this.x+this.outerRadius, this.y);
                    break;
                default:
                    break;
            }
            c.closePath();
            c.lineWidth=5;
            c.strokeStyle='black';
            c.stroke();
            c.fillStyle='yellow';
            c.fill();
        }
        this.chooseEnemy = function() {
            var distanceArray = [];
            var closestIndex = 0;
            var smallestDistance = undefined;
            for(var i = 0;i < enemies.length;i++){
                var distance = Math.sqrt(Math.pow((this.x - enemies[i].x),2) + Math.pow((this.y - enemies[i].y),2));
                distanceArray.push(distance);
                if(distance < smallestDistance || !smallestDistance){
                    smallestDistance = distance;
                    closestIndex = i;
                }
            }
            this.targetEnemyIndex = closestIndex;
        }
        this.updateFrame = function() {
            this.frame++;
            if(this.frame > this.changeFrame){
                this.updatePiMultiplier();
                this.frame = 0;
                if(this.changeFrame > this.changeFrameTarget){
                    this.changeFrame-=2;
                } else {
                    if(!this.targetEnemy){
                        this.chooseEnemy();
                    }
                    this.ready = true;
                }
            }
        }
        this.updatePiMultiplier = function() {
            this.piMultiplier++;
            if(this.piMultiplier > 4){
                this.piMultiplier = 1;
            }
        }
        this.update = function() {
            this.updateFrame();
            var movement = 5;
            var target = enemies[this.targetEnemyIndex];
            if(!target && enemies.length > 0){
                this.targetEnemyIndex = Math.floor(Math.random()*enemies.length);
                target = enemies[this.targetEnemyIndex]; //in the event that the initial target is gone, the Swift will lock onto a new target at random
            }
            var desiredDistance = 5
            if(target && this.changeFrame === this.changeFrameTarget){
                if(!(this.x != (target.x + target.width/2) || this.y != (target.y + target.height/2))){
                    this.dx = 0;
                    this.dy = 0;
                } else {
                    if(this.x != (target.x + target.width/2)){
                        if(this.x > (target.x + target.width/2)){
                            if(Math.abs(this.x - (target.x + target.width/2)) > desiredDistance){
                                this.dx = -1 * movement;
                            } else {
                                this.dx = -1 * Math.abs(this.x - (target.x + target.width/2));
                            }
                        } else {
                            if(Math.abs(this.x - (target.x + target.width/2)) > desiredDistance){
                                this.dx = movement;
                            } else {
                                this.dx = Math.abs(this.x - (target.x + target.width/2));
                            }
                        }
                    } else {
                        this.dx = 0;
                    }
                    if(this.y != (target.y + target.height/2)){
                        if(this.y > (target.y + target.height/2)){
                            if(Math.abs(this.y - (target.y + target.height/2)) > desiredDistance){
                                this.dy = -1 * movement;
                            } else {
                                this.dy = -1 * Math.abs(this.y - (target.y + target.height/2));
                            }
                        } else {
                            if(Math.abs(this.y - (target.y + target.height/2)) > desiredDistance){
                                this.dy = movement;
                            } else {
                                this.dy = Math.abs(this.y - (target.y + target.height/2));
                            }
                        }
                    } else {
                        this.dy = 0;
                    }
                }
            } else {
                if(!this.ready){
                    this.dx = this.dy = 0;
                } else { //this means there is no target when the Swift is ready to strike
                    this.status = "stop";
                }
            }
            this.x += this.dx;
            this.y += this.dy;
            if(this.status === "stop" || this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
                this.status = "stop";
                attacks.splice(attacks.indexOf(this), 1);
            } else {
                var newAreaOfAttack = {
                    x: this.x - this.outerRadius,
                    y: this.y - this.outerRadius,
                    width: this.width,
                    height: this.height
                }
                for(var i = 0;i < enemies.length;i++){
                    var enemyHitbox;
                    if(enemies[i].big){
                        enemyHitbox = enemies[i].hitbox();
                    } else {
                        enemyHitbox = enemies[i];
                    }
                    if(objIntersectBoth(newAreaOfAttack, enemyHitbox) && enemies[i].status === "active" && this.status != "stop"){
                        this.status = "stop";
                        attacks.splice(attacks.indexOf(this), 1);
                        enemies[i].damage(this.damage());
                    }
                }
                this.draw();
            }
        }
      }

    function DoubleTeam(x, y){
    this.name = "Double Team";
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.moodIndex = undefined;
    this.moodArray = ["happy", "sad", "annoyed", "confident"];
    this.arraysArray = [[0, 0, 215, 215], [1681, 0, 215, 215], [1915, 3, 215, 215], [2149, 3, 215, 215]];
    this.damage = function() {
        return 0; //do you expect a fake clone to do damage? this isn't Naruto!
    }
    this.status = "go";
    this.i = 0;
    this.draw = function() {
        if(!this.moodIndex){
            this.moodIndex = Math.floor(Math.random() * 4); //should produce an integer between 0 and 3
        }
        var steps;
        var spikyEarDT = pichu.spikyEared ? [2559, 29, 215, 215] : [0, 0, 1, 1];
        if(this.i < 1){
            steps = this.arraysArray[this.moodIndex];
        } else {
            steps = [0, 0, 1, 1];
            spikyEarDT = [0, 0, 1, 1];
        }
        c.drawImage(pichu.pichuSheet, steps[0], steps[1], steps[2], steps[3], this.x, this.y, this.width, this.height);
        c.drawImage(pichu.pichuSheet, spikyEarDT[0], spikyEarDT[1], spikyEarDT[2], spikyEarDT[3], this.x + 32, this.y - 44, this.width, this.height);
    }
    this.update = function() {
        var dtHitbox = {
            x: this.x,
            y: this.y,
            height: this.height,
            width: this.width
        }
        dtHitbox.x += 23;
        dtHitbox.width = 54;
        dtHitbox.y += 28;
        dtHitbox.height = 67;
        for(var i = 0;i < enemies.length;i++){
            var enemyHitbox;
            if(enemies[i].big){
                enemyHitbox = enemies[i].hitbox();
            } else {
                enemyHitbox = enemies[i];
            }
            if(objIntersectBoth(dtHitbox, enemyHitbox) && enemies[i].status === "active" && this.status != "stop"){
                this.status = "stop";
                attacks.splice(attacks.indexOf(this), 1);
                enemies[i].damage(this.damage());
            }
        }
        for(var i = 0;i < enemyAttacks.length;i++){
            var enemyAttackHitbox;
            if(enemyAttacks[i].name === "Snore"){
                enemyAttackHitbox = {
                    x: enemyAttacks[i].x - enemyAttacks[i].width/2,
                    y: enemyAttacks[i].y - enemyAttacks[i].height,
                    width: enemyAttacks[i].width,
                    height: enemyAttacks[i].height
                }
            } else {
                enemyAttackHitbox = enemyAttacks[i];
            }
            if(objIntersectBoth(dtHitbox, enemyAttackHitbox) && enemyAttacks[i].status != "stop" && this.status != "stop"){
                this.status = "stop";
                attacks.splice(attacks.indexOf(this), 1);
            }
        }
        this.i++;
        if(this.i > 1){
            this.i = 0;
        }
        this.draw();
    }

}

function Thunder(x, y, direction){
    this.name = "Thunder";
    this.x = x;
    this.y = y;
    this.big = true;
    this.increment = 30;
    this.width = 53;
    this.height = 53;
    this.direction = direction;
    this.flip = false;
    this.flipMeter = 0;
    this.changeIndex = 0;
    this.status = "go";
    this.changeOptions = [0, 1, 2, 3, 2, 1, 0, -1, -2, -3, -2, -1];
    this.damage = function(){
        return 20 + 0.5*pichu.level;
    }
    this.draw = function(){
        var left = true;
        var targetX = this.x + this.changeOptions[this.changeIndex];
        var target = {
            x: targetX,
            y: this.y,
        }
        this.changeIndex++;
        if(this.changeIndex >= this.changeOptions.length){
            this.changeIndex = 0;
        }
        c.beginPath();
        c.lineWidth = 30;
        c.moveTo(target.x, target.y);
        if(this.direction === "right" || this.direction === "down"){
            while(target.y > -10){
                if(left){
                    target.x -= this.increment;
                    left = !left;
                    target.y -= 67;
                    c.strokeStyle = "rgb(255, 255, 120)";
                } else {
                    target.x += this.increment;
                    target.y += 1;
                    left = !left;
                }
                c.lineTo(target.x, target.y);
                c.stroke();
            }
        } else {
            while(target.y > -10){
                if(left){
                    target.x -= this.increment;
                    left = !left;
                    target.y += 1;
                    c.strokeStyle = "rgb(255, 255, 120)";
                } else {
                    target.x += this.increment;
                    target.y -= 67;
                    left = !left;
                }
                c.lineTo(target.x, target.y);
                c.stroke();
            }
        }
        c.beginPath();
        var radius = !this.flip ? 53 : 75;
        c.arc(this.x, this.y + 30, radius, Math.PI*2, false);
        c.strokeStyle = "rgb(255, 255, 120)";
        c.stroke();
        c.fillStyle = "rgb(255, 255, 120)";
        c.fill();

        //inner bolt
        c.beginPath();
        c.arc(this.x, this.y + 30, 20, Math.PI*2, false);
        c.strokeStyle = "rgb(255, 255, 0)"; //potential colors: gold, lightgoldenrodyellow, palegoldenrod, lightyellow
        c.stroke();
        c.fillStyle = "rgb(255, 255, 0)";
        c.fill();
    }
    this.update = function(){
        var newAreaOfAttack = {
            x: this.x - this.width,
            y: this.y - this.height + 30,
            width: this.width * 2,
            height: this.height*2
        }
        for(var i = 0;i < enemies.length;i++){
            var enemyHitbox;
            if(enemies[i].big){
                enemyHitbox = enemies[i].hitbox();
            } else {
                enemyHitbox = enemies[i];
            }
            if(objIntersectBoth(newAreaOfAttack, enemyHitbox) && enemies[i].status === "active" && this.status != "stop"){
                enemies[i].damage(this.damage());
            }
        }
        switch(this.direction){
            case "right":
                this.x++;
                if(!this.flip){
                    this.flipMeter++;
                    if(this.flipMeter >= 30){
                        this.flip = true;
                    }
                } else {
                    this.flipMeter -= 10;
                    if(this.flipMeter <= 0){
                        this.flip = false;
                    }
                }
                if(this.x-this.increment >= canvas.width){
                    this.status = "stop";
                    attacks.splice(attacks.indexOf(this), 1);
                } else {
                    this.draw();
                }
                break;
            case "left":
                this.x--;
                if(!this.flip){
                    this.flipMeter++;
                    if(this.flipMeter >= 30){
                        this.flip = true;
                    }
                } else {
                    this.flipMeter -= 10;
                    if(this.flipMeter <= 0){
                        this.flip = false;
                    }
                }
                if(this.x < 0){
                    this.status = "stop";
                    attacks.splice(attacks.indexOf(this), 1);
                } else {
                    this.draw();
                }
                break;
            case "down":
                this.y++;
                if(!this.flip){
                    this.flipMeter++;
                    if(this.flipMeter >= 30){
                        this.flip = true;
                    }
                } else {
                    this.flipMeter -= 10;
                    if(this.flipMeter <= 0){
                        this.flip = false;
                    }
                }
                console.log(this.y, canvas.height);
                if(this.y >= canvas.height){
                    this.status = "stop";
                    attacks.splice(attacks.indexOf(this), 1);
                } else {
                    this.draw();
                }
                break;
            case "up":
                this.y--;
                if(!this.flip){
                    this.flipMeter++;
                    if(this.flipMeter >= 30){
                        this.flip = true;
                    }
                } else {
                    this.flipMeter -= 10;
                    if(this.flipMeter <= 0){
                        this.flip = false;
                    }
                }
                if(this.y + 75 <= 0){
                    this.status = "stop";
                    attacks.splice(attacks.indexOf(this), 1);
                } else {
                    this.draw();
                }
                break;
            default:
                break;
        }
        
    }
}

//this function isn't being used in the program but it was the basis for the Volt Tackle object attached to the Pichu object
function VoltTackle(x, y){
    this.name = "Volt Tackle";
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = 60;
    this.big = true;
    this.width = 120;
    this.height = 120;
    this.status = "go";
    this.hits = 8 + 8 * Math.floor(pichu.level/4);
    this.speed = 10;
    this.targetEnemyIndex = undefined;
    this.targetPhase = 0;
    this.draw = function(){
        c.beginPath();
        //var radius = !this.flip ? 53 : 75;
        c.arc(this.x, this.y, this.radius, Math.PI*2, false);
        c.strokeStyle = "rgb(255, 255, 120)";
        c.stroke();
        c.fillStyle = "rgb(255, 255, 120)";
        c.fill();

        //inner bolt
        c.beginPath();
        c.arc(this.x, this.y, 50, Math.PI*2, false);
        c.strokeStyle = "rgb(255, 255, 0)"; //potential colors: gold, lightgoldenrodyellow, palegoldenrod, lightyellow
        c.stroke();
        c.fillStyle = "rgb(255, 255, 0)";
        c.fill();
    }
    this.chooseEnemy = function(exclusion) {
        console.log("at choosing enemy");
        var distanceArray = [];
        var closestIndex = 0;
        var smallestDistance = undefined;
        for(var i = 0;i < enemies.length;i++){
            var distance = Math.sqrt(Math.pow((this.x - enemies[i].x),2) + Math.pow((this.y - enemies[i].y),2));
            distanceArray.push(distance);
            if((distance < smallestDistance || !smallestDistance) && enemies[i].status === "active"){
                if(i != exclusion || enemies.length === 1){
                    smallestDistance = distance;
                    closestIndex = i;
                }
            }
        }
        this.targetEnemyIndex = closestIndex;
        this.targetPhase = 0;
        if(!smallestDistance){
            this.status = "stop";
        }
    }
    this.update = function(){
        var newAreaOfAttack = {
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.width,
            height: this.height
        }
        for(var i = 0;i < enemies.length;i++){
            var enemyHitbox;
            if(enemies[i].big){
                enemyHitbox = enemies[i].hitbox();
            } else {
                enemyHitbox = enemies[i];
            }
            if(objIntersectBoth(newAreaOfAttack, enemyHitbox) && enemies[i].status === "active" && this.status != "stop"){
                enemies[i].health-=0.1;
                if(enemies[i].health <= 0){
                    if(i === this.targetEnemyIndex){
                        console.log("killed enemy and it was target");
                        this.chooseEnemy(i);
                        this.targetPhase = 0;
                    } else {
                        console.log("killed enemy and it was not target");
                    }
                    enemies[i].damage(1);
                }
            }
        }
        var target = enemies[this.targetEnemyIndex];
        if(!target && enemies.length > 0){
            this.chooseEnemy();
            target = enemies[this.targetEnemyIndex];
            this.targetPhase = 0;
        }
        if(enemies.length === 0){
            this.status = "stop";
        }
        if(target){
            var target_x, target_y;
            // var targetSpots = [
            //     {x: target.x + target.width, y: target.y + target.height},
            //     {x: target.x, y: target.y + target.height/2},
            //     {x: target.x + target.width, y: target.y + target.height/2},
            //     {x: target.x, y: target.y},
            //     {x: target.x + target.width, y: target.y},
            //     {x: target.x, y: target.y + target.height/2},
            //     {x: target.x + target.width, y: target.y + target.height/2},
            //     {x: target.x, y: target.y + target.height},
            //     {x: target.x + target.width, y: target.y + target.height}
            // ]
            var targetSpots = [
                {x: target.x + target.width/2, y: target.y + target.height},
                {x: target.x, y: target.y + target.height/2},
                {x: target.x + target.width/2, y: target.y},
                {x: target.x + target.width, y: target.y + target.height/2},
                {x: target.x + target.width/2, y: target.y + target.height},
                {x: target.x, y: target.y + target.height/2},
                {x: target.x + target.width/2, y: target.y},
                {x: target.x + target.width, y: target.y + target.height/2}
            ]
            target_x = targetSpots[this.targetPhase].x;
            target_y = targetSpots[this.targetPhase].y;
            console.log(this.x, this.y, target_x, target_y);
            if(!(Math.abs(this.x - target_x) >= this.speed || Math.abs(this.y - target_y) >= this.speed)){
                console.log("hit target");
                this.dx = 0; //meaning it reached its target
                this.dy = 0;
                this.targetPhase++;
                if(this.targetPhase >= targetSpots.length){
                    this.chooseEnemy(this.targetEnemyIndex);
                }
                this.hits--;
                if(this.hits <= 0){
                    console.log("stopping"); //count is often around 435 or 483
                    this.status = "stop";
                }
            } else {
                if(this.x != target_x){
                    if(this.x > target_x){
                        if(Math.abs(this.x - target_x) > this.speed){
                            this.dx = -1 * this.speed;
                        } else {
                            this.dx = -1 * Math.abs(this.x - target_x);
                        }
                    } else {
                        if(Math.abs(this.x - target_x) > this.speed){
                            this.dx = this.speed;
                        } else {
                            this.dx =  Math.abs(this.x - target_x);
                        }
                    }
                } else {
                    this.dx = 0;
                }
                if(this.y != target_y){
                    if(this.y > target_y){
                        if(Math.abs(this.y - target_y) > this.speed){
                            this.dy = -1 * this.speed;
                        } else {
                            this.dy = -1 * Math.abs(this.y - target_y);
                        }
                    } else {
                        if(Math.abs(this.y - target_y) > this.speed){
                            this.dy = this.speed;
                        } else {
                            this.dy =  Math.abs(this.y - target_y);
                        }
                    }
                } else {
                    this.dy = 0;
                }
            }
            this.x += this.dx;
            this.y += this.dy;
        }
        if(this.status === "stop"){
            this.status = "stop";
            attacks.splice(attacks.indexOf(this), 1);
        } else {
            this.draw();
        }

    }
}

function Mudshot(x, y, direction, radius){
    this.name = "Mudshot";
    this.type = "Ground";
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.status = "go";
    this.radius = radius;
    this.horizontal = true;
    this.change_i = 0;
    this.change_Delay = 15;
    this.damage = function() {
        if(this.radius <= 30){
            return 5;
        } else {
            return 5 + 1*(Math.max(0, pichu.level - 5));
        }
    }
    this.draw = function() {
        if(this.status != "stop"){
           var first_radius;
           var second_radius;
           var divisor = 1.15;
           if(this.horizontal){
               first_radius = this.radius;
               second_radius = this.radius/divisor;
           } else {
               first_radius = this.radius/divisor;
               second_radius = this.radius;
           }
           c.beginPath();
           c.lineWidth = 1;
           c.ellipse(this.x, this.y, first_radius, second_radius, 0, 0, Math.PI*2);
           c.strokeStyle = "sandybrown";
           c.stroke();
           c.fillStyle = "sandybrown";
           c.fill();
            c.beginPath();
            c.ellipse(this.x, this.y, first_radius/2, second_radius/2, 0, 0, Math.PI*2);
            c.strokeStyle = "sienna";
            c.stroke();
            c.fillStyle = "sienna";
            c.fill();
        }
    }
    this.update = function() {
        var movement = 4;
        switch(this.direction){
            case "up":
                this.y-=movement;
                break;
            case "down":
                this.y+=movement;
                break;
            case "right":
                this.x+=movement;
                break;
            case "left":
                this.x-=movement;
                break;
        }
        if(this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
            this.status = "stop";
            enemyAttacks.splice(enemyAttacks.indexOf(this),1);
        } else {
            var newAreaOfAttack = {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
            if(objIntersectBoth(newAreaOfAttack, pichu.hitbox()) && this.status!="stop" && !pichu.damaged){
                this.status = "stop";
                enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
                pichu.damage(this.damage());
                pichu.slowed_Down = 150;
            }
            this.draw();
            if(!this.horizontal){
                this.change_i++;
                if(this.change_i > this.change_Delay){
                    this.horizontal = true;
                }
            } else {
                this.change_i--;
                if(this.change_i <= 0){
                    this.horizontal = false;
                }
            }
        }
    }
}

function Snore(x, y){
    for(var i = 0;i < 8;i++){
        var direction, newX, newY;
        switch(i){
            case 0:
                direction = "up";
                newX = x;
                newY = y--;
                break;
            case 1:
                direction = "down";
                newX = x;
                newY = y++;
                break;
            case 2:
                direction = "left";
                newX = x--;
                newY = y;
                break;
            case 3:
                direction = "right";
                newX = x++;
                newY = y;
                break;
            case 4:
                direction = "upper-left";
                newX = x--;
                newY = y--;
                break;
            case 5:
                direction = "upper-right";
                newX = x++;
                newY = y--;
                break;
            case 6:
                direction = "lower-left";
                newX = x--;
                newY = y++;
                break;
            case 7:
                direction = "lower-right";
                newX = x++;
                newY = y++;
                break;
            default:
                break;
        }
        var newSnore = new SnoreSingle(newX, newY, direction);
        enemyAttacks.push(newSnore);
    }
}

function SnoreSingle(x, y, direction){
    this.name = "Snore";
    this.type = "Normal";
    this.x = x;
    this.y = y;
    this.frameNumber = 0;
    this.direction = direction;
    this.damage = function() {
        return 10 + 5*(Math.max(0, pichu.level - 5));
    }
    this.width = 85;
    this.height = 49.5;
    this.status = "go";
    this.size_i = 0;
    this.size_Delay = 10;
    this.bigTime = true;
    this.draw = function(){
        if(this.status != "stop"){
            var font;
            if(this.bigTime){
                font = "75px Impact";
            } else {
                font = "70px Impact";
            }
            c.font = font;
            c.textAlign = "center"
            c.fillStyle = "black";
            c.fillText("zzz", this.x, this.y);
            // c.beginPath();
            // c.strokeStyle = "yellow";
            // c.strokeRect(this.x - this.width/2, this.y-this.height, this.width, this.height);
            // c.stroke();
        }
    }
    this.update = function() {
        this.frameNumber++;
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
            case "upper-left":
                this.y--;
                this.x--;
                break;
            case "upper-right":
                this.y--;
                this.x++;
                break;
            case "lower-left":
                this.y++;
                this.x--;
                break;
            case "lower-right":
                this.y++;
                this.x++;
                break;
            default:
                break;
        }
        if(this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
            this.status = "stop";
            enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
        } else {
            var newAreaOfAttack = {
                x: this.x - this.width/2,
                y: this.y - this.height,
                width: this.width,
                height: this.height
            }
            if(objIntersectBoth(newAreaOfAttack, pichu.hitbox()) && this.status != "stop" && !pichu.damaged){
                this.status = "stop";
                enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
                pichu.damage(this.damage());
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
    }
}

function HyperBeam(x, y, direction, user){
    this.name = "Hyper Beam";
    this.type = "Normal";
    this.finishing = false;
    this.big = true;
    this.status = "go";
    this.random_placement_because_I_didnt_want_to_relocate_the_beam = Math.floor(Math.random() * 2);
    this.finishDelay = 0;
    this.radius = 40;
    this.speed = 5;
    this.start = {
        x: x,
        y: y
    }
    this.end = {
        x: x,
        y: y
    }
    this.direction = direction;
    this.damage = function(){
        var secondBeamDamage = 20 + 5*(Math.max(0, pichu.level - 5));
        var firstBeamDamage = 25 + 5*(Math.max(0, pichu.level - 5));
        if(this.finishing){
            firstBeamDamage = secondBeamDamage;
        }
        return [firstBeamDamage, secondBeamDamage];
    }
    this.draw = function() {
        var multiplier = this.finishing ? 1 : 2/1.5;
        //outer beam
        if(!this.finishing){
            c.beginPath();
            c.arc(this.start.x, this.start.y, this.radius, Math.PI*2, false);
            c.strokeStyle = "yellow";
            c.stroke();
            c.fillStyle = "yellow";
            c.fill();
        }

        switch(this.direction){
            case "left":
                c.beginPath();
                c.fillStyle = "yellow";
                c.fillRect(this.end.x, this.end.y-this.radius/1.5, this.start.x - this.end.x, this.radius*2/1.5);
                c.fill();
                break;
            case "right":
                c.beginPath();
                c.fillStyle = "yellow";
                c.fillRect(this.start.x, this.start.y-this.radius/1.5, this.end.x - this.start.x, this.radius*2/1.5);
                c.fill();
                break;
            case "up":
                c.beginPath();
                c.fillStyle = "yellow";
                c.fillRect(this.end.x-this.radius/1.5, this.end.y, this.radius*2/1.5, this.start.y - this.end.y);
                c.fill();
                break;
            case "down":
                c.beginPath();
                c.fillStyle = "yellow";
                c.fillRect(this.start.x-this.radius/1.5, this.start.y, this.radius*2/1.5, this.end.y - this.start.y);
                c.fill();
                break;
            default:
                break;
        }

        c.beginPath();
        c.arc(this.end.x, this.end.y, this.radius*multiplier, Math.PI*2, false);
        c.strokeStyle = "yellow";
        c.stroke();
        c.fillStyle = "yellow";
        c.fill();

        //inner beam

        var smallerRadius = this.radius/1.5;
        if(!this.finishing){
            c.beginPath();
            c.arc(this.start.x, this.start.y, smallerRadius, Math.PI*2, false);
            c.strokeStyle = "orange";
            c.stroke();
            c.fillStyle = "orange";
            c.fill();
        }
        
        switch(this.direction){
            case "left":
                c.beginPath();
                c.fillStyle = "orange";
                c.fillRect(this.end.x, this.end.y-smallerRadius/1.5, this.start.x - this.end.x, smallerRadius*2/1.5);
                c.fill();
                break;
            case "right":
                c.beginPath();
                c.fillStyle = "orange";
                c.fillRect(this.start.x, this.start.y-smallerRadius/1.5, this.end.x - this.start.x, smallerRadius*2/1.5);
                c.fill();
                break;
            case "up":
                c.beginPath();
                c.fillStyle = "orange";
                c.fillRect(this.end.x-smallerRadius/1.5, this.end.y, smallerRadius*2/1.5, this.start.y - this.end.y);
                c.fill();
                break;
            case "down":
                c.beginPath();
                c.fillStyle = "orange";
                c.fillRect(this.start.x-smallerRadius/1.5, this.start.y, smallerRadius*2/1.5, this.end.y - this.start.y);
                c.fill();
                break;
            default:
                break;
        }

        c.beginPath();
        c.arc(this.end.x, this.end.y, smallerRadius*multiplier, Math.PI*2, false);
        c.strokeStyle = "orange";
        c.stroke();
        c.fillStyle = "orange";
        c.fill();
        if(this.direction === "up"){
            user.draw();
        }
    }
    this.update = function() {
        if(!this.finishing){
            switch(this.direction){
                case "left":
                    this.end.x -= this.speed;
                    break;
                case "right":
                    this.end.x += this.speed;
                    break;
                case "up":
                    this.end.y -= this.speed;
                    break;
                case "down":
                    this.end.y += this.speed;
                    break;
                default:
                    break;
            }
        } else {
            if(this.finishDelay < 50){
                this.finishDelay++;
            } else {
                this.finishDelay++;
                if(this.finishDelay >= 60){
                    user.attacking = false;
                }
                switch(this.direction){
                    case "left":
                        this.end.x -= this.speed;
                        break;
                    case "right":
                        this.end.x += this.speed;
                        break;
                    case "up":
                        this.end.y -= this.speed;
                        break;
                    case "down":
                        this.end.y += this.speed;
                        break;
                    default:
                        break;
                }
            }
        }

        var smallX = Math.min(this.start.x, this.end.x);
        var smallY = Math.min(this.start.y, this.end.y);
        var bigX = Math.max(this.start.x, this.end.x);
        var bigY = Math.max(this.start.y, this.end.y); 

        var firstBeam;
        var secondBeam;
        switch(this.direction){
            case "left":
                if(!this.finishing){
                    firstBeam = {
                        x: smallX - this.radius,
                        y: smallY-this.radius,
                        width: this.radius*2,
                        height: this.radius*2
                    }
                } else {
                    firstBeam = {
                        x: smallX,
                        y: smallY-this.radius/1.5,
                        width: this.radius,
                        height: this.radius*2/1.5
                    }
                }

                secondBeam = {
                    x: smallX + this.radius,
                    y: smallY - this.radius/1.5,
                    width: bigX - smallX,
                    height: this.radius*2/1.5
                }
                break;
            case "right":
                if(!this.finishing){
                    firstBeam = {
                        x: bigX - this.radius,
                        y: bigY-this.radius,
                        width: this.radius*2,
                        height: this.radius*2
                    }
                } else {
                    firstBeam = {
                        x: bigX - this.radius,
                        y: bigY - this.radius,
                        width: this.radius,
                        height: this.radius*2/1.5
                    }
                }

                secondBeam = {
                    x: smallX - this.radius,
                    y: smallY - this.radius/1.5,
                    width: bigX - smallX,
                    height: this.radius*2/1.5
                }
                break;
            
            case "up":
                if(!this.finishing){
                    firstBeam = {
                        x: smallX - this.radius,
                        y: smallY - this.radius,
                        width: this.radius*2,
                        height: this.radius*2
                    }
                } else {
                    firstBeam = {
                        x: smallX - this.radius/1.5,
                        y: smallY,
                        width: this.radius*2/1.5,
                        height: this.radius
                    }
                }

                secondBeam = {
                    x: smallX - this.radius/1.5,
                    y: smallY + this.radius,
                    width: this.radius*2/1.5,
                    height: bigY - smallY
                }
                break;

            case "down":
                if(!this.finishing){
                    firstBeam = {
                        x: bigX - this.radius,
                        y: bigY - this.radius,
                        width: this.radius*2,
                        height: this.radius*2
                    }
                } else {
                    firstBeam = {
                        x: bigX - this.radius/1.5,
                        y: bigY - this.radius,
                        width: this.radius*2/1.5,
                        height: this.radius
                    }
                }

                secondBeam = {
                    x: smallX - this.radius/1.5,
                    y: smallY - this.radius,
                    width: this.radius*2/1.5,
                    height: bigY - smallY
                }
                break;

            default:
                break;
        }
        if(objIntersectBoth(firstBeam, pichu.hitbox()) && this.status!="stop" && !pichu.damaged){
            pichu.damage(this.damage()[0]);
        }
        if(objIntersectBoth(secondBeam, pichu.hitbox()) && this.status!="stop" && !pichu.damaged){
            pichu.damage(this.damage()[1]);
        }
        for(var i = 0;i < attacks.length;i++){
            var areaOfAttack = {
                x: attacks[i].x,
                y: attacks[i].y,
                height: attacks[i].height,
                width: attacks[i].width
            }
            if((objIntersectBoth(secondBeam, areaOfAttack) || objIntersectBoth(firstBeam, areaOfAttack)) && this.status!="stop"){
                if(!attacks[i].big){
                    attacks[i].status = "stop";
                    attacks.splice(i,1);
                }
            }
        }
        var test1 = this.end.x < 0 || this.end.x >= canvas.width;
        var test2 = this.end.y < 0 || this.end.y >= canvas.height;
        if(!this.finishing && (test1 || test2)){
            this.finishing = true;
            var tempEnd = this.end;
            this.end = this.start;
            this.start = tempEnd;
        } else {
            if(this.finishing && (test1 || test2)){
                enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
            }
        }
        this.draw();
    }
}

function ThunderWave(x, y, direction, faster){
    this.name = "Thunder Wave";
    this.type = "Electric";
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = faster ? 2 : 1;
    this.damage = function(){
        return 0;//Thunder Wave isn't meant to damage the target!
    }
    this.width = 100;
    this.height = 100;
    this.size_i = 0;
    this.size_Delay = 10;
    this.bigTime = false;
    this.status = "go";
    this.draw = function(){
        let radius = this.bigTime ? this.width/2 * 1.2 : this.width/2;
        c.beginPath();
        c.lineWidth = 3;
        c.arc(this.x + this.width/2, this.y + this.height/2, radius*0.8, Math.PI*2, false);
        c.strokeStyle = "yellow";
        c.stroke();
        c.beginPath();
        c.arc(this.x + this.width/2, this.y + this.height/2, radius, Math.PI*2, false);
        c.strokeStyle = "yellow";
        c.stroke();
    }
    this.update = function(){
        switch(this.direction){
            case "up":
                this.y -= this.speed;
                break;
            case "down":
                this.y += this.speed;
                break;
            case "right":
                this.x += this.speed;
                break;
            case "left":
                this.x -= this.speed;
                break;
            case "upper-left":
                this.y -= this.speed;
                this.x -= this.speed;
                break;
            case "upper-right":
                this.y -= this.speed;
                this.x += this.speed;
                break;
            case "lower-left":
                this.y += this.speed;
                this.x -= this.speed;
                break;
            case "lower-right":
                this.y += this.speed;
                this.x += this.speed;
                break;
            default:
                break;
        }
        if(this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
            this.status = "stop";
            enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
        } else {
            let newAreaOfAttack = {
                x: this.x + this.width/8,
                y: this.y + this.height/8,
                width: this.width*3/4,
                height: this.height*3/4
            }
            if(objIntersectBoth(newAreaOfAttack, pichu.hitbox()) && this.status != "stop" && !pichu.damaged){
                this.status = "stop";
                enemyAttacks.splice(enemyAttacks.indexOf(this), 1);
                pichu.damage(this.damage());
                pichu.slowed_Down = 200;
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
    }
    
}

/**************************************** ENEMY FUNCTIONS **************************************************************/
//evolving sprite = [230, 1959, 210, 210]
function Voltorb(x, y, priority, shiny){
    this.status = "active";
    this.health = shiny ? 16 : 8;
    this.shiny = shiny;
    this.big = false; //trait to determine whether attacks will use regular position or hitbox stats to determine intersection
    this.x = x;
    this.y = y;
    this.speed = shiny ? 3 : 2;
    this.attackCoolDown = 0;
    this.radius = 5;
    this.exp = shiny ? 12 : 6;
    this.innerRadius = 0.1;
    this.height = 100;
    this.width = 100;
    this.priority = priority;
    this.direction = "down";
    this.i = 0;
    this.motionDelay = 0;
    this.desiredDelay = 10;
    this.myArray = undefined;
    this.damageCooldown = 50;
    this.downArrays = [[44, 1166, 210, 210], [263, 1166, 210, 210]];
    this.upArrays = [[470, 1166, 210, 210], [688, 1166, 210, 210]];
    this.leftArrays = [[480, 1370, 210, 210], [694, 1370, 210, 210]];
    this.rightArrays = [[50, 1370, 210, 210], [269, 1370, 210, 210]];
    this.damageArray = [[0, 0, 1, 1]];
    this.damage = function(amount){
        if(this.status === "active"){
            this.status = "damaged";
            this.health -= amount;
            if(this.health <= 0){
                this.status = "eliminated";
                pichu.gainExp(this.exp);
            }
        }

    }
    this.intersect = function() {
    var answer = false;
    for(var i = 0;i < collidables.length;i++){
        if(objIntersectBoth(this, collidables[i].test) && !collidables[i].intangible){
            answer = true;
        }
    }
    return answer;
    }
    this.hitWall = function() {
        var test1 = this.x < 0 || (this.x + this.width) >= canvas.width;
        var test2 = this.y < 0 || (this.y + this.height) >= canvas.height;
        //console.log(test1 || test2);        
        return test1 || test2;
    }
    this.hitbox = function(){
        var answer = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        answer.x += 25;
        answer.y += 15;
        answer.width = 70;
        answer.height = 70;
        return answer;
    }
    this.draw = function() {
        i = this.i;
        this.myArray = this.myArray ? this.myArray : this.downArrays;
        steps = this.myArray;
        damageSteps = this.damageArray;
        var sheet = this.shiny ? shinySpritesheet : spritesheet;


        //c.drawImage(spritesheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
        if(this.status === "damaged" && this.damageCooldown%2 === 0){
            c.drawImage(sheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width, this.height);
        } else {
            c.drawImage(sheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
        }
    }
    this.update = function(target) {
        if(objIntersectBoth(pichu.hitbox(), this.hitbox()) && this.status==="active" && !pichu.damaged){
            this.status = "succeeded";
            var damage = this.shiny ? 5 + 10*(Math.max(0, pichu.level - 5)) : 5;
            pichu.damage(damage);
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
        if(this.status === "active" || this.status === "damaged"){
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
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.y += this.speed;
                    }
                    break;
                case "down":
                    this.y += this.speed;
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.y -= this.speed;
                    }
                    break;
                case "left":
                    this.x -= this.speed;
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.x += this.speed;
                    }
                    break;
                case "right":
                    this.x += this.speed;
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.x -= this.speed;
                    }
                    break;
                default:
                    break;
            }
            if(this.status === "damaged"){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.status = "active";
                    this.damageCooldown = 50;
                    console.log(this.status);
                }
            }
            if(this.shiny && pichu.live){
                if(this.attackCoolDown <= 0){
                    var oneToAttack = [0, 0, 0, 1];
                    var attackOption = oneToAttack[Math.floor(Math.random()*oneToAttack.length)];
                    if(attackOption === 1){
                        var newThunderbolt = new Thunderbolt(this.x + this.width/2, this.y + this.height/2, this.direction, 20, true);
                        enemyAttacks.push(newThunderbolt);
                        this.attackCoolDown = 150;
                    }
                } else {
                    this.attackCoolDown--;
                }
            }
            this.draw();
        } else if(this.status === "eliminated"){
            if(this.radius <= 50){
                c.beginPath();
                c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
                c.strokeStyle = "aqua";
                c.lineWidth = 50 - this.radius;
                c.stroke();
                this.radius+=2;
            }
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

function Wooper(x, y, shiny){
    this.status = "active";
    this.health = shiny ? 40 : 20;
    this.big = false;
    this.shiny = shiny;
    this.x = x;
    this.y = y;
    this.speed = shiny ? 3 : 2;
    this.radius = 5;
    this.resistElectric = true;
    this.exp = shiny ? 16 : 8;
    this.direction = "down";
    this.diagonalArray = ["Northeast", "Southeast", "Southwest", "Northwest"];
    this.diagonal = "Northeast";
    this.innerRadius = 0.1;
    this.height = 115;
    this.width = 115;
    this.i = 0;
    this.iDelay = 0;
    this.desiredDelay = 10;
    this.state = "stand";
    this.stateArray = ["stand", "move", "attack"];
    this.stateDelay = 49;
    this.stateDesiredDelay = 50;
    this.attckWindDown = 0;
    this.myArray = undefined;
    this.damageCooldown = 50;
    this.downArrays = [[70, 1620, 194, 194], [460, 1620, 194, 194], [70, 1620, 194, 194], [460, 1620, 194, 194]];
    this.upArrays = [[890, 1611, 194, 194], [1085, 1611, 194, 194], [890, 1611, 194, 194], [1087, 1610, 194, 194]];
    this.leftArrays = [[2120, 1625, 194, 194], [2500, 1635, 194, 194], [2120, 1625, 194, 194], [2500, 1635, 194, 194]];
    this.rightArrays = [[1294, 1615, 194, 194], [1673, 1623, 194, 194], [1294, 1615, 194, 194], [1673, 1623, 194, 194]];
    this.downIdleArrays = [[70, 1620, 194, 194], [265, 1619, 194, 194], [70, 1620, 194, 194], [70, 1620, 194, 194], [70, 1620, 194, 194], [70, 1620, 194, 194]];
    this.upIdleArrays = [[890, 1611, 194, 194]];
    this.leftIdleArrays = [[2120, 1625, 194, 194], [2289, 1628, 194, 194], [2120, 1625, 194, 194], [2120, 1625, 194, 194], [2120, 1625, 194, 194], [2120, 1625, 194, 194]];
    this.rightIdleArrays = [[1294, 1615, 194, 194], [1470, 1620, 194, 194], [1294, 1615, 194, 194], [1294, 1615, 194, 194], [1294, 1615, 194, 194], [1294, 1615, 194, 194]];
    this.downAttackArray = [[675, 1625, 194, 194]];
    this.upAttackArray = [[1085, 1615, 194, 194]];
    this.leftAttackArray = [[2733, 1634, 194, 194]];
    this.rightAttackArray = [[1900, 1627, 194, 194]];
    this.damageArray = [[0, 0, 1, 1]];
    this.hitbox = function() {
        var answer = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        answer.x += 30;
        answer.width -= 60;
        answer.y += 10;
        answer.height -= 20;
        return answer;
    }
    this.damage = function(amount){
        if(this.status === "active"){
            this.status = "damaged";
            this.health -= amount;
            if(this.health <= 0){
                this.status = "eliminated";
                pichu.gainExp(this.exp);
            }
        }
    }
    this.intersect = function() {
        var answer = false;
        for(var i = 0;i < collidables.length;i++){
            if(objIntersectBoth(this.hitbox(), collidables[i].test) && !collidables[i].intangible){
                answer = true;
            }
        }
        return answer;
    }
    this.hitWall = function() {
        var test1 = this.x < 0 || (this.x + this.width) >= canvas.width;
        var test2 = this.y < 0 || (this.y + this.height) >= canvas.height;
        //console.log(test1 || test2);        
        return test1 || test2;
    }
    this.attack = function() {
        if(this.status === "active" || this.status === "damaged"){
            var frontWooper = frontOfEnemy(this);
            var radius = this.shiny ? 31 : 30;
            var newMudshot = new Mudshot(frontWooper.x, frontWooper.y, this.direction, radius);
            this.attckWindDown = 10;
            enemyAttacks.push(newMudshot);
        }
    }
    this.draw = function() {
        i = this.i;
        this.myArray = this.myArray ? this.myArray : this.downIdleArrays;
        steps = this.myArray;
        damageSteps = this.damageArray;
        var sheet = this.shiny ? shinySpritesheet : spritesheet;
        if(this.status === "damaged" && this.damageCooldown%2 === 0){
            c.drawImage(sheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width, this.height);
        } else {
            c.drawImage(sheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
        }
    }
    this.update = function(target) {
        var adjust = 50;
        var testTarget = {
            x: target.x,
            y: target.y,
            height: target.height - adjust,
            width: target.width - adjust
        }
        if(objIntersectBoth(pichu.hitbox(), this.hitbox()) && this.status==="active" && !pichu.damaged){
            var damage = this.shiny ? 8 + 1*(Math.max(0, pichu.level - 5)) : 8; //return later
            pichu.damage(damage);
        }
        for(var i = 0;i < attacks.length;i++){
            var areaOfAttack = {
                x: attacks[i].givenX,
                y: attacks[i].givenY,
                width: attacks[i].width,
                height: attacks[i].height
            }
            if(objIntersectBoth(areaOfAttack, this.hitbox()) && this.status==="active" && attacks[i].status!="stop"){
                attacks[i].status = "stop";
                attacks.splice(i, 1);
                this.damage(attacks[i].damage());
            }
        }
        if(!pichu.live){
            this.direction = "down";
            this.state = "stand";
            this.i = 0;
            this.myArray = this.downIdleArrays;
            this.draw();
        }
        if((this.status === "active" || this.status === "damaged") && pichu.live){
            if(this.stateDelay < this.stateDesiredDelay){
                this.stateDelay++;
                switch(this.state){
                    case "stand":
                        this.iDelay++;
                        if(this.iDelay >= this.desiredDelay){
                            this.i++;
                            this.iDelay = 0;
                            if(this.i >= this.myArray.length){
                                this.i = 0;
                            }
                        }
                        break;
                    case "move":
                        this.iDelay++;
                        if(this.iDelay >= this.desiredDelay){
                            this.i++;
                            this.iDelay = 0;
                            if(this.i >= this.myArray.length){
                                this.i = 0;
                            }
                        }
                        switch(this.diagonal){
                            case "Northeast":
                                var distance = this.speed;
                                this.x += distance;
                                this.y -= distance;
                                if(this.intersect() || this.hitWall()){
                                    this.x -= distance;
                                    this.y += distance;
                                }
                                break;
                            case "Southeast":
                                var distance = this.speed;
                                this.x += distance;
                                this.y += distance;
                                if(this.intersect() || this.hitWall()){
                                    this.x -= distance;
                                    this.y -= distance;
                                }
                                break;
                            case "Southwest":
                                var distance = this.speed;
                                this.x -= distance;
                                this.y += distance;
                                if(this.intersect() || this.hitWall()){
                                    this.x += distance;
                                    this.y -= distance;
                                }
                                break;
                            case "Northwest":
                                var distance = this.speed;
                                this.x -= distance;
                                this.y -= distance;
                                if(this.intersect() || this.hitWall()){
                                    this.x += distance;
                                    this.y += distance;
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                    case "attack":
                        if(this.attckWindDown > 0){
                            this.attckWindDown--;
                            console.log("still in attack mode");
                        } else {
                            this.state = "stand";
                            console.log("leaving attack mode");
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
                            this.i = 0;
                            this.iDelay = 0;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                this.stateDelay = 0;
                this.i = 0;
                this.iDelay = 0;
                this.state = this.stateArray[Math.floor(Math.random()*3)];
                switch(this.state){
                    case "stand":
                        if(Math.abs(this.x - target.x) > Math.abs(this.y - target.y)){
                            if(target.x < this.x){
                                if(this.direction != "left"){
                                    this.direction = "left";
                                }
                                this.myArray = this.leftIdleArrays;
                            } else {
                                if(this.direction != "right"){
                                    this.direction = "right";
                                }
                                this.myArray = this.rightIdleArrays;
                            }
                        } else {
                            if(target.y < this.y){
                                if(this.direction != "up"){
                                    this.direction = "up";
                                }
                                this.myArray = this.upIdleArrays;
                            } else {
                                if(this.direction != "down"){
                                    this.direction = "down";
                                }
                                this.myArray = this.downIdleArrays;
                            }
                        }
                        break;
                    case "move":
                        if(target.x < this.x){
                            if(target.y < this.y){
                                if(this.diagonal != "Northwest"){
                                    this.diagonal = "Northwest";
                                }
                                this.myArray = this.leftArrays;
                            } else {
                                if(this.diagonal != "Southwest"){
                                    this.diagonal = "Southwest";
                                }
                                this.myArray = this.leftArrays;
                            }
                        } else {
                            if(target.y < this.y){
                                if(this.diagonal != "Northeast"){
                                    this.diagonal = "Northeast";
                                }
                                this.myArray = this.rightArrays;
                            } else {
                                if(this.diagonal != "Southeast"){
                                    this.diagonal = "Southeast";
                                }
                                this.myArray = this.rightArrays;
                            }
                        }
                        break;
                    case "attack":
                        if(Math.abs(this.x - target.x) > Math.abs(this.y - target.y)){
                            if(target.x < this.x){
                                if(this.direction != "left"){
                                    this.direction = "left";
                                }
                                this.myArray = this.leftAttackArray;
                                this.attack();
                            } else {
                                if(this.direction != "right"){
                                    this.direction = "right";
                                }
                                this.myArray = this.rightAttackArray;
                                this.attack();
                            }
                        } else {
                            if(target.y < this.y){
                                if(this.direction != "up"){
                                    this.direction = "up";
                                }
                                this.myArray = this.upAttackArray;
                                this.attack();
                            } else {
                                if(this.direction != "down"){
                                    this.direction = "down";
                                }
                                this.myArray = this.downAttackArray;
                                this.attack();
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            if(this.status === "damaged"){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.status = "active";
                    this.damageCooldown = 50;
                }
            }
            this.draw();
        } else if(this.status === "eliminated"){
            if(this.radius <= 50){
                c.beginPath();
                c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
                c.strokeStyle = "aqua";
                c.lineWidth = 50 - this.radius;
                c.stroke();
                this.radius+=2;
            } else {
                this.status = "inactive";
                enemies.splice(enemies.indexOf(this), 1);
            }
        }
    }
}

function Snorlax(x, y, priority){
    this.status = "active";
    this.health = 300 + 100*((rushModeCount/5) - 3);
    this.statesWithoutAttacking = 0;
    this.big = true;
    this.x = x;
    this.y = y;
    this.attacking = false;
    this.state = "stand";
    this.stateArray = ["stand", "move", "attack"];
    this.stateDelay = 0;
    this.stateDesiredDelay = 80;
    this.hitbox = function() {
        var answer = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        switch(this.direction){
            case "up":
                answer.x += 24;
                answer.y += 10;
                answer.width -= 56;
                answer.height -= 30;
                break;
            case "down":
                answer.x += 30;
                answer.y += 30;
                answer.width -= 65;
                answer.height -= 60;
                break;
            case "left":
                answer.x += 50;
                answer.y += 20;
                answer.width -= 140;
                answer.height -= 30;
                break;
            case "right":
                answer.x += 40;
                answer.y += 10;
                answer.width -= 90;
                answer.height -= 20;
                break;
        }
        return answer;
    }
    this.priority = priority;
    this.speed = 0.5;
    this.radius = 5;
    this.exp = 25;
    this.innerRadius = 0.1;
    this.height = 300;
    this.width = 300;
    this.direction = "down";
    this.i = 0;
    this.iDelay = 0;
    this.motionDelay = 0;
    this.desiredDelay = 10;
    this.idleDesiredDelay = 60;
    this.myArray = undefined;
    this.damageCooldown = 50;
    this.downArrays = [[66, 88, 522, 522], [66, 88, 522, 522], [1390, 72, 522, 522], [1390, 72, 522, 522], [66, 88, 522, 522], [66, 88, 522, 522], [2040, 88, 522, 522], [2040, 88, 522, 522]];
    this.upArrays = [[695, 705, 522, 522], [695, 705, 522, 522], [1375, 710, 522, 522], [1375, 710, 522, 522], [695, 705, 522, 522], [695, 705, 522, 522], [2018, 714, 522, 522], [2018, 714, 522, 522]];
    this.leftArrays = [[737, 1245, 545, 545], [737, 1245, 545, 545], [1345, 1261, 545, 545], [1345, 1261, 545, 545]];
    this.rightArrays = [[687, 1843, 545, 545], [687, 1843, 545, 545], [1260, 1833, 545, 545], [1260, 1833, 545, 545]];
    this.downIdleArrays = [[66, 88, 522, 522], [694, 91, 522, 522]];
    this.upIdleArrays = [[695, 705, 522, 522]];
    this.leftIdleArrays = [[737, 1245, 545, 545], [2010, 1248, 545, 545]];
    this.rightIdleArrays = [[687, 1843, 545, 545], [1945, 1857, 545, 545]];
    this.downAttackArray = [[88, 695, 522, 522]];
    this.upAttackArray = [[105, 1280, 522, 522]];
    this.leftAttackArray = [[140, 1850, 545, 545]];
    this.rightAttackArray = [[2433, 1871, 545, 545]];
    this.attckWindDown = 0;
    this.attackArray = ["Snore", "Hyper Beam"];
    this.damageArray = [[0, 0, 1, 1]];
    this.damage = function(amount){
        if(this.status === "active"){
            this.status = "damaged";
            this.health -= amount;
            if(this.health <= 0){
                this.status = "eliminated";
                pichu.gainExp(this.exp);
                continueRush = true;
            }
        }
    }
    this.attack = function(attack){
        if((this.status === "active" || this.status === "damaged") && !this.attacking){
            switch(attack){
                case "Snore":
                    var front = {
                        x: this.x + this.width/2,
                        y: this.y + (this.height*2/5)
                    }

                    if(this.direction === "left"){
                        front.x = this.x + this.width*7/24;
                    }
                    if(this.direction === "right"){
                        front.x += this.width*4/24;
                    }
                    this.attckWindDown = 10;
                    var newSnore = new Snore(front.x, front.y);
                    break;
                case "Hyper Beam":
                    var front = {
                        x: this.x + this.width/2,
                        y: this.y + this.height/2
                    }
                    switch(this.direction){
                        case "right":
                            front.x = this.x + this.width*5/6;
                            front.y = this.y + this.height/3;
                            break;
                        case "left":
                            front.x = this.x + this.width*1/15;
                            front.y = this.y + this.height/3;
                            break;
                        case "up":
                            front.y = this.y + this.height/7;
                        default:
                            break;
                    }
                    this.idle_i = 0;
                    this.attckWindDown = 10;
                    var newHB = new HyperBeam(front.x, front.y, this.direction, this);
                    this.attacking = true;
                    enemyAttacks.push(newHB);
                    break;
                default:
                    break;
            }
        }
    }
    this.intersect = function() {
        var answer = false;
        for(var i = 0;i < collidables.length;i++){
            if(objIntersectBoth(this.hitbox(), collidables[i].test) && !collidables[i].intangible){
                answer = true;
            }
        }
        return answer;
    }
    this.adjustDirectionAttackVer = function(target){
        var point = {
            x: target.x + target.width/2,
            y: target.y + target.height/2
        }
        if((this.x - 10) <= point.x && point.x <= (this.x + this.width + 10)){
            if(target.y < this.y){
                if(this.direction != "up"){
                    this.direction = "up";
                }
            } else {
                if(this.direction != "down"){
                    this.direction = "down";
                }
            }
        } else {
            if(target.x < this.x){
                if(this.direction != "left"){
                    this.direction = "left";
                }
            } else if(target.x > this.x){
                if(this.direction != "right"){
                    this.direction = "right";
                }
            }
        }
        switch(this.direction){
            case "left":
                this.i = 0;
                this.myArray = this.leftIdleArrays;
                break;
            case "right":
                this.i = 0;
                this.myArray = this.rightIdleArrays;
                break;
            case "up":
                this.i = 0;
                this.myArray = this.upIdleArrays;
                break;
            case "down":
                this.i = 0;
                this.myArray = this.downIdleArrays;
                break;
            default:
                break;
        }
    }
    this.adjustDirection = function(target, stand){
        console.log(stand);
        if(this.priority === 0){
            if(Math.abs((this.x+(this.width/2)) - (target.x+(target.width/2))) >= 100){
                if(target.x < this.x){
                    if(this.direction != "left"){
                        this.direction = "left";
                    }
                } else if(target.x > this.x){
                    if(this.direction != "right"){
                        this.direction = "right";
                    }
                }
            } else {
                if(target.y < this.y){
                    if(this.direction != "up"){
                        this.direction = "up";
                    }
                } else if(target.y > this.y){
                    if(this.direction != "down"){
                        this.direction = "down";
                    }
                }
            }
        }
        if(this.priority === 1){
            if(Math.abs((this.y+(this.height/2)) - (target.y+(target.height/2))) >= 100){
                if(target.y < this.y){
                    if(this.direction != "up"){
                        this.direction = "up";
                    }
                } else if(target.y > this.y){
                    if(this.direction != "down"){
                        this.direction = "down";
                    }
                }
            } else {
                if(target.x < this.x){
                    if(this.direction != "left"){
                        this.direction = "left";
                    }
                } else if(target.x > this.x){
                    if(this.direction != "right"){
                        this.direction = "right";
                    }
                }
            }
        }
        switch(this.direction){
            case "left":
                this.i = 0;
                this.myArray = stand ? this.leftIdleArrays : this.leftArrays;
                break;
            case "right":
                this.i = 0;
                this.myArray = stand ? this.rightIdleArrays : this.rightArrays;
                break;
            case "up":
                this.i = 0;
                this.myArray = stand ? this.upIdleArrays : this.upArrays;
                break;
            case "down":
                this.i = 0;
                this.myArray = stand ? this.downIdleArrays : this.downArrays;
                break;
            default:
                break;
        }
    }
    this.draw = function() {
        i = this.i;
        this.myArray = this.myArray ? this.myArray : this.downIdleArrays;
        steps = this.myArray; //if Snorlax is attacking (with hyper beam), should update to use the correct directional array
        damageSteps = this.damageArray;

        if(this.status === "damaged" && this.damageCooldown%2 === 0){
            c.drawImage(snorlaxSpritesheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width, this.height);
        } else {
            c.drawImage(snorlaxSpritesheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
        }
        // c.beginPath();
        // c.strokeStyle = "blue";
        // c.strokeRect(this.x, this.y, this.width, this.height);
        // c.stroke();
    }
    this.update = function(target){
        var adjust = 50;
        var testTarget = {
            x: target.x + 30,
            y: target.y,
            height: target.height-20,
            width: target.width - 30
        }
        if(objIntersectBoth(pichu.hitbox(), this.hitbox()) && this.status==="active" && !pichu.damaged){
            pichu.damage(1);
        }
        for(var i = 0;i < attacks.length;i++){
            var areaOfAttack = {
                x: attacks[i].givenX,
                y: attacks[i].givenY,
                height: attacks[i].height,
                width: attacks[i].width
            }
            if(objIntersectBoth(areaOfAttack, this.hitbox()) && this.status==="active" && attacks[i].status!="stop"){
                attacks[i].status = "stop";
                attacks.splice(i,1);
                this.damage(attacks[i].damage());
            }
        }
        if(!pichu.live){
            this.direction = "down";
            this.state = "stand";
            this.i = 0;
            this.myArray = this.downIdleArrays;
            this.draw();
        }
        if((this.status === "active" || this.status === "damaged") && pichu.live){
            if(this.stateDelay < this.stateDesiredDelay){
                this.stateDelay++;
                switch(this.state){
                    case "stand":
                        this.iDelay++;
                        if(this.iDelay >= this.idleDesiredDelay){
                            this.i++;
                            this.iDelay = 0;
                            this.idleDesiredDelay = 10;
                            if(this.i >= this.myArray.length){
                                this.i = 0;
                                this.idleDesiredDelay = 60;
                            }
                        }
                        break;
                    case "move":
                        this.motionDelay++;
                        console.log(this.myArray.length);
                        if(this.motionDelay >= this.desiredDelay){
                            this.i++;
                            this.motionDelay = 0;
                            if(this.i >= this.myArray.length){
                                this.i = 0;
                            }
                        }
                        //preventing Snorlax from roaming around when Hyper Beam is still active
                        if(!this.attacking){
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
                        }
                        break;
                    case "attack":
                        if(this.attckWindDown > 0){
                            if(!this.attacking){
                                this.attckWindDown--;
                            } else {
                                this.stateDelay--;
                            }
                        } else {
                            this.state = "stand";
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
                            this.i = 0;
                            this.iDelay = 0;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                this.stateDelay = 0;
                this.i = 0;
                this.iDelay = 0;
                this.state = this.stateArray[Math.floor(Math.random()*this.stateArray.length)];
                if(this.statesWithoutAttacking >= 2){
                    this.state = "attack";
                }
                console.log(this.state);
                this.idleDesiredDelay = 60;
                switch(this.state){
                    case "stand":
                        this.adjustDirection(target, true);
                        this.statesWithoutAttacking++;
                        break;
                    case "move":
                        this.adjustDirection(target, false);
                        this.statesWithoutAttacking++;
                        break;
                    case "attack":
                        this.adjustDirectionAttackVer(target);
                        this.statesWithoutAttacking = 0;
                        if(enemyAttacks.length > 0){
                            this.state = "stand";
                        } else {
                            switch(this.direction){
                                case "up":
                                    this.myArray = this.upAttackArray;
                                    break;
                                case "down":
                                    this.myArray = this.downAttackArray;
                                    break;
                                case "right":
                                    this.myArray = this.rightAttackArray;
                                    break;
                                case "left":
                                    this.myArray = this.leftAttackArray;
                                    break;
                                default: 
                                    break;
                            }
                            this.attack(this.attackArray[Math.floor(Math.random()*2)]);
                        }
                        break;
                    default:
                        break;
                }
            }
            
            if(this.status === "damaged"){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.status = "active";
                    this.damageCooldown = 50;
                }
            }
            this.draw();
        } else if(this.status === "eliminated"){
            if(this.radius <= 150){
                c.beginPath();
                c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
                c.strokeStyle = "aqua";
                c.lineWidth = 150 - this.radius;
                c.stroke();
                this.radius+=7;
            }
            if(this.radius > 150){
                this.status = "inactive";
                enemies.splice(enemies.indexOf(this), 1);
            }
        }
    }
}

function EvolvingVoltorb(x, y, priority, shiny){
    this.status = "active";
    this.health = shiny ? 80 : 1;
    this.shiny = shiny;
    this.big = false; //trait to determine whether attacks will use regular position or hitbox stats to determine intersection
    this.x = x;
    this.y = y;
    this.speed = shiny ? 3 : 2;
    this.attackCoolDown = 0;
    this.radius = 5;
    this.exp = shiny ? 12 : 6;
    this.innerRadius = 0.1;
    this.height = 100;
    this.width = 100;
    this.priority = priority;
    this.direction = "down";
    this.i = 0;
    this.motionDelay = 0;
    this.desiredDelay = 10;
    this.myArray = undefined;
    this.damageCooldown = 50;
    this.downArrays = [[44, 1166, 210, 210], [263, 1166, 210, 210]];
    this.upArrays = [[470, 1166, 210, 210], [688, 1166, 210, 210]];
    this.leftArrays = [[480, 1370, 210, 210], [694, 1370, 210, 210]];
    this.rightArrays = [[50, 1370, 210, 210], [269, 1370, 210, 210]];
    this.evolvingArray = [230, 1959, 210, 210]; //this is the main one
    this.evolvingState = 0; //when Voltorb is evolving, this will be the tracker
    this.evolvingPoint = 3; //when the above state reaches this point, Voltorb will "evolve", removing itself from the enemies array and adding Electrode
    this.evolvingIncrement = 1.6;
    this.evolvingArrayAdjusted = function(subtractState){
        var plusOrMinus = subtractState ? -1 : 1;
        var adjustedValue = this.evolvingArray[0] + (plusOrMinus * this.evolvingState);
        return [adjustedValue, this.evolvingArray[1], this.evolvingArray[2], this.evolvingArray[3]];
    }
    this.damageArray = [[0, 0, 1, 1]];
    this.damage = function(amount){
        if(this.status === "active"){
            this.status = "damaged";
            this.health -= amount;
            if(this.health <= 0){
                this.status = "evolving";
                this.i = 0;
                this.motionDelay = 0;
                //floor = blackFloor;
            }
        }

    }
    this.intersect = function() {
        var answer = false;
        for(var i = 0;i < collidables.length;i++){
            if(objIntersectBoth(this, collidables[i].test) && !collidables[i].intangible){
                answer = true;
            }
        }
        return answer;
    }
    this.hitWall = function() {
        var test1 = this.x < 0 || (this.x + this.width) >= canvas.width;
        var test2 = this.y < 0 || (this.y + this.height) >= canvas.height;
        //console.log(test1 || test2);        
        return test1 || test2;
    }
    this.hitbox = function(){
        var answer = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        answer.x += 25;
        answer.y += 15;
        answer.width = 70;
        answer.height = 70;
        return answer;
    }
    this.draw = function() {
        i = this.i;
        this.myArray = this.myArray ? this.myArray : this.downArrays;
        steps = this.myArray;
        damageSteps = this.damageArray;
        var sheet = this.shiny ? shinySpritesheet : spritesheet;
        var modifier = (this.motionDelay > 4) ? 1 : -1; //will move the sprite back and forth (or up and down if I was adding it to the y coordinate)
        var shakeEffect = this.evolvingState * modifier;
        if(this.status === "evolving"){
            sheet = electrodeSpritesheet;
        }
        if(this.status === "damaged" && this.damageCooldown%2 === 0){
            c.drawImage(sheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x + shakeEffect, this.y, this.width, this.height);
        } else {
            c.drawImage(sheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x + shakeEffect, this.y, this.width, this.height);
        }
    }
    this.update = function(target) {
        if(objIntersectBoth(pichu.hitbox(), this.hitbox()) && this.status==="active" && !pichu.damaged){
            var damage = this.shiny ? 5 + 10*(Math.max(0, pichu.level - 5)) : 5;
            pichu.damage(damage);
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
        if(this.status === "active" || this.status === "damaged"){
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
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.y += this.speed;
                    }
                    break;
                case "down":
                    this.y += this.speed;
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.y -= this.speed;
                    }
                    break;
                case "left":
                    this.x -= this.speed;
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.x += this.speed;
                    }
                    break;
                case "right":
                    this.x += this.speed;
                    if(this.intersect() || picMenu || !pichu.live || this.hitWall()){
                        this.x -= this.speed;
                    }
                    break;
                default:
                    break;
            }
            if(this.status === "damaged"){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.status = "active";
                    this.damageCooldown = 50;
                    console.log(this.status);
                }
            }
            if(this.shiny && pichu.live){
                if(this.attackCoolDown <= 0){
                    var oneToAttack = [0, 0, 0, 1];
                    var attackOption = oneToAttack[Math.floor(Math.random()*oneToAttack.length)];
                    if(attackOption === 1){
                        var newThunderbolt = new Thunderbolt(this.x + this.width/2, this.y + this.height/2, this.direction, 20, true);
                        enemyAttacks.push(newThunderbolt);
                        this.attackCoolDown = 150;
                    }
                } else {
                    this.attackCoolDown--;
                }
            }
            this.draw();
        } else if(this.status === "evolving"){
            this.myArray = [this.evolvingArray, this.evolvingArray, this.evolvingArray, this.evolvingArray];
            this.motionDelay++;
            if(this.motionDelay >= this.desiredDelay){
                this.i++;
                this.motionDelay = 0;
                if(this.i >= this.myArray.length){
                    this.i = 0;
                    if(this.evolvingState <= this.evolvingPoint){
                        this.evolvingState += this.evolvingIncrement;
                        this.evolvingIncrement *= 2;
                    } else {
                        this.evolvingPoint--;
                        if(this.evolvingPoint <= 0){
                            //this.status = "inactive";
                            var newElectrode = new Electrode(this.x - 50, this.y - 50, this.priority, this.shiny);
                            enemies.push(newElectrode);
                            enemies.splice(enemies.indexOf(this), 1);
                            floor = whiteFloor;
                            rollingText("directions", "Electrode wants to battle!", function(){
                                if(!startMeBaby){
                                    $("#directions").text("");
                                } else {
                                    emptyFn();
                                }
                            });
                        }
                    }
                }
            }
            this.draw();
        }
    }
}

function Electrode(x, y, priority, shiny){
    this.status = "active";
    this.health = shiny ? 2*(80 + 40*((rushModeCount/5) - 3)) : 80 + 40*((rushModeCount/5) - 3);
    this.shiny = shiny;
    this.sheet = shiny ? shinyElectrodeSpritesheet : electrodeSpritesheet;
    this.x = x;
    this.y = y;
    this.flashEffect = 0;
    this.radius = 0;
    this.targetRadius = 200;
    this.secondRadius = 0;
    this.secondTargetRadius = 200;
    this.speed = shiny ? 4 : 3;
    this.exp = shiny ? 30 : 20;
    this.height = 200;
    this.width = 200;
    this.priority = priority;
    this.direction = "down";
    this.rollingPath = undefined;
    this.i = 0;
    this.motionDelay = 0;
    this.desiredDelay = 15;
    this.myArray = undefined;
    this.damageCooldown = 50;
    this.downArrays = [[73, 76, 327, 327], [493, 80, 327, 327], [73, 76, 327, 327], [493, 80, 327, 327]];
    this.upArrays = [[103, 553, 327, 327], [546, 559, 327, 327]];
    this.downIdleArrays = [[73, 76, 327, 327]];
    this.upIdleArrays = [[103, 553, 327, 327]];
    this.downAttackArray = [[2430, 97, 327, 327]];
    this.upAttackArray = [[103, 553, 327, 327]];
    this.leftIdleArrays = [[97, 981, 327, 327]];
    this.leftArrays = [[97, 981, 327, 327], [535, 998, 327, 327], [97, 981, 327, 327], [535, 998, 327, 327]];
    this.leftAttackArray = [[991, 1007, 327, 327]];
    this.rightIdleArrays = [[98, 1370, 327, 327]];
    this.rightArrays = [[98, 1370, 327, 327], [525, 1386, 327, 327], [98, 1370, 327, 327], [525, 1386, 327, 327]];
    this.rightAttackArray = [[1006, 1405, 327, 327]];
    this.rollingDownArrays = [[878, 97, 327, 327], [1266, 96, 327, 327], [1656, 89, 327, 327], [2045, 90, 327, 327]];
    this.rollingUpArrays = [[546, 559, 327, 327], [2045, 90, 327, 327], [1656, 89, 327, 327], [1266, 96, 327, 327]];
    this.rollingLeftArrays = [[1427, 991, 327, 327], [1958, 992, 327, 327], [2472, 990, 327, 327], [2962, 990, 327, 327]];
    this.rollingRightArrays = [[1427, 991, 327, 327], [2962, 990, 327, 327], [2472, 990, 327, 327], [1958, 992, 327, 327]];
    this.damageArray = [[0, 0, 1, 1]];
    this.state = "chase";
    this.stateArray = ["chase", "rollout", "exploding"];
    this.stateDelay = 0;
    this.stateDesiredDelay = 100;
    this.attckWindDown = 0;
    this.attackCoolDown = 500;
    this.hitWall = function() {
        var test1 = this.x < 0 || (this.x + this.width) >= canvas.width;
        var test2 = this.y < 0 || (this.y + this.height) >= canvas.height;
        return test1 || test2;
    }
    this.hitWallSpecific = function() {
        var left = this.x < 0;
        var right = (this.x + this.width) >= canvas.width;
        var up = this.y < 0;
        var down = (this.y + this.height) >= canvas.height;
        return [left, right, up, down];
    }
    this.hitbox = function(){
        var answer = {
            x: this.x + 20,
            y: this.y + 20,
            width: this.width - 40,
            height: this.height - 40
        }
        if(this.state === "exploding"){
            answer = {
                x: this.x + this.width/2 - 3*(this.radius + this.secondRadius)/4,
                y: this.y + this.height/2 - 3*(this.radius + this.secondRadius)/4,
                width: 3*(this.radius + this.secondRadius)/2,
                height: 3*(this.radius + this.secondRadius)/2
            }
            if(this.secondRadius > this.secondTargetRadius){
                let halfside = (this.secondTargetRadius + this.secondRadius) * Math.sqrt(2) / 2 + 50;
                answer = {
                    x: this.x + this.width/2 - halfside,
                    y: this.y + this.height/2 - halfside,
                    width: halfside * 2,
                    height: halfside *2
                }
            }
        }
        return answer;
    }
    this.damage = function(amount){
        if(this.status === "active"){
            if(this.health > 0){
                this.status = "damaged";
                this.health -= amount;
                if(this.state === "rollout"){
                    switch(this.direction){
                        case "up":
                            this.direction = "down";
                            this.i = 0;
                            this.motionDelay = 0;
                            break;
                        case "down":
                            this.direction = "up";
                            this.i = 0;
                            this.motionDelay = 0;
                            break;
                        case "left":
                            this.direction = "right";
                            this.i = 0;
                            this.motionDelay = 0;
                            break;
                        case "right":
                            this.direction = "left";
                            this.i = 0;
                            this.motionDelay = 0;
                            break;
                        default:
                            break;
                    }
                }
                if(this.health <= 0){
                    this.status = "active";
                    this.state = "exploding";
                }
            }
        }
    }
    this.intersect = function(){
        var answer = false;
        for(var i = 0;i < collidables.length;i++){
            if(objIntersectBoth(this.hitbox(), collidables[i].test) && !collidables[i].intangible){
                answer = true;
            }
        }
        return answer;
    }
    this.attack = function(){
        if(this.status === "active" || this.status === "damaged"){
            let attackArray = ["Rollout", "Thunder Wave"];
            let attackChoice = attackArray[Math.floor(attackArray.length * Math.random())];
            if(attackChoice === "Thunder Wave"){
                var frontElectrode = frontOfEnemy(this);
                let newThunderWave;
                switch(this.direction){
                    case "left":
                        if(pichu.y < this.y){
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "upper-left", this.shiny);
                        }
                        else{
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "lower-left", this.shiny);
                        }
                        break;
                    case "right":
                        if(pichu.y < this.y){
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "upper-right", this.shiny);
                        }
                        else{
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "lower-right", this.shiny);
                        }
                        break;
                    case "up":
                        if(pichu.x < this.x){
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "upper-left", this.shiny);
                        }
                        else{
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "upper-right", this.shiny);
                        }
                        break;
                    case "down":
                        if(pichu.x < this.x){
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "lower-left", this.shiny);
                        }
                        else{
                            newThunderWave = new ThunderWave(frontElectrode.x, frontElectrode.y, "lower-right", this.shiny);
                        }
                        break;
                    default:
                        break;
                }
                enemyAttacks.push(newThunderWave);
                this.attckWindDown = 9;
                this.state = "attack";
                this.attackCoolDown = shiny ? 150 : 300;
            } else {
                this.state = "rollout";
            }
        }
    }
    this.draw = function() {
        let i = this.i;
        this.myArray = this.myArray ? this.myArray : this.downArrays;
        let steps = this.myArray;
        let damageSteps = this.damageArray;
        let sheet = this.sheet;
        if(this.status === "damaged" && this.damageCooldown%2 === 0){
            c.drawImage(sheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width, this.height);
        } else {
            c.drawImage(sheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width, this.height);
        }
        // c.beginPath();
        // c.strokeStyle = "blue";
        // c.strokeRect(this.hitbox().x, this.hitbox().y, this.hitbox().width, this.hitbox().height);
        // c.stroke();
    }
    this.update = function(target) {
        if(objIntersectBoth(pichu.hitbox(), this.hitbox()) && this.status === "active" && !pichu.damaged){
            let damage = this.shiny ? 13 : 10;
            switch(this.state){
                case "rollout":
                    damage = 5 + 10*(Math.max(0, pichu.level - 5));
                    break;
                case "exploding":
                    damage = 5 + 20*(Math.max(0, pichu.level - 5));
                    break;
                default:
                    break;
            }
            pichu.damage(damage);
        }
        let threshold = 60;
        if(this.priority === 0 && this.state != "rollout"){
            if(Math.abs(this.x - target.x) >= threshold){
                if(target.x < this.x){
                    if(this.direction != "left"){
                        this.direction = "left";
                        this.i = 0;
                    }
                    this.myArray = this.leftArrays;
                } else if(target.x > this.x){
                    if(this.direction != "right"){
                        this.direction = "right";
                        this.i = 0;
                    }
                    this.myArray = this.rightArrays;
                }
            } else {
                if(target.y < this.y){
                    if(this.direction != "up"){
                        this.direction = "up";
                        this.i = 0;
                    }
                    this.myArray = this.upArrays;
                } else if(target.y > this.y){
                    if(this.direction != "down"){
                        this.direction = "down";
                        this.i = 0;
                    }
                    this.myArray = this.downArrays;
                }
            }
        }
        if(this.priority === 1 && this.state != "rollout"){
            if(Math.abs(this.y - target.y) >= threshold){
                if(target.y < this.y){
                    if(this.direction != "up"){
                        this.direction = "up";
                        this.i = 0;
                    }
                    this.myArray = this.upArrays;
                } else if(target.y > this.y){
                    if(this.direction != "down"){
                        this.direction = "down";
                        this.i = 0;
                    }
                    this.myArray = this.downArrays;
                }
            } else {
                if(target.x < this.x){
                    if(this.direction != "left"){
                        this.direction = "left";
                        this.i = 0;
                    }
                    this.myArray = this.leftArrays;
                } else if(target.x > this.x){
                    if(this.direction != "right"){
                        this.direction = "right";
                        this.i = 0;
                    }
                    this.myArray = this.rightArrays;
                }
            }
        }
        if(!pichu.live){
            this.direction = "down";
            this.myArray = this.downArrays;
        }
        if((this.status === "active" || this.status === "damaged") && this.state != "exploding"){
            if(this.state === "chase"){
                this.motionDelay++;
                if(this.motionDelay >= this.desiredDelay){
                    this.i++;
                    this.motionDelay = 0;
                    if(this.i >= this.myArray.length){
                        this.i = 0;
                    }
                }
                if(pichu.live){
                    if(this.attackCoolDown <= 0){
                        var oneToAttack = [0, 0, 0, 1];
                        var attackOption = oneToAttack[Math.floor(Math.random()*oneToAttack.length)];
                        if(attackOption === 1){
                            this.attack();
                        }
                    } else {
                        this.attackCoolDown--;
                    }
                }
            }
            if(this.state === "attack"){
                this.i = 0;
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
                console.log(this.attckWindDown);
                if(this.attckWindDown <= 0){
                    this.state = "chase";
                }
            }
            if(this.state != "rollout"){
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
            } else {
                let multiplier = 4;
                let interval = 100;
                switch(this.direction){
                    case "up":
                        this.myArray = this.rollingUpArrays;
                        this.y -= this.speed * multiplier;
                        if(this.intersect() || picMenu || !pichu.live){
                            this.y += this.speed * multiplier;
                            if(pichu.live && !picMenu){
                                this.direction = "down";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.y + 200 <= 0){
                            if(!this.rollingPath){
                                if(pichu.x < this.x){
                                    this.rollingPath = "left";
                                } else {
                                    this.rollingPath = "right";
                                }
                            }
                            if(this.rollingPath === "left"){
                                this.x -= interval;
                                this.direction = "down";
                                this.i = 0;
                                this.motionDelay = 0;
                            } else {
                                this.x += interval;
                                this.direction = "down";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.hitWallSpecific()[2] && ((this.hitWallSpecific()[0] && this.rollingPath === "left") || (this.hitWallSpecific()[1] && this.rollingPath === "right"))){
                            this.state = "chase";
                            this.rollingPath = undefined;
                            this.attackCoolDown = shiny ? 150 : 450;
                        }
                        break;
                    case "down":
                        this.myArray = this.rollingDownArrays;
                        this.y += this.speed * multiplier;
                        if(this.intersect() || picMenu || !pichu.live){
                            this.y -= this.speed * multiplier;
                            if(pichu.live && !picMenu){
                                this.direction = "up";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.y >= canvas.height){
                            if(!this.rollingPath){
                                if(pichu.x < this.x){
                                    this.rollingPath = "left";
                                } else {
                                    this.rollingPath = "right";
                                }
                            }
                            if(this.rollingPath === "left"){
                                this.x -= interval;
                                this.direction = "up";
                                this.i = 0;
                                this.motionDelay = 0;
                            } else {
                                this.x += interval;
                                this.direction = "up";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.hitWallSpecific()[3] && (this.hitWallSpecific()[0] && this.rollingPath === "left") || (this.hitWallSpecific()[1] && this.rollingPath === "right")){
                            this.state = "chase";
                            this.rollingPath = undefined;
                            this.attackCoolDown = shiny ? 150 : 450;
                        }
                        break;
                    case "left":
                        this.myArray = this.rollingLeftArrays;
                        this.x -= this.speed * multiplier;
                        if(this.intersect() || picMenu || !pichu.live){
                            this.x += this.speed * multiplier;
                            if(pichu.live && !picMenu){
                                this.direction = "right";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.x + 200 <= 0){
                            if(!this.rollingPath){
                                if(pichu.y < this.y){
                                    this.rollingPath = "up";
                                } else {
                                    this.rollingPath = "down";
                                }
                            }
                            if(this.rollingPath === "up"){
                                this.y -= interval;
                                this.direction = "right";
                                this.i = 0;
                                this.motionDelay = 0;
                            } else {
                                this.y += interval;
                                this.direction = "right";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.hitWallSpecific()[0] && (this.hitWallSpecific()[2] && this.rollingPath === "up") || (this.hitWallSpecific()[3] && this.rollingPath === "down")){
                            this.state = "chase";
                            this.rollingPath = undefined;
                            this.attackCoolDown = shiny ? 150 : 450;
                        }
                        break;
                    case "right":
                        this.myArray = this.rollingRightArrays;
                        this.x += this.speed * multiplier;
                        if(this.intersect() || picMenu || !pichu.live){
                            this.x -= this.speed * multiplier;
                            if(pichu.live && !picMenu){
                                this.direction = "left";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.x >= canvas.width){
                            if(!this.rollingPath){
                                if(pichu.y < this.y){
                                    this.rollingPath = "up";
                                } else {
                                    this.rollingPath = "down";
                                }
                            }
                            if(this.rollingPath === "up"){
                                this.y -= interval;
                                this.direction = "left";
                                this.i = 0;
                                this.motionDelay = 0;
                            } else {
                                this.y += interval;
                                this.direction = "left";
                                this.i = 0;
                                this.motionDelay = 0;
                            }
                        }
                        if(this.hitWallSpecific()[1] && (this.hitWallSpecific()[2] && this.rollingPath === "up") || (this.hitWallSpecific()[3] && this.rollingPath === "down")){
                            this.state = "chase";
                            this.rollingPath = undefined;
                            this.attackCoolDown = shiny ? 150 : 450;
                        }
                        break;

                }
                this.motionDelay += 1.5;
                if(this.motionDelay >= this.desiredDelay){
                    this.i++;
                    this.motionDelay = 0;
                    if(this.i >= this.myArray.length){
                        this.i = 0;
                    }
                }
            }
            
            if(this.status === "damaged"){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.status = "active";
                    this.damageCooldown = 50;
                }
            }
            this.draw();
            let flashpoint = 13;
            if(this.flashEffect <= flashpoint){
                this.flashEffect++;
                if(this.flashEffect > flashpoint){
                    floor = battleFloor;
                }
            }
        } else if(this.state === "exploding"){
            if(this.radius <= this.targetRadius){
                c.beginPath();
                c.arc(this.x + this.width/2, this.y + this.height/2, this.radius, Math.PI*2, false);
                c.strokeStyle = "orange";
                c.lineWidth = 2 * this.radius;
                c.stroke();
                this.radius += 2.5;
            } else {
                if(this.targetRadius >= 0){
                    c.beginPath();
                    c.arc(this.x + this.width/2, this.y + this.height/2, this.targetRadius, Math.PI*2, false);
                    c.strokeStyle = "orange";
                    c.lineWidth = 2 * this.radius;
                    c.stroke();
                    this.targetRadius -= 2;
                }
            }
            if(this.secondRadius <= this.secondTargetRadius){
                c.beginPath();
                c.arc(this.x + this.width/2, this.y + this.height/2, this.secondRadius, Math.PI*2, false);
                c.strokeStyle = "yellow";
                c.lineWidth = 2 * this.secondRadius;
                c.stroke();
                this.secondRadius += 2;
                if(this.secondRadius%40 === 0){
                    floor = whiteFloor;
                } else {
                    floor = battleFloor;
                }
            } else {
                c.beginPath();
                c.arc(this.x + this.width/2, this.y + this.height/2, this.secondTargetRadius, Math.PI*2, false);
                c.strokeStyle = "yellow";
                c.lineWidth = 2 * this.secondRadius;
                c.stroke();
                this.secondTargetRadius -= 2;
                if(this.secondTargetRadius%40 === 0){
                    floor = whiteFloor;
                } else {
                    floor = battleFloor;
                }
                if(this.secondTargetRadius <= 0){
                    floor = battleFloor;
                    this.status = "inactive";
                    enemies.splice(enemies.indexOf(this), 1);
                    pichu.gainExp(this.exp);
                    continueRush = true;
                }
            }
            // c.beginPath();
            // c.lineWidth = 1;
            // c.strokeStyle = "blue";
            // c.strokeRect(this.hitbox().x, this.hitbox().y, this.hitbox().width, this.hitbox().height);
            // c.stroke();
        }

    }

}


/**************************************** GAME MODE FUNCTIONS **************************************************************/

function startRush(test) {
    canvas = document.querySelector("canvas");
    var mappy = document.getElementById("map");
    map.css("background-image","none");
canvas.width = mappy.scrollWidth;
canvas.height = mappy.scrollHeight;
c = canvas.getContext("2d");
collidables = [];
paused = false;
pauseReady = true;
getables = [];
attacks = [];
enemyAttacks = [];
enemies = [];
picMenu = false;
var phase = 1;
rushModeCount = -1;
let bossPokemon;
continueRush = true;
floor = grassFloor;
document.getElementById("player-pic").className = "pictureSelect";

pichu = {
    mode: "default",
    direction: "down",
    motion: false,
    freeRoam: false, //this allows Pichu to move even if he is off the map or overlapping a collidable object. this is to avoid issues when Volt Tackle lands him in an inconvinient spot
    x: pichuLoad.x,
    y: pichuLoad.y,
    spikyEared: pichuLoad.usingSpikyEar ? true : false,
    pichuSheet: pichuSheet(),
    attackNumber: 0,
    z_attackNumber: undefined,
    thunderCost: 1,
    voltTackleCost: 1,
    radius: 5,
    height: 100,
    width: 100,
    damaged: false,
    damageCooldown: 50,
    level: pichuLoad.level,
    exp: pichuLoad.exp,
    receivedItem: false,
    slowed_Down: 0, //this property is mainly used when Pichu is hit by attacks that would slow him down temporarily
    voltTackle: {
        active: false,
        dx: 0,
        dy: 0,
        radius: 60,
        width: 120,
        height: 120,
        hits: 8,
        speed: 10,
        big: false,
        bigMeter: 0,
        targetEnemyIndex: undefined,
        targetPhase: 0,
        damage: function(){
            return 0.1 * (1 + pichu.level);
        },
        end: function(){
            pichu.voltTackle.active = false;
            pichu.freeRoam = true;
            pichu.voltTackle.hits = 8;
            pichu.voltTackle.bigMeter = 0;
            pichu.voltTackle.big = false;
            if(pichu.health <= 0){
                pichu.live = false;
                pichu.damaged = false;
                gameOver();
            }
        },
        draw: function(){
            c.beginPath();
            var r = !this.big ? pichu.voltTackle.radius : pichu.voltTackle.radius * 1.5;
            c.arc(pichu.x, pichu.y, r, Math.PI*2, false);
            c.strokeStyle = "rgb(255, 255, 120)";
            c.stroke();
            c.fillStyle = "rgb(255, 255, 120)";
            c.fill();
    
            //inner bolt
            c.beginPath();
            c.arc(pichu.x, pichu.y, 30, Math.PI*2, false);
            c.strokeStyle = "rgb(255, 255, 0)"; //potential colors: gold, lightgoldenrodyellow, palegoldenrod, lightyellow
            c.stroke();
            c.fillStyle = "rgb(255, 255, 0)";
            c.fill();
        },
        chooseEnemy: function(exclusion) {
            console.log("pichu choosing enemy");
            var distanceArray = [];
            var closestIndex = 0;
            var smallestDistance = undefined;
            for(var i = 0;i < enemies.length;i++){
                var distance = Math.sqrt(Math.pow((pichu.x - enemies[i].x),2) + Math.pow((pichu.y - enemies[i].y),2));
                distanceArray.push(distance);
                if((distance < smallestDistance || !smallestDistance) && enemies[i].status === "active"){
                    if(i != exclusion || enemies.length === 1){
                        smallestDistance = distance;
                        closestIndex = i;
                    }
                }
            }
            pichu.voltTackle.targetEnemyIndex = closestIndex;
            pichu.voltTackle.targetPhase = 0;
            if(!smallestDistance){
                pichu.voltTackle.end();
            }
        },
        update: function(){
            var newAreaOfAttack = {
                x: pichu.x - pichu.voltTackle.radius,
                y: pichu.y - pichu.voltTackle.radius,
                width: pichu.voltTackle.width,
                height: pichu.voltTackle.height
            }
            for(var i = 0;i < enemies.length;i++){
                var enemyHitbox;
                if(enemies[i].big){
                    enemyHitbox = enemies[i].hitbox();
                } else {
                    enemyHitbox = enemies[i];
                }
                if(objIntersectBoth(newAreaOfAttack, enemyHitbox) && enemies[i].status === "active" && pichu.voltTackle.active){
                    enemies[i].health-= pichu.voltTackle.damage();
                    if(enemies[i].health <= 0){
                        if(i === pichu.voltTackle.targetEnemyIndex){
                            console.log("killed enemy and it was target");
                            pichu.voltTackle.chooseEnemy(i);
                            pichu.voltTackle.targetPhase = 0;
                        } else {
                            console.log("killed enemy and it was not target");
                        }
                        pichu.health -= pichu.voltTackle.damage()*10;
                        enemies[i].damage(1);
                    }
                }
            }
            if(!this.big){
                this.bigMeter++;
                if(this.bigMeter >= 20){
                    this.big = true;
                }
            } else {
                this.bigMeter -= 2;
                if(this.bigMeter <= 0){
                    this.big = false;
                }
            }
            var target = enemies[pichu.voltTackle.targetEnemyIndex];
            if(!target && enemies.length > 0){
                pichu.voltTackle.chooseEnemy();
                target = enemies[pichu.voltTackle.targetEnemyIndex];
                pichu.voltTackle.targetPhase = 0;
            }
            if(enemies.length === 0){
                pichu.voltTackle.end();
            }
            if(target){
                var target_x, target_y;
                var targetSpots = [
                    {x: target.x + target.width/2, y: target.y + target.height},
                    {x: target.x, y: target.y + target.height/2},
                    {x: target.x + target.width/2, y: target.y},
                    {x: target.x + target.width, y: target.y + target.height/2},
                    {x: target.x + target.width/2, y: target.y + target.height},
                    {x: target.x, y: target.y + target.height/2},
                    {x: target.x + target.width/2, y: target.y},
                    {x: target.x + target.width, y: target.y + target.height/2}
                ]
                target_x = targetSpots[pichu.voltTackle.targetPhase].x;
                target_y = targetSpots[pichu.voltTackle.targetPhase].y;
                console.log(pichu.x, pichu.y, target_x, target_y);
                if(!(Math.abs(pichu.x - target_x) >= pichu.voltTackle.speed || Math.abs(pichu.y - target_y) >= pichu.voltTackle.speed)){
                    console.log("hit target");
                    pichu.voltTackle.dx = 0; //meaning it reached its target
                    pichu.voltTackle.dy = 0;
                    pichu.voltTackle.targetPhase++;
                    if(pichu.voltTackle.targetPhase >= targetSpots.length){
                        pichu.voltTackle.chooseEnemy(pichu.voltTackle.targetEnemyIndex);
                    }
                    pichu.voltTackle.hits--;
                    if(pichu.voltTackle.hits <= 0){
                        console.log("stopping"); //count is often around 435 or 483
                        pichu.voltTackle.end();
                    }
                } else {
                    if(pichu.x != target_x){
                        if(pichu.x > target_x){
                            if(Math.abs(pichu.x - target_x) > pichu.voltTackle.speed){
                                pichu.voltTackle.dx = -1 * pichu.voltTackle.speed;
                            } else {
                                pichu.voltTackle.dx = -1 * Math.abs(pichu.x - target_x);
                            }
                        } else {
                            if(Math.abs(pichu.x - target_x) > pichu.voltTackle.speed){
                                pichu.voltTackle.dx = pichu.voltTackle.speed;
                            } else {
                                pichu.voltTackle.dx =  Math.abs(pichu.x - target_x);
                            }
                        }
                    } else {
                        pichu.voltTackle.dx = 0;
                    }
                    if(pichu.y != target_y){
                        if(pichu.y > target_y){
                            if(Math.abs(pichu.y - target_y) > pichu.voltTackle.speed){
                                pichu.voltTackle.dy = -1 * pichu.voltTackle.speed;
                            } else {
                                pichu.voltTackle.dy = -1 * Math.abs(pichu.y - target_y);
                            }
                        } else {
                            if(Math.abs(pichu.y - target_y) > pichu.voltTackle.speed){
                                pichu.voltTackle.dy = pichu.voltTackle.speed;
                            } else {
                                pichu.voltTackle.dy =  Math.abs(pichu.y - target_y);
                            }
                        }
                    } else {
                        pichu.voltTackle.dy = 0;
                    }
                }
                console.log(target_x, target_y);
                console.log("above is target");
                pichu.x += pichu.voltTackle.dx;
                pichu.y += pichu.voltTackle.dy;
            }
            if(!pichu.voltTackle.active){
                pichu.voltTackle.end();
            } else {
                pichu.voltTackle.draw();
            }
    
        }
    },
    hitbox: function(){
        var newPichu = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        switch(this.direction){
            case "down":
                newPichu.x += 23;
                newPichu.width = 54;
                newPichu.y += 28;
                newPichu.height = 67;
                break;
            case "up":
                newPichu.x += 23;
                newPichu.width = 54;
                newPichu.y += 29;
                newPichu.height = 67;
                break;
            case "left":
                newPichu.x += 28;
                newPichu.width = 52;
                newPichu.y += 21;
                newPichu.height = 71;
                break;
            case "right":
                newPichu.x += 36;
                newPichu.width = 52;
                newPichu.y += 24;
                newPichu.height = 71;
                break;
            default:
                break;
                
        }
        return newPichu;
    },
    levelUpExp: function() {
        return 10*pichu.level;
    },
    gainExp: function(points){
        pichu.exp += points;
        if(pichu.exp >= pichu.levelUpExp()){
            var remainingExp = pichu.exp - pichu.levelUpExp();
            pichu.level++;
            pichu.exp = 0;
            pichu.levelUp(remainingExp);
        }
    },
    levelUp: function(remainingExp){
        if(pichu.voltTackle.active){
            pichu.health *= 1.5;
            if(pichu.health > pichu.max_Health()){
                pichu.health = pichu.max_Health();
            }
        } else {
            pichu.health = pichu.max_Health();
        }
        pichu.charge = pichu.charge_Max();
        var levelTag = document.getElementById("pichu_level");
        if(levelTag.getAttribute("status") === "level"){
            $("#level-label").text("");
            $("#pichu_level").attr("status", "levelingUp");
            rollingText("pichu_level", "Level Up!", function() {
                $("#level-label").text("Level");
                $("#pichu_level").attr("status", "level");
            })
        }
        pichu.gainExp(remainingExp);
    },
    checkClones: function(){
        var answer = 0;
        for(var i = 0;i < attacks.length;i++){
            if(attacks[i].name === "Double Team"){
                answer++;
            }
        }
        return answer;
    },
    live: true,
    health: 10,
    max_Health: function() {
        return 10 + 10*this.level;
        //return 1000000;
    },
    speed: function() {
        //return 5;
        return Math.min(2 + 0.5*pichu.level, 10);
    },
    i: 0,
    picture: pichuLoad.picture,
    motionDelay: 0,
    desiredDelay: 10,
    idle_i: 0,
    idleDelay: 0,
    idleDesiredDelay: 60,
    spriteMultiplier: 1,
    charge: 45,
    charge_Max: function() {
        return 45 + (20 * pichu.level);
    },
    loseCharge: function(amount){
        pichu.charge -= amount;
        if(pichu.charge < 0){
            pichu.charge = 0;
        }
    },
    gainCharge: function(amount){
        pichu.charge += amount;
        if(pichu.charge > pichu.charge_Max()){
            pichu.charge = pichu.charge_Max();
        }
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
    damageArray: [[0, 0, 1, 1]],
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
        //console.log(pichuTest);
        var test1 = pichuTest.x < 0 || (pichuTest.x + pichuTest.width) >= canvas.width;
        var test2 = pichuTest.y < 0 || (pichuTest.y + pichuTest.height) >= canvas.height;
        //console.log(test1 || test2);        
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
    gainHealth: function(amount){
        pichu.health += amount;
        if(pichu.health > pichu.max_Health()){
            pichu.health = pichu.max_Health();
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
        c.drawImage(this.pichuSheet, steps[0][0], steps[0][1], steps[0][2], steps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
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
            damageSteps = this.damageArray;
            if(this.damaged && this.damageCooldown%2 === 0){
                c.drawImage(this.pichuSheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            } else {
                c.drawImage(this.pichuSheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            }
        } else {
            idle_i = this.idle_i;
            this.myArray = this.myArray ? this.myArray : this.downIdleArrays;
            steps = this.myArray;
            damageSteps = this.damageArray;
            if(this.damaged && this.damageCooldown%2 === 0){
                    c.drawImage(this.pichuSheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            } else {
                    c.drawImage(this.pichuSheet, steps[idle_i][0], steps[idle_i][1], steps[idle_i][2], steps[idle_i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
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
    //attacks: ["Thunderbolt", "Volt Tackle", "Thunder"], this one is for testing these attacks
    attacks: !test ? ["Thunderbolt"] : ["Thunderbolt", "Volt Tackle", "Thunder"],
    attack: function(z) {
        var atkNum;
        if(z){
            atkNum = this.z_attackNumber;
        } else {
            atkNum = this.attackNumber;
        }
        if(pichu.voltTackle.active){
            atkNum = -10; //making sure that if Pichu is using Volt Tackle that no other attacks can be used
        }
        switch(atkNum){
            case 0:
                if(this.live && (this.charge >= 15)){
                    var frontPichu = frontOfPichu();
                    var newThunderbolt = new Thunderbolt(frontPichu.x, frontPichu.y, this.direction, 20);
                    this.idle_i = 0;
                    this.loseCharge(15);
                    this.attckWindDown = 10;
                    attacks.push(newThunderbolt);
                } else {
                    if(this.charge < 15){
                        var levelTag = document.getElementById("pichu_level");
                        if(levelTag.getAttribute("status") === "level"){
                            $("#level-label").text("");
                            $("#pichu_level").attr("status", "notEnoughCharge");
                            rollingText("pichu_level", "Not enough charge!", function() {
                                $("#level-label").text("Level");
                                $("#pichu_level").attr("status", "level");
                            })
                        }
                    }
                }
                break;
            case 1:
                if(this.live && (this.charge >= 20)){
                    var frontPichu = frontOfPichu();
                    var newSwift = new Swift(frontPichu.x, frontPichu.y, 5, 30, 15);
                    pichu.idle_i = 0;
                    pichu.loseCharge(20);
                    pichu.attckWindDown = 10;
                    attacks.push(newSwift);
                } else {
                    if(this.charge < 20){
                        var levelTag = document.getElementById("pichu_level");
                        if(levelTag.getAttribute("status") === "level"){
                            $("#level-label").text("");
                            $("#pichu_level").attr("status", "notEnoughCharge");
                            rollingText("pichu_level", "Not enough charge!", function() {
                                $("#level-label").text("Level");
                                $("#pichu_level").attr("status", "level");
                            })
                        }
                    }
                }
                break;
            case 2:
                if(this.live && (this.charge >= 15)){
                    if(pichu.checkClones() < 6){
                        pichu.idle_i = 0;
                        pichu.loseCharge(15);
                        pichu.attckWindDown = 10;
                        var doubleTeam = new DoubleTeam(pichu.x, pichu.y);
                        attacks.push(doubleTeam);
                    }
                } else {
                    if(this.charge < 15){
                        var levelTag = document.getElementById("pichu_level");
                        if(levelTag.getAttribute("status") === "level"){
                            $("#level-label").text("");
                            $("#pichu_level").attr("status", "notEnoughCharge");
                            rollingText("pichu_level", "Not enough charge!", function() {
                                $("#level-label").text("Level");
                                $("#pichu_level").attr("status", "level");
                            })
                        }
                    }
                }
                break;
            case 3:
                if(this.live && (this.charge >= this.thunderCost)){
                    var front = {
                        x: pichu.x + pichu.width/2,
                        y: pichu.y + pichu.height/2
                    }
                    switch(this.direction){
                        case "right":
                            front.x = pichu.x + pichu.width*1.5;
                            front.y = pichu.y;
                            break;
                        case "left":
                            front.x = pichu.x - pichu.width/3;
                            front.y = pichu.y;
                            break;
                        case "up":
                            front.y = pichu.y - pichu.height/1.5;
                        default:
                            break;
                    }
                    var newThunder = new Thunder(front.x, front.y, this.direction);
                    this.idle_i = 0;
                    this.loseCharge(this.thunderCost);
                    this.attckWindDown = 10;
                    attacks.push(newThunder);
                } else {
                    if(this.charge < this.thunderCost){
                        var levelTag = document.getElementById("pichu_level");
                        if(levelTag.getAttribute("status") === "level"){
                            $("#level-label").text("");
                            $("#pichu_level").attr("status", "notEnoughCharge");
                            rollingText("pichu_level", "Not enough charge!", function() {
                                $("#level-label").text("Level");
                                $("#pichu_level").attr("status", "level");
                            })
                        }
                    }
                }
                break;
            case 4:
                if(this.live && (this.charge >= this.voltTackleCost)){
                    this.idle_i = 0;
                    this.loseCharge(this.voltTackleCost);
                    this.health -= pichu.max_Health()/3;
                    this.attckWindDown = 10;
                    pichu.voltTackle.active = true;
                    pichu.voltTackle.hits = 8 + 4 * Math.floor(pichu.level/4);
                    pichu.damaged = true;
                } else {
                    if(this.charge < this.voltTackleCost){
                        var levelTag = document.getElementById("pichu_level");
                        if(levelTag.getAttribute("status") === "level"){
                            $("#level-label").text("");
                            $("#pichu_level").attr("status", "notEnoughCharge");
                            rollingText("pichu_level", "Not enough charge!", function() {
                                $("#level-label").text("Level");
                                $("#pichu_level").attr("status", "level");
                            })
                        }
                    }
                }
                break;
            default:
                console.log("No attack here... or you're using Volt Tackle");
                break;
        }
    },
    update: function() {
        if(this.live){
            if(!pichu.voltTackle.active){
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
                            var distance = this.speed();
                            if(this.slowed_Down > 0){
                                distance /= 3;
                            }
                            this.y -= distance;
                            if((this.intersect()[0] || this.hitWall()) && !pichu.freeRoam){
                                var index = -5;
                                if(this.intersect()[0]){
                                    if(this.intersect()[1] >= 0){
                                    index = this.intersect()[1];
                                    }
                                }
                                this.y += distance;
                                if(index >= 0){
                                    collidables[index].approach();
                                }
                            } else {
                                if(!this.intersect()[0] && !this.hitWall()){
                                    pichu.freeRoam = false;
                                }
                            }
                            break;
                        case "down":
                            var distance = this.speed();
                            if(this.slowed_Down > 0){
                                distance /= 3;
                            }
                            this.y += distance;
                            if((this.intersect()[0] || this.hitWall()) && !pichu.freeRoam){
                                var index = -5;
                                if(this.intersect()[0]){
                                    if(this.intersect()[1] >= 0){
                                    index = this.intersect()[1];
                                    collidables[index].drawn = true;
                                    }
                                }
                                this.y -= distance;
                                if(index >= 0){
                                    collidables[index].approach();
                                }
                            } else {
                                if(!this.intersect()[0] && !this.hitWall()){
                                    pichu.freeRoam = false;
                                }
                            }
                            break;
                        case "left":
                            var distance = this.speed();
                            console.log("distance is " + this.speed());
                            if(this.slowed_Down > 0){
                                distance /= 3;
                            }
                            this.x -= distance;
                            if((this.intersect()[0] || this.hitWall()) && !pichu.freeRoam){
                                var index = -5;
                                if(this.intersect()[0]){
                                    if(this.intersect()[1] >= 0){
                                    index = this.intersect()[1];
                                    }
                                }
                                this.x += distance;
                                if(index >= 0){
                                    collidables[index].approach();
                                }
                            } else {
                                if(!this.intersect()[0] && !this.hitWall()){
                                    pichu.freeRoam = false;
                                }
                            }
                            break;
                        case "right":
                            var distance = this.speed();
                            if(this.slowed_Down > 0){
                                distance /= 3;
                            }
                            this.x += distance;
                            if((this.intersect()[0] || this.hitWall()) && !pichu.freeRoam){
                                var index = -5;
                                if(this.intersect()[0]){
                                    if(this.intersect()[1] >= 0){
                                    index = this.intersect()[1];
                                    }
                                }
                                this.x -= distance;
                                if(index >= 0){
                                    collidables[index].approach();
                                }
                            } else {
                                if(!this.intersect()[0] && !this.hitWall()){
                                    pichu.freeRoam = false;
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
                if(this.charge < this.charge_Max()){
                    var currentThunder = false;
                    for(var i = 0;i < attacks.length;i++){
                        if(attacks[i].name === "Thunder"){
                            currentThunder = true;
                        }
                    }
                    if(!currentThunder){
                        if(this.motion){
                            this.charge+=0.15;
                        } else {
                            this.charge+=0.05;
                        }
                    } else {
                        this.charge+=0.02;
                    }
                }
                if(this.damaged){
                    this.damageCooldown--;
                    if(this.damageCooldown < 0){
                        this.damaged = false;
                        this.damageCooldown = 50;
                    }
                }
                if(this.slowed_Down > 0){
                    this.slowed_Down--;
                }
                this.draw();
                if(this.spikyEared){
                    spikyEar.draw();
                }
            } else {
                pichu.voltTackle.update();
            }
        } else {
            this.defeat();
            if(this.spikyEared){
                spikyEar.draw();
            }
        }
    }
}

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
        animateID = requestAnimationFrame(animate);
    } else {
    picMenu = true;
    cancelAnimationFrame(animateID);
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
        var index = -1;
        var limiter = Math.min(pichu.level + 1, 11);
        for(var i = 0;i < 3;i++){
            var newRow = $("<div>", {"class":"row"});
            for(var j = 0;j < 4;j++){
                var newCol = $("<div>", {"class":"col-md-3"});
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
        pauseMenu();
    }
}

function pauseMenu() {
    optionize("P A U S E", "How to Play", "Quit Game", "Continue Playing", "Change Attack", "Change Z-Attack");
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
            window.onkeydown = window.onkeyup = "";
            mainMenunize();
        }
    }
    option3.onclick = pause;

    option4.onclick = function() {
        var optionsArray = pichu.attacks.slice();
        optionsArray.push("Go Back (this isn't an attack)");
        for(var i = 0;i < optionsArray.length;i++){
            switch(optionsArray[i]){
                case "Thunderbolt":
                    if(pichu.attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Swift":
                    if(pichu.attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Double Team":
                    if(pichu.attackNumber === 2){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 2){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                 case "Thunder":
                    if(pichu.attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Volt Tackle":
                    if(pichu.attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                default:
                    break;

            }
        }
        $("#optionRow").remove();
        optionizeArrayVer("Which attack would you like to select? (* means the attack is mapped to the Spacebar, ** means it is mapped to the Z key)", optionsArray);

        var optionArrayByClass = document.getElementsByClassName("options");
        for(var i = 0;i < optionArrayByClass.length;i++){
            optionArrayByClass[i].onclick = function(option){
                console.log(option.target.innerText.replace(/\*/g, ''));
                switch(option.target.innerText.replace(/\*/g, '')){
                    case "Thunderbolt":
                        if(pichu.attackNumber != 0 && pichu.z_attackNumber != 0){
                            pichu.attackNumber = 0;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Swift":
                        if(pichu.attackNumber != 1 && pichu.z_attackNumber != 1){
                            pichu.attackNumber = 1;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Double Team":
                        if(pichu.attackNumber != 2 && pichu.z_attackNumber != 2){
                            pichu.attackNumber = 2;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Thunder":
                        if(pichu.attackNumber != 3 && pichu.z_attackNumber != 3){
                            pichu.attackNumber = 3;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Volt Tackle":
                        if(pichu.attackNumber != 4 && pichu.z_attackNumber != 4){
                            pichu.attackNumber = 4;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    default:
                        $("#optionRow").remove();
                        pauseMenu();
                }
            }
        }
    }

    option5.onclick = function() {
        var optionsArray = pichu.attacks.slice();
        optionsArray.push("Go Back (this isn't an attack)");
        for(var i = 0;i < optionsArray.length;i++){
            switch(optionsArray[i]){
                case "Thunderbolt":
                    if(pichu.attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Swift":
                    if(pichu.attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Double Team":
                    if(pichu.attackNumber === 2){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 2){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Thunder":
                    if(pichu.attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Volt Tackle":
                    if(pichu.attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                default:
                    break;

            }
        }
        $("#optionRow").remove();
        optionizeArrayVer("Which attack would you like to select to be mapped to the Z key? (* means the attack is mapped to the Spacebar, ** means it is mapped to the Z key)", optionsArray);

        var optionArrayByClass = document.getElementsByClassName("options");
        for(var i = 0;i < optionArrayByClass.length;i++){
            optionArrayByClass[i].onclick = function(option){
                console.log(option.target.innerText.replace(/\*/g, ''));
                switch(option.target.innerText.replace(/\*/g, '')){
                    case "Thunderbolt":
                        if(pichu.attackNumber != 0 && pichu.z_attackNumber != 0){
                            pichu.z_attackNumber = 0;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Swift":
                        if(pichu.attackNumber != 1 && pichu.z_attackNumber != 1){
                            pichu.z_attackNumber = 1;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Double Team":
                        if(pichu.attackNumber != 2 && pichu.z_attackNumber != 2){
                            pichu.z_attackNumber = 2;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Thunder":
                        if(pichu.attackNumber != 3 && pichu.z_attackNumber != 3){
                            pichu.z_attackNumber = 3;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Volt Tackle":
                        if(pichu.attackNumber != 4 && pichu.z_attackNumber != 4){
                            pichu.z_attackNumber = 4;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    default:
                        $("#optionRow").remove();
                        pauseMenu();
                }
            }
        }
    }
   
}

window.onkeydown = function(event) {
    event.preventDefault();
    if(canvas.style.zIndex != "" && canvas.style.zIndex < 1 && event.key != "Enter"){
        console.log("bingo");
    } else {
    switch(event.key){
        case "ArrowUp":
            if(!pichu.voltTackle.active){
                if(pichu.direction != "up"){
                    pichu.turnUp();
                }
                pichu.startMoving();
            }
            break;
        case "ArrowDown":
            if(!pichu.voltTackle.active){
                if(pichu.direction != "down"){
                    pichu.i = 1;
                    pichu.turnDown();
                }
                pichu.startMoving();
            }
            break;
        case "ArrowLeft":
            if(!pichu.voltTackle.active){
                if(pichu.direction != "left"){
                    pichu.i = 1;
                    pichu.turnLeft();
                }
                pichu.startMoving();
            }
            break;
        case "ArrowRight":
            if(!pichu.voltTackle.active){
                if(pichu.direction != "right"){
                    pichu.i = 1;
                    pichu.turnRight();
                }
                pichu.startMoving();
            }
            break;
        case "Enter":
            if(pauseReady){
                pause();
                pauseReady = false;
            } else {
                console.log("not pause ready");
            }
            break;
        case " ":
            pichu.attack();
            break;
        case "z":
            if(pichu.attacks.length > 1){
                pichu.attack(true);
            }
            break;
        default:
            break;
    }
    }
    };

window.onkeyup = function(event){
    var possibleDirection = event.key.slice(5).toLowerCase();
    if(pichu.direction === possibleDirection){
        pichu.stopMoving();
    }
    switch(event.key){
        case "Enter":
            if(!pauseReady){
                pauseReady = true;
            }
            break;
        default:
            break;
    }
};

function enemyRush(number){
    if(enemies.length === 0){
        if(continueRush){
            rushModeCount++;
            console.log("Wave " + rushModeCount);
        }
        if(rushModeCount <= 5){
            for(var i = 0;i < rushModeCount;i++){
                var voltorb_x_coordinate;
                var voltorb_y_coordinate;
                for(var j = 0;j < 1;j++){
                    var randomCoordinate = {
                        x: Math.floor(Math.random()*(canvas.width - 200)),
                        y: Math.floor(Math.random()*(canvas.height - 200)),
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
        } else if(rushModeCount === 6){
            if(continueRush){
                continueRush = false;
                berryPlace("oran");
                berryPlace("leppa");
                rollingText("directions", "Eat berries to restore health/charge!", function(){
                    if(!startMeBaby){
                        $("#directions").text("");
                    } else {
                        emptyFn();
                    } 
                });
            }
            if(collidables.length === 0){
                continueRush = true;
            }
        } else if(rushModeCount > 6 && rushModeCount < 9){
            if(rushModeCount === 7){
                $("#directions").text("");
            }
            var placeOranBerry = rushModeCount === 9 || ((rushModeCount%3 === 0) && (pichu.health < pichu.max_Health())) || (pichu.health < (pichu.max_Health()/2));
            var placeLeppaBerry = rushModeCount === 9 || ((rushModeCount%3 === 0) && (pichu.charge < pichu.charge_Max()));
            if(placeOranBerry){
                berryPlace("oran");
            }
            if(placeLeppaBerry){
                berryPlace("leppa");
            }
            for(var i = 0;i < (rushModeCount - 6);i++){
                var wooper_x_coordinate;
                var wooper_y_coordinate;
                for(var j = 0;j < 1;j++){
                    var randomCoordinate = {
                        x: Math.floor(Math.random()*(canvas.width - 200)),
                        y: Math.floor(Math.random()*(canvas.height - 200)),
                        height: 100,
                        width: 100
                    }
                    if(objIntersectBoth(randomCoordinate, pichu)){
                        j--;
                    } else {
                        wooper_x_coordinate = randomCoordinate.x;
                        wooper_y_coordinate = randomCoordinate.y;
                    }
                }
                var newWooper = new Wooper(wooper_x_coordinate, wooper_y_coordinate);
                enemies.push(newWooper);
            }
        } else {
            if(pichu.live){
                var placeOranBerry = (((rushModeCount%3 === 0) && (pichu.health < pichu.max_Health())) || (pichu.health < (pichu.max_Health()/2))) && rushModeCount % 5 != 1;
                var placeLeppaBerry = (((rushModeCount%3 === 0) && (pichu.charge < pichu.charge_Max()))) && rushModeCount % 5 != 1;
                if(placeOranBerry){
                    berryPlace("oran");
                }
                if(placeLeppaBerry){
                    berryPlace("leppa");
                }
            }
            //endless mode (until I code in other stuff)
            if(rushModeCount % 5 === 0){
                if(continueRush){
                    continueRush = false;
                    if(rushModeCount <= 15){ //15 should be the first two boss levels
                        floor = battleFloor;
                        rollingText("directions", "Snorlax wants to battle!", function(){
                            if(!startMeBaby){
                                $("#directions").text("");
                            } else {
                                emptyFn();
                            }
                        });
                        var enemy_x_coordinate;
                        var enemy_y_coordinate;
                        for(var j = 0;j < 1;j++){
                            var randomCoordinate = {
                                x: Math.floor(Math.random()*(canvas.width - 200)),
                                y: Math.floor(Math.random()*(canvas.height - 200)),
                                height: 300,
                                width: 300
                            }
                            if(objIntersectBoth(randomCoordinate, pichu) || ((randomCoordinate.x + randomCoordinate.width) >= canvas.width) || ((randomCoordinate.y + randomCoordinate.height) >= canvas.height)){
                                j--;
                            } else {
                                enemy_x_coordinate = randomCoordinate.x;
                                enemy_y_coordinate = randomCoordinate.y;
                            }
                        }
                        var newSnorlax = new Snorlax(enemy_x_coordinate, enemy_y_coordinate, Math.floor(Math.random() * 2));
                        bossPokemon = "Snorlax";
                        enemies.push(newSnorlax);
                    } else if(rushModeCount === 20){
                        var enemy_x_coordinate;
                        var enemy_y_coordinate;
                        for(var j = 0;j < 1;j++){
                            var randomCoordinate = {
                                x: Math.floor(Math.random()*(canvas.width - 200)),
                                y: Math.floor(Math.random()*(canvas.height - 200)),
                                height: 300,
                                width: 300
                            }
                            if(objIntersectBoth(randomCoordinate, pichu) || ((randomCoordinate.x + randomCoordinate.width) >= canvas.width) || ((randomCoordinate.y + randomCoordinate.height) >= canvas.height)){
                                j--;
                            } else {
                                enemy_x_coordinate = randomCoordinate.x;
                                enemy_y_coordinate = randomCoordinate.y;
                            }
                        }
                        let isShiny = false;
                        var newVoltorb = new EvolvingVoltorb(enemy_x_coordinate, enemy_y_coordinate, Math.floor(Math.random() * 2), isShiny);
                        bossPokemon = "Electrode";
                        enemies.push(newVoltorb);
                    } else {
                        let bossArray = ["Snorlax", "Electrode"];
                        let bossChoice = bossArray[Math.floor(Math.random() * bossArray.length)];
                        switch(bossChoice){
                            case "Snorlax":
                                floor = battleFloor;
                                rollingText("directions", "Snorlax wants to battle!", function(){
                                    if(!startMeBaby){
                                        $("#directions").text("");
                                    } else {
                                        emptyFn();
                                    }
                                });
                                var enemy_x_coordinate;
                                var enemy_y_coordinate;
                                for(var j = 0;j < 1;j++){
                                    var randomCoordinate = {
                                        x: Math.floor(Math.random()*(canvas.width - 200)),
                                        y: Math.floor(Math.random()*(canvas.height - 200)),
                                        height: 300,
                                        width: 300
                                    }
                                    if(objIntersectBoth(randomCoordinate, pichu) || ((randomCoordinate.x + randomCoordinate.width) >= canvas.width) || ((randomCoordinate.y + randomCoordinate.height) >= canvas.height)){
                                        j--;
                                    } else {
                                        enemy_x_coordinate = randomCoordinate.x;
                                        enemy_y_coordinate = randomCoordinate.y;
                                    }
                                }
                                var newSnorlax = new Snorlax(enemy_x_coordinate, enemy_y_coordinate, Math.floor(Math.random() * 2));
                                bossPokemon = "Snorlax";
                                enemies.push(newSnorlax);
                                break;
                            case "Electrode":
                                var enemy_x_coordinate;
                                var enemy_y_coordinate;
                                for(var j = 0;j < 1;j++){
                                    var randomCoordinate = {
                                        x: Math.floor(Math.random()*(canvas.width - 200)),
                                        y: Math.floor(Math.random()*(canvas.height - 200)),
                                        height: 300,
                                        width: 300
                                    }
                                    if(objIntersectBoth(randomCoordinate, pichu) || ((randomCoordinate.x + randomCoordinate.width) >= canvas.width) || ((randomCoordinate.y + randomCoordinate.height) >= canvas.height)){
                                        j--;
                                    } else {
                                        enemy_x_coordinate = randomCoordinate.x;
                                        enemy_y_coordinate = randomCoordinate.y;
                                    }
                                }
                                let isShiny = false;
                                if(pichu.attacks.length >= 3){
                                    var rand = Math.random();
                                    isShiny = rand > 0.9;
                                    if(pichu.attacks.length > 3 || rushModeCount >= 20){
                                        isShiny = rand >= 0.7;
                                        if(pichu.attacks.length > 4){
                                            isShiny = rand >= 0.3;
                                        }
                                    }
                                }
                                var newVoltorb = new EvolvingVoltorb(enemy_x_coordinate, enemy_y_coordinate, Math.floor(Math.random() * 2), isShiny);
                                bossPokemon = "Electrode";
                                enemies.push(newVoltorb);
                                break;
                            default:
                                floor = battleFloor;
                                rollingText("directions", "Snorlax wants to battle!", function(){
                                    if(!startMeBaby){
                                        $("#directions").text("");
                                    } else {
                                        emptyFn();
                                    }
                                });
                                var enemy_x_coordinate;
                                var enemy_y_coordinate;
                                for(var j = 0;j < 1;j++){
                                    var randomCoordinate = {
                                        x: Math.floor(Math.random()*(canvas.width - 200)),
                                        y: Math.floor(Math.random()*(canvas.height - 200)),
                                        height: 300,
                                        width: 300
                                    }
                                    if(objIntersectBoth(randomCoordinate, pichu) || ((randomCoordinate.x + randomCoordinate.width) >= canvas.width) || ((randomCoordinate.y + randomCoordinate.height) >= canvas.height)){
                                        j--;
                                    } else {
                                        enemy_x_coordinate = randomCoordinate.x;
                                        enemy_y_coordinate = randomCoordinate.y;
                                    }
                                }
                                var newSnorlax = new Snorlax(enemy_x_coordinate, enemy_y_coordinate, Math.floor(Math.random() * 2));
                                bossPokemon = "Snorlax";
                                enemies.push(newSnorlax);
                                break;
                        }
                    }
                }
            } else if(rushModeCount % 5 === 1){
                if(continueRush){
                    continueRush = false;
                    var pokeball = new Pokeball(300, 300, false, function() {
                        var options = ["oran", "leppa", "Swift", "Double Team"];
                        if(pichu.attacks.includes("Swift") && options.includes("Swift")){
                            options.splice(options.indexOf("Swift"),1);
                        }
                        if(pichu.attacks.includes("Double Team") && options.includes("Double Team")){
                            options.splice(options.indexOf("Double Team"),1);
                        }
                        if(pichu.health >= pichu.max_Health()){
                            options.splice(options.indexOf("oran"),1);
                            options.splice(options.indexOf("leppa"),1)
                        }
                        var healthConditional = pichu.max_Health()/2;
                        if(pichu.attacks.length >= 3 && pichu.health >= healthConditional){
                            if(pichu.thunderCost === 1){
                                pichu.thunderCost = pichu.charge_Max() * 0.95;
                                pichu.voltTackleCost = pichu.charge_Max() * 0.6;
                            }
                            if(!pichu.attacks.includes("Thunder")){
                                options.push("Thunder");
                            }
                            if(!pichu.attacks.includes("Volt Tackle")){
                                options.push("Volt Tackle");
                            }
                        }
                        if(pichu.attacks.length >= 2 && !pichu.receivedItem){
                            if(!pichuLoad.hasSpikyEar){
                                options.push("spikyEar");
                            }
                            if(pichuLoad.paintjobs.length < arrayOfPaints.length){
                                options.push("paint");
                            }
                        }

                        var option = options[Math.floor(Math.random() * options.length)];
                        switch(option){
                            case "Swift":
                                var swiftTM = new Tm(300, 300, "Swift", function() {
                                    pichu.z_attackNumber = 1;
                                });
                                collidables.push(swiftTM);
                                break;
                            case "Double Team":
                                var doubleTeamTM = new Tm(300, 300, "Double Team", function(){
                                    pichu.z_attackNumber = 2;
                                });
                                collidables.push(doubleTeamTM);
                                break;
                            case "oran":
                                var newBerry = new oranBerry(300, 300, 3);
                                collidables.push(newBerry);
                                break;
                            case "leppa":
                                var newBerry = new leppaBerry(300, 300, 3);
                                collidables.push(newBerry);
                                break;
                            case "Thunder":
                                var thunderTM = new Tm(300, 300, "Thunder", function(){
                                    pichu.z_attackNumber = 3;
                                }, true);
                                collidables.push(thunderTM);
                                break;
                            case "Volt Tackle":
                                var voltTackleTM = new Tm(300, 300, "Volt Tackle", function(){
                                    pichu.z_attackNumber = 4;
                                }, true);
                                collidables.push(voltTackleTM);
                                break;
                            case "spikyEar":
                                var orb = new SpikyEarOrb(300, 300, function(){
                                    rollingText("directions", "Spiky Ear Collected!", function() {
                                        if(!startMeBaby){
                                            $("#directions").text("");
                                        } else {
                                            var b = new Blank(0, 0);
                                            collidables.push(b);
                                            rollingText("directions", "Spiky Ear Collected! (Check it out in the Change Avatar section!)", function(){
                                                if(!startMeBaby){
                                                    $("#directions").text("");
                                                } else {
                                                    collidables.pop();
                                                }                                            
                                            });
                                        }
                                    })
                                });
                                collidables.push(orb);
                                pichu.receivedItem = true;
                                break;
                            case "paint":
                                var paintArrays = [];
                                for(var i = 0;i < arrayOfPaints.length;i++){
                                    if(!pichuLoad.paintjobs.includes(arrayOfPaints[i])){
                                        paintArrays.push(arrayOfPaints[i]);
                                    }
                                }
                                if(paintArrays.length > 0){
                                    var chosenPaint = paintArrays[Math.floor(Math.random() * paintArrays.length)];
                                    var newBucket = new PaintBucket(300, 300, chosenPaint, function(){
                                        var b = new Blank(0, 0);
                                        collidables.push(b);
                                        rollingText("directions", "New Paint Collected! (Check it out in the Change Avatar section!)", function(){
                                            if(!startMeBaby){
                                                $("#directions").text("");
                                            } else {
                                                collidables.pop();
                                            }
                                        });
                                    });
                                    collidables.push(newBucket);
                                    pichu.receivedItem = true;
                                } else {
                                    console.log("no paint")
                                    var newBerry = new oranBerry(300, 300, 3);
                                    collidables.push(newBerry);
                                }
                                break;
                            default: 
                                break;
                        }
                    });
                    collidables.push(pokeball);
                    rollingText("directions", "You defeated " + bossPokemon + "! (Obtain the item to continue!)", function(){
                        if(!startMeBaby){
                            $("#directions").text("");
                        } else {
                            emptyFn();
                        }
                    });
                }
                if(collidables.length === 0){
                    //means the berries were eaten
                    continueRush = true;
                }
            } else {
                floor = grassFloor;
                if(rushModeCount % 5 > 1){
                    $("#directions").text("");
                }
                for(var i = 0;i < 5;i++){
                    var enemy_x_coordinate;
                    var enemy_y_coordinate;
                    for(var j = 0;j < 1;j++){
                        var randomCoordinate = {
                            x: Math.floor(Math.random()*(canvas.width - 200)),
                            y: Math.floor(Math.random()*(canvas.height - 200)),
                            height: 100,
                            width: 100
                        }
                        if(objIntersectBoth(randomCoordinate, pichu)){
                            j--;
                        } else {
                            enemy_x_coordinate = randomCoordinate.x;
                            enemy_y_coordinate = randomCoordinate.y;
                        }
                    }
                    var newEnemy;
                    var enemyChoice = Math.floor(Math.random() * 2);
                    if(rushModeCount < 15 && i > 2){
                        enemyChoice = 0;
                    }
                    var isShiny = false;
                    if(pichu.attacks.length >= 3){
                        var rand = Math.random();
                        isShiny = rand > 0.9;
                        if(pichu.attacks.length > 3 || rushModeCount >= 20){
                            isShiny = rand >= 0.7;
                            if(pichu.attacks.length > 4){
                                isShiny = rand >= 0.3;
                            }
                        }
                    }
                    // if(rushModeCount >= 15 && pichu.attacks.length < 3){
                    //     var rand = Math.random();
                    //     isShiny = rand > 0.7;
                    // } added this to make it more difficult if the player had yet to get 3 attacks, but realized making the game harder for struggling players is silly
                    switch(enemyChoice){
                        case 0:
                            newEnemy = new Voltorb(enemy_x_coordinate, enemy_y_coordinate, Math.floor(Math.random() * 2), isShiny);
                            break;
                        case 1:
                            newEnemy = new Wooper(enemy_x_coordinate, enemy_y_coordinate, isShiny);
                            break;
                        default:
                            break;
                    }
                    enemies.push(newEnemy);
                }
            }
        }
    }
}

document.getElementById("player-pic").onclick = pictureMenu;


function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(floor, 0, 0, canvas.width, canvas.height);
    collidableDraw();
    pichu.update();
    // c.beginPath();
    // c.strokeStyle = "yellow";
    // c.strokeRect(pichu.hitbox().x, pichu.hitbox().y, pichu.hitbox().width, pichu.hitbox().height);
    // c.stroke();
    collidableDelayDraw();
    if(rushModeCount >= 0){
        enemyRush(rushModeCount);
    }
    var target = pichu;
    for(var i = 0;i < attacks.length;i++){
        if(attacks[i].name === "Double Team"){
            target = attacks[i];
            i = attacks.length;
        }
    }
    for(var i = 0;i < enemies.length;i++){
    enemies[i].update(target);
    }
    for(var i = 0;i < enemyAttacks.length;i++){
        switch(enemyAttacks[i].name){
            case "Thunderbolt":
                for(var j = 0;j < 5;j++){
                    if(enemyAttacks[i]){
                        enemyAttacks[i].update();
                    }
                }
                break;
            default:
                enemyAttacks[i].update();
                break;
        }
    }
    if(pichu.voltTackle.active){
        pichu.voltTackle.draw();
    }
    for(var i = 0;i < attacks.length;i++){
        switch(attacks[i].name){
            case "Thunderbolt":
                for(var j = 0;j < 5;j++){
                    if(attacks[i]){
                        attacks[i].update();
                    }
                }
                break;
            default:
                attacks[i].update();
                break;
        }
    }
    var levelTag = document.getElementById("pichu_level");
    if(levelTag.getAttribute("status") === "level"){
        document.getElementById("pichu_level").innerText = pichu.level;
    }
    var chargebar = document.getElementById("charge_bar");
    chargebar.max = pichu.charge_Max();
    chargebar.value = pichu.charge;
    var healthbar = document.getElementById("hp_bar");
    healthbar.max = pichu.max_Health();
    healthbar.value = pichu.health;
    var expbar = document.getElementById("exp_bar");
    expbar.max = pichu.levelUpExp();
    expbar.value = pichu.exp;
    animateID = requestAnimationFrame(animate);
}

function rushMode() {
    pichu.health = pichu.max_Health();
    pichu.level = 0;
    pichu.exp = 0;
    var directionsRemove = false;
    // var testSign = new Sign(300, 300, "Attack and evade the enemies coming for you! You can click the picture at the bottom-left to change it. You obtain more options by leveling up! Once you close this box, the game will start! Good luck!", function() {
    //     collidables.splice(collidables.indexOf(testSign),1);
    //     $("#arrowDirections").text("");
    //     rushModeCount++;
    //     }
    // );
    var newPokeball = new Pokeball(300, 300, false, function() {
        collidables.splice(collidables.indexOf(newPokeball),1);
        rushModeCount++;
        if(directionsRemove){
            $("#directions").text("");
        } else {
            directionsRemove = true;
        }
    })
    rollingText("directions", "Hit Enter to Pause!\nHit Spacebar to attack!\nAttack the Pokéball to begin!", function() {
        if(directionsRemove || !startMeBaby){
            $("#directions").text("");
        } else {
            directionsRemove = true;
        }
    });
    collidables.push(newPokeball);
    animateID = requestAnimationFrame(animate);
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
        //canvas.style.position = "absolute";
        canvas.style.zIndex = 1;
        picMenu = false
        paused = false;
        startMeBaby = true;
        $("#directions").text("");
        if(test){
            startRush(true);
        } else {
            startRush();
        }
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
        $("#directions").text("");
        mainMenunize();
    }


}

    rushMode();
}

/*** 
 * 
 *  THE FOLLOWING FUNCTION IS FOR THE SPRITE TESTING MODE
 * (WHICH I ADDED TO SIMPLIFY TESTING COORDINATES FROM THE MAIN SPRITESHEET TO USE)
 * 
 * ***/
function spriteTest() {
    canvas = document.querySelector("canvas");
    var mappy = document.getElementById("map");
    map.css("background-image","none");
canvas.width = mappy.scrollWidth;
canvas.height = mappy.scrollHeight;
c = canvas.getContext("2d");
collidables = [];
paused = false;
pauseReady = true;
getables = [];
attacks = [];
enemyAttacks = [];
enemies = [];
picMenu = false;
floor = basicFloor;
spriteInput = false; 
var testDown, testUp, testLeft, testRight, testDownIdle, testUpIdle, testLeftIdle, testRightIdle, testDownAttack, testUpAttack, testLeftAttack, testRightAttack, testDamage, testHeight, testWidth;
function resetSprites(){
    pichu.speed = pichu.mainSpeed;
    pichu.pichuSheet = pichuSheet();
    testDown = [[0, 0, 215, 215], [230, 0, 215, 215], [0, 0, 215, 215], [467, 0, 215, 215]]; 
    testUp = [[0, 290, 215, 215], [240, 293, 215, 215], [0, 290, 215, 215], [480, 290, 215, 215]];
    testLeft = [[0, 610, 215, 215], [230, 610, 215, 215], [0, 610, 215, 215], [467, 610, 215, 215]];
    testRight = [[0, 900, 215, 215], [230, 900, 215, 215], [0, 900, 215, 215], [467, 900, 215, 215]];
    testDownIdle = [[0, 0, 215, 215], [947, 0, 215, 215]];
    testUpIdle = [[0, 290, 215, 215]];
    testLeftIdle = [[0, 610, 215, 215], [955, 610,215, 215]];
    testRightIdle = [[0, 900, 215, 215], [944, 900, 215, 215]];
    testDownAttack = [[717, 0, 215, 215]];
    testUpAttack = [[714, 290, 215, 215]];
    testLeftAttack = [[718, 610, 215, 215]];
    testRightAttack = [[708, 900, 215, 215]];
    testDamage = [[0, 0, 1, 1]];
    testHeight = testWidth = 100;
    setPichu();
}

function useWooperSprites() {
    pichu.speed = function() {
        return Math.min(5 + 0.5*pichu.level, 10);
    }
    pichu.pichuSheet = spritesheet;
    testDown = [[70, 1620, 194, 194], [460, 1620, 194, 194], [70, 1620, 194, 194], [460, 1620, 194, 194]];
    testUp = [[890, 1611, 194, 194], [1085, 1611, 194, 194], [890, 1611, 194, 194], [1087, 1610, 194, 194]];
    testLeft = [[2120, 1625, 194, 194], [2500, 1635, 194, 194], [2120, 1625, 194, 194], [2500, 1635, 194, 194]];
    testRight = [[1294, 1615, 194, 194], [1673, 1623, 194, 194], [1294, 1615, 194, 194], [1673, 1623, 194, 194]];
    testDownIdle = [[70, 1620, 194, 194], [265, 1619, 194, 194]];
    testUpIdle = [[890, 1611, 194, 194]];
    testLeftIdle = [[2120, 1625, 194, 194], [2289, 1638, 194, 194]];
    testRightIdle = [[1294, 1615, 194, 194], [1470, 1620, 194, 194]];
    testDownAttack = [[675, 1625, 194, 194]];
    testUpAttack = [[1085, 1611, 194, 194]];
    testLeftAttack = [[2733, 1634, 194, 194]];
    testRightAttack = [[1900, 1627, 194, 194]];
    testDamage = [[0, 0, 1, 1]];
    testHeight = testWidth = 100;
    setPichu();
}

function useSnorlaxSprites() {
    pichu.pichuSheet = snorlaxSpritesheet;
    pichu.speed = function() {
        return 0.5;
    }
    pichu.attackNumber = 11;
    pichu.x = pichu.y = 300;
    testDown = [[66, 88, 522, 522], [66, 88, 522, 522], [1390, 72, 522, 522], [1390, 72, 522, 522], [66, 88, 522, 522], [66, 88, 522, 522], [2040, 88, 522, 522], [2040, 88, 522, 522]];
    testUp = [[695, 705, 522, 522], [695, 705, 522, 522], [1375, 710, 522, 522], [1375, 710, 522, 522], [695, 705, 522, 522], [695, 705, 522, 522], [2018, 714, 522, 522], [2018, 714, 522, 522]];
    testLeft = [[737, 1245, 545, 545], [737, 1245, 545, 545], [1345, 1261, 545, 545], [1345, 1261, 545, 545]];
    testRight = [[687, 1843, 545, 545], [687, 1843, 545, 545], [1260, 1833, 545, 545], [1260, 1833, 545, 545]];
    testDownIdle = [[66, 88, 522, 522], [694, 91, 522, 522]];
    testUpIdle = [[695, 705, 522, 522]];
    testLeftIdle = [[737, 1245, 545, 545], [2010, 1248, 545, 545]];
    testRightIdle = [[687, 1843, 545, 545], [1945, 1857, 545, 545]];
    testDownAttack = [[88, 695, 522, 522]];
    testUpAttack = [[105, 1280, 522, 522]];
    testLeftAttack = [[140, 1850, 545, 545]];
    testRightAttack = [[2433, 1871, 545, 545]];
    testDamage = [[0, 0, 1, 1]];
    testHeight = testWidth = 300;
    setPichu();
}

function useElectrodeSprites() {
    pichu.pichuSheet = electrodeSpritesheet;
    testHeight = testWidth = 200;
    testDown = [[73, 76, 327, 327], [493, 80, 327, 327], [73, 76, 327, 327], [493, 80, 327, 327]];
    testUp = [[103, 553, 327, 327], [546, 559, 327, 327]];
    testDownIdle = [[73, 76, 327, 327]];
    testUpIdle = [[103, 553, 327, 327]];
    testDownAttack = [[2430, 97, 327, 327]];
    testUpAttack = [[103, 553, 327, 327]];
    testLeftIdle = [[97, 981, 327, 327]];
    testLeft = [[97, 981, 327, 327], [535, 998, 327, 327], [97, 981, 327, 327], [535, 998, 327, 327]];
    testLeftAttack = [[991, 1007, 327, 327]];
    testRightIdle = [[98, 1370, 327, 327]];
    testRight = [[98, 1370, 327, 327], [525, 1386, 327, 327], [98, 1370, 327, 327], [525, 1386, 327, 327]];
    testRightAttack = [[1006, 1405, 327, 327]];
    rollingDown = [[878, 97, 327, 327], [1266, 96, 327, 327], [1656, 89, 327, 327], [2045, 90, 327, 327]];
    rollingUp = [[546, 559, 327, 327], [2045, 90, 327, 327], [1656, 89, 327, 327], [1266, 96, 327, 327]];
    rollingLeft = [[1427, 991, 327, 327], [1958, 992, 327, 327], [2472, 990, 327, 327], [2962, 990, 327, 327]];
    rollingRight = [[1427, 991, 327, 327], [2962, 990, 327, 327], [2472, 990, 327, 327], [1958, 992, 327, 327]];
    setPichu();
}

function setPichu(){
    pichu.downArrays = testDown;
    pichu.upArrays = testUp;
    pichu.leftArrays = testLeft;
    pichu.rightArrays = testRight;
    pichu.downIdleArrays = testDownIdle;
    pichu.upIdleArrays = testUpIdle;
    pichu.leftIdleArrays = testLeftIdle;
    pichu.rightIdleArrays = testRightIdle;
    pichu.downAttackArray = testDownAttack;
    pichu.upAttackArray = testUpAttack;
    pichu.leftAttackArray = testLeftAttack;
    pichu.rightAttackArray = testRightAttack;
    pichu.damageArray = testDamage;
    pichu.height = testHeight;
    pichu.width = testWidth;
}

document.getElementById("player-pic").className = "pictureSelect";

pichu = {
    mode: "default",
    direction: "down",
    motion: false,
    spikyEared: pichuLoad.usingSpikyEar ? true : false,
    x: pichuLoad.x,
    y: pichuLoad.y,
    pichuSheet: pichuSheet(),
    attackNumber: 0,
    z_attackNumber: 1,
    radius: 5,
    attacking: false, //testing for hyper beam
    height: 100,
    width: 100,
    damaged: false,
    damageCooldown: 50,
    level: pichuLoad.level,
    exp: pichuLoad.exp,
    slowed_Down: 0, //this property is mainly used when Pichu is hit by attacks that would slow them down temporarily
    hitbox: function(){
        var newPichu = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        switch(this.direction){
            case "down":
                newPichu.x += 23;
                newPichu.width = 54;
                newPichu.y += 28;
                newPichu.height = 67;
                break;
            case "up":
                newPichu.x += 23;
                newPichu.width = 54;
                newPichu.y += 29;
                newPichu.height = 67;
                break;
            case "left":
                newPichu.x += 28;
                newPichu.width = 52;
                newPichu.y += 21;
                newPichu.height = 71;
                break;
            case "right":
                newPichu.x += 36;
                newPichu.width = 52;
                newPichu.y += 24;
                newPichu.height = 71;
                break;
            default:
                break;
                
        }
        return newPichu;
    },
    levelUpExp: function() {
        return 10*pichu.level;
    },
    gainExp: function(points){
        pichu.exp += points;
        if(pichu.exp >= pichu.levelUpExp()){
            var remainingExp = pichu.exp - pichu.levelUpExp();
            pichu.level++;
            pichu.exp = 0;
            pichu.levelUp(remainingExp);
        }
    },
    levelUp: function(remainingExp){
        pichu.health = pichu.max_Health();
        pichu.charge = pichu.charge_Max();
        $("#level-label").text("");
        $("#pichu_level").attr("status", "levelingUp");
        rollingText("pichu_level", "Level Up!", function() {
            $("#level-label").text("Level");
            $("#pichu_level").attr("status", "level");
            pichu.gainExp(remainingExp);
        })
    },
    checkClones: function(){
        var answer = 0;
        for(var i = 0;i < attacks.length;i++){
            if(attacks[i].name === "Double Team"){
                answer++;
            }
        }
        return answer;
    },
    live: true,
    health: 10,
    max_Health: function() {
        return 10 + 10*this.level;
    },
    mainSpeed: function() {
        return Math.min(2 + 0.5*pichu.level, 10);
    },
    i: 0,
    picture: pichuLoad.picture,
    motionDelay: 0,
    desiredDelay: 10,
    idle_i: 0,
    idleDelay: 0,
    idleDesiredDelay: 60,
    spriteMultiplier: 1,
    charge: 45,
    charge_Max: function() {
        return 45 + (20 * pichu.level);
    },
    loseCharge: function(amount){
        pichu.charge -= amount;
        if(pichu.charge < 0){
            pichu.charge = 0;
        }
    },
    gainCharge: function(amount){
        pichu.charge += amount;
        if(pichu.charge > pichu.charge_Max()){
            pichu.charge = pichu.charge_Max();
        }
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
    damageArray: [[0, 0, 1, 1]],
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
        //console.log(pichuTest);
        var test1 = pichuTest.x < 0 || (pichuTest.x + pichuTest.width) >= canvas.width;
        var test2 = pichuTest.y < 0 || (pichuTest.y + pichuTest.height) >= canvas.height;
        //console.log(test1 || test2);
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
    gainHealth: function(amount){
        pichu.health += amount;
        if(pichu.health > pichu.max_Health()){
            pichu.health = pichu.max_Health();
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
        c.drawImage(this.pichuSheet, steps[0][0], steps[0][1], steps[0][2], steps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
    },
    draw: function() {
        if(!this.live){
            return;
        }
        if(this.motion){
            i = this.i;
            this.myArray = this.myArray ? this.myArray : this.downArrays; //as myArray starts off undefined, this will change it to be equal to the down array by default
            //steps = this.myArray;
            var directionArray = ["left", "right", "down", "up"];
        var directionAttacksArray = [this.leftAttackArray, this.rightAttackArray, this.downAttackArray, this.upAttackArray];
        steps = this.attacking ? directionAttacksArray[directionArray.indexOf(this.direction)] : this.myArray; //if Snorlax is attacking (with hyper beam), should update to use the correct directional array
            if(steps.length === 1){
                i = 0;
            }
            damageSteps = this.damageArray;
            if(this.damaged && this.damageCooldown%2 === 0){
                c.drawImage(this.pichuSheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            } else {
                c.drawImage(this.pichuSheet, steps[i][0], steps[i][1], steps[i][2], steps[i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            }
        } else {
            idle_i = this.idle_i;
            this.myArray = this.myArray ? this.myArray : this.downIdleArrays;
            //steps = this.myArray;
            var directionArray = ["left", "right", "down", "up"];
        var directionAttacksArray = [this.leftAttackArray, this.rightAttackArray, this.downAttackArray, this.upAttackArray];
        steps = this.attacking ? directionAttacksArray[directionArray.indexOf(this.direction)] : this.myArray; //if Snorlax is attacking (with hyper beam), should update to use the correct directional array
            damageSteps = this.damageArray;
            if(this.attacking){
                idle_i = 0;
            }
            if(this.damaged && this.damageCooldown%2 === 0){
                    c.drawImage(this.pichuSheet, damageSteps[0][0], damageSteps[0][1], damageSteps[0][2], damageSteps[0][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
            } else {
                    c.drawImage(this.pichuSheet, steps[idle_i][0], steps[idle_i][1], steps[idle_i][2], steps[idle_i][3], this.x, this.y, this.width * this.spriteMultiplier, this.height * this.spriteMultiplier);
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
    attacks: ["Thunderbolt", "Swift", "Double Team", "Thunder", "Hyper Beam", "Cry (testing for Swift)"],
    attack: function(z) {
        var atkNum;
        if(z){
            atkNum = this.z_attackNumber;
        } else {
            atkNum = this.attackNumber;
        }
        switch(atkNum){
            case 0:
                if(this.live && (this.charge >= 15)){
                    var frontPichu = frontOfPichu();
                    var newThunderbolt = new Thunderbolt(frontPichu.x, frontPichu.y, this.direction, 20);
                    this.idle_i = 0;
                    this.loseCharge(15);
                    this.attckWindDown = 10;
                    attacks.push(newThunderbolt);
                }
                break;
            case 1:
                if(this.live && (this.charge >= 20)){
                    var frontPichu = frontOfPichu();
                    var newSwift = new Swift(frontPichu.x, frontPichu.y, 5, 30, 15);
                    pichu.idle_i = 0;
                    pichu.loseCharge(20);
                    pichu.attckWindDown = 10;
                    attacks.push(newSwift);
                }
                break;
            case 2:
                if(this.live && (this.charge >= 0)){
                    // pichu.idle_i = 0;
                    // pichu.loseCharge(5);
                    // pichu.attckWindDown = 10;
                    // var newCry = new Snore((pichu.x + pichu.width/2), (pichu.y + pichu.height/2));
                    var front = {
                        x: pichu.x + pichu.width/2,
                        y: pichu.y + (pichu.height*2/5)
                    }

                    if(this.direction === "left"){
                        front.x = pichu.x + pichu.width*7/24;
                    }
                    if(this.direction === "right"){
                        front.x += pichu.width*4/24;
                    }

                    pichu.idle_i = 0;
                    pichu.loseCharge(5);
                    pichu.attckWindDown = 10;
                    pichu.damaged = true;
                    var newCry = new Snore(front.x, front.y);
                    
                }
                break;
            case 3:
                if(this.live && (this.charge >= 15)){
                    if(pichu.checkClones() < 6){
                        pichu.idle_i = 0;
                        pichu.loseCharge(15);
                        pichu.attckWindDown = 10;
                        var doubleTeam = new DoubleTeam(pichu.x, pichu.y);
                        attacks.push(doubleTeam);
                    }
                }
                break;
            case 4:
                if(this.live && (this.charge >= 1)){
                    var front = {
                        x: pichu.x + pichu.width/2,
                        y: pichu.y + pichu.height/2
                    }
                    switch(this.direction){
                        case "right":
                            front.x = pichu.x + pichu.width*1.5;
                            front.y = pichu.y;
                            break;
                        case "left":
                            front.x = pichu.x - pichu.width/3;
                            front.y = pichu.y;
                            break;
                        case "up":
                            front.y = pichu.y - pichu.height/1.5;
                        default:
                            break;
                    }
                    var newThunder = new Thunder(front.x, front.y, this.direction);
                    this.idle_i = 0;
                    this.loseCharge(50);
                    this.attckWindDown = 10;
                    attacks.push(newThunder);
                }
                break;
            case 10:
                if(this.live && (this.charge >= 10)){
                    var frontPichu = frontOfPichu();
                    var newMudshot = new Mudshot(frontPichu.x, frontPichu.y, this.direction, 30);
                    this.idle_i = 0;
                    this.charge -= 10;
                    this.attckWindDown = 10;
                    console.log(newMudshot.name);
                    attacks.push(newMudshot);
                }
                break;
            case 11:
                if(pichu.pichuSheet === spritesheet){
                    if(this.live && (this.charge >= 10)){
                        var frontPichu = frontOfPichu();
                        this.idle_i = 0;
                        this.charge -= 10;
                        this.attckWindDown = 10;
                        var newHB = new HyperBeam(frontPichu.x, frontPichu.y, pichu.direction, pichu);
                        this.attacking = true;
                        attacks.push(newHB);
                    }
                } else {
                    if(this.live && (this.charge >= 10)){
                        var front = {
                            x: pichu.x + pichu.width/2,
                            y: pichu.y + pichu.height/2
                        }
                        switch(this.direction){
                            case "right":
                                front.x = pichu.x + pichu.width*5/6;
                                front.y = pichu.y + pichu.height/3;
                                break;
                            case "left":
                                front.x = pichu.x + pichu.width*1/15;
                                front.y = pichu.y + pichu.height/3;
                                break;
                            case "up":
                                front.y = pichu.y + pichu.height/7;
                            default:
                                break;
                        }
                        this.idle_i = 0;
                        this.charge -= 10;
                        this.attckWindDown = 10;
                        var newHB = new HyperBeam(front.x, front.y, pichu.direction, pichu);
                        this.attacking = true;
                        attacks.push(newHB);
                    }
                }
            default:
                console.log("No attack here!");
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
                        var distance = this.speed();
                        if(this.slowed_Down > 0){
                            distance /= 3;
                        }
                        this.y -= distance;
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                }
                            }
                            this.y += distance;
                            if(index >= 0){
                                collidables[index].approach();
                            }
                        }
                        break;
                    case "down":
                        var distance = this.speed();
                        if(this.slowed_Down > 0){
                            distance /= 3;
                        }
                        this.y += distance;
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                collidables[index].drawn = true;
                                }
                            }
                            this.y -= distance;
                            if(index >= 0){
                                collidables[index].approach();
                            }
                        }
                        break;
                    case "left":
                        var distance = this.speed();
                        console.log("distance is " + this.speed());
                        if(this.slowed_Down > 0){
                            distance /= 3;
                        }
                        this.x -= distance;
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                }
                            }
                            this.x += distance;
                            if(index >= 0){
                                collidables[index].approach();
                            }
                        }
                        break;
                    case "right":
                        var distance = this.speed();
                        if(this.slowed_Down > 0){
                            distance /= 3;
                        }
                        this.x += distance;
                        if(this.intersect()[0] || this.hitWall()){
                            var index = -5;
                            if(this.intersect()[0]){
                                if(this.intersect()[1] >= 0){
                                index = this.intersect()[1];
                                }
                            }
                            this.x -= distance;
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
            if(this.charge < this.charge_Max()){
                if(this.motion){
                    this.charge+=0.15;
                } else {
                    this.charge+=0.05;
                }
            }
            if(this.damaged){
                this.damageCooldown--;
                if(this.damageCooldown < 0){
                    this.damaged = false;
                    this.damageCooldown = 50;
                }
            }
            if(this.slowed_Down > 0){
                this.slowed_Down--;
            }
            this.draw();
            if(this.spikyEared){
                spikyEar.draw();
            }
        } else {
            this.defeat();
            if(this.spikyEared){
                spikyEar.draw();
            }
        }
    }
}

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

var spriteSign = {
    x: 500,
    y: 300,
    width: 100,
    height: 100,
    drawn: false,
    myArray: [[1058, 1258, 298, 284]],
    test: {
    x: 520,
    y: 320,
    width: 60,
    height: 60
    },
    draw: function() {
        c.drawImage(spritesheet, this.myArray[0][0], this.myArray[0][1], this.myArray[0][2], this.myArray[0][3], this.x, this.y, this.width, this.height);
        this.drawn = false;
    },
    update: function() {
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
        if(!this.drawn){
            this.draw();
        }
    },
    approach: function() {
        console.log("did");
        if(picMenu){
            return;
        }
        picMenu = true;
        pichu.stopMoving();
        $("#map").css("background-color", "transparent");
        canvas.style.position = "fixed";
        canvas.style.zIndex = -1;
        var newDiv = $("<div>", {"class":"row bison borderMe"});
        newDiv.css({"background-color":"rgb(185, 122, 87)", "color":"black"});
        $("#map").append(newDiv);
        spriteMenu = document.querySelector(".bison");
        function spriteMain() {
            spriteMenu.innerText = "";
            var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
            $(".bison").append(header);
            document.querySelector("#spriteHeaderText").innerText = "Select which type of sprites you'd like to change!";
            var motionOption = $("<div class=\"col-md-3 option1 options\"style=\"font-size: 2em;\">Motion</div>");
            $(".bison").append(motionOption);

            var idleOption = $("<div class=\"col-md-3 option2 options\"style=\"font-size: 2em;\">Idle</div>");
            $(".bison").append(idleOption);

            var attackOption = $("<div class=\"col-md-3 option3 options\"style=\"font-size: 2em;\">Attack</div>");
            $(".bison").append(attackOption);

            var sizeOption = $("<div class=\"col-md-3 option4 options\"style=\"font-size: 2em;\">Size</div>");
            $(".bison").append(sizeOption);

            var closeOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Close Menu</div>");
            $(".bison").append(closeOption);

            motionOption = document.querySelector(".option1");
            motionOption.onclick = function() { motionMenu(); };

            idleOption = document.querySelector(".option2");
            idleOption.onclick = function() { idleMenu(); };

            attackOption = document.querySelector(".option3");
            attackOption.onclick = function() {attackMenu();};

            sizeOption = document.querySelector(".option4");
            sizeOption.onclick = function() {sizeMenu();};

            closeOption = document.querySelector(".option5");
            closeOption.onclick = function() {
                spriteInput = false;
                pictureMenu();
            }
        }

        function sizeMenu(){
            var propertiesArray = [testHeight, testWidth];
            spriteMenu.innerText = "";
            var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
            $(".bison").append(header);
            document.querySelector("#spriteHeaderText").innerText = "Change the following values as you see fit!";
            var formContainer = $("<form id=\"spriteForm\">");
            $(".bison").append(formContainer);
            var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
            $(".bison").append(backOption);
            backOption = document.querySelector(".option5");
            backOption.onclick = function() {spriteMain();};

            var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
            $(".bison").append(closeOption);
            closeOption = document.querySelector(".option6");
            closeOption.onclick = function() {
                spriteInput = false;
                pictureMenu();
            }

            for(var i = 0;i < propertiesArray.length;i++){
                var divLabel = $("<div class=\"col-md-2\" style=\"float:left;\"></div>");
                switch(i){
                    case 0:
                        divLabel.text("Height");
                        break;
                    case 1:
                        divLabel.text("Width");
                        break;
                    default:
                        divLabel.text("???");
                        break;
                }
                $("#spriteForm").append(divLabel);
                var newDiv = $("<div class=\"col-md-3 \" style=\"float:left;\"></div>");
                var newInput = $(`<input id=\"propertyInput${i}\" type=\"number\" style=\"width: 50%\">`);
                newDiv.append(newInput);
                $("#spriteForm").append(newDiv);
                document.getElementById("propertyInput" + i).value = propertiesArray[i];
            }
            
            var submitButton = $("<button id=\"submit\" value=\"submit\">Submit Value</button>");
            $("#spriteForm").append(submitButton);
            $("#submit").on("click", function(event) {
                event.preventDefault();
                newHeight = document.getElementById("propertyInput0").value;
                newWidth = document.getElementById("propertyInput1").value;
                testHeight = parseInt(newHeight);
                testWidth = parseInt(newWidth);
                pichu.x = 100;
                pichu.y = 100;
                setPichu();
            })
            spriteInput = true;
        }

        function motionMenu(direction){
            if(!direction){
                spriteMenu.innerText = "";
                var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
                $(".bison").append(header);
                document.querySelector("#spriteHeaderText").innerText = "MOTION: Select which direction you'd like to work with!";
                var downOption = $("<div class=\"col-md-3 option1 options\"style=\"font-size: 2em;\">Down</div>");
                $(".bison").append(downOption);

                var upOption = $("<div class=\"col-md-3 option2 options\"style=\"font-size: 2em;\">Up</div>");
                $(".bison").append(upOption);

                var leftOption = $("<div class=\"col-md-3 option3 options\"style=\"font-size: 2em;\">Left</div>");
                $(".bison").append(leftOption);

                var rightOption = $("<div class=\"col-md-3 option4 options\"style=\"font-size: 2em;\">Right</div>");
                $(".bison").append(rightOption);

                var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
                $(".bison").append(backOption);

                var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
                $(".bison").append(closeOption);

                downOption = document.querySelector(".option1");
                downOption.onclick = function() {motionMenu("down")};

                upOption = document.querySelector(".option2");
                upOption.onclick = function() {motionMenu("up")};

                leftOption = document.querySelector(".option3");
                leftOption.onclick = function() {motionMenu("left")};

                rightOption = document.querySelector(".option4");
                rightOption.onclick = function() {motionMenu("right")};

                backOption = document.querySelector(".option5");
                backOption.onclick = spriteMain;

                closeOption = document.querySelector(".option6");
                closeOption.onclick = function() {
                    spriteInput = false;
                    pictureMenu();
                }
            } else {
                var directionArray;
                switch(direction){
                    case "down":
                        directionArray = testDown;
                        break;
                    case "up":
                        directionArray = testUp;
                        break;
                    case "left":
                        directionArray = testLeft;
                        break;
                    case "right":
                        directionArray = testRight;
                        break;
                    default:
                        spriteMain();
                        break;
                }
                spriteMenu.innerText = "";
                var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
                $(".bison").append(header);
                document.querySelector("#spriteHeaderText").innerText = "Change the following values as you see fit!";
                var formContainer = $("<form id=\"spriteForm\">");
                $(".bison").append(formContainer);
                var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
                $(".bison").append(backOption);
                backOption = document.querySelector(".option5");
                backOption.onclick = function() {motionMenu();};

                var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
                $(".bison").append(closeOption);
                closeOption = document.querySelector(".option6");
                closeOption.onclick = function() {
                    spriteInput = false;
                    pictureMenu();
                }

                for(var i = 0;i < directionArray.length;i++){
                    var arr = directionArray[i];
                    var divLabel = $("<div class=\"col-md-3\" style=\"float:left;\"></div>");
                    switch(i){
                        case 0:
                            divLabel.text("First Array");
                            break;
                        case 1:
                            divLabel.text("Second Array");
                            break;
                        case 2:
                            divLabel.text("Third Array");
                            break;
                        case 3:
                            divLabel.text("Fourth Array");
                            break;
                        default:
                            divLabel.text("Mystery Array");
                            break;
                    }
                    $("#spriteForm").append(divLabel);
                    for(var j = 0;j < arr.length;j++){
                        var newDiv = $("<div class=\"col-md-2 \" style=\"float:left;\"></div>");
                        var newInput = $(`<input id=\"${i}-${j}\" type=\"number\" style=\"width: 50%\">`);
                        newDiv.append(newInput);
                        $("#spriteForm").append(newDiv);
                        document.getElementById(i+"-"+j).value = parseInt(arr[j]);
                    }
                }
                var submitButton = $("<button id=\"submit\" value=\"submit\">Submit Values</button>");
                $("#spriteForm").append(submitButton);
                $("#submit").on("click", function(event) {
                    event.preventDefault();
                    var newDirectionArray = [];
                    for(var i = 0;i < 4;i++){
                        var newArray = [];
                        for(var j = 0;j < 4;j++){
                            var newValue = document.getElementById(i+"-"+j).value;
                            newArray.push(newValue); //setting up new array to be the sprites array
                        }
                        newDirectionArray.push(newArray); //creating the new array of arrays
                    }
                    directionArray = newDirectionArray;
                    switch(direction){
                        case "down":
                            testDown = directionArray;
                            break;
                        case "up":
                            testUp = directionArray;
                            break;
                        case "left":
                            testLeft = directionArray;
                            break;
                        case "right":
                            testRight = directionArray;
                            break;
                        default:
                            console.log("how did you get here?");
                            break;
                    }
                    setPichu();
                })
                spriteInput = true;

            }
        }

        function idleMenu(direction){
            if(!direction){
                spriteMenu.innerText = "";
                var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
                $(".bison").append(header);
                document.querySelector("#spriteHeaderText").innerText = "IDLE: Select which direction you'd like to work with!";
                var downOption = $("<div class=\"col-md-3 option1 options\"style=\"font-size: 2em;\">Down</div>");
                $(".bison").append(downOption);

                var upOption = $("<div class=\"col-md-3 option2 options\"style=\"font-size: 2em;\">Up</div>");
                $(".bison").append(upOption);

                var leftOption = $("<div class=\"col-md-3 option3 options\"style=\"font-size: 2em;\">Left</div>");
                $(".bison").append(leftOption);

                var rightOption = $("<div class=\"col-md-3 option4 options\"style=\"font-size: 2em;\">Right</div>");
                $(".bison").append(rightOption);

                var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
                $(".bison").append(backOption);

                var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
                $(".bison").append(closeOption);

                downOption = document.querySelector(".option1");
                downOption.onclick = function() {idleMenu("down")};

                upOption = document.querySelector(".option2");
                upOption.onclick = function() {idleMenu("up")};

                leftOption = document.querySelector(".option3");
                leftOption.onclick = function() {idleMenu("left")};

                rightOption = document.querySelector(".option4");
                rightOption.onclick = function() {idleMenu("right")};

                backOption = document.querySelector(".option5");
                backOption.onclick = spriteMain;

                closeOption = document.querySelector(".option6");
                closeOption.onclick = function() {
                    spriteInput = false;
                    pictureMenu();
                }
            } else {
                var directionArray;
                switch(direction){
                    case "down":
                        directionArray = testDownIdle;
                        break;
                    case "up":
                        directionArray = testUpIdle;
                        break;
                    case "left":
                        directionArray = testLeftIdle;
                        break;
                    case "right":
                        directionArray = testRightIdle;
                        break;
                    default:
                        spriteMain();
                        break;
                }
                spriteMenu.innerText = "";
                var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
                $(".bison").append(header);
                document.querySelector("#spriteHeaderText").innerText = "Change the following values as you see fit!";
                var formContainer = $("<form id=\"spriteForm\">");
                $(".bison").append(formContainer);
                var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
                $(".bison").append(backOption);
                backOption = document.querySelector(".option5");
                backOption.onclick = function() {idleMenu();};

                var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
                $(".bison").append(closeOption);
                closeOption = document.querySelector(".option6");
                closeOption.onclick = function() {
                    spriteInput = false;
                    pictureMenu();
                }

                for(var i = 0;i < directionArray.length;i++){
                    var arr = directionArray[i];
                    var divLabel = $("<div class=\"col-md-3\" style=\"float:left;\"></div>");
                    switch(i){
                        case 0:
                            divLabel.text("First Array");
                            break;
                        case 1:
                            divLabel.text("Second Array");
                            break;
                        case 2:
                            divLabel.text("Third Array");
                            break;
                        case 3:
                            divLabel.text("Fourth Array");
                            break;
                        default:
                            divLabel.text("Mystery Array");
                            break;
                    }
                    $("#spriteForm").append(divLabel);
                    for(var j = 0;j < arr.length;j++){
                        var newDiv = $("<div class=\"col-md-2 \" style=\"float:left;\"></div>");
                        var newInput = $(`<input id=\"${i}-${j}\" type=\"number\" style=\"width: 50%\">`);
                        newDiv.append(newInput);
                        $("#spriteForm").append(newDiv);
                        document.getElementById(i+"-"+j).value = parseInt(arr[j]);
                    }
                }
                var submitButton = $("<button id=\"submit\" value=\"submit\">Submit Values</button>");
                $("#spriteForm").append(submitButton);
                $("#submit").on("click", function(event) {
                    event.preventDefault();
                    var newDirectionArray = [];
                    for(var i = 0;i < directionArray.length;i++){
                        var newArray = [];
                        for(var j = 0;j < 4;j++){
                            var newValue = document.getElementById(i+"-"+j).value;
                            newArray.push(newValue); //setting up new array to be the sprites array
                        }
                        newDirectionArray.push(newArray); //creating the new array of arrays
                    }
                    directionArray = newDirectionArray;
                    switch(direction){
                        case "down":
                            testDownIdle = directionArray;
                            break;
                        case "up":
                            testUpIdle = directionArray;
                            break;
                        case "left":
                            testLeftIdle = directionArray;
                            break;
                        case "right":
                            testRightIdle = directionArray;
                            break;
                        default:
                            console.log("how did you get here?");
                            break;
                    }
                    setPichu();
                })
                spriteInput = true;

            }
        }

        function attackMenu(direction){
            if(!direction){
                spriteMenu.innerText = "";
                var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
                $(".bison").append(header);
                document.querySelector("#spriteHeaderText").innerText = "ATTACK: Select which direction you'd like to work with!";
                var downOption = $("<div class=\"col-md-3 option1 options\"style=\"font-size: 2em;\">Down</div>");
                $(".bison").append(downOption);

                var upOption = $("<div class=\"col-md-3 option2 options\"style=\"font-size: 2em;\">Up</div>");
                $(".bison").append(upOption);

                var leftOption = $("<div class=\"col-md-3 option3 options\"style=\"font-size: 2em;\">Left</div>");
                $(".bison").append(leftOption);

                var rightOption = $("<div class=\"col-md-3 option4 options\"style=\"font-size: 2em;\">Right</div>");
                $(".bison").append(rightOption);

                var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
                $(".bison").append(backOption);

                var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
                $(".bison").append(closeOption);

                downOption = document.querySelector(".option1");
                downOption.onclick = function() {attackMenu("down")};

                upOption = document.querySelector(".option2");
                upOption.onclick = function() {attackMenu("up")};

                leftOption = document.querySelector(".option3");
                leftOption.onclick = function() {attackMenu("left")};

                rightOption = document.querySelector(".option4");
                rightOption.onclick = function() {attackMenu("right")};

                backOption = document.querySelector(".option5");
                backOption.onclick = spriteMain;

                closeOption = document.querySelector(".option6");
                closeOption.onclick = function() {
                    spriteInput = false;
                    pictureMenu();
                }
            } else {
                var directionArray;
                switch(direction){
                    case "down":
                        directionArray = testDownAttack;
                        break;
                    case "up":
                        directionArray = testUpAttack;
                        break;
                    case "left":
                        directionArray = testLeftAttack;
                        break;
                    case "right":
                        directionArray = testRightAttack;
                        break;
                    default:
                        spriteMain();
                        break;
                }
                spriteMenu.innerText = "";
                var header = $("<div id=\"spriteHeaderText\" class=\"col-md-12 text-center\" style=\"font-size: 2em; border-style: solid; border-color: blue; background-color: aqua; color:black\"></div>");
                $(".bison").append(header);
                document.querySelector("#spriteHeaderText").innerText = "Change the following values as you see fit!";
                var formContainer = $("<form id=\"spriteForm\">");
                $(".bison").append(formContainer);
                var backOption = $("<div class=\"col-md-3 option5 options\"style=\"font-size: 2em;\">Back</div>");
                $(".bison").append(backOption);
                backOption = document.querySelector(".option5");
                backOption.onclick = function() {attackMenu();};

                var closeOption = $("<div class=\"col-md-3 option6 options\"style=\"font-size: 2em;\">Close Menu</div>");
                $(".bison").append(closeOption);
                closeOption = document.querySelector(".option6");
                closeOption.onclick = function() {
                    spriteInput = false;
                    pictureMenu();
                }

                for(var i = 0;i < directionArray.length;i++){
                    var arr = directionArray[i];
                    var divLabel = $("<div class=\"col-md-3\" style=\"float:left;\"></div>");
                    switch(i){
                        case 0:
                            divLabel.text("First Array");
                            break;
                        case 1:
                            divLabel.text("Second Array");
                            break;
                        case 2:
                            divLabel.text("Third Array");
                            break;
                        case 3:
                            divLabel.text("Fourth Array");
                            break;
                        default:
                            divLabel.text("Mystery Array");
                            break;
                    }
                    $("#spriteForm").append(divLabel);
                    for(var j = 0;j < arr.length;j++){
                        var newDiv = $("<div class=\"col-md-2 \" style=\"float:left;\"></div>");
                        var newInput = $(`<input id=\"${i}-${j}\" type=\"number\" style=\"width: 50%\">`);
                        newDiv.append(newInput);
                        $("#spriteForm").append(newDiv);
                        document.getElementById(i+"-"+j).value = parseInt(arr[j]);
                    }
                }
                var submitButton = $("<button id=\"submit\" value=\"submit\">Submit Values</button>");
                $("#spriteForm").append(submitButton);
                $("#submit").on("click", function(event) {
                    event.preventDefault();
                    var newDirectionArray = [];
                    for(var i = 0;i < directionArray.length;i++){
                        var newArray = [];
                        for(var j = 0;j < 4;j++){
                            var newValue = document.getElementById(i+"-"+j).value;
                            newArray.push(newValue); //setting up new array to be the sprites array
                        }
                        newDirectionArray.push(newArray); //creating the new array of arrays
                    }
                    directionArray = newDirectionArray;
                    switch(direction){
                        case "down":
                            testDownAttack = directionArray;
                            break;
                        case "up":
                            testUpAttack = directionArray;
                            break;
                        case "left":
                            testLeftAttack = directionArray;
                            break;
                        case "right":
                            testRightAttack = directionArray;
                            break;
                        default:
                            console.log("how did you get here?");
                            break;
                    }
                    setPichu();
                })
                spriteInput = true;

            }
        }

        spriteMain();
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
    cancelAnimationFrame(animateID);
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
        var index = -1;
        var limiter = Math.min(pichu.level + 1, 12);
        for(var i = 0;i < 3;i++){
            var newRow = $("<div>", {"class":"row"});
            for(var j = 0;j < 4;j++){
                var newCol = $("<div>", {"class":"col-md-3"});
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
        pauseMenu();
    }
}

function pauseMenu() {
    optionize("P A U S E", "How to Play", "Quit Game", "Continue Playing", "Change Attack", "Change Z-Attack");
    $(".options").css("background-color", "black");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var option4 = document.getElementById("option4");
    var option5 = document.getElementById("option5");
    var option6 = document.getElementById("option6");

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
            window.onkeydown = window.onkeyup = "";
            mainMenunize();
        }
    }
    option3.onclick = pause;

    option4.onclick = function() {
        var optionsArray = pichu.attacks.slice();
        optionsArray.push("Go Back (this isn't an attack)");
        for(var i = 0;i < optionsArray.length;i++){
            switch(optionsArray[i]){
                case "Thunderbolt":
                    if(pichu.attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Swift":
                    if(pichu.attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Double Team":
                    if(pichu.attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Thunder":
                    if(pichu.attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                default:
                    break;

            }
        }
        $("#optionRow").remove();
        optionizeArrayVer("Which attack would you like to select? (* means the attack is mapped to the Spacebar, ** means it is mapped to the Z key)", optionsArray);

        var optionArrayByClass = document.getElementsByClassName("options");
        for(var i = 0;i < optionArrayByClass.length;i++){
            optionArrayByClass[i].onclick = function(option){
                console.log(option.target.innerText.replace(/\*/g, ''));
                switch(option.target.innerText.replace(/\*/g, '')){
                    case "Thunderbolt":
                        if(pichu.attackNumber != 0 && pichu.z_attackNumber != 0){
                            pichu.attackNumber = 0;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Swift":
                        if(pichu.attackNumber != 1 && pichu.z_attackNumber != 1){
                            pichu.attackNumber = 1;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Cry (testing for Snore)":
                        if(pichu.attackNumber != 2 && pichu.z_attackNumber != 2){
                            pichu.attackNumber = 2;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Double Team":
                        if(pichu.attackNumber != 3 && pichu.z_attackNumber != 3){
                            pichu.attackNumber = 3;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Hyper Beam":
                        if(pichu.attackNumber != 11 && pichu.z_attackNumber != 11){
                            pichu.attackNumber = 11;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Thunder":
                        if(pichu.attackNumber != 4 && pichu.z_attackNumber != 4){
                            pichu.attackNumber = 4;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    default:
                        $("#optionRow").remove();
                        pauseMenu();
                }
            }
        }
    }

    option5.onclick = function() {
        var optionsArray = pichu.attacks.slice();
        optionsArray.push("Go Back (this isn't an attack)");
        for(var i = 0;i < optionsArray.length;i++){
            switch(optionsArray[i]){
                case "Thunderbolt":
                    if(pichu.attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 0){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Swift":
                    if(pichu.attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 1){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Double Team":
                    if(pichu.attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 3){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                case "Thunder":
                    if(pichu.attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("*");
                    }
                    if(pichu.z_attackNumber === 4){
                        optionsArray[i] = optionsArray[i].concat("**");
                    }
                    break;
                default:
                    break;

            }
        }
        $("#optionRow").remove();
        optionizeArrayVer("Which attack would you like to select to be mapped to the Z key? (* means the attack is mapped to the Spacebar, ** means it is mapped to the Z key)", optionsArray);

        var optionArrayByClass = document.getElementsByClassName("options");
        for(var i = 0;i < optionArrayByClass.length;i++){
            optionArrayByClass[i].onclick = function(option){
                console.log(option.target.innerText.replace(/\*/g, ''));
                switch(option.target.innerText.replace(/\*/g, '')){
                    case "Thunderbolt":
                        if(pichu.attackNumber != 0 && pichu.z_attackNumber != 0){
                            pichu.z_attackNumber = 0;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Swift":
                        if(pichu.attackNumber != 1 && pichu.z_attackNumber != 1){
                            pichu.z_attackNumber = 1;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Cry (testing for Swift)":
                        if(pichu.attackNumber != 2 && pichu.z_attackNumber != 2){
                            pichu.z_attackNumber = 2;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Double Team":
                        if(pichu.attackNumber != 3 && pichu.z_attackNumber != 3){
                            pichu.z_attackNumber = 3;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Hyper Beam":
                        if(pichu.attackNumber != 11 && pichu.z_attackNumber != 11){
                            pichu.z_attackNumber = 11;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    case "Thunder":
                        if(pichu.attackNumber != 4 && pichu.z_attackNumber != 4){
                            pichu.z_attackNumber = 4;
                            option.target.innerText = "Done!";
                        } else {
                            option.target.innerText = "Already being used!";
                        }
                        break;
                    default:
                        $("#optionRow").remove();
                        pauseMenu();
                }
            }
        }
    }
}

window.onkeydown = function(event) {
if(!spriteInput){
    event.preventDefault();
}
if(canvas.style.zIndex != "" && canvas.style.zIndex < 1 && event.key != "Enter"){
    console.log("bingo");
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
        } else {
            console.log("not pause ready");
        }
        break;
    case " ":
        pichu.attack();
        break;
    case "z":
        pichu.attack(true);
        break;
    case "a":
        ///////////////////////use wooper sprites
        // var usingPichuSprites = JSON.stringify(pichu.upIdleArrays) == JSON.stringify([[0, 290, 215, 215]]);
        // if(usingPichuSprites){
        //     console.log("wooper");
        //     pichu.attackNumber = 10;
        //     useWooperSprites();
        // } else {
        //     console.log("pichu");
        //     pichu.attackNumber = 0;
        //     resetSprites();
        // }
        ///////////////////////use snorlax sprites
        // if(pichu.pichuSheet === pichuSheet()){
        //     useSnorlaxSprites();
        // } else {
        //     resetSprites();
        // }
        ///////////////////////use items sprites
        // if(pichu.pichuSheet === spritesheet){
        //     pichu.pichuSheet = miscItemsSpritesheet;
        // } else {
        //     resetSprites();
        // }
        //use electrode sprites
        // if(pichu.pichuSheet === pichuSheet()){
        //         useElectrodeSprites();
        //     } else {
        //         resetSprites();
        // }
        break;
    default:
        break;
}
}
};

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

function PichuCry(x, y){
    var newCries = [];
    for(var i = 0;i < 8;i++){
        var direction, newX, newY;
        switch(i){
            case 0:
                direction = "up";
                newX = x;
                newY = y--;
                break;
            case 1:
                direction = "down";
                newX = x;
                newY = y++;
                break;
            case 2:
                direction = "left";
                newX = x--;
                newY = y;
                break;
            case 3:
                direction = "right";
                newX = x++;
                newY = y;
                break;
            case 4:
                direction = "upper-left";
                newX = x--;
                newY = y--;
                break;
            case 5:
                direction = "upper-right";
                newX = x++;
                newY = y--;
                break;
            case 6:
                direction = "lower-left";
                newX = x--;
                newY = y++;
                break;
            case 7:
                direction = "lower-right";
                newX = x++;
                newY = y++;
                break;
            default:
                break;
        }
        var newCry = new PichuCrySingle(newX, newY, direction);
        attacks.push(newCry);
    }
}

function PichuCrySingle(x, y, direction){
    this.name = "PichuCry";
    this.type = "Normal";
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.damage = function() {
        return 1;
    }
    this.width = 200;
    this.height = 33;
    this.status = "go";
    this.size_i = 0;
    this.size_Delay = 10;
    this.bigTime = true;
    this.draw = function(){
        if(this.status != "stop"){
            var font;
            if(this.bigTime){
                font = "75px Comic Sans MS";
            } else {
                font = "70px Comic Sans MS";
            }
            c.font = font;
            c.textAlign = "center"
            c.fillStyle = "yellow";
            c.fillText("Pichu!", this.x, this.y);
            // c.beginPath();
            // c.strokeStyle = "yellow";
            // c.strokeRect(this.x-this.width/2, this.y-this.height*1.5, this.width, this.height*1.5);
            // c.stroke();
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
            case "upper-left":
                this.y--;
                this.x--;
                break;
            case "upper-right":
                this.y--;
                this.x++;
                break;
            case "lower-left":
                this.y++;
                this.x--;
                break;
            case "lower-right":
                this.y++;
                this.x++;
        }
        if(this.x <= 0 || this.x >= canvas.width || this.y <= 0 || this.y >= canvas.height){
            this.status = "stop";
            attacks.splice(attacks.indexOf(this), 1);
        } else {
            var newAreaOfAttack = {
                x: this.x - this.width/2,
                y: this.y - this.height/2,
                width: this.width,
                height: this.height*1.5
            }
            for(var i = 0;i < enemies.length;i++){
                if(objIntersectBoth(newAreaOfAttack, enemies[i]) && enemies[i].status === "active" && this.status != "stop"){
                    this.status = "stop";
                    attacks.splice(attacks.indexOf(this), 1);
                    enemies[i].damage(this.damage());
                }
            }
            console.log("Pichu!");
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
    }
}





window.onkeyup = function(event) {
    var possibleDirection = event.key.slice(5).toLowerCase();
    if(pichu.direction === possibleDirection){
        pichu.stopMoving();
    }
    switch(event.key){
        case "Enter":
            if(!pauseReady){
                pauseReady = true;
            }
            break;
        default:
            break;
    }
};

canvas.addEventListener("click", function(event){
// var newVoltorb = new EvolvingVoltorb(event.layerX, event.layerY, Math.floor(Math.random() * 2));
// // var newWooper = new Wooper(event.layerX, event.layerY);
// enemies.push(newVoltorb);
// var newTM = new Tm(event.layerX, event.layerY, "Double Team");
// collidables.push(newTM);
// var d = ["up"];
// var direction = Math.random() > 0.5 ? "right" : "left";
// var b = new Thunder(event.layerX, event.layerY, d[Math.floor(Math.random()*d.length)]);
// attacks.push(b);
// var newBerry = new leppaBerry(event.layerX, event.layerY, (3 + Math.floor(Math.random()*5)));
// collidables.push(newBerry);
    // var chance = Math.floor(Math.random() * 2);
    // var berry;
    // switch(chance){
    //     case 0:
    //         berry = "oran";
    //         break;
    //     case 1:
    //         berry = "leppa";
    //         break;
    //     default:
    //         berry = "oran";
    //         break;
    // }
    // console.log(berry);
    // berryPlace(berry);
    var x = event.layerX;
    var y = event.layerY;
    // var newpokeball = new Pokeball(x, y, false, emptyFn);
    // collidables.push(newpokeball);
    // var directionsArray = ["left", "right", "up", "down"];
    // var newHB = new HyperBeam(x, y, directionsArray[Math.floor(Math.random()*4)], pichu);
    // attacks.push(newHB);
    // var orb = new SpikyEarOrb(x, y);
    // collidables.push(orb);
    // var paintArrays = ["alolanRaichu.png", "aqua.png", "candy.png", "grape.png", "grayscale.png", "pumpkin.png", "shadow.png", "snow.png", "togemaru.png"];
    // var chosenPaint = paintArrays[Math.floor(Math.random() * paintArrays.length)];
    // var newBucket = new PaintBucket(x, y, chosenPaint);
    // collidables.push(newBucket);

})


document.getElementById("player-pic").onclick = pictureMenu;
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(floor, 0, 0, canvas.width, canvas.height);
    collidableDraw();
    pichu.update();
    /********************** SHOW PICHU HITBOX
    c.beginPath();
    c.strokeStyle = "yellow";
    c.strokeRect(pichu.hitbox().x, pichu.hitbox().y, pichu.hitbox().width, pichu.hitbox().height);
    c.stroke();
    // 
    ***********************/
    collidableDelayDraw();
    var target = pichu;
    for(var i = 0;i < attacks.length;i++){
        if(attacks[i].name === "Double Team"){
            target = attacks[i];
            i = attacks.length;
        }
    }
    for(var i = 0;i < enemies.length;i++){
    enemies[i].update(target);
    }
    for(var i = 0;i < enemyAttacks.length;i++){
        switch(enemyAttacks[i].name){
            case "Thunderbolt":
                for(var j = 0;j < 5;j++){
                    if(enemyAttacks[i]){
                        enemyAttacks[i].update();
                    }
                }
                break;
            default:
                enemyAttacks[i].update();
                break;
        }
    }
    for(var i = 0;i < attacks.length;i++){
        switch(attacks[i].name){
            case "Thunderbolt":
                for(var j = 0;j < 5;j++){
                    if(attacks[i]){
                        attacks[i].update();
                    }
                }
                break;
            default:
                attacks[i].update();
                break;
        }
    }
    var levelTag = document.getElementById("pichu_level");
    if(levelTag.getAttribute("status") === "level"){
        document.getElementById("pichu_level").innerText = pichu.level;
    }
    var chargebar = document.getElementById("charge_bar");
    chargebar.max = pichu.charge_Max();
    chargebar.value = pichu.charge;
    var healthbar = document.getElementById("hp_bar");
    healthbar.max = pichu.max_Health();
    healthbar.value = pichu.health;
    var expbar = document.getElementById("exp_bar");
    expbar.max = pichu.levelUpExp();
    expbar.value = pichu.exp;
    animateID = requestAnimationFrame(animate);
}

pichu.health = 1000000;
pichu.level = 0;
pichu.exp = 0;
$("#player-pic").attr("src", pichu.picture);
collidables.push(spriteSign);
var doubleTeamtM = new Tm(300, 300, "Double Team");
//collidables.push(doubleTeamtM);
console.log(spriteSign.test);
animateID = requestAnimationFrame(animate);
resetSprites();


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
        spriteTest();
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
