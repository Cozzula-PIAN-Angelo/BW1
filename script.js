/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

/* =========================
   DOM
========================= */

const app = document.querySelector("#app");

/* =========================
   DATI QUIZ
========================= */

/* prima inserito l'array di 150 domande su JS per usare stringify() e stampare l'array in console versione JSON, per poi copiarlo e incollarlo qui */

// utilizziamo l'array dal json
let QUESTIONS = []; // si dichiara prima l'array vuoto, così potrà accogliere i file
// crea varibaile per i punteggi record
let recordScore = 0;
// crea una costante per i record salvati e di a JS che sono uguali a dei dati presi dal local storage
const mySavedRecord = localStorage.getItem('recordNetflix');
// se i recordSalvati sono diversi da niente
if (mySavedRecord !== null) {
  recordScore = parseInt(mySavedRecord); // allora il mio punteggio è il punteggio json ma convertilo in numero intero
}

// async function prima della funzione di preparazione dell'array per avvisare JS che utilizzero un await
async function prepareQuiz() {
  try { // preparare JS alla funzione potenzialmente pericolosa per il sistema, perché richiede dell'attesa
    const dataJson = await fetch('questions.json'); // la funzione pericolosa è questa che chiede di aspettare (await) la lettura dei dati JSON (fetch())
    QUESTIONS = await dataJson.json(); // la funzione dice di tradurre il pacco dati json in array comprensibile da JS
    showWelcome(); // chiamo la partenza qui così JS non lo fa prima di aver trovato tutto
  } catch (errore) { //se qualcosa va storto, cattura l'errore e spiegami l'errore
    console.error('Fatal Error:', errore);
  }
}

prepareQuiz(); // deve essere la prima chiamata (per ovvi motivi)

let SELECTED_QUESTIONS = [];

/* =========================
   COSTANTI
========================= */

const TIMER_DURATION = 5;
const PASS_THRESHOLD = 60;

/* =========================
   STATO GLOBALE
========================= */

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let selectedAnswers = []; // aggiunta simone
let timerId = null;
let timeLeft = TIMER_DURATION;

/*intro*/
function showIntro() {

  document.body.classList.add("intro-active");
  app.innerHTML = "";
  const intro = document.createElement("div");
  intro.classList.add("intro-screen");
  const logo = document.createElement("h1");
  logo.classList.add("intro-logo");
  logo.textContent = "N";
  intro.appendChild(logo);
  document.body.appendChild(intro);
  setTimeout(() => {
    intro.remove();
    document.body.classList.remove("intro-active");
    showWelcome();
  }, 2900);
};

/* =========================
   WELCOME PAGE
========================= */

