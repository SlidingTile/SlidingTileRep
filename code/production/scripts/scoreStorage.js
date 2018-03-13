function setStorage()
{
	localStorage.setItem("P1", "John - 10");
	localStorage.setItem("P2", "Connor - 5");
}

function showStorage()
{
	document.getElementById("P1").innerHTML = localStorage.getItem("P1");
	document.getElementById("P2").innerHTML = localStorage.getItem("P2");
}