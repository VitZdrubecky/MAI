var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 768;
var stage;
var image;

window.onload = function()
{
    /*
     *      Set up the Canvas with Size and height
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    // Add background image
    //image = new Image();
    //image.src = "./assets/ptaci/playground-moorhuhn.svg";
    //image.onload = handleLoad;
    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);


    queue.loadManifest([
        {id: 'backgroundImage', src: './assets/background/playground-moorhuhn.svg'},
    ]);
    queue.load();
    
    // Animations
    createAnimation(getFlyRightSpriteConfig(), 200, 200, 1.0, 1.0, "flapLeft");
    createAnimation(getFlyLeftSpriteConfig(), 400, 200, 0.8, 0.8, "flapRight");
    createAnimation(getKillSpriteConfig(), 650, 200, 1.1, 1.1, "kill");
    

    // Add ticker
    createjs.Ticker.setFPS(10);
    createjs.Ticker.addEventListener('tick', stage);

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

function queueLoaded(event) {
    image = new Image();
    image.src = "./assets/background/playground-moorhuhn.svg";
    //image.onload = handleLoad;
}

function handleLoad() {
    var backgroundImage = new createjs.Bitmap(image);
    backgroundImage.scaleX = 1.0;
    backgroundImage.scaleY = 1.0;
    stage.addChildAt(backgroundImage);
}
