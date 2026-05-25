/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

  */

/* SCRIVI QUI LE TUE FUNZIONI:
    - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
    - renderWelcome() per la schermata iniziale con button Inizia
    - renderQuiz() per la domanda corrente con i button risposta + counter + timer
    - renderResults() per la schermata finale con percentuale + barre + verdetto
    - startTimer() / stopTimer() per il countdown
    - handleAnswer(button, answer) per il click su una risposta
    - handleTimeUp() per il tempo scaduto
    - advance() per andare alla domanda successiva o ai risultati
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
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1500; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni domanda

/* SCRIVI QUI LE TUE FUNZIONI:
   - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
   - renderWelcome() per la schermata iniziale con button Inizia
   - renderQuiz() per la domanda corrente con i button risposta + counter + timer
   - renderResults() per la schermata finale con percentuale + barre + verdetto
   - startTimer() / stopTimer() per il countdown
   - handleAnswer(button, answer) per il click su una risposta
   - handleTimeUp() per il tempo scaduto
   - advance() per andare alla domanda successiva o ai risultati
*/

let questionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

// Funzione per controllare la risposta //

const isCorrect = (question, userAnswer) => {
  return question.correct_answer === userAnswer; // ritorna vero se la risposta dell’utente è uguale alla risposta corretta della domanda.
};

function showQuestion() {
  // Mostra la domanda corrente
  app.innerHTML = ""; // pulisce la schermata

  // controlla se il quiz è finito
  if (questionIndex >= QUESTIONS.length) {
    showResult();
    return;
  }

  const currentQuestion = QUESTIONS[questionIndex]; // prende la domanda corrente

  const questionTitle = document.createElement("h2"); // crea titolo domanda per mostrare la domanda all’utente nell’interfaccia
  questionTitle.textContent = currentQuestion.question;

  app.appendChild(questionTitle);

  const options = ["Vero", "Falso"]; // solo per le domande vero/falso

  // crea i bottoni, da implementare in codice degli altri??
  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => {
      if (isCorrect(currentQuestion, option)) {
        // controlla risposta e incrementa
        correctAnswers++;
      } else {
        wrongAnswers++;
      }

      questionIndex++; // passa alla domanda successiva
      showQuestion(); // mostra nuova domanda
    });

    app.appendChild(button); // per mettere il bottone dentro l'elemento app
  });
}

function showResult() {
  // per creare e mostrare la schermata finale del quiz
  app.innerHTML = "";

  const resultTitle = document.createElement("h2");
  resultTitle.textContent = "Quiz finito!";

  const correctText = document.createElement("p");
  correctText.textContent = `Risposte corrette: ${correctAnswers}`;

  const wrongText = document.createElement("p");
  wrongText.textContent = `Risposte sbagliate: ${wrongAnswers}`;

  // calcolo percentuale
  const percentage = Math.round((correctAnswers / QUESTIONS.length) * 100);

  const scoreText = document.createElement("p");
  scoreText.textContent = `Punteggio finale: ${percentage}%`;

  // messaggio finale
  const verdict = document.createElement("h2");

  if (percentage >= 60) {
    verdict.textContent = "Promosso!";
  } else {
    verdict.textContent = "Riprova!";
  }

  // aggiunge tutto alla pagina
  app.appendChild(resultTitle);
  app.appendChild(correctText);
  app.appendChild(wrongText);
  app.appendChild(scoreText);
  app.appendChild(verdict);
}
/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;

const app = document.querySelector("#app");

function showQuestion() {
  const domanda = document.createElement("h2");
  domanda.textContent = QUESTIONS[currentQuestion].question;
  app.appendChild(domanda);

  const btnCorretta = document.createElement("button");
  btnCorretta.textContent = QUESTIONS[currentQuestion].correct_answer;
  btnCorretta.addEventListener("click", function () {
    currentQuestion++;
    showQuestion();
  });
  app.appendChild(btnCorretta);
  for (
    let i = 0;
    i < QUESTIONS[currentQuestion].incorrect_answers.length;
    i++
  ) {
    const btnErrata = document.createElement("button");
    btnErrata.textContent = QUESTIONS[currentQuestion].incorrect_answers[i];
    app.appendChild(btnErrata);
  }
}
showQuestion();