function showWelcome() {
  app.innerHTML = "";
  const queDifDiv = document.createElement('div');
  queDifDiv.classList.add('queDifDiv');
  
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('questionDiv');

  const difficultyDiv = document.createElement('difficultyDiv');
  difficultyDiv.classList.add('difficultyDiv');

  const sBtnDiv = document.createElement('div');
  sBtnDiv.classList.add('sBtnDiv');

  const welcolmeDiv = document.createElement("div");
  welcolmeDiv.classList.add("welcomeDiv");

  const welcomeTitle = document.createElement("h1");
  welcomeTitle.textContent = "Benvenuto al tuo esame";

  const quizDescription = document.createElement("p");
  quizDescription.classList.add("quiz-description");

  quizDescription.textContent =
    "Una serie di 10 domande sul mondo dell'informatica e del web. Per ogni domanda hai 20 secondi di tempo.";

  const instructionList = document.createElement("ul");
  instructionList.classList.add("instruction-list");

  const instructionLi1 = document.createElement("li");
  instructionLi1.textContent =
    "Ogni domanda è a tempo e può ricevere una sola risposta.";

  const instructionLi2 = document.createElement("li");
  instructionLi2.textContent =
    "Una volta cliccata una risposta, la domanda è chiusa.";

  const instructionLi3 = document.createElement("li");
  instructionLi3.textContent = "Il quiz dura circa 3 minuti.";

  instructionList.appendChild(instructionLi1);
  instructionList.appendChild(instructionLi2);
  instructionList.appendChild(instructionLi3);

  /* ******** Creazione menu a tendina per scegliere il numero di domande */
  
  const labelCount = document.createElement("label");
  labelCount.classList.add('labelCount');
  labelCount.textContent = "Quante domande vuoi affrontare? ";

  const selectCount = document.createElement("select");
  selectCount.id = "questionCount";

  /* ******** Creazione menu a tendina per scegliere il livello di difficoltà */
  const labelDiff = document.createElement("label"); // creazione etichetta
  labelDiff.classList.add('labelDiff');
  labelDiff.textContent = "Scegli la difficoltà da affrontare: ";

  const selectDiff = document.createElement("select");
  selectDiff.id = "difficulty";

  /* ******** Creazione opzioni - livello di difficoltà */
  const difficulties = ["Facile", "Intermedia", "Difficile", "Tutte"];
  difficulties.forEach((diff) => {
    // cicla ad ogni voce dell'array una alla volta
    const option = document.createElement("option"); // crea ogni singola voce dal menù a tendina (genererà le card facile, medio, difficile, tutte)
    option.value = diff.toLowerCase(); // valore interno al codice in minuscolo, confronto diretto tra costante creata e la chiave dell'array
    option.textContent = diff; // testo visibile dall'utente (Es: facile)
    selectDiff.appendChild(option); // funzione appesa, aggiunge option dentro select
  });

  /* ******** Ciclo per creare le opzioni a scaglioni di 10 */
  for (let i = 10; i <= QUESTIONS.length; i += 10) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === 10) option.selected = true; // Default a 10
    selectCount.appendChild(option);
  }

  /* ******** Opzione "All" se il totale non è multiplo di 10 */
  if (QUESTIONS.length % 10 !== 0) {
    const optionAll = document.createElement("option");
    optionAll.value = QUESTIONS.length;
    optionAll.textContent = "Hardcore (All)";
    selectCount.appendChild(optionAll);
  }

  const startButton = document.createElement("button");
  startButton.classList.add("start-button");

  startButton.textContent = "INIZIA";

  startButton.addEventListener("click", () => {
    /* ******** Lettura del valore dal menu a tendina */
    const chosenCount = parseInt(selectCount.value) || 10;
    const chosenDifficulty = selectDiff.value; // legge il valore della difficoltà

    currentQuestion = 0; // torna alla prima domanda
    correctAnswers = 0; // azzera le risposte corrette
    wrongAnswers = 0; // azzera le risposte sbagliate

    selectedAnswers = []; // svuota lo storico delle risposte, quello usato da Mostra risposte
    const filtered =
      chosenDifficulty === "tutte"
        ? QUESTIONS
        : QUESTIONS.filter((q) => q.difficulty === chosenDifficulty); // operatore ternario (if else scritto in riga)
    filtered.sort(() => Math.random() - 0.5);

    /* ******** Selezione del numero di domande dinamico */
    SELECTED_QUESTIONS = filtered.slice(0, chosenCount);

    showQuestion();
  });

  app.appendChild(welcolmeDiv);
  app.appendChild(queDifDiv);
  welcolmeDiv.appendChild(welcomeTitle);
  welcolmeDiv.appendChild(quizDescription);
  welcolmeDiv.appendChild(instructionList);
  queDifDiv.appendChild(questionDiv);
  queDifDiv.appendChild(difficultyDiv);
  app.appendChild(sBtnDiv);
  /* ******** Aggiunta del menu a tendina al DOM */
  difficultyDiv.appendChild(labelCount);
  difficultyDiv.appendChild(selectCount);

  questionDiv.appendChild(labelDiff);
  questionDiv.appendChild(selectDiff);

  sBtnDiv.appendChild(startButton);
}

/* =========================
   QUIZ PAGE
========================= */

function showQuestion() {
  app.innerHTML = "";

  // quiz finito
  if (currentQuestion >= SELECTED_QUESTIONS.length) {
    showResult();
    return;
  }

  const question = SELECTED_QUESTIONS[currentQuestion];

  const cardQuiz = document.createElement("div");
  cardQuiz.classList.add("cardQuiz");

  // header domanda
  const numeroTimer = document.createElement("div");
  numeroTimer.classList.add("numeroTimer");

  const numeroDomanda = document.createElement("p");
  numeroDomanda.textContent = `Domanda ${currentQuestion + 1
    } di ${SELECTED_QUESTIONS.length}`;

  const timer = document.createElement("span");
  timer.id = "timer";

  numeroTimer.appendChild(numeroDomanda);
  numeroTimer.appendChild(timer);

  // domanda
  const domanda = document.createElement("h2");
  domanda.textContent = question.question;

  // contenitore risposte
  const risposte = document.createElement("div");
  risposte.classList.add("risposte");

  // array risposte mischiate
  const answers = [question.correct_answer, ...question.incorrect_answers];

  answers.sort(() => Math.random() - 0.5);

  // creazione bottoni
  answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.addEventListener("click", () => {
      //aggiunta simone
      selectedAnswers[currentQuestion] = {
        question: question.question,
        selected: answer,
        correct: question.correct_answer,
      };

      stopTimer();

      // disabilita tutti i bottoni
      const allButtons = document.querySelectorAll(".risposte button");

      allButtons.forEach((btn) => {
        btn.disabled = true;
      });

      // risposta corretta
      if (answer === question.correct_answer) {
        correctAnswers++;
        button.classList.add("correct");
      } else {
        wrongAnswers++;
        button.classList.add("wrong");

        // evidenzia corretta
        allButtons.forEach((btn) => {
          if (btn.textContent === question.correct_answer) {
            btn.classList.add("correct");
          }
        });
      }

      setTimeout(() => {
        currentQuestion++;
        showQuestion();
      }, 1000);
    });

    risposte.appendChild(button);
  });

  // assemblaggio
  cardQuiz.appendChild(numeroTimer);
  cardQuiz.appendChild(domanda);
  cardQuiz.appendChild(risposte);

  app.appendChild(cardQuiz);

  startTimer();
}

/* =========================
   TIMER
========================= */

