/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

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