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
	/* Sound */
	var clickSound = new Audio('sound/Click.ogg');
	var backgroundMusic = document.getElementById("BMusic");
	backgroundMusic.volume = 0.2; //0-1
	/* Score */
	var name;
	var score;
	

	
	/* Difficulty */
	var difficulty = 300;
	var secondModifier = 1;
	
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
	var totalSeconds = difficulty; // set starting time equal to difficulty (easy = 3 mins / 180 secs)
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
		// set new time - refreshes time
		totalSeconds = difficulty;
		
		//randomize();
		start.style.display = 'none'; //Hides start button
		time = setInterval(setTime, 1000); //Repeats function every 1000ms or 1 second

		function setTime()
		{
		    totalSeconds = totalSeconds - secondModifier;// decrease seconds (Modifier will change depending on win/lose state)
			secondsLabel.innerHTML = pad(totalSeconds%60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds/60)); 
			
			// Lose detection
			if(totalSeconds <= 0)
			{
				secondModifier = 0;
				Lose();
			}
			
		}
	}
/*----------------------------------------------------------------------------------------*/

	/*Difficulty Functions - Change values as needed */
	
	var hardDifficulty = document.getElementById("Hard"); // Hard button
	Hard.addEventListener('click', HardDifficulty);
	
	var mediumDifficulty = document.getElementById("Medium"); // Medium button
	Medium.addEventListener('click', MediumDifficulty);
	
	var easyDifficulty = document.getElementById("Easy"); // Easy button
	Easy.addEventListener('click', EasyDifficulty);
	
	function EasyDifficulty()
	{
		resetAll(); // reset everything
		difficulty = 300;
	}
	function MediumDifficulty()
	{
		resetAll(); // reset everything
		difficulty = 120;
	}
	function HardDifficulty()
	{
		resetAll(); // reset everything
		difficulty = 60;
	}
	

/*----------------------------------------------------------------------------------------*/
	
	/*Reset Function */
	var reset = document.getElementById("reset"); //Reset button
	reset.addEventListener('click', resetAll);
	
	function resetAll() //Resets value and stops function
	{
		secondModifier = 1;
		totalSeconds = 0;
		secondsLabel.innerHTML = pad(totalSeconds%60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		clearInterval(time);
		start.style.display = 'inline'; //Shows start button
		game.style.visibility = 'hidden';
	}
	
/*----------------------------------------------------------------------------------------*/


	/* Losing Function */
	
	function Lose()
	{
		window.alert("You lost, better luck next time! Maybe lower the difficulty."); // needs a makeover
		resetAll() // reset everything
	}

/*----------------------------------------------------------------------------------------*/
	/* Show Leaderboards */
	var showLeaders = document.getElementById("showLeaderboard"); // get button for leaderboards
	showLeaderboard.addEventListener('click', showLeaderboards)
	
	function showLeaderboards() // This needs to be called to essentially refresh the scores - Could be used as a refresh button rather than 
	// hiding the whole leaderboard.
	{
		document.getElementById("leaderboards").style = "display: inline-block;";
		
		// All the scores & names
		document.getElementById("P1").innerHTML = localStorage.name1;
		document.getElementById("P1S").innerHTML = localStorage.score1;
		
		document.getElementById("P2").innerHTML = localStorage.name2;
		document.getElementById("P2S").innerHTML = localStorage.score2;
		
		document.getElementById("P3").innerHTML = localStorage.name3;
		document.getElementById("P3S").innerHTML = localStorage.score3;
		
		document.getElementById("P4").innerHTML = localStorage.name4;
		document.getElementById("P4S").innerHTML = localStorage.score4;
		
		document.getElementById("P5").innerHTML = localStorage.name5;
		document.getElementById("P5S").innerHTML = localStorage.score5;
	}
	/* Winning Function */
	function Win()
	{
		/* Score formula (may need a rework) */
		var FlatScore = 1100;
		score = (FlatScore - totalSeconds) - moves ;
		
		var name = window.prompt("You won! \nPlease enter your name: ");
		// Using local storage - localName & localScore to check against other scores)
		localStorage.setItem("localName", name); // set localName = players name this session.
		localStorage.setItem("localScore", score); // set localScore = players score this session.
		
		// Make values 
		
		
		// Check if score beats any of those on the leaderboards.
		if(localStorage.localScore > localStorage.score1)
		{
			localStorage.score1 = localStorage.localScore; // set score to correct place
			localStorage.name1 = localStorage.localName; // set name to correct place in leaderboard
		}
		else if(localStorage.localScore > localStorage.score2)
		{
			localStorage.score2 = localStorage.localScore; // set score to correct place
			localStorage.name2 = localStorage.localName; // set name to correct place in leaderboard
		}
		else if(localStorage.localScore > localStorage.score3)
		{
			localStorage.score3 = localStorage.localScore; // set score to correct place
			localStorage.name3 = localStorage.localName; // set name to correct place in leaderboard
		}
		else if(localStorage.localScore > localStorage.score4)
		{
			localStorage.score4 = localStorage.localScore; // set score to correct place
			localStorage.name4 = localStorage.localName; // set name to correct place in leaderboard
		}
		else if(localStorage.localScore > localStorage.score5)
		{
			localStorage.score5 = localStorage.localScore; // set score to correct place
			localStorage.name5 = localStorage.localName; // set name to correct place in leaderboard
		}
		
		
		localStorage.setItem("name", name);
		localStorage.setItem("score", score);
        completeCounter = 0;
		secondModifier = 0; // Stop time!
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
								Win();
                                
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
				clickSound.play();
            }
            else if(dir == "up" && Tile.y < initialPosY + cellSize){
                Tile.y+=moveSpeed;
                updateTiles();
				clickSound.play();
            }
            else if(dir == "left" && Tile.x > initialPosX - cellSize){
                Tile.x-=moveSpeed;
                updateTiles();
				clickSound.play();
            }
            else if(dir == "right" && Tile.x < initialPosX + cellSize){
                Tile.x+=moveSpeed;
                updateTiles();
				clickSound.play();
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
