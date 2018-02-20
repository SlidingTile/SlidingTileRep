document.addEventListener ("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad()
{
	/* Hides / Unhides Canvas until start */
	var start = document.getElementById('start');
	start.addEventListener('click', enableCanvas);
	game.style.visibility = 'hidden';
	
	function enableCanvas() {
		game.style.visibility = 'initial';
	}
	
/*----------------------------------------------------------------------------------------*/
	
	/* Category pictures */
	var categories = document.getElementById('categories');
	var pictures = document.getElementById('pictures');
	var animals = document.getElementById('animals');
	var cars = document.getElementById('cars');
	var scenery = document.getElementById('scenery');
	var custom = document.getElementById('custom');
	var title = document.getElementById('title');
	var secondTitle = document.getElementById('secondTitle');
	categories.addEventListener('change', changeCategory);
	categories.addEventListener('change', changePictures);
	animals.style.display = 'none';
	cars.style.display = 'none';
	scenery.style.display = 'none';
	custom.style.display = 'none';
	
	function changeCategory() {
		if (categories.value === 'default') {
			title.innerHTML = '';
			secondTitle.innerHTML = 'Select a Category Using The Dropdown Menu';
			animals.style.display = 'none';
			cars.style.display = 'none';
			scenery.style.display = 'none';
			custom.style.display = 'none';
		} else {
			title.innerHTML = categories.value;
			secondTitle.innerHTML = '';
		}
	}
	
	function changePictures() {
		if (categories.value === 'Animals')
		{
			animals.style.display = 'inline';
			cars.style.display = 'none';
			scenery.style.display = 'none';
			custom.style.display = 'none';
			
		} else if (categories.value === 'Cars') {
			animals.style.display = 'none';
			cars.style.display = 'inline';
			scenery.style.display = 'none';
			custom.style.display = 'none';
			
		} else if (categories.value === 'Scenery') {
			animals.style.display = 'none';
			cars.style.display = 'none';
			scenery.style.display = 'inline';
			custom.style.display = 'none';
			
		} else if (categories.value === 'Custom') {
			animals.style.display = 'none';
			cars.style.display = 'none';
			scenery.style.display = 'none';
			custom.style.display = 'inline';
		}
	}

/*----------------------------------------------------------------------------------------*/
	
	/*Timer Function*/
	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
	start.addEventListener('click', startTimer);
	var totalSeconds = 0;
	var time;
	
	function pad(val) //Takes value of the number of seconds
	{
		var valString = val + "";
		if(valString.length < 2) //If value is less than 2 characters long
		{
			return "0" + valString; //adds a zero first
		}
		else
		{
			return valString; //else returns actual value
		}
	}
	
	function startTimer()
	{
		//randomize();
		start.style.display = 'none'; //Hides start button
		time = setInterval(setTime, 1000); //Repeats function every 1000ms or 1 second

		function setTime()
		{
			++totalSeconds; //Increases seconds
			secondsLabel.innerHTML = pad(totalSeconds%60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds/60)); 
		}
	}
	
/*----------------------------------------------------------------------------------------*/
	
	/*Reset Function */
	var reset = document.getElementById("reset"); //Reset button
	reset.addEventListener('click', resetAll);
	
	function resetAll() //Resets value and stops function
	{
		totalSeconds = 0;
		secondsLabel.innerHTML = pad(totalSeconds%60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		clearInterval(time);
		start.style.display = 'inline'; //Shows start button
		game.style.visibility = 'hidden';
	}
	
/*----------------------------------------------------------------------------------------*/
	
	/*Sliding Tile Function*/
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var image = document.getElementById('source');
	var random = document.getElementById('random');
	
	canvas.addEventListener('mousemove', onMouseUpdate, false);
	canvas.addEventListener('click', checkMouse);
	image.addEventListener('load', createTiles);
	random.addEventListener('click', randomize);
	window.addEventListener('load', keyInput);
	
	var canvSize = 600; //size of the canvas size in pixels
    	canvas.width = canvSize; //Set the size of the canvas
    	canvas.height = canvSize; // "
    
    var cells = 3;  //How many cells in a row/ column - Change this variable to change difficulty
    var cellSize = canvSize/cells;
    var rows = cells;
    var columns = cells;
    var board = [];
    var mouseX = 0; //Mouse position
    var mouseY = 0;
    
    var emptySquare = new Tile(cells-1, cells-1, null); //Set the empty square in the bottom right
    
    
    	//Initialize the 2D array and fill it with 'null'
    	createEmptyBoard();
    	function createEmptyBoard() {
        	board = [];
        	board.length = rows;
        	for(var i = 0; i < rows; i++) {
            		var row = [];
            		for( var j = 0; j < columns; j++) {
                		row.push(null);
            		}
            	board[i] = row;
        	}
    	}
	//Randomise the tiles
    var randomizeAmount = 1000; //Change this to randomize more
	function randomize(){
        	for(var i = 0; i < randomizeAmount; i++) {
                var x = Math.floor(Math.random() * (cells));
                var y = Math.floor(Math.random() * (cells));
            		if(x != 2 || y != 2) {
                		checkPosition(board[x][y]);
            		}
        	}
            
            //Reset moves to 0
            moves = 0; 
            moveCounter.innerHTML = pad(moves);
            
            //Reset Time to 0
            totalSeconds = 0;
            secondsLabel.innerHTML = pad(totalSeconds%60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds/60)); 
    	}
	
    //Get the position of the mouse when it updates
    function onMouseUpdate(e) {
    	var rect = canvas.getBoundingClientRect();
    	mouseX = e.pageX - rect.left;
    	mouseY = e.pageY - rect.top;
    }
    
    //Check which tile the mouse has clicked on
    function checkMouse(){
        for(var x = 0; x < columns; x++){
           for(var y = 0; y < rows; y++){
                if(y == columns-1 && x == rows-1){
                     
                   }
               else{
                   if(mouseX > board[x][y].x){
                       if(mouseX < board[x][y].x + cellSize){
                           if(mouseY > board[x][y].y){
                               if(mouseY < board[x][y].y + cellSize) {
                                    checkPosition(board[x][y]);
                                   }                                   
                                }
                           }
                       }
                  }  
               }    
           }
       }
    //Check the position around the empty
     function checkKeyboard(o, p){
        for(var x = 0; x < columns; x++){
           for(var y = 0; y < rows; y++){
                if(y == columns-1 && x == rows-1){
                     
                   }
               else{
                   if(board[x][y].x == o){
                       if(board[x][y].y == p){
                           checkPosition(board[x][y]);
                       }
                   }
                   
               }
           }
        }
                   
       }
        //Get Key input
		function keyInput() {
	    document.addEventListener("keydown", function(event) {
		    if (event.keyCode === 38) { //Up Arrow
			    event.preventDefault();
			    checkKeyboard(emptySquare.x, emptySquare.y + cellSize);
		    } else if (event.keyCode === 40) { //Down Arrow
			    event.preventDefault();
			    checkKeyboard(emptySquare.x, emptySquare.y - cellSize);
		    } else if (event.keyCode === 37) { //Left Arrow
			    event.preventDefault();
			    checkKeyboard(emptySquare.x + cellSize, emptySquare.y);
		    } else if (event.keyCode === 39) { //Right Arrow
			    event.preventDefault();
			    checkKeyboard(emptySquare.x - cellSize, emptySquare.y);
		    } else if (event.keyCode === 82) { //'R' Randomize
			    event.preventDefault();
			    randomize();
		    }
	    });
    }
    //Check
    var moveCounter = document.getElementById("moveCounter");
    var moves = 0;
    var queue = [];
    var ready = true;
    function checkPosition(Tile){
        if(ready == true){
        if((Tile.x + cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){ //Move Current Tile Right
            emptySquare.x = Tile.x; //Move empty
            //Tile.x += cellSize; //Move tile
            queue.push(new Q(Tile, "right"));
            if(queue.length > 0){
            animate(queue[0].Tile, queue[0].dir);
            }
            ready = false;
            //animate(Tile, "right");
            moves++;
            updateTiles();
        }
        else if((Tile.x - cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){ //Move Current Tile Left
            emptySquare.x = Tile.x; //Move empty
            //Tile.x -= cellSize; //Move tile
            //animate(Tile, "left");
            queue.push(new Q(Tile, "left"));
         if(queue.length > 0){
            animate(queue[0].Tile, queue[0].dir);
            }
            ready = false;
            moves++;
            updateTiles();
        }
        else if((Tile.y + cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){ //Move Current Tile Up
            emptySquare.y = Tile.y; //Move empty
           //Tile.y += cellSize; //Move tile
           // animate(Tile, "up");
            queue.push(new Q(Tile, "up"));
            if(queue.length > 0){
            animate(queue[0].Tile, queue[0].dir);
            }
            ready = false;
            moves++;
            updateTiles();
        }
        else if((Tile.y - cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){ //Move Current Tile Down
            emptySquare.y = Tile.y; //Move empty
            //Tile.y -= cellSize; //Move Tile
           //animate(Tile, "down");
            queue.push(new Q(Tile, "down"));
            if(queue.length > 0){
            animate(queue[0].Tile, queue[0].dir);
            
            }
            ready = false;
            moves++;
            updateTiles();
        }
        moveCounter.innerHTML = pad(moves);
        checkComplete();
    }
    }
    
    function updateTiles(){ // Draw tiles/ update their position
        canvas.width += 0; //KEEP - Refreshes the background

        for(var x = 0; x < columns; x++){
           for(var y = 0; y < rows; y++){
                   if(y == columns-1 && x == rows-1){
                     
                   }
               else{
                    board[y][x].drawTiles();
                   
               }
           }
       }
    
}
    
    function createTiles(){ //Fill the array with tiles and their image.
       for(var x = 0; x < columns; x++){
           for(var y = 0; y < rows; y++){
                if(y == columns-1 && x == rows-1){}
               else{
                   board[y][x] = new Tile(x, y, image);
                   board[y][x].drawTiles();
               }
           }
       }
    }

    function checkComplete(){    
        var completeCounter = 0;
        for(var i = 0; i < cells; i++){
            for(var j = 0; j < cells; j++){
                if(board[i][j]!=null){ //Not null
                    if(board[i][j].i == board[i][j].x/cellSize){ //check that the position/cellsize == array position
                        if(board[i][j].j == board[i][j].y/cellSize){
                            completeCounter++;
                            if(completeCounter == 8){
                                window.prompt("COMPLETED\n PLEASE ENTER YOUR NAME");
                                completeCounter = 0;
                            }
                        
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
            }
            }
        }
    }
    function animate(Tile, dir){
        var id = setInterval(moveTile, 1);
        var initialPosX = Tile.x;
        var initialPosY = Tile.y;
        var moveSpeed = 5;
        function moveTile(){
            //console.log("moveTile");
            if(dir == "down" && Tile.y > initialPosY - cellSize){
                Tile.y-=moveSpeed;
                updateTiles();
            }
            else if(dir == "up" && Tile.y < initialPosY + cellSize){
                Tile.y+=moveSpeed;
                updateTiles();
            }
            else if(dir == "left" && Tile.x > initialPosX - cellSize){
                Tile.x-=moveSpeed;
                updateTiles();
            }
            else if(dir == "right" && Tile.x < initialPosX + cellSize){
                Tile.x+=moveSpeed;
                updateTiles();
            }
            else{
                clearInterval(id);
                ready = true;
                queue.pop();
            }
        }
    }
    
    
    //Tile Class
    function Tile(i, j, image){
        this.i = i;
        this.j = j;
        this.x = i * cellSize;
        this.y = j * cellSize;
        this.a = this.x;
        this.b = this.y;
        this.size = cellSize;
        this.image = image;
        
        Tile.prototype.drawTiles = function(){
            ctx.strokeRect(this.x, this.y, this.size, this.size); //Draw rectange around the image
            ctx.drawImage(this.image, this.a , this.b,this.size, this.size, this.x, this.y, this.size, this.size); //Crop and draw the image
        };
        
    }
    function Q(Tile, dir){
        this.Tile = Tile;
        this.dir = dir;
    }
}
