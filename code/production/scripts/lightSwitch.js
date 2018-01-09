document.addEventListener("DOMContentLoaded", handleDocumentLoad);

function handleDocumentLoad() {

  var offSwitch = document.getElementById("lightSwitchOff");
  var onSwitch = document.getElementById("lightSwitchOn");
  
  if (offSwitch == null) {
      //Do Nothing
  } else {
      offSwitch.addEventListener('click', lightsOn);
  }
  
  if (onSwitch == null) {
      //Do Nothing
  } else {
      onSwitch.addEventListener('click', lightsOff);
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
    
    if (document.getElementById("question") == null) {
        //Do Nothing
    } else {
        document.getElementById("question").classList.add('dark');
    }
    
    if (document.getElementById("answers") == null) {
        //Do Nothing
    } else {
        document.getElementById("answers").classList.add('dark');
    }
    
    if (document.getElementById("cookies") == null) {
        //Do Nothing
    } else {
        document.getElementById("cookies").classList.add('dark');
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
    
    if (document.getElementById("question") == null) {
        //Do Nothing
    } else {
        document.getElementById("question").classList.remove('dark');
    }
    
    if (document.getElementById("answers") == null) {
        //Do Nothing
    } else {
        document.getElementById("answers").classList.remove('dark');
    }
    
    if (document.getElementById("cookies") == null) {
        //Do Nothing
    } else {
        document.getElementById("cookies").classList.remove('dark');
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