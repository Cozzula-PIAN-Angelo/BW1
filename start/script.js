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

/* =========================
   COSTANTI
========================= */

const TOTAL_QUESTIONS = QUESTIONS.length;
const TIMER_DURATION = 20;
const PASS_THRESHOLD = 60;

/* =========================
   STATO GLOBALE
========================= */

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timerId = null;
let timeLeft = TIMER_DURATION;

/* =========================
   WELCOME PAGE
========================= */

function showWelcome() {
  app.innerHTML = "";

  const welcomeTitle = document.createElement("h1");
  welcomeTitle.classList.add('welcome-title'); // aggiunto classe per differenziare da h1 di result
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
========================= */

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
  numeroDomanda.textContent = `Domanda ${currentQuestion + 1
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
========================= */

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
    (correctAnswers / QUESTIONS.length) * 100
  );

  const results = document.createElement("div");
  results.classList.add("results");

  const resultTitle = document.createElement("h1");
  resultTitle.classList.add('result-title');
  resultTitle.textContent = "Risultato";

  const verdict = document.createElement("h2");

  if (percentage >= PASS_THRESHOLD) {
    verdict.textContent = "PROMOSSO";
    verdict.classList.add("passed");
  } else {
    verdict.textContent = "BOCCIATO";
    verdict.classList.add("failed");
  }

  const resultList = document.createElement('ul');
  resultList.classList.add('result-list');

  const correctText = document.createElement("li");
  correctText.textContent = `Risposte corrette: ${correctAnswers}`;

  const wrongText = document.createElement("li");
  wrongText.textContent = `Risposte sbagliate: ${wrongAnswers}`;

  const scoreText = document.createElement("li");
  scoreText.textContent = `Punteggio finale: ${percentage}%`;

  resultList.appendChild(correctText);
  resultList.appendChild(wrongText);
  resultList.appendChild(scoreText);

  // Creazione di percentuale circolare - prova con svg (disegno tecnico vettoriale)
  const svgDictionary = "http://www.w3.org/2000/svg"; // dichiarazione del dizionario vettoriale

  // contenitore del cerchio
  const percentageContainer = document.createElementNS(svgDictionary, 'svg'); // dico a JS di creare tramite svg e non html, (dizionario, oggetto da costruire)
  percentageContainer.classList.add('percentage-container');

  // cerchio 
  const percentageCircle = document.createElementNS(svgDictionary, 'circle');
  percentageCircle.classList.add('percentage-circle');

  // bisogna dichiarare le misure geometriche
  percentageCircle.setAttribute('cx', '100') // asse orizzontale
  percentageCircle.setAttribute('cy', '100') // asse verticale
  percentageCircle.setAttribute('r', '90') // perimetro
  // remind: area del cerchio: C = 2 * pi * r. - 2 * 3.141259 * 90 = 565.4

  // scritta nel cerchio
  const percentageText = document.createElementNS(svgDictionary, 'text');
  percentageText.classList.add('percentage-text');
  percentageText.textContent = `${percentage}%`;

  // coordinate geometriche del text
  percentageText.setAttribute('x', '80');
  percentageText.setAttribute('y', '115');

  percentageContainer.appendChild(percentageText);
  percentageContainer.appendChild(percentageCircle);

  // riempimento della barra percentuale
  if (percentage >= 80) { // definisco ciclo if/ else if per cambiare il colore a seconda della percnetuale
    percentageCircle.style.stroke = 'lightgreen';
    percentageText.style.stroke = 'lightgreen';
  } else if (percentage >= 60 && percentage <= 79) {
    percentageCircle.style.stroke = 'yellow';
    percentageText.style.stroke = 'yellow';
  } else {
    percentageCircle.style.stroke = 'red';
    percentageText.style.stroke = 'red';
  };

  const circonferenza = 565.4;
  percentageCircle.style.strokeDasharray = 564.4; // Lunghezza piena del riempimento
  // valore che fa tornare indietro la colorazione (deve essere la circonferenza - (la circonferenza * (la percentuale/ 100))
  const offsetValue = circonferenza - (percentage / 100) + circonferenza;
  percentageCircle.style.strokeDashoffset = offsetValue;

  const restartButton = document.createElement("button");
  restartButton.classList.add('result-button');
  restartButton.textContent = "RIPROVA";

  restartButton.addEventListener("click", () => {
    showWelcome();
  });

  results.appendChild(resultTitle);
  results.appendChild(verdict);
  results.appendChild(resultList);
  results.appendChild(percentageContainer);
  results.appendChild(restartButton);

  app.appendChild(results);

}


/* =========================
   START
========================= */

showWelcome();