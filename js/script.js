async function joinHost() {
  const id = await getGameID();
  const hostName = localStorage.getItem("hostName");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic NElFOlRpcm9uaQ==");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
  };

  await fetch(`https://classe5ID.altervista.org/games/join/${id}/${hostName}`, requestOptions);
  return id;
}

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

function rng(min, max) {
  return Math.random() * (max - min) + min;
}

async function getAnswers() {
  let supportArray = []; // array di supporto per la randomizzazione delle domande
  const questAnsw = await getQuestion();
  for (let i = 1; i <= 4; i++) {
    let answIndex;
    let randomNum;
    do {
      randomNum = Math.floor(rng(1, 5));
      answIndex = `risposta${randomNum}`;
    } while (supportArray.includes(randomNum));
    supportArray.push(randomNum);
    document.getElementById(`risposta${i}`).innerText = questAnsw[stepId][answIndex];
  }
}

function disableButtons(elemsByClassName) {
  let buttons = document.getElementsByClassName(elemsByClassName);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function enableButtons(elemsByClassName) {
  let buttons = document.getElementsByClassName(elemsByClassName);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let progress = 0;

function progressBarUpdate() {
  progress += 100 / 15;
  if (progress > 100) {
    progress = 100;
  }

  let bar = document.getElementById('progress-bar');
  bar.style.width = progress + '%';
  bar.setAttribute('aria-valuenow', progress);
}

async function playerWon() {
  await delay(2000);
  document.getElementById('dopp_bravo').play();
  let doc = document.getElementsByClassName('cont')[0];
  doc.innerHTML = "";
  let gameOver = document.createElement("h1");
  gameOver.style.textAlign = "center";
  gameOver.style.padding = "50px";
  gameOver.style.color = "green";
  gameOver.innerText = "Hai vinto! La tua vincita è di €" + money[`domanda${stepId}`];
  doc.appendChild(gameOver);
}

async function answered(answerId) {
  let buttons = document.getElementsByClassName('risposta');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('no-click');
  }

  const answ = document.getElementById(`risposta${answerId}`);
  answ.classList.add('blue-flash');
  const answText = answ.innerText;
  document.getElementById('accendiamo').play();
  answ.innerText = "L'accendiamo...?";

  const modal = document.getElementById('modal-message');
  const currentIndex = index;

  setTimeout(async function () {
    answ.classList.remove('blue-flash');
    answ.innerText = answText;
    if (quest[currentIndex].risposta1 === answText) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('no-click');
      }
      index++;
      stepId++;
      modal.style.color = "green";
      modal.innerText = "Risposta corretta!";
      showHideModal();
      progressBarUpdate();
      nextStep();
    } else {
      modal.style.color = "red";
      modal.innerText = "Risposta sbagliata!";
      showHideModal();

      await delay(2000);

      gameOverMsg();
    }
  }, 1000);
}

let q;

async function getQuest() {
  const path = "../assets/domande_risposte.json";
  const response = await fetch(path);
  q = await response.json();
  return q;
}

async function getOpponentStatus() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic NElFOlRpcm9uaQ==");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const id = localStorage.getItem("gameId");

  const fet = await fetch(`https://classe5ID.altervista.org/games/mossa/${id}`, requestOptions);
  const json = await fet.json();
  const opponentStatus = await json.data.play.MOSSA;

  return opponentStatus;
}

async function sendPlayerStatus(nameKey, status) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic NElFOlRpcm9uaQ==");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
  };

  const id = localStorage.getItem("gameId");
  const playerName = localStorage.getItem(nameKey);

  const fet = await fetch(`https://classe5id.altervista.org/games/mossa/${id}/${playerName}/${status}`, requestOptions);
  const json = await fet.json();
  return json;
}