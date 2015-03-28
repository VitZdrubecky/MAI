var context;
var queue;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var stage;
var image;

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

function queueLoaded(event) {
    // Loading background image
    image = new Image();
    image.src = "./assets/background/playground-moorhuhn.svg";
    image.onload = handleBackgroundImageLoad;

    //Loading animations
    createAnimation(getFlyRightSpriteConfig(), 200, 200, 1.0, 1.0, "flapLeft");
    createAnimation(getFlyLeftSpriteConfig(), 400, 200, 0.8, 0.8, "flapRight");
    createAnimation(getKillSpriteConfig(), 650, 200, 1.1, 1.1, "kill");
    

}

function handleBackgroundImageLoad() {
    var backgroundImage = new createjs.Bitmap(image);
    //backgroundImage.scaleX = 1.0;
    //backgroundImage.scaleY = 1.0;
    backgroundImage.cache(0, 0, WIDTH, HEIGHT /*[, possibleScale]*/);
    stage.addChildAt(backgroundImage);
}
