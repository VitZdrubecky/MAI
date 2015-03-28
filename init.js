var context;
var queue;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var stage;
var image;
var target;

var moorhuhnXPos = 0;
var moorhuhnYPos = 200;
var moorhuhnSpeed = 20;

var enemies = {};

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
    backgroundImage.src = './assets/background/playground-moorhuhn.svg';
    backgroundImage.onload = handleBackgroundImageLoad;

    //Loading animations
    enemies['moorhuhn'] = {};
    enemies['moorhuhn']['animation'] = createAnimation(getFlyRightSpriteConfig(), moorhuhnXPos, moorhuhnYPos, 1.0, 1.0, "flapRight");
    enemies['moorhuhn']['direction'] = 'right';
    //createAnimation(getFlyLeftSpriteConfig(), 400, 200, 0.8, 0.8, "flapLeft");
    //createAnimation(getKillSpriteConfig(), 650, 200, 1.1, 1.1, "kill");

    targetImage = new Image();
    targetImage.src = "./assets/target.svg";
    targetImage.onload = handleTargetImageLoad;
    
    createjs.Ticker.addEventListener('tick', tickEvent);
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

function tickEvent() {
    // If moorhuhn flies out on the left side -> create right moorhuhn
    if (moorhuhnXPos > WIDTH + 10) {
        stage.removeChild(enemies['moorhuhn']['animation']);
        enemies['moorhuhn']['animation'] = createAnimation(getFlyLeftSpriteConfig(), moorhuhnXPos, moorhuhnYPos, 0.8, 0.8, "flapLeft");
        enemies['moorhuhn']['direction'] = 'left';
    // If moorhuhn flies out on the right side -> create left moorhuhn    
    } else if (moorhuhnXPos < -200) {
        stage.removeChild(enemies['moorhuhn']['animation']);
        enemies['moorhuhn']['animation'] = createAnimation(getFlyRightSpriteConfig(), moorhuhnXPos, moorhuhnYPos, 1.0, 1.0, "flapRight");
        enemies['moorhuhn']['direction'] = 'right';
    }
    
    // Move moorhuhn in the right direction
    if (enemies['moorhuhn']['direction'] == 'left') {
        moorhuhnXPos -= moorhuhnSpeed;
    } else {
        moorhuhnXPos += moorhuhnSpeed;
    }
    
    enemies['moorhuhn']['animation'].x = moorhuhnXPos;
}