function startTimer() {
  const timer = document.getElementById("timer");
  timer.style.color = "white";

  /* ******** Calcolo dinamico: base 5s + scatti da 5s ogni 15 caratteri */
  const currentQ = SELECTED_QUESTIONS[currentQuestion];
  timeLeft = 5 + (Math.floor(currentQ.question.length / 15) * 5);

  /* ******** Per domande Vero/Falso: sottrai 5s, assicurandoti di non scendere mai sotto i 5s totali */
  if (currentQ.incorrect_answers.length === 1) {
    timeLeft = Math.max(5, timeLeft - 5);
  }

  timer.textContent = timeLeft;

  timerId = setInterval(() => {
    timeLeft--;

    timer.textContent = timeLeft;

    if (timeLeft <= 5) {
      timer.style.color = "red";
    }

    if (timeLeft <= 0) {
      stopTimer();
      //aggiunta simone
      selectedAnswers[currentQuestion] = {
        question: currentQ.question,
        selected: "Non risposta",
        correct: currentQ.correct_answer,
      };

      wrongAnswers++;

      const allButtons = document.querySelectorAll(".risposte button");

      allButtons.forEach((btn) => {
        btn.disabled = true;
      });

      // evidenzia corretta
      allButtons.forEach((btn) => {
        if (btn.textContent === currentQ.correct_answer) {
          btn.classList.add("correct");
        }
      });

      setTimeout(() => {
        currentQuestion++;
        showQuestion();
      }, 1000);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

/* =========================
    RESULTS PAGE
========================= */

function showResult() {
  app.innerHTML = "";

  const percentage = Math.round(
    (correctAnswers / SELECTED_QUESTIONS.length) * 100,
  );

  /* ****************
Salviamo il record
***************** */

  // variabile per il NEW RECORD
  let isNewRecord = false; // interruttore per capire se il record è stato battuto

  // se le risposte corrette superano il record passato
  if (correctAnswers > recordScore) {
    recordScore = correctAnswers // allora il nuovo record è correctAnswers
    // salvataggio nel local storage
    localStorage.setItem('recordNetflix', recordScore.toString()); // mettilo nel locale storage ma trasformalo di nuovo in stringa
    isNewRecord = true; // abbiamo un nuovo campione
  }


  const results = document.createElement("div");
  results.classList.add("results");

  const resultTitle = document.createElement("h2");
  resultTitle.classList.add("result-title");
  resultTitle.textContent = "Risultato";

  const verdict = document.createElement("h3");

  if (percentage >= PASS_THRESHOLD) {
    verdict.textContent = "PROMOSSO";
    verdict.classList.add("passed");
  } else {
    verdict.textContent = "BOCCIATO";
    verdict.classList.add("failed");
  }

  const resultList = document.createElement("ul");
  resultList.classList.add("result-list");

  const correctText = document.createElement("li");
  correctText.textContent = `Risposte corrette: ${correctAnswers}`;

  const wrongText = document.createElement("li");
  wrongText.textContent = `Risposte sbagliate: ${wrongAnswers}`;

  const scoreText = document.createElement("li");
  if (isNewRecord === true) { // se abbiamo un nuovo campione
    scoreText.textContent = `NEW RECORD: ${recordScore}`; // festeggiamo
  } else {
    scoreText.textContent = `Punteggio finale: ${correctAnswers} (RECORD da battere ${recordScore})`;
  } // altrimenti hai fatto questo

  resultList.appendChild(correctText);
  resultList.appendChild(wrongText);
  resultList.appendChild(scoreText);

  // Creazione di percentuale circolare - prova con svg (disegno tecnico vettoriale)
  const svgDictionary = "http://www.w3.org/2000/svg"; // dichiarazione del dizionario vettoriale

  // creazione del div contenitore di tutto per attaccare la notifica
  const divDelCerchio = document.createElement("div");
  divDelCerchio.classList.add("circle-div");
  // div per la notifica
  const notifica = document.createElement("div");
  notifica.textContent = `Hai risposto correttamente a ${correctAnswers} su ${correctAnswers + wrongAnswers}!`;
  notifica.classList.add("notifica");

  // contenitore del cerchio
  const percentageContainer = document.createElementNS(svgDictionary, "svg"); // dico a JS di creare tramite svg e non html, (dizionario, oggetto da costruire)
  percentageContainer.classList.add("percentage-container");

  // cerchio
  const percentageCircle = document.createElementNS(svgDictionary, "circle");
  percentageCircle.classList.add("percentage-circle");

  // cerchio vuoto
  const EmptyBarCircle = document.createElementNS(svgDictionary, "circle");
  EmptyBarCircle.classList.add("empty-bar-circle");

  EmptyBarCircle.setAttribute("cx", "100"); // asse orizzontale
  EmptyBarCircle.setAttribute("cy", "100"); // asse verticale
  EmptyBarCircle.setAttribute("r", "90"); // perimetro

  // bisogna dichiarare le misure geometriche
  percentageCircle.setAttribute("cx", "100"); // asse orizzontale
  percentageCircle.setAttribute("cy", "100"); // asse verticale
  percentageCircle.setAttribute("r", "90"); // perimetro
  // remind: area del cerchio: C = 2 * pi * r. - 2 * 3.141259 * 90 = 565.4

  // scritta nel cerchio
  const percentageText = document.createElementNS(svgDictionary, "text");
  percentageText.classList.add("percentage-text");
  percentageText.textContent = `${percentage}%`;

  // coordinate geometriche del text
  percentageText.setAttribute("x", "80");
  percentageText.setAttribute("y", "115");

  divDelCerchio.appendChild(percentageContainer);
  divDelCerchio.appendChild(notifica);

  percentageContainer.appendChild(EmptyBarCircle);
  percentageContainer.appendChild(percentageCircle);
  percentageContainer.appendChild(percentageText);

  // riempimento della barra percentuale
  if (percentage >= 80) {
    // definisco ciclo if/ else if per cambiare il colore a seconda della percnetuale
    percentageCircle.style.stroke = "lightgreen";
    percentageText.style.stroke = "lightgreen";
  } else if (percentage >= 60 && percentage <= 79) {
    percentageCircle.style.stroke = "yellow";
    percentageText.style.stroke = "yellow";
  } else {
    percentageCircle.style.stroke = "red";
    percentageText.style.stroke = "red";
  }

  const circonferenza = 565.4;
  percentageCircle.style.strokeDasharray = 564.4; // Lunghezza piena del riempimento
  // valore che fa tornare indietro la colorazione (deve essere la circonferenza - (la circonferenza * (la percentuale/ 100))
  const offsetValue = circonferenza - (percentage / 100) * circonferenza;
  percentageCircle.style.strokeDashoffset = offsetValue;

  // funzione della notifica
  percentageText.addEventListener("mouseover", (e) => {
    notifica.classList.add("notifica-on");
  });
  percentageText.addEventListener("mouseleave", (e) => {
    notifica.classList.remove("notifica-on");
  });

  const restartButton = document.createElement("button");
  restartButton.classList.add("result-button");
  restartButton.textContent = "VALUTACI";
  //aggiunta simone
  const recapButton = document.createElement("button");
  recapButton.classList.add("recap-button");
  recapButton.textContent = "MOSTRA RISPOSTE";

  restartButton.addEventListener("click", () => {
    showRating();
  });
  //aggiunta simone
  recapButton.addEventListener("click", () => {
    const oldRecap = document.querySelector(".recap-container");
    if (oldRecap) {
      oldRecap.remove();
      recapButton.textContent = "MOSTRA RISPOSTE";
    } else {
      showRecap();
      recapButton.textContent = "NASCONDI RISPOSTE";
    }
  });

  results.appendChild(resultTitle);
  results.appendChild(verdict);
  results.appendChild(resultList);
  results.appendChild(divDelCerchio);
  results.appendChild(restartButton);
  results.appendChild(recapButton); // aggiunta simone

  app.appendChild(results);

}

//aggiunta simone
function showRecap() {
  const recapContainer = document.createElement("div");
  recapContainer.classList.add("recap-container");
  const recapMenu = document.createElement("div");
  recapMenu.classList.add("recap-menu");
  selectedAnswers.forEach((answerData, index) => {
    const recapCard = document.createElement("div");
    recapCard.classList.add("recap-card");
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${answerData.question}`;
    const userAnswer = document.createElement("p");
    userAnswer.textContent = `La tua risposta: ${answerData.selected}`;
    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Risposta corretta: ${answerData.correct}`;
    if (answerData.selected === answerData.correct) {
      recapCard.classList.add("good-card");
      userAnswer.classList.add("good-answer");
    } else {
      recapCard.classList.add("bad-card");
      userAnswer.classList.add("bad-answer");
    }

    recapCard.appendChild(questionTitle);
    recapCard.appendChild(userAnswer);
    recapCard.appendChild(correctAnswer);
    recapMenu.appendChild(recapCard);
  });
  recapContainer.appendChild(recapMenu);
  const results = document.querySelector(".results");
  results.appendChild(recapContainer);

}

/* =========================
    START
========================= */
function showThankYou(rating) {
  app.innerHTML = "";

  const thanksDiv = document.createElement("div");
  thanksDiv.classList.add("thanksDiv");

  const thanksTitle = document.createElement("h2");
  thanksTitle.textContent = "Grazie !";

  const thanksMsg = document.createElement("p");
  thanksMsg.classList.add("thanks-message");
  thanksMsg.innerHTML = `Hai valutato <span class='ratingFinale'>${rating}</span> stelle su 10 !`;

  const backBtn = document.createElement("button");
  backBtn.classList.add("replay-button");
  backBtn.textContent = "Rigioca";

  backBtn.addEventListener("click", () => {
    showWelcome();
  });

  thanksDiv.appendChild(thanksTitle);
  thanksDiv.appendChild(thanksMsg);
  thanksDiv.appendChild(backBtn);
  app.appendChild(thanksDiv);
}

function showRating() {
  app.innerHTML = "";

  let selectedRating = 0;

  const ratingDiv = document.createElement("div");
  ratingDiv.classList.add("rating");

  const ratingTitle = document.createElement("h2");
  ratingTitle.textContent = "Valuta il nostro quiz";

  const ratingSubtitle = document.createElement("p");
  ratingSubtitle.classList.add("rating-subtitle");
  ratingSubtitle.textContent = "Quanto valuteresti il nostro quiz?";

  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars-container");

  for (let i = 1; i <= 10; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.textContent = "★";
    star.dataset.value = i;

    star.addEventListener("mouseover", () => {
      highlightStars(i);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = i;
      highlightStars(selectedRating);
      setTimeout(() => {
        showThankYou(selectedRating);
      }, 1000);
    });

    starsContainer.appendChild(star);
  }

  function highlightStars(count) {
    const allStar = starsContainer.querySelectorAll(".star");
    allStar.forEach((s) => {
      s.classList.toggle("active", Number(s.dataset.value) <= count);
    });
  }

  ratingDiv.appendChild(ratingTitle);
  ratingDiv.appendChild(ratingSubtitle);
  ratingDiv.appendChild(starsContainer);
  app.appendChild(ratingDiv);

}

showIntro();
