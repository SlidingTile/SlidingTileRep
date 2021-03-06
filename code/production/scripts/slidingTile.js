document.addEventListener ("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad()
{
	/* Hides / Unhides Elements until start */
	var easy = document.getElementById('Easy');
	var medium = document.getElementById('Medium');
	var hard = document.getElementById('Hard');
	var instructions = document.getElementById('instructions');
	var reset = document.getElementById("reset"); //Reset button
	var random = document.getElementById('random'); //Randomise button
	reset.style.visibility = 'hidden';
	random.style.visibility = 'hidden';
	game.style.visibility = 'hidden';
	easy.style.display = 'none'; //Hides difficulty button
	medium.style.display = 'none'; //Hides difficulty button
	hard.style.display = 'none'; //Hides difficulty button
	var image;
	var initalImage = 0;
	var txt;
	
	function enableCanvas() {
		game.style.visibility = 'initial';
		playSound();
	}
	
	/* Sound */
	clickSound = new Audio('sound/Click.ogg');
	backgroundMusic = new Audio('sound/Background1.ogg');
	
	function playSound() {
	backgroundMusic.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	backgroundMusic.play();
	backgroundMusic.volume = 0.2; //0-1
	}
		
	/* Score */
	var name;
	var score;
	var player1Name;
	var player2Name;
	var player3Name;
	var player4Name;
	var player5Name;
	
	var playerNames = ["Player One","Player Two","Player Three","Player Four","Player Five"];
	var playerScores = [200,135,105,98,75,45];
	playerScores.length = 5;
	
	var player1Score; 
	var player2Score; 
	var player3Score; 
	var player4Score;
	var player5Score;
	
	
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
			secondTitle.innerHTML = 'Select a Category Below Using The Dropdown Menu';
			animals.style.display = 'none';
			cars.style.display = 'none';
			scenery.style.display = 'none';
			custom.style.display = 'none';
		} else if(categories.value === 'Custom') {
			title.innerHTML = 'Custom: Recommended upload size 600 x 600';
			secondTitle.innerHTML = '';
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
	
	/*Click picture allows change*/
	var dog = document.getElementById('dog');
	var cat = document.getElementById('cat');
	var bird = document.getElementById('bird');
	var cow = document.getElementById('cow');
	var horse = document.getElementById('horse');
	
	var bmw = document.getElementById('bmw');
	var bugatti = document.getElementById('bugatti');
	var audi = document.getElementById('audi');
	var ferrari = document.getElementById('ferrari');
	var mercedes = document.getElementById('mercedes');
	
	var italy = document.getElementById('italy');
	var newYork = document.getElementById('newYork');
	var london = document.getElementById('london');
	var paris = document.getElementById('paris');
	var dubai = document.getElementById('dubai');
	
	var customImg = document.getElementById('upload-Preview');
	
	var source = document.getElementById('source');
	
	dog.addEventListener('click', changeSource);
	cat.addEventListener('click', changeSource);
	bird.addEventListener('click', changeSource);
	cow.addEventListener('click', changeSource);
	horse.addEventListener('click', changeSource);
	
	bmw.addEventListener('click', changeSource);
	bugatti.addEventListener('click', changeSource);
	audi.addEventListener('click', changeSource);
	ferrari.addEventListener('click', changeSource);
	mercedes.addEventListener('click', changeSource);
	
	italy.addEventListener('click', changeSource);
	newYork.addEventListener('click', changeSource);
	london.addEventListener('click', changeSource);
	paris.addEventListener('click', changeSource);
	dubai.addEventListener('click', changeSource);
	
	customImg.addEventListener('click', changeSource);
	
	function changeSource() {
		var temp = this.id;
		if(initalImage == 0) {
			reset.style.visibility = 'visible';
			random.style.visibility = 'visible';
			easy.style.display = 'initial'; //Shows difficulty button
			medium.style.display = 'initial'; //Shows difficulty button
			hard.style.display = 'initial'; //Shows difficulty button
			instructions.style.display = 'none';
			this.id = 'source';
			image = document.getElementById('source');
			createTiles();
			initalImage = 1;
		} else {
			resetAll();
			image.id = temp;
			this.id = 'source';
			image = document.getElementById('source');
			createTiles();
			emptySquare = new Tile(cells-1, cells-1, null);
			updateTiles();
		}
	}
	
	/*Timer Function*/
	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
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
		
		randomize(); //Randomize board
		easy.style.display = 'none'; //Hides difficulty button
		medium.style.display = 'none'; //Hides difficulty button
		hard.style.display = 'none'; //Hides difficulty button
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

	/* reading from a text file */

	/*Difficulty Functions - Change values as needed */
	hard.addEventListener('click', HardDifficulty);
	medium.addEventListener('click', MediumDifficulty);	
	
	easy.addEventListener('click', EasyDifficulty);
	function EasyDifficulty() {
		resetGame(); // reset everything
		enableCanvas();
		startTimer();
		difficulty = 300;
	}
	
	
	
	function MediumDifficulty() {
		resetGame(); // reset everything
		enableCanvas();
		startTimer();
		difficulty = 120;
	}
	
	function HardDifficulty() {
		resetGame(); // reset everything
		enableCanvas();
		startTimer();
		difficulty = 60;
	}
	
	/*Reset Function */
	reset.addEventListener('click', resetAll);
	
	function resetGame() //Resets value and stops function
	{
		secondModifier = 1;
		totalSeconds = 0;
		secondsLabel.innerHTML = pad(totalSeconds%60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		clearInterval(time);
	}
	
	function resetAll()
	{
		secondModifier = 1;
		totalSeconds = 0;
		secondsLabel.innerHTML = pad(totalSeconds%60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		clearInterval(time);
		easy.style.display = 'inline'; //Shows difficulty button
		medium.style.display = 'inline'; //Shows difficulty button
		hard.style.display = 'inline'; //Shows difficulty button
		game.style.visibility = 'hidden';
		randomizeAmount = 100;
		backgroundMusic.pause();
	}

	/* Losing Function */
	function Lose()
	{
		window.alert("You lost, better luck next time!"); // needs a makeover
		resetAll() // reset everything
	}

	/* Show Leaderboards */
	var showLeaders = document.getElementById("showLeaderboard"); // get button for leaderboards
	showLeaders.addEventListener('click', showLeaderboards);
	//showLeaders.addEventListener('click', preload);
	
	function showLeaderboards() // This needs to be called to essentially refresh the scores - Could be used as a refresh button rather than 
	// hiding the whole leaderboard.
	{
		//document.getElementById("leaderboards").style.display = 'inline-block';
		
		// All the scores & names
		document.getElementById("P1").innerHTML = playerNames[0];
		document.getElementById("P1S").innerHTML = playerScores[0];
		
		document.getElementById("P2").innerHTML = playerNames[1];
		document.getElementById("P2S").innerHTML = playerScores[1];
		
		document.getElementById("P3").innerHTML = playerNames[2];
		document.getElementById("P3S").innerHTML = playerScores[2];
		
		document.getElementById("P4").innerHTML = playerNames[3];
		document.getElementById("P4S").innerHTML = playerScores[3];
		
		document.getElementById("P5").innerHTML = playerNames[4];
		document.getElementById("P5S").innerHTML = playerScores[4];
	}
	
	/* Winning Function */
	function Win()
	{
		/* Score formula (may need a rework) */
		var FlatScore = 1100;
		score = (FlatScore - totalSeconds) - moves ;
		//alert(localstorage.score1);
		var name = window.prompt("You won! \nPlease enter your name: ");
		// Using local storage - localName & localScore to check against other scores)
		localStorage.setItem("localName", name); // set localName = players name this session.
		localStorage.setItem("localScore", score); // set localScore = players score this session.
		
		// Make values 
		// check  through all players scores if they equal 0 allow for new scores to pass through
		
		for(var i=0; i <= playerScores.length ; i++)
		{
			if(playerScores[i] <= score)
			{
				playerScores.splice(i, 0, score);
				playerNames.splice(i, 0, name);
				i++;
                break;
			}
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
	
	canvas.addEventListener('mousemove', onMouseUpdate, false);
	canvas.addEventListener('click', checkMouse);
	random.addEventListener('click', function() {
		randomizeAmount = 100;
		randomize();
	});
	window.addEventListener('load', keyInput);
	
	var canvSize = 600; //size of the canvas size in pixels
    	canvas.width = canvSize;
    	canvas.height = canvSize;
    
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
    	var randomizeAmount = 100; //Change this to randomize more
    	var prevRandom;
	function randomize() {
        if(randomizeAmount > 0) { 
                var x = Math.floor(Math.random() * (cells));
                var y = Math.floor(Math.random() * (cells));
            		if(x != 2 || y != 2) {
                        if(prevRandom != board[x][y]); //Makes the function less random but more jumbled
                		checkPosition(board[x][y]);
                        prevRandom = board[x][y];
            		} else {
                        randomize();
                    	}
		
		      //Reset moves to 0
            	moves = 0;
            	moveCounter.innerHTML = pad(moves);
            
            	//Reset Time to 0
            	totalSeconds = difficulty;
            	secondsLabel.innerHTML = pad(totalSeconds%60);minutesLabel.innerHTML = pad(parseInt(totalSeconds/60)); 
    		}
    	}
    //Get the position of the mouse when it updates
    function onMouseUpdate(e) {
        showLeaderboards();
    	var rect = canvas.getBoundingClientRect();
    	mouseX = e.pageX - rect.left;
    	mouseY = e.pageY - rect.top - window.scrollY;
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
			    //event.preventDefault();
			    randomizeAmount = 100;
			   randomize();
			   //Win();
		    } else if(event.keyCode === 88) { // 'X' testing purp
			  //alert(playerScores[0]);
			}
	    });
    }
    //Check
    var moveCounter = document.getElementById("moveCounter");
    var moves = 0;
    var ready = true;
    function checkPosition(Tile){
        if(ready == true){
        if((Tile.x + cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){ //Move Current Tile Right
            emptySquare.x = Tile.x; //Move empty
            //Tile.x += cellSize; //Move tile with no anim
            ready = false;
            animate(Tile, "right");
            moves++;
        }
        else if((Tile.x - cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){ //Move Current Tile Left
            emptySquare.x = Tile.x; //Move empty
            //Tile.x -= cellSize; //Move tile no anim
            animate(Tile, "left");
            ready = false;
            moves++;
        }
        else if((Tile.y + cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){ //Move Current Tile Up
            emptySquare.y = Tile.y; //Move empty
           //Tile.y += cellSize; //Move tile no anim
           animate(Tile, "up");
            ready = false;
            moves++;
        }
        else if((Tile.y - cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){ //Move Current Tile Down
            emptySquare.y = Tile.y; //Move empty
            //Tile.y -= cellSize; //Move Tile no anim
           animate(Tile, "down");
            ready = false;
            moves++;
        }
        else if(randomizeAmount > 0){
            randomize();
        }
        moveCounter.innerHTML = pad(moves);
        
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
        if(randomizeAmount == 0){
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
    }
    function animate(Tile, dir){
        var id = setInterval(moveTile, 1);
        var initialPosX = Tile.x;
        var initialPosY = Tile.y;
        var moveSpeed;
        if(randomizeAmount > 0){
            moveSpeed = 20; //Needs to be a factor of 200
        }else{
            moveSpeed = 5;
        }
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
                checkComplete();
        if(randomizeAmount > 0){
            randomizeAmount--;
            randomize();
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
            ctx.strokeRect(this.x, this.y, this.size, this.size); //Draw rectange around the image
            ctx.drawImage(this.image, this.a , this.b,this.size, this.size, this.x, this.y, this.size, this.size); //Crop and draw the image
        };
        
    }
}
