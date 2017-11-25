document.addEventListener ("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad() {
	
	/*Timer Function*/
	var minutesLabel = document.getElementById("minutes");
	var secondsLabel = document.getElementById("seconds");
	var start = document.getElementById('start');
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
		time = setInterval(setTime, 1000); //Repeats function every 1000ms or 1 second

		function setTime()
		{
			++totalSeconds; //Increases seconds
			secondsLabel.innerHTML = pad(totalSeconds%60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		}
	}
	
	var reset = document.getElementById("reset");
	reset.addEventListener('click', clearAll);
	
	function clearAll() //Resets value and stops function
	{
		totalSeconds = 0;
		secondsLabel.innerHTML = pad(totalSeconds%60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
		clearInterval(time);
	}
	
/*----------------------------------------------------------------------------------------*/
	
	/*Sliding Tile Function*/
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var image = document.getElementById('source');
	canvas.addEventListener('mousemove', onMouseUpdate, false);
	canvas.addEventListener('click', checkMouse);
	image.addEventListener('load', createTiles);
	var canvSize = 600; // pixels
	canvas.width = canvSize;
	canvas.height = canvSize;    
    
	var cells = 3;
    var cellSize = canvSize/cells;
    var rows = cells;
    var columns = cells;
    var board = [];
    var mouseX = 0;
    var mouseY = 0;
    
    var emptySquare = new Tile(cells-1, cells-1, null);
    
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
	
    	function onMouseUpdate(e) {
		var rect = canvas.getBoundingClientRect();
		mouseX = e.pageX - rect.left;
		mouseY = e.pageY - rect.top;
	}
	
    	function checkMouse() {
        	for(var x = 0; x < columns; x++) {
           	for(var y = 0; y < rows; y++) {
                	if(y == columns-1 && x == rows-1) {
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
	   
    function checkPosition(Tile){
        var x = 0;
        var y = 0;
        if((Tile.x + cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){
            emptySquare.x = Tile.x;
            Tile.x += cellSize;
            updateTiles();
        }
        else if((Tile.x - cellSize == emptySquare.x) && (Tile.y == emptySquare.y)){
            emptySquare.x = Tile.x;
            Tile.x -= cellSize;
            updateTiles();
        }
        else if((Tile.y + cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){
            emptySquare.y = Tile.y;
            Tile.y += cellSize;
            updateTiles();
        }
        else if((Tile.y - cellSize == emptySquare.y) && (Tile.x == emptySquare.x)){
            emptySquare.y = Tile.y;
            Tile.y -= cellSize;
            updateTiles();
        }
    }
    
    function updateTiles(){
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
    
    function createTiles(){
        
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
