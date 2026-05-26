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
    question: "In quale anno è stato fondato Netflix?",
    correct_answer: "1997",
    incorrect_answers: ["2001", "1999", "2005"],
  },
  {
    question: "Netflix è stato fondato da Reed Hastings e Marc Randolph.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Qual è la serie originale Netflix più vista di sempre?",
    correct_answer: "Squid Game",
    incorrect_answers: ["Stranger Things", "Money Heist", "Bridgerton"],
  },
  {
    question: "In quale paese è ambientata Squid Game?",
    correct_answer: "Corea del Sud",
    incorrect_answers: ["Giappone", "Cina", "Tailandia"],
  },
  {
    question:
      "Stranger Things è ambientata nella città di Hawkins, in quale stato americano?",
    correct_answer: "Indiana",
    incorrect_answers: ["Ohio", "Illinois", "Kentucky"],
  },
  {
    question: "Come si chiama il personaggio principale di Stranger Things?",
    correct_answer: "Eleven",
    incorrect_answers: ["Max", "Nancy", "Joyce"],
  },
  {
    question: "In quale anno è uscita la prima stagione di Stranger Things?",
    correct_answer: "2016",
    incorrect_answers: ["2014", "2018", "2017"],
  },
  {
    question: "La serie Money Heist è originariamente prodotta in quale paese?",
    correct_answer: "Spagna",
    incorrect_answers: ["Italia", "Messico", "Argentina"],
  },
  {
    question: "Come si chiama il professore in Money Heist?",
    correct_answer: "Sergio Marquina",
    incorrect_answers: [
      "Andrés de Fonollosa",
      "Agustín Ramos",
      "Miguel Fernández",
    ],
  },
  {
    question: "In quale città è ambientata la prima rapina di Money Heist?",
    correct_answer: "Madrid",
    incorrect_answers: ["Barcellona", "Siviglia", "Valencia"],
  },
  {
    question: "Bridgerton è basato sui romanzi di quale autrice?",
    correct_answer: "Julia Quinn",
    incorrect_answers: ["Jane Austen", "Nora Roberts", "Jojo Moyes"],
  },
  {
    question: "In quale periodo storico è ambientata Bridgerton?",
    correct_answer: "Età Regency",
    incorrect_answers: ["Era Vittoriana", "Belle Époque", "Rinascimento"],
  },
  {
    question: "Come si chiama il narratore misterioso in Bridgerton?",
    correct_answer: "Lady Whistledown",
    incorrect_answers: ["Lady Danbury", "Lady Featherington", "Lady Crown"],
  },
  {
    question:
      "The Crown racconta la storia della famiglia reale di quale paese?",
    correct_answer: "Regno Unito",
    incorrect_answers: ["Svezia", "Spagna", "Olanda"],
  },
  {
    question: "Qual è il nome del protagonista di Narcos?",
    correct_answer: "Pablo Escobar",
    incorrect_answers: ["El Chapo", "Carlos Lehder", "Griselda Blanco"],
  },
  {
    question: "In quale paese è ambientata la serie Narcos?",
    correct_answer: "Colombia",
    incorrect_answers: ["Messico", "Brasile", "Perù"],
  },
  {
    question: "La serie Dark è prodotta in quale paese?",
    correct_answer: "Germania",
    incorrect_answers: ["Austria", "Svizzera", "Danimarca"],
  },
  {
    question: "Quante stagioni ha la serie Dark?",
    correct_answer: "3",
    incorrect_answers: ["2", "4", "5"],
  },
  {
    question: "Ozark è ambientata in quale stato americano?",
    correct_answer: "Missouri",
    incorrect_answers: ["Tennessee", "Arkansas", "Kentucky"],
  },
  {
    question: "Come si chiama il protagonista di Ozark?",
    correct_answer: "Marty Byrde",
    incorrect_answers: ["Frank Byrde", "Jack Byrde", "Tom Byrde"],
  },
  {
    question: "The Witcher è basato su una serie di romanzi di quale autore?",
    correct_answer: "Andrzej Sapkowski",
    incorrect_answers: [
      "J.R.R. Tolkien",
      "George R.R. Martin",
      "Brandon Sanderson",
    ],
  },
  {
    question: "Chi interpreta Geralt di Rivia in The Witcher?",
    correct_answer: "Henry Cavill",
    incorrect_answers: ["Chris Hemsworth", "Tom Hardy", "Kit Harington"],
  },
  {
    question: "Emily in Paris è ambientata principalmente in quale città?",
    correct_answer: "Parigi",
    incorrect_answers: ["Lione", "Marsiglia", "Nizza"],
  },
  {
    question: "Lupin è una serie originale Netflix francese.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Come si chiama il protagonista di Lupin?",
    correct_answer: "Assane Diop",
    incorrect_answers: ["Arsène Lupin", "Gabriel Diop", "Omar Diop"],
  },
  {
    question:
      "Squid Game ha vinto il Golden Globe come miglior serie drammatica.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Quanti giochi ci sono in Squid Game?",
    correct_answer: "6",
    incorrect_answers: ["5", "7", "8"],
  },
  {
    question: "Come si chiama il protagonista di Squid Game?",
    correct_answer: "Seong Gi-hun",
    incorrect_answers: ["Cho Sang-woo", "Jang Deok-su", "Oh Il-nam"],
  },
  {
    question: "Wednesday è uno spin-off di quale serie?",
    correct_answer: "La famiglia Addams",
    incorrect_answers: ["Riverdale", "Sabrina", "Chilling Adventures"],
  },
  {
    question: "Chi interpreta Wednesday Addams nella serie Netflix?",
    correct_answer: "Jenna Ortega",
    incorrect_answers: ["Millie Bobby Brown", "Sadie Sink", "Sophia Lillis"],
  },
  {
    question: "Cobra Kai è il sequel di quale famoso film?",
    correct_answer: "Karate Kid",
    incorrect_answers: ["Bloodsport", "Best of the Best", "Kickboxer"],
  },
  {
    question: "In quale anno è uscita la serie Squid Game?",
    correct_answer: "2021",
    incorrect_answers: ["2020", "2022", "2019"],
  },
  {
    question:
      "La serie You è incentrata su un protagonista che lavora in una libreria.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Come si chiama il protagonista della serie You?",
    correct_answer: "Joe Goldberg",
    incorrect_answers: ["Dan Humphrey", "Mark Sloan", "Jack Pearson"],
  },
  {
    question: "Black Mirror è una serie originale Netflix.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question: "Qual è il paese di origine della serie Elite?",
    correct_answer: "Spagna",
    incorrect_answers: ["Francia", "Italia", "Portogallo"],
  },
  {
    question:
      "La serie Mindhunter parla di agenti dell'FBI che studiano i serial killer.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Tiger King è una serie di genere true crime.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "Come si chiama il protagonista di Tiger King?",
    correct_answer: "Joe Exotic",
    incorrect_answers: ["Carole Baskin", "Doc Antle", "Jeff Lowe"],
  },
  {
    question: "La serie Peaky Blinders è ambientata in quale città?",
    correct_answer: "Birmingham",
    incorrect_answers: ["Londra", "Manchester", "Liverpool"],
  },
  {
    question: "Peaky Blinders è una serie originale Netflix.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il nome della scuola frequentata dai protagonisti di Wednesday?",
    correct_answer: "Nevermore Academy",
    incorrect_answers: [
      "Blackwood School",
      "Ravencroft Institute",
      "Shadow Hills",
    ],
  },
  {
    question: "In quale anno è uscita la prima stagione di The Crown?",
    correct_answer: "2016",
    incorrect_answers: ["2018", "2015", "2017"],
  },
  {
    question: "La serie Anatomy of a Scandal è basata su un romanzo.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question:
      "Qual è il numero del partecipante di Seong Gi-hun in Squid Game?",
    correct_answer: "456",
    incorrect_answers: ["001", "067", "218"],
  },
  {
    question: "La serie Suburra è una produzione originale Netflix italiana.",
    correct_answer: "Vero",
    incorrect_answers: ["Falso"],
  },
  {
    question: "In quale città è ambientata la serie Suburra?",
    correct_answer: "Roma",
    incorrect_answers: ["Milano", "Napoli", "Palermo"],
  },
  {
    question: "Quante stagioni ha Stranger Things?",
    correct_answer: "4",
    incorrect_answers: ["3", "5", "2"],
  },
  {
    question: "La serie Ginny & Georgia è ambientata in quale paese?",
    correct_answer: "USA",
    incorrect_answers: ["Canada", "UK", "Australia"],
  },
  {
    question:
      "Come si chiama la piattaforma rivale di Netflix lanciata da Disney?",
    correct_answer: "Disney+",
    incorrect_answers: ["Disney Now", "Disney Play", "Disney Stream"],
  },
];

let SELECTED_QUESTIONS = [];

/* =========================
   COSTANTI
========================= */

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

  const startButton = document.createElement("button");
  startButton.classList.add("start-button");

  startButton.textContent = "INIZIA";

  startButton.addEventListener("click", () => {
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    QUESTIONS.sort(() => Math.random() - 0.5);
    SELECTED_QUESTIONS = QUESTIONS.slice(0, 10);

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
  numeroDomanda.textContent = `Domanda ${
    currentQuestion + 1
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
    (correctAnswers / SELECTED_QUESTIONS.length) * 100,
  );
  console.log("Corrette:", correctAnswers);
  console.log("Sbagliate:", wrongAnswers);
  console.log("Totale:", correctAnswers + wrongAnswers);

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
========================= */

showWelcome();
