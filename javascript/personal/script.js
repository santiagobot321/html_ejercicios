let almacenapasswd = "";

document.getElementById("passwd").addEventListener("keydown", function(event) {
    if (event.key.length === 1) {
        almacenapasswd += event.key
    }  
})
