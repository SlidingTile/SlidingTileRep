document.addEventListener ("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad() {
	
	//Variable
	var offSwitch = document.getElementById("lightSwitchOff"); //Targets div with ID lightSwitchOff
	var onSwitch = document.getElementById("lightSwitchOn"); //Targets div with ID lightSwitchOn
	var style = document.getElementById("pageStyle"); //Targets stylsheet
	offSwitch.innerHTML = "Turn On Night Mode";
	onSwitch.innerHTML = "Turn Off Night Mode";
	onSwitch.style.display = "none";
	
	//Event Listener
	offSwitch.addEventListener("click", lightsOff); //When clicked this action is performed
	onSwitch.addEventListener("click", lightsOn); //When clicked this action is performed
	
	//Function
	function lightsOff() { /*This changes the background colour to black and makes text white*/
		style.setAttribute('href', 'css/darkStyle.css');
		onSwitch.innerHTML = "Turn Off Night Mode";
		onSwitch.style.display = "inline";
		offSwitch.style.display = "none";
	}
	
	function lightsOn() { /*This changes the background colour to a white and makes text black*/
		style.setAttribute('href', 'css/lightStyle.css');
		offSwitch.innerHTML = "Turn On Night Mode";
		onSwitch.style.display = "none";
		offSwitch.style.display = "inline";
	}
}