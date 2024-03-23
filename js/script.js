async function getGameID() {
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