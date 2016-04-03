//https://github.com/dionyziz/gameCanvas-tetris/blob/master/js/tetris.js
window.onload = function ()
{
    /**
     * ************************
     *
     * DECLARE GLOBAL VARIABLES
     *
     * ************************
     */

    var gameCanvas = document.getElementById("myCanvas");
    var controlCanvas = document.getElementById("controlCanvas");
    var renderCanvas = document.getElementById("myCanvas");
    var leaderCanvas = document.getElementById('leaderCanvas');

    var context = gameCanvas.getContext("2d");
    var controlContext = controlCanvas.getContext("2d");
    var renderContext = renderCanvas.getContext("2d");
    var leaderContext = leaderCanvas.getContext("2d");

    var BLOCK_W = 300 / 10, BLOCK_H = 600 / 20;


    var board = [];
    var score = 0;

    /**
     var xGameArray = [];
     var yGameArray = [];
    for (i = 0; i < 10; i++){
        xGameArray[i] = 0;
    }

    for (i = 0; i < 20; i++){
        yGameArray[i] = 0;
    }
**/
    //Stores each of the possible shapes as an Array
    var shapes = [

        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 0,
            1 ],
        [ 1, 1, 1, 0,
            0, 0, 1 ],
        [ 1, 1, 0, 0,
            1, 1 ]
        [ 1, 1, 0, 0,
            0, 1, 1 ],
        [ 0, 1, 1, 0,
            1, 1 ],
        [ 0, 1, 0, 0,
            1, 1, 1 ]
    ];

    //Colours of the blocks as an array
    var colors = [
        'blue', 'green', 'yellow', 'orange', 'pink', 'grey', 'blue'
    ];

    window.addEventListener('keydown', whatKey, true);

    /**
     * *******************
     *
     * START OF GAME LOGIC
     *
     * *******************
     */

// Start the game
    function init() {
        for ( var y = 0; y < 20; ++y ) {
            board[ y ] = [];
            for ( var x = 0; x < 10; ++x ) {
                board[ y ][ x ] = 0;
            }
        }
    }

    function drawBlock( x, y ) {
        context.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
        context.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    }

    function drawBoard(x, y){
        renderContext.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
        renderContext.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    }

    function eraseBlock( x, y ) {
        context.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
        //context.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    }

    function render() {
        context.clearRect( 0, 0, 300, 600);
        controlContext.clearRect( 400, 0, 300, 600);
        renderContext.clearRect( 0, 0, 300, 600);

        renderContext.strokeStyle = 'black';
        for ( var x = 0; x < 10; ++x ) {
            for ( var y = 0; y < 20; ++y ) {
                if (board[ y ][ x ]) {
                    renderContext.fillStyle = colors[ board[ y ][ x ] - 1];
                    drawBoard( x, y );
                }
            }
        }

        context.fillStyle = 'red';
        context.strokeStyle = 'black';
        for ( var y = 0; y < 4; ++y ) {
            for ( var x = 0; x < 4; ++x ) {
                if (current[ y ][ x ]) {
                    context.fillStyle = colors[ current[ y ][ x ] - 1 ];
                    drawBlock( currentX + x, currentY + y );
                }
            }
        }
    }

    function makeTurn(){
        checkLine();
        if(checkTurn()) {
            //console.log(currentY);
            //context.fillStyle = 'red';
            //context.strokeStyle = 'white';
                    for (var y = 0; y < 4; ++y) {
                        for (var x = 0; x < 4; ++x) {
                            if (current[y][x]) {
                                context.fillStyle = 'white';
                                eraseBlock(currentX + x, currentY + y);
                                for (var i = 0; i < 10; i++) {
                                    for (var j = 0; j < 20; ++j) {
                                        if(board[i][j] == 0) {
                                            //eraseBlock(currentX + (i), currentY + y);
                                            //eraseBlock(currentX - (i), currentY + y);
                                        }
                                    }
                                }
                            }
                        }
                    }



            context.fillStyle = 'red';
            context.strokeStyle = 'black';
            for (var y = 0; y < 4; ++y) {
                for (var x = 0; x < 4; ++x) {
                    if (current[y][x]) {
                        context.fillStyle = colors[current[y][x] - 1];
                        drawBlock(currentX + x, currentY + y + 1);
                    }
                }
            }
            currentY++;
            checkLine();
            //checkLine();
            setTimeout(function () {
                makeTurn();
            }, 100);
        }
        else {
            for (var y = 0; y < 4; ++y) {
                for (var x = 0; x < 4; ++x) {
                    if (current[y][x]) {
                        //console.log(current[y][x]-1);
                        board[y + currentY][x + currentX] = current[y][x];
                    }
                }
            }
            //console.log(board);
            checkLine();
            newShape();
            render();
            makeTurn();
        }
    }

    function checkTurn(){
        var safe = true;
        if (currentY < 18){
            for (var y = 0; y < 4; ++y) {
                for (var x = 0; x < 4; ++x) {
                    if (current[y][x]) {
                        if(board[y + currentY + 1][x + currentX]){
                            safe = false;
                        }
                    }
                }
            }
        }
        else{
            safe = false;
        }
        if(safe){
          return true;
        }
        else{
            return false;
        }
    }

    function checkLine(){
        for(var y = 0; y < 20; y++){
            var scan = true;
            for(var x = 0; x < 10; x++){
                if(!board[y][x]) {
                    scan = false;
                }
            }
            if(scan){
                console.log("Bingo");
                for(var x = 0; x < 10; x++){
                   board[y][x] = 0;
                    //board[y].splice(0, x);
                }
                //board.unshift(0);

                for (var i = y; i > 0; i--) {
                    for (var j = 0; j < 10; j++) {
                        console.log(y);
                        board[i][j] = board[i - 1][j];
                    }
                }
                //console.log("move the fucking array");
                score++;
                console.log(score);
            }
        }
        render();
    }

    function newShape() {
        var id = Math.floor( Math.random() * shapes.length );
        var shape = shapes[ id ]; // maintain id for color filling

        current = [];
        for ( var y = 0; y < 4; ++y ) {
            current[ y ] = [];
            for ( var x = 0; x < 4; ++x ) {
                var i = 4 * y + x;
                if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
                    current[ y ][ x ] = id + 1;
                }
                else {
                    current[ y ][ x ] = 0;
                }
            }
        }
        //console.log(current);
        currentX = 5;
        currentY = 0;
        //console.log(board);
    }

    function whatKey(evt) {
        switch (evt.keyCode) {
            case 39:
                roundRectFill(195, 370, 50, 50, 10);
                if(currentX < 8) {
                    currentX++;
                }
                //context.stroke;
                setTimeout(function(){
                    roundRect(195, 370, 50, 50, 10);
                }, 200);
                break;
            case 37:
                roundRectFill(55, 370, 50, 50, 10);
                if(currentX > 0) {
                    currentX--;
                }
                //context.stroke;
                setTimeout(function(){
                    roundRect(55, 370, 50, 50, 10);
                }, 200);
                break;
            case 38:
                roundRectFill(125, 300, 50, 50, 10);
                //context.stroke;
                setTimeout(function(){
                    roundRect(125, 300, 50, 50, 10);
                }, 200);
                break;
            case 40:
                roundRectFill(125, 370, 50, 50, 10);
                //context.stroke;
                setTimeout(function(){
                    roundRect(125, 370, 50, 50, 10);
                }, 200);
                break;
        }
    }

    function roundRect(x, y, w, h, radius)
    {
        var r = x + w;
        var b = y + h;
        controlContext.beginPath();
        controlContext.strokeStyle="green";
        controlContext.lineWidth="4";
        controlContext.moveTo(x+radius, y);
        controlContext.lineTo(r-radius, y);
        controlContext.quadraticCurveTo(r, y, r, y+radius);
        controlContext.lineTo(r, y+h-radius);
        controlContext.quadraticCurveTo(r, b, r-radius, b);
        controlContext.lineTo(x+radius, b);
        controlContext.quadraticCurveTo(x, b, x, b-radius);
        controlContext.lineTo(x, y+radius);
        controlContext.quadraticCurveTo(x, y, x+radius, y);
        controlContext.stroke();
    }

    function roundRectFill(x, y, w, h, radius)
    {
        var r = x + w;
        var b = y + h;
        controlContext.beginPath();
        controlContext.strokeStyle="black";
        controlContext.lineWidth="4";
        controlContext.moveTo(x+radius, y);
        controlContext.lineTo(r-radius, y);
        controlContext.quadraticCurveTo(r, y, r, y+radius);
        controlContext.lineTo(r, y+h-radius);
        controlContext.quadraticCurveTo(r, b, r-radius, b);
        controlContext.lineTo(x+radius, b);
        controlContext.quadraticCurveTo(x, b, x, b-radius);
        controlContext.lineTo(x, y+radius);
        controlContext.quadraticCurveTo(x, y, x+radius, y);
        controlContext.stroke();
    }

    //http://www.scriptol.com/html5/canvas/rounded-rectangle.php
    function generateButtons(){
        controlContext.font = "bold 40px Arial";
        controlContext.fillText("Tetris",90,37);


        //Control Buttons
        roundRect(125, 300, 50, 50, 10);
        roundRect(125, 370, 50, 50, 10);
        roundRect(55, 370, 50, 50, 10);
        roundRect(195, 370, 50, 50, 10);

        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Rotate",128,330);
        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Left",67,400);
        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Right",202,400);
        controlContext.font = "bold 14px Arial";
        controlContext.fillText("Down",131,400);

        //Menu Buttons
        roundRect(75, 60, 150, 50, 10);
        roundRect(75, 130, 150, 50, 10);

        controlContext.font = "bold 30px Arial";
        controlContext.fillText("Start",117,96);

        controlContext.font = "bold 23px Arial";
        controlContext.fillText("Leaderboard",80,165);

        //Level Buttons
        roundRect(15, 200, 70, 50, 10);
        roundRect(115, 200, 70, 50, 10);
        roundRect(215, 200, 70, 50, 10);

        controlContext.font = "bold 19px Arial";
        controlContext.fillText("Easy",27,230);

        controlContext.font = "bold 19px Arial";
        controlContext.fillText("Hard",127,230);

        controlContext.font = "bold 19px Arial";
        controlContext.fillText("Dank",227,230);

    }

    init();
    newShape();
    render();
    makeTurn();
    generateButtons();

}