$('#lightSwitch').on('click', function () {
    var text = $(this).text();
    if (text == 'Turn Lights Off') {
        darkmode();
    } else {
        lightmode();
    }
});

function darkmode() {
    $('body').addClass('dark');
    $('nav').addClass('dark');
    $('a').addClass('dark');
    $('#mainContent').addClass('dark');
    
    localStorage.setItem("lights", "dark");
    
    $('#lightSwitch').text("Turn Lights On");
}
    
function lightmode() {
    $('body').removeClass('dark');
    $('nav').removeClass('dark');
    $('a').removeClass('dark');
    $('#mainContent').removeClass('dark');
    
    localStorage.setItem("lights", "light");
    
    $('#lightSwitch').text("Turn Lights Off");
}

if(localStorage.getItem("lights") == "dark") {
    darkmode();
} else {
    lightmode();
}
