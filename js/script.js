async function getGameID() {
    // var id;
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function() {
    //     if(this.readyState === 4) {
    //       id = JSON.parse(this.responseText).data.id;
    //       return id;
    //     }
    // });

    // xhr.open("POST", "https://classe5ID.altervista.org/games/partita/IANNELLI_milionario");
    // xhr.setRequestHeader("Authorization", "Basic NElFOlRpcm9uaQ==");

    // xhr.send();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic NElFOlRpcm9uaQ==");

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
    };

    const result = await fetch("https://classe5ID.altervista.org/games/partita/IANNELLI_milionario", requestOptions);
    const risultato = await result.json();
    const id = await risultato.data.id;
    return id;
}