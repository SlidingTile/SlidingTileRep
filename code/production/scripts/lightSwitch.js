document.addEventListener("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad() {

  var offSwitch = document.getElementById("lightSwitchOff");
  var onSwitch = document.getElementById("lightSwitchOn");
  
  if (offSwitch == null) {
      //Do Nothing
  } else {
      offSwitch.addEventListener('click', lightsOff);
  }
  
  if (onSwitch == null) {
      //Do Nothing
  } else {
      onSwitch.addEventListener('click', lightsOn);
  }

  function lightsOff() {
    localStorage.setItem('lights', 'off');
    
    document.body.classList.add('dark');
    for(i = 0; i < document.links.length; i++) {
        document.links[i].classList.add('dark');
    }
    
    if (document.getElementById("nav") == null) {
        //Do Nothing
    } else {
        document.getElementById("nav").classList.add('dark');
    }
    
    if (document.getElementById("mainContent") == null) {
        //Do Nothing
    } else {
        document.getElementById("mainContent").classList.add('dark');
    }
    
    if (document.getElementById("lightSwitchOff") == null) {
        //Do Nothing
    } else {
        document.getElementById("lightSwitchOff").classList.add('dark');
    }
    
    if (document.getElementById("lightSwitchOn") == null) {
        //Do Nothing
    } else {
        document.getElementById("lightSwitchOn").classList.add('dark');
    }
    
  }

  function lightsOn() {
    localStorage.setItem('lights', 'on');
    
    document.body.classList.remove('dark');
    for(i = 0; i < document.links.length; i++) {
        document.links[i].classList.remove('dark');
    }
    
    if (document.getElementById("nav") == null) {
        //Do Nothing
    } else {
        document.getElementById("nav").classList.remove('dark');
    }
    
    if (document.getElementById("mainContent") == null) {
        //Do Nothing
    } else {
        document.getElementById("mainContent").classList.remove('dark');
    }
    
    if (document.getElementById("lightSwitchOff") == null) {
        //Do Nothing
    } else {
        document.getElementById("lightSwitchOff").classList.remove('dark');
    }
    
    if (document.getElementById("lightSwitchOn") == null) {
        //Do Nothing
    } else {
        document.getElementById("lightSwitchOn").classList.remove('dark');
    }
    
  }
  
  if(localStorage.getItem('lights') === 'off') {
      lightsOff();
  } else {
      lightsOn();
  }
}
