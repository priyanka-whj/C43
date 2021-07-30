var db;
var gameState = 0;
var playerCount;
var form, player, game;
var allPlayers; //undefined
var car1, car2, car3, car4;
var cars; //This array will store all 4 cars
var backgroundImage;

function setup()
{
    createCanvas(displayWidth, displayHeight);

    db = firebase.database();
    
    game = new Game();
    game.getState();
    game.start();
}
    
    
                                                        
function draw()
{
    if(playerCount === 4)
    {
        game.updateState(1);
    }
    if(gameState === 1)
    {
        clear();
        game.play();
    }
}

