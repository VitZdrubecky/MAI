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
        {id: 'backgroundImage', src: './assets/ptaci/playground-moorhuhn.svg'},
    ]);
    queue.load();
    
        // Create bat spritesheet
    var spriteConfig = 
        {
            "images": ["./assets/fly_sprint_left_to_right.svg"],
            "frames": [
                [2, 2, 135, 143], 
                [139, 2, 135, 143],
                [276, 2, 133, 143], 
                [411, 2, 136, 140], 
                [549, 2, 145, 140], 
                [696, 2, 148, 140], 
                [846, 2, 160, 140],
                [1008, 2, 163, 140],
                [1173, 2, 168, 140], 
                [1340, 2, 163, 140], 
                [1505, 2, 163, 140], 
                [1670, 2, 155, 140], 
                [1824, 2, 150, 140], 
            ],
            "animations": {
                "flap": [0, 12], 
            },
        }
    spriteSheet = new createjs.SpriteSheet(spriteConfig);
    
    animation = new createjs.Sprite(spriteSheet, "flap");
    animation.regX = 99;
    animation.regY = 58;
    animation.x = 200;
    animation.y = 200;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation);

    
    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);

}

function queueLoaded(event) {
    image = new Image();
    image.src = "./assets/ptaci/playground-moorhuhn.svg";
    image.onload = handleLoad;
}

function handleLoad() {
    var backgroundImage = new createjs.Bitmap(image);
    backgroundImage.scaleX = 1.0;
    backgroundImage.scaleY = 1.0;
    stage.addChildAt(backgroundImage);
}
