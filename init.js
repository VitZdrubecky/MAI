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
    var spriteFlyRightConfig = 
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
                "flapRight": [0, 12], 
            },
        }

    spriteFlyRight = new createjs.SpriteSheet(spriteFlyRightConfig);
    
    animFlyRight = new createjs.Sprite(spriteFlyRight, "flap");
    animFlyRight.regX = 99;
    animFlyRight.regY = 58;
    animFlyRight.x = 200;
    animFlyRight.y = 200;
    animFlyRight.gotoAndPlay("flapRight");
    stage.addChildAt(animFlyRight);

    // Create bat spritesheet
    var spriteFlyLeftConfig = 
        {
            "images": ["./assets/fly_sprint_right_to_left.svg"],
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
                "flapLeft": [0, 12], 
            },
        }

    spriteFlyLeft = new createjs.SpriteSheet(spriteFlyLeftConfig);
    
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
    image.src = "./assets/ptaci/playground-moorhuhn.svg";
    image.onload = handleLoad;
}

function handleLoad() {
    var backgroundImage = new createjs.Bitmap(image);
    backgroundImage.scaleX = 1.0;
    backgroundImage.scaleY = 1.0;
    stage.addChildAt(backgroundImage);
}
