class Game
{
    constructor()
    {

    }

    getState()  //This function will read the gameState value from the database (read)
    {
        var gameStateRef = db.ref('gameState');
        gameStateRef.on("value", function(data){gameState = data.val()});
    }

    updateState(state) // This function will update the gamestate value in the database (write)
    {
        db.ref('/').update({gameState: state}); // '/' refers to main database inside which gameState is created
    }

    async start()
    {
        if(gameState === 0)
        {
            player = new Player;
            var playerCountRef = await db.ref('playerCount').once("value"); //once method(asynchronous listener) read the value once from the database
            if(playerCountRef.exists()) //exists() function check if the playerCountRef has a value or not.
            {
                playerCount = playerCountRef.val(); //val() function will extract the data from the data snapshot
                player.getCount(); //To permanenetly listen to the database
            }

            form = new Form(); //create a form object
            form.display(); //Display the form
        }
        car1 = createSprite(100, 400);
        car2 = createSprite(300, 400);
        car3 = createSprite(500, 400);
        car4 = createSprite(700, 400);
        cars = [car1, car2, car3, car4]; //cars[0] = car1, cars[1] = car2, cars[2] = car3, cars[3] = car4
    }

    play() //play() function will be called when gameState becomes 1
    {
        form.hideForm(); //hide the form
        textSize(30);
        text("Game Start", 120, 100);

        player.getPlayerInfo();

        if(allPlayers !== undefined) //!== not equal to
        {
            var index = 0 //index of the array
            var x = 0;
            var y;
           
            for(var plr in allPlayers) // The in operator will take the first key from the key-value pair in the first iteration & store it in variable plr
            {
                index = index + 1; //Add 1 to the index for every loop
                x = x + 200; //Position the cars at equal distance from each other in x-direction
                y = displayHeight - allPlayers[plr].distance //Use distance data from the database to display the cars in y-direction
                cars[index-1].x = x; // cars[0].x, car1.x = 200, car2.x = 400
                cars[index-1].y = y; // cars[0].y, car1.y = 150, car2.y = 100
                
                if(index === player.index)
                {
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2; //camera's x-position will be at the middle of the screen
                    camera.position.y = cars[index-1].y; //camera's y-position will move with car's y-position

                }
                else
                {
                    cars[index-1].shapeColor = "black";
                }
            }
        }

        if(keyIsDown(UP_ARROW)) //If key is pressed, then increase the distance
        {
            player.distance = player.distance + 50;
            player.update(); //To update distance in the database
        }
        drawSprites();
    }
};