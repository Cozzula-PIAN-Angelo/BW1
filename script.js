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
    question: "Qual'è la serie netflix preferita da Claudio?",
    correct_answer: "Rick and Morty",
    incorrect_answers: ["One Piece", "The Office", "Cabinet of Curiosities"],
  },
  {
    question: "Qual'è la serie netflix preferita da Simona?",
    correct_answer: "Mouse",
    incorrect_answers: ["Vincenzo", "Kingdom", "Alice in Borderland"],
  },
  {
    question: "Qual'è la serie netflix preferita da Simone?",
    correct_answer: "Bojack Horsman",
    incorrect_answers: [
      "Strappare lungo i bordi",
      "House of cards",
      "La regina degli scacchi",
    ],
  },
  {
    question: "Qual'è la serie netflix preferita da Valentina?",
    correct_answer: "Formula 1 - Drive to survive",
    incorrect_answers: ["Squid Game", "Black Mirror", "La casa di carta"],
  },
  {
    question: "Qual'è la serie Netflix preferita da Angelo?",
    correct_answer: "Arcane",
    incorrect_answers: [
      "bojack horseman",
      "Castlevania",
      "Love,Death & robots",
    ],
  },
];

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

/* =========================
   WELCOME PAGE
========================= */

function showWelcome() {
  app.innerHTML = "";
  const welcolmeDiv = document.createElement('div');
  welcolmeDiv.classList.add('welcomeDiv');

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
  labelCount.textContent = "Quante domande vuoi affrontare? ";
  labelCount.style.color = "white";
  labelCount.style.display = "block";
  labelCount.style.marginBottom = "10px";

  const selectCount = document.createElement("select");
  selectCount.id = "questionCount";
  selectCount.style.marginBottom = "20px";
  selectCount.style.padding = "5px";
  selectCount.style.width = "150px";

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

    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    QUESTIONS.sort(() => Math.random() - 0.5);

    /* ******** Selezione del numero di domande dinamico */
    SELECTED_QUESTIONS = QUESTIONS.slice(0, chosenCount);

    showQuestion();
  });

  app.appendChild(welcolmeDiv);
  welcolmeDiv.appendChild(welcomeTitle);
  welcolmeDiv.appendChild(quizDescription);
  welcolmeDiv.appendChild(instructionList);
  /* ******** Aggiunta del menu a tendina al DOM */
  welcolmeDiv.appendChild(labelCount);
  welcolmeDiv.appendChild(selectCount);
  welcolmeDiv.appendChild(startButton);
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
      //aggiunta simone
      selectedAnswers[currentQuestion] = {
        question: question.question,
        selected: "Non risposta",
        correct: question.correct_answer,
      };

      wrongAnswers++;

      const allButtons = document.querySelectorAll(".risposte button");

      allButtons.forEach((btn) => {
        btn.disabled = true;
      });

      // evidenzia corretta
      const question = SELECTED_QUESTIONS[currentQuestion];

      allButtons.forEach((btn) => {
        if (btn.textContent === question.correct_answer) {
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
  scoreText.textContent = `Punteggio finale: ${percentage}%`;

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
    });

    starsContainer.appendChild(star);
  }

  function highlightStars(count) {
    const allStar = starsContainer.querySelectorAll(".star");
    allStar.forEach((s) => {
      s.classList.toggle("active", Number(s.dataset.value) <= count);
    });
  }

  const confirmBtn = document.createElement("button");
  confirmBtn.classList.add("start-button");
  confirmBtn.textContent = "INVIA";

  confirmBtn.addEventListener("click", () => {
    if (selectedRating === 0) {
      alert("Seleziona almeno una stella!");
      return;
    }
    showThankYou(selectedRating);
  });

  ratingDiv.appendChild(ratingTitle);
  ratingDiv.appendChild(ratingSubtitle);
  ratingDiv.appendChild(starsContainer);
  ratingDiv.appendChild(confirmBtn);
  app.appendChild(ratingDiv);
}

showWelcome();
