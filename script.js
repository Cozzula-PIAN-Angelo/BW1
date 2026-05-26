/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/


const app = document.querySelector("#app");

/* =========================
   DATI QUIZ

/*
  Array di domande.
  Ogni question è un object con:
   - question: testo della domanda
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])
*/
const QUESTIONS = [
  {
    question: "Cosa significa l'acronimo CPU?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
  },
  {
    question: "Il logo di Snapchat è una campana.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "I puntatori sono stati introdotti in C++ e non c'erano nel linguaggio C originale.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il formato immagine più usato per i loghi nel database di Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Qual era il limite originale di caratteri di un Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Quale linguaggio di programmazione condivide il nome con un'isola dell'Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];


const TOTAL_QUESTIONS = QUESTIONS.length;
const TIMER_DURATION = 20;
const PASS_THRESHOLD = 60;

/* =========================
   STATO GLOBALE

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timerId = null;
let timeLeft = TIMER_DURATION;

/* =========================
   WELCOME PAGE

function showWelcome() {
  app.innerHTML = "";

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
  instructionLi3.textContent =
    "Il quiz dura circa 3 minuti.";

  instructionList.appendChild(instructionLi1);
  instructionList.appendChild(instructionLi2);
  instructionList.appendChild(instructionLi3);

  const startButton = document.createElement("button");
  startButton.classList.add("start-button");

  startButton.textContent = "INIZIA";

  startButton.addEventListener("click", () => {
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    showQuestion();
  });

  app.appendChild(welcomeTitle);
  app.appendChild(quizDescription);
  app.appendChild(instructionList);
  app.appendChild(startButton);
}

/* =========================
   QUIZ PAGE

function showQuestion() {
  app.innerHTML = "";

  // quiz finito
  if (currentQuestion >= QUESTIONS.length) {
    showResult();
    return;
  }

  const question = QUESTIONS[currentQuestion];

  const cardQuiz = document.createElement("div");
  cardQuiz.classList.add("cardQuiz");

  // header domanda
  const numeroTimer = document.createElement("div");
  numeroTimer.classList.add("numeroTimer");

  const numeroDomanda = document.createElement("p");
  numeroDomanda.textContent = `Domanda ${
    currentQuestion + 1
  } di ${TOTAL_QUESTIONS}`;

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
  const answers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  answers.sort(() => Math.random() - 0.5);

  // creazione bottoni
  answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.addEventListener("click", () => {
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

function startTimer() {
  timeLeft = TIMER_DURATION;

  const timer = document.getElementById("timer");

  timer.textContent = timeLeft;

  timerId = setInterval(() => {
    timeLeft--;

    timer.textContent = timeLeft;

    if (timeLeft <= 5) {
      timer.style.color = "red";
    }

    if (timeLeft <= 0) {
      stopTimer();

      wrongAnswers++;

      currentQuestion++;

      showQuestion();
    }
  }, 1000);
/* Costanti del quiz */
const TOTAL_QUESTIONS = QUESTIONS.length;
const PASS_THRESHOLD = 60;     // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1500;   // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20;     // secondi per ogni domanda

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;

const app = document.querySelector("#app");

function render() {
  /* ********Si svuota il contenitore #app per assicurarsi che non ci siano vecchi elementi prima di disegnare la nuova schermata */
  app.innerHTML = "";

  /* ********Si gestisce la navigazione tra le schermate basandosi sulla variabile globale currentScreen */
  if (currentScreen === "welcome") {
    renderWelcome();
  } else if (currentScreen === "quiz") {
    renderQuiz();
  } else if (currentScreen === "results") {
    renderResults();
  }
}

/* ********Bozza Welcome Page */
function renderWelcome() {
  const welcomeDiv = document.createElement("div");
  welcomeDiv.className = "welcome";
  welcomeDiv.innerHTML = `
    <h1>Benvenuto al tuo esame!</h1>
    <p>Rispondi correttamente alle domande per passare.</p>
    <button id="start-btn">Inizia</button>
  `;
  app.appendChild(welcomeDiv);

  document.getElementById("start-btn").addEventListener("click", () => {
    currentScreen = "quiz";
    currentQuestion = 0;
    score = 0;
    render();
  });
}

function renderQuiz() {
  const q = QUESTIONS[currentQuestion];
  const card = document.createElement("div");
  card.className = "cardQuiz";

  /* ********Si crea l'header del quiz con le classi CSS che si sono definite, inserendo timer e contatore domande */
  const timerAndCounter = document.createElement("div"); /* ********Viene creato un nuovo elemento HTML di tipo div all'interno della memoria */
  timerAndCounter.className = "numeroTimer";
  /* ********Viene inizializzato lo svuotamento del div e viene creato dinamicamente il nuovo blocco di struttura HTML tramite stringa di testo */
  timerAndCounter.innerHTML = `
    <span>Domanda ${currentQuestion + 1} di ${TOTAL_QUESTIONS}</span> 
    <span id="timer"></span>
  `; /* ********Viene creato uno span per mostrare il numero della domanda corrente sul totale delle domande */
     /* ********Viene creato uno span vuoto con identificativo 'timer' per mostrare il countdown dei secondi */
  card.appendChild(timerAndCounter);

  const questionTitle = document.createElement("h2");
  questionTitle.textContent = q.question;
  card.appendChild(questionTitle);

  const answers = [...q.incorrect_answers, q.correct_answer];

  answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => handleAnswer(ans));
    card.appendChild(btn);
  });

  app.appendChild(card);
  startTimer();
}

function handleAnswer(answer) {
  stopTimer();
  if (answer === QUESTIONS[currentQuestion].correct_answer) {
    score++;
  }
  advance();
}

function advance() {
  currentQuestion++;
  if (currentQuestion < TOTAL_QUESTIONS) {
    render();
  } else {
    currentScreen = "results";
    render();
  }
}

/* ********Viene dichiarata la funzione startTimer per avviare la gestione del conto alla rovescia */
function startTimer() {
  let timeLeft = TIMER_DURATION;  /* ********Viene creata una variabile locale inizializzata con il valore della durata totale del timer */
  const timerEl = document.getElementById("timer"); /* ********Viene recuperato dal documento l'elemento HTML con identificativo 'timer' */
  timerEl.textContent = timeLeft; /* ********Viene inserito il valore numerico del tempo iniziale come testo dentro l'elemento appena recuperato */
  timerEl.style.color = "black"; /* ********Viene impostato il colore di base nero per il testo del timer prima dell'avvio del countdown */

  /* ********Viene creato e attivato un ciclo ripetitivo configurato per eseguire il codice interno a intervalli regolari */
  timerId = setInterval(() => {
    timeLeft--; /* ********Viene diminuito di una unità il valore numerico del tempo rimanente */
    timerEl.textContent = timeLeft; /* ********Viene aggiornato il testo visibile dell'elemento HTML con il nuovo valore dei secondi rimasti */

    /* ********Viene eseguito un controllo per verificare se mancano 5 o meno secondi alla fine del tempo */
    if (timeLeft <= 5) {
      timerEl.style.color = "red"; /* ********Viene modificato lo stile del testo del timer impostando il colore rosso come avviso visivo */
    }
    /* ********Viene eseguito un controllo per verificare se il tempo rimanente è del tutto esaurito arrivando a zero */
    if (timeLeft <= 0) {
      handleAnswer(null); /* ********Viene invocata la funzione handleAnswer passando il valore null per registrare la mancata risposta */
    }
  }, 1000); /* ********Viene stabilito il tempo di attesa del ciclo fissandolo a 1000 millisecondi, equivalenti a un secondo */
}

function stopTimer() {
  clearInterval(timerId);
}


function showResult() {
  app.innerHTML = "";

  const percentage = Math.round(
    (correctAnswers / QUESTIONS.length) * 100
  );

  const results = document.createElement("div");
  results.classList.add("results");

  const resultTitle = document.createElement("h1");
  resultTitle.textContent = "Risultato";

  const verdict = document.createElement("h2");

  if (percentage >= PASS_THRESHOLD) {
    verdict.textContent = "PROMOSSO";
    verdict.classList.add("passed");
  } else {
    verdict.textContent = "BOCCIATO";
    verdict.classList.add("failed");
  }

  const correctText = document.createElement("p");
  correctText.textContent = `Risposte corrette: ${correctAnswers}`;

  const wrongText = document.createElement("p");
  wrongText.textContent = `Risposte sbagliate: ${wrongAnswers}`;

  const scoreText = document.createElement("p");
  scoreText.textContent = `Punteggio finale: ${percentage}%`;

  const restartButton = document.createElement("button");

  restartButton.textContent = "RIPROVA";

  restartButton.addEventListener("click", () => {
    showWelcome();
  });

  results.appendChild(resultTitle);
  results.appendChild(verdict);
  results.appendChild(correctText);
  results.appendChild(wrongText);
  results.appendChild(scoreText);
  results.appendChild(restartButton);

  app.appendChild(results);
}

/* =========================
   START

showWelcome();
/* ********Bozza Results Page */
function renderResults() {
  const percentage = Math.round((score / QUESTIONS.length) * 100);
  let verdict;
  let barColor;
  let verdictClass;

  if (percentage >= 60) {
    verdict = "PROMOSSO";
    barColor = "#4CAF50"; 
    verdictClass = "passed"; 
  } else {
    verdict = "BOCCIATO";
    barColor = "#f44336"; 
    verdictClass = "failed"; 
  }

  /* ********Interfaccia Results */
  app.innerHTML = `
    <div class="results">
      <h1>Risultato</h1>
      <h2 class="${verdictClass}">${verdict}</h2>
      <p>Hai risposto correttamente a ${score} su ${QUESTIONS.length} domande.</p>
      
      <div class="progress-container">
        <div class="progress-fill" style="width: ${percentage}%; background-color: ${barColor};"></div>
      </div>
      
      <p>${percentage}%</p>
      <button id="restart-btn">Riprova</button>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    currentScreen = "welcome";
    render();
  });
}

// Inizializzazione
render();
