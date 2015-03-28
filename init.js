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
    
    // Create moorhuhn right spritesheet
    var spriteFlyRightConfig = getFlyRightSpriteConfig();
    spriteFlyRight = new createjs.SpriteSheet(spriteFlyRightConfig);
    // Create animation
    animFlyRight = new createjs.Sprite(spriteFlyRight, "flap");
    animFlyRight.regX = 99;
    animFlyRight.regY = 58;
    animFlyRight.x = 200;
    animFlyRight.y = 200;
    animFlyRight.gotoAndPlay("flapRight");
    stage.addChildAt(animFlyRight);

    // Create moorhuhn left spritesheet
    var spriteFlyLeftConfig = getFlyLeftSpriteConfig();
    spriteFlyLeft = new createjs.SpriteSheet(spriteFlyLeftConfig);
    // Create animation
    animFlyLeft = new createjs.Sprite(spriteFlyLeft, "flap");
    animFlyLeft.regX = 99;
    animFlyLeft.regY = 58;
    animFlyLeft.x = 400;
    animFlyLeft.y = 200;
    animFlyLeft.gotoAndPlay("flapLeft");
    stage.addChildAt(animFlyLeft);

    

    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);

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
