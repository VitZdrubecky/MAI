var context;
var queue;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var stage;
var image;
var target;

//var moorhuhnX;
//var moorhuhnY;

$(document).ready(function() { 
    
    // Inicialize canvas
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);


    queue.loadManifest([
        {id: 'backgroundImage', src: './assets/background/playground-moorhuhn.svg'},
    ]);
    queue.load();
    
    // Add ticker
    createjs.Ticker.setFPS(10);
    createjs.Ticker.addEventListener('tick', stage);

});

function queueLoaded(event) {
    // Loading background image
    backgroundImage = new Image();
    backgroundImage.src = "./assets/background/playground-moorhuhn.svg";
    backgroundImage.onload = handleBackgroundImageLoad;

    //Loading animations
    createAnimation(getFlyRightSpriteConfig(), 200, 200, 1.0, 1.0, "flapLeft");
    createAnimation(getFlyLeftSpriteConfig(), 400, 200, 0.8, 0.8, "flapRight");
    createAnimation(getKillSpriteConfig(), 650, 200, 1.1, 1.1, "kill");

    targetImage = new Image();
    targetImage.src = "./assets/target.svg";
    targetImage.onload = handleTargetImageLoad;
    
    window.onmousemove = handleMouseMove;

}

function createAnimation(spriteConfig, x, y, scaleX, scaleY, animation) {
    // Create sprite
    sprite = new createjs.SpriteSheet(spriteConfig);
    // Create animation
    animation = new createjs.Sprite(sprite);
    animation.x = x;
    animation.y = y;
    animation.scaleX = scaleX;
    animation.scaleY = scaleY;
    animation.gotoAndPlay(animation);
    stage.addChildAt(animation);
}

function handleBackgroundImageLoad() {
    var background = new createjs.Bitmap(backgroundImage);
    //backgroundImage.scaleX = 1.0;
    //backgroundImage.scaleY = 1.0;
    background.set({alpha: 0.85});
    background.cache(0, 0, WIDTH, HEIGHT /*[, possibleScale]*/);
    stage.addChildAt(background, 0);
}

function handleTargetImageLoad() {
    target = new createjs.Bitmap(targetImage);
    target.x = WIDTH/2;
    target.y = HEIGHT/2;
    target.scaleX = 0.15;
    target.scaleY = 0.15;
    stage.addChildAt(target, stage.getNumChildren());
}

function handleMouseMove(event)
{
    //Offset the position by 45 pixels so mouse is in center of crosshair
    target.x = event.clientX-45;
    target.y = event.clientY-45;
}
