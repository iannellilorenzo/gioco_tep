function createGame() {
    window.open("../html/newgame.html", "_blank");
}

  
function getGameID() {
    // codice postman
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("POST", "https://classe5ID.altervista.org/games/partita/IANNELLI_milionario");
    xhr.setRequestHeader("Authorization", "Basic NElFOlRpcm9uaQ==");

    xhr.send();

    
}