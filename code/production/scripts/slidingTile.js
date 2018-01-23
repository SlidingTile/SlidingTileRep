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
	categories.addEventListener('change', changeCategory);
	categories.addEventListener('change', changePictures);
	animals.style.display = 'none';
	cars.style.display = 'none';
	scenery.style.display = 'none';
	custom.style.display = 'none';
	
	function changeCategory() {
		if (categories.value === 'default') {
			title.innerHTML = '';
			animals.style.display = 'none';
			cars.style.display = 'none';
			scenery.style.display = 'none';
			custom.style.display = 'none';
		} else {
			title.innerHTML = categories.value;
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
		randomize();
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
	document.addEventListener('load', keyInput);
	
	var canvSize = 600; // pixels
    	canvas.width = canvSize;
    	canvas.height = canvSize;
    
    
    	var cells = 3;  //How many cells in a row/ column - Change this variable to change difficulty
    	var cellSize = canvSize/cells;
    	var rows = cells;
    	var columns = cells;
    	var board = [];
    	var mouseX = 0;
    	var mouseY = 0;
    
    	var emptySquare = new Tile(cells-1, cells-1, null);
    
    
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
	
	function randomize(){
        	for(var i = 0; i < 1000; i++) {
            		var x = Math.floor(Math.random() * (cells));
            		var y = Math.floor(Math.random() * (cells));
            		if(x != 2 || y != 2) {
                		checkPosition(board[x][y]);
            		}
        	}
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
		function keyInput() {
	    document.addEventListener("keydown", function(event) {
		    if (event.keyCode === 38) {
			    event.preventDefault();
			    checkKeyboard(emptySquare.x, emptySquare.y + cellSize);
		    } else if (event.keyCode === 40) {
			    event.preventDefault();
			    checkKeyboard(emptySquare.x, emptySquare.y - cellSize);
		    } else if (event.keyCode === 37) {
			    event.preventDefault();
			    checkKeyboard(emptySquare.x + cellSize, emptySquare.y);
		    } else if (event.keyCode === 39) {
			    event.preventDefault();
			    checkKeyboard(emptySquare.x - cellSize, emptySquare.y);
		    } else if (event.keyCode === 82) {
			    event.preventDefault();
			    randomize();
		    }
	    });
    }
    function checkPosition(Tile){
        if((Tile.x + cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){ //Move Current Tile Right
            emptySquare.x = Tile.x; 
            Tile.x += cellSize;
            updateTiles();
        }
        else if((Tile.x - cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){ //Move Current Tile Left
            emptySquare.x = Tile.x;
            Tile.x -= cellSize;
            updateTiles();
        }
        else if((Tile.y + cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){ //Move Current Tile Up
            emptySquare.y = Tile.y;
            Tile.y += cellSize;
            updateTiles();
        }
        else if((Tile.y - cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){ //Move Current Tile Down
            emptySquare.y = Tile.y;
            Tile.y -= cellSize;
            updateTiles();
        }
    }
    
    function updateTiles(){ // Draw tiles/ update their position
        canvas.width += 0;
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
       
            ctx.strokeRect(this.x, this.y, this.size, this.size);
            ctx.drawImage(this.image, this.a , this.b,this.size, this.size, this.x, this.y, this.size, this.size);
        };
        
    }
}
