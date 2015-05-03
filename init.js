var context;
var queue;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var stage;
var backgroundImage;
var targetImage;
var target;

var moorhuhnXPos = 0;
var moorhuhnYPos = 200;
var moorhuhnSpeed = 20;
var moorhuhnScale = 1.0;

var moorhuhn = {};

$(document).ready(function() { 
    // Inicialize canvas
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);

    queue.loadManifest([
        {id: 'backgroundImage', src: './assets/background/playground-moorhuhn.svg'},
        {id: 'shot', src: 'assets/shot.mp3'},
        {id: 'background', src: 'assets/LightingBolt.mp3'},
        {id: 'deathSound', src: 'assets/die.mp3'},

    ]);
    queue.load();
    
    // Add ticker
    createjs.Ticker.setFPS(10);
    createjs.Ticker.addEventListener('tick', stage);
});

function queueLoaded(event) {
    // Loading background image
    backgroundImage = new Image();
    backgroundImage.src = './assets/background/playground-moorhuhn.svg';
    backgroundImage.onload = handleBackgroundImageLoad;

    //Loading animations
    moorhuhn.animation = createAnimation(getFlyRightSpriteConfig(), 0, 200, moorhuhnScale, moorhuhnScale, "flapRight");
    moorhuhn.direction = 'right';
    //createAnimation(getFlyLeftSpriteConfig(), 400, 200, 0.8, 0.8, "flapLeft");
    //createAnimation(getKillSpriteConfig(), 650, 200, 1.1, 1.1, "kill");

    targetImage = new Image();
    targetImage.src = "./assets/target.svg";
    targetImage.onload = handleTargetImageLoad;

    // Play background sound
    createjs.Sound.play("background", {loop: -1});
    
    createjs.Ticker.addEventListener('tick', tickEvent);
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;

}

function createAnimation(spriteConfig, x, y, scaleX, scaleY, animType) {
    // Create sprite
    sprite = new createjs.SpriteSheet(spriteConfig, animType);
    // Create animation
    animation = new createjs.Sprite(sprite);
    animation.x = x;
    animation.y = y;
    animation.scaleX = scaleX;
    animation.scaleY = scaleY;
    animation.gotoAndPlay(animType);
    /**
     * Moorhuhn should be always in front of the background and behind the target aim
     * First case happens when moorhuhn is firstly loaded, second when replaced for one that flies in opossite direction
     */
    stage.addChildAt(animation, stage.getNumChildren() == 0 ? 0 : stage.getNumChildren() -1);
    return animation;
}

function handleBackgroundImageLoad() {
    var background = new createjs.Bitmap(backgroundImage);
    //backgroundImage.scaleX = 1.0;
    //backgroundImage.scaleY = 1.0;
    background.set({alpha: 0.85});
    background.cache(0, 0, WIDTH, HEIGHT /*[, possibleScale]*/);
    stage.addChildAt(background);
}

function handleTargetImageLoad() {
    target = new createjs.Bitmap(targetImage);
    target.x = WIDTH/2;
    target.y = HEIGHT/2;
    target.scaleX = 0.15;
    target.scaleY = 0.15;
    // Target aim should always be in the front of everything
    stage.addChildAt(target, stage.getNumChildren());
}

function handleMouseMove(event) {
    //Offset the position by 45 pixels so mouse is in center of crosshair
    target.x = event.clientX-45;
    target.y = event.clientY-45;
}

function handleMouseDown(event) {
    createjs.Sound.play("shot");

    if (moorhuhn) {
        //Obtain Shot position
        var shotX = Math.round(event.clientX);
        var shotY = Math.round(event.clientY);
        var spriteX = Math.round(moorhuhn.animation.x);
        var spriteY = Math.round(moorhuhn.animation.y);

        //alert(shotX + " " + shotY + " " + spriteX + " " + spriteY);
        // Compute the X and Y distance using absolte value
        var distX = Math.abs(shotX - spriteX);
        var distY = Math.abs(shotY - spriteY);

        if (distX < moorhuhnScale * 120 && distY < moorhuhnScale * 120)
        {
            //Hit
            stage.removeChild(moorhuhn.animation);
            moorhuhn.animation = null;
            animation = createAnimation(getKillSpriteConfig(), spriteX, spriteY, moorhuhnScale, moorhuhnScale, "kill");
            animation.on("animationend", function() {
                stage.removeChild(animation);
            });
            createjs.Sound.play("deathSound");

            //Create new enemy
            var timeToCreate    = getRandomInt(1000, 3000);
            var flyDirection    = getRandom0or1();
            var spriteX         = flyDirection == 0 ? -10 : WIDTH + 10;  
            var spriteY         = getRandomInt(0, HEIGHT - 30);
            moorhuhnScale       = getRandom1decimal(0.2, 1.0);

            setTimeout(function() {
                moorhuhn.animation = createAnimation(flyDirection == 0 ? getFlyRightSpriteConfig() : getFlyLeftSpriteConfig(), 
                   spriteX, spriteY, moorhuhnScale, moorhuhnScale, flyDirection == 0 ? "flapRight" : "flapLeft");
                moorhuhn.direction = flyDirection == 0 ? 'right' : 'left';
            }, timeToCreate);

        }
    }
}

function tickEvent() {
    if (moorhuhn.animation) { 
        // If moorhuhn flies out on the left side -> create right moorhuhn
        if (moorhuhn.animation.x > WIDTH + 10) {
            stage.removeChild(moorhuhn.animation);
            moorhuhn.animation = createAnimation(getFlyLeftSpriteConfig(), 
                moorhuhn.animation.x, moorhuhn.animation.y, moorhuhnScale - 0.2, moorhuhnScale - 0.2, "flapLeft");
            moorhuhn.direction = 'left';
        // If moorhuhn flies out on the right side -> create left moorhuhn    
        } else if (moorhuhn.animation.x < -200) {
            stage.removeChild(moorhuhn.animation);
            moorhuhn.animation = createAnimation(getFlyRightSpriteConfig(), 
                moorhuhn.animation.x, moorhuhn.animation.y, moorhuhnScale, moorhuhnScale, "flapRight");
            moorhuhn.direction = 'right';
        }
    
        // Move moorhuhn in the right direction
        if (moorhuhn.direction == 'left') {
            moorhuhn.animation.x -= moorhuhnScale * 50;
        } else {
            moorhuhn.animation.x += moorhuhnScale * 50;
        }
    }
    
    //moorhuhn.animation.x = moorhuhnXPos;
}

function getRandom0or1() {
    return Math.round(Math.random());
}
function getRandom1decimal(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
