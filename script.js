const button = document.getElementById("validate-button");
const answer = document.getElementById("answer");
const result = document.getElementById("result");

const scoreDisplay = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const questionImage = document.getElementById("question-image");

const startScreen = document.getElementById("start-screen");
const game = document.getElementById("game");
const endScreen = document.getElementById("end-screen");

const questionCountSelect = document.getElementById("question-count");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const finalScore = document.getElementById("final-score");


/* =========================
   BANQUE DES HÉROS
========================= */

/*
   Chaque héros possède :
   - son nom
   - toutes ses images disponibles

   Exemple :

   {
       name: "ashe",
       images: [
           "images/ashe-1.png",
           "images/ashe-2.png",
           "images/ashe-3.png"
       ]
   }

   Le jeu choisira UNE image au hasard
   lorsqu'Ashe est sélectionnée.
*/

const heroes = [

    {
        name: "ashe",
        images: [
            "images/ashe-1.png",
            "images/ashe-2.png",
            "images/ashe-3.png"
        ]
    },

    {
        name: "cassidy",
        images: [
            "images/cassidy-1.png",
            "images/cassidy-2.png",
            "images/cassidy-3.png"
        ]
    },

    {
        name: "genji",
        images: [
            "images/genji-1.png",
            "images/genji-2.png",
            "images/genji-3.png"
        ]
    },

    {
        name: "hanzo",
        images: [
            "images/hanzo-1.png",
            "images/hanzo-2.png"
        ]
    },

    {
        name: "junkrat",
        images: [
            "images/junkrat-1.png",
            "images/junkrat-2.png"
        ]
    },

    {
        name: "orisa",
        images: [
            "images/orisa-1.png",
            "images/orisa-2.png",
            "images/orisa-3.png",
            "images/orisa-4.png",
            "images/orisa-5.png",
            "images/orisa-6.png",
            "images/orisa-7.png",
            "images/orisa-8.png",
            "images/orisa-9.png",
            "images/orisa-10.png",
            "images/orisa-11.png",
            "images/orisa-12.png",
            "images/orisa-13.png",
            "images/orisa-14.png"
        ]
    },

    {
        name: "pharah",
        images: [
            "images/pharah-1.png",
            "images/pharah-2.png",
            "images/pharah-3.png",
            "images/pharah-4.png",
            "images/pharah-5.png",
            "images/pharah-6.png",
            "images/pharah-7.png",
            "images/pharah-8.png",
            "images/pharah-9.png"
        ]
    },

    {
        name: "ramattra",
        images: [
            "images/ramattra-2.png",
            "images/ramattra-3.png",
            "images/ramattra-4.png",
            "images/ramattra-5.png"
        ]
    },

    {
        name: "reaper",
        images: [
            "images/reaper-1.png",
            "images/reaper-2.png",
            "images/reaper-3.png",
            "images/reaper-4.png",
            "images/reaper-5.png"
        ]
    },

    {
        name: "reinhardt",
        images: [
            "images/reinhardt-1.png",
            "images/reinhardt-2.png",
            "images/reinhardt-3.png",
            "images/reinhardt-4.png",
            "images/reinhardt-5.png",
            "images/reinhardt-6.png",
            "images/reinhardt-7.png",
            "images/reinhardt-8.png",
            "images/reinhardt-9.png",
            "images/reinhardt-10.png"
        ]
    },

    {
        name: "roadhog",
        images: [
            "images/roadhog-1.png",
            "images/roadhog-2.png",
            "images/roadhog-3.png",
            "images/roadhog-4.png",
            "images/roadhog-5.png",
            "images/roadhog-6.png",
            "images/roadhog-7.png",
            "images/roadhog-8.png"
        ]
    },

    {
        name: "sojourn",
        images: [
            "images/sojourn-1.png",
            "images/sojourn-3.png",
            "images/sojourn-4.png"
        ]
    },

    {
        name: "tracer",
        images: [
            "images/tracer-1.png"
        ]
    },

    {
        name: "winston",
        images: [
            "images/winston-1.png"
        ]
    },

    {
        name: "wrecking ball",
        images: [
            "images/wrecking-ball-1.png"
        ]
    },

    {
        name: "zarya",
        images: [
            "images/zarya-1.png",
            "images/zarya-2.png",
            "images/zarya-3.png",
            "images/zarya-4.png"
        ]
    },

    {
        name: "zenyatta",
        images: [
            "images/zen-1.png"
        ]
    }

    // =========================
    // AJOUTE TES AUTRES HÉROS ICI
    // =========================

];


/* =========================
   VARIABLES DE JEU
========================= */

let score = 0;
let currentQuestion = 0;
let totalQuestions = 10;

let gameQuestions = [];
let answered = false;


/* =========================
   MÉLANGE ALÉATOIRE
========================= */

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
        [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


/* =========================
   IMAGE ALÉATOIRE D'UN HÉROS
========================= */

function getRandomImage(hero) {

    const randomIndex =
        Math.floor(Math.random() * hero.images.length);

    return hero.images[randomIndex];
}


/* =========================
   CRÉER LES QUESTIONS
========================= */

function createGameQuestions() {

    /*
       On mélange les héros.

       Chaque héros ne peut donc apparaître
       qu'une seule fois dans une partie.
    */

    const selectedHeroes =
        shuffle(heroes).slice(0, totalQuestions);


    /*
       Pour chaque héros, on choisit
       une image au hasard.
    */

    return selectedHeroes.map(hero => {

        return {
            image: getRandomImage(hero),
            answer: hero.name
        };

    });
}


/* =========================
   DÉMARRER UNE PARTIE
========================= */

function startGame() {

    totalQuestions =
        Number(questionCountSelect.value);

    /*
       Vérification au cas où on demande
       plus de questions que de héros disponibles.
    */

    if (totalQuestions > heroes.length) {

        alert(
            "There are only " +
            heroes.length +
            " heroes available."
        );

        return;
    }


    score = 0;
    currentQuestion = 0;
    answered = false;


    /*
       Création des questions
       avec héros uniques.
    */

    gameQuestions =
        createGameQuestions();


    startScreen.style.display = "none";

    endScreen.style.display = "none";

    game.style.display = "block";


    scoreDisplay.textContent =
        "Score : 0 / " + totalQuestions;


    showQuestion();
}


/* =========================
   AFFICHER UNE QUESTION
========================= */

function showQuestion() {

    const question =
        gameQuestions[currentQuestion];


    questionImage.src =
        question.image;


    questionNumber.textContent =
        "QUESTION " +
        (currentQuestion + 1) +
        " / " +
        totalQuestions;


    answer.value = "";


    result.textContent = "";

    result.className = "result";


    answered = false;


    answer.focus();
}


/* =========================
   QUESTION SUIVANTE
========================= */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion >= totalQuestions) {

        endGame();

        return;
    }


    showQuestion();
}


/* =========================
   VÉRIFIER LA RÉPONSE
========================= */

function checkAnswer() {

    if (answered) {
        return;
    }


    const userAnswer =
        answer.value.trim().toLowerCase();


    const correctAnswer =
        gameQuestions[currentQuestion]
        .answer
        .toLowerCase();


    /* =========================
       BONNE RÉPONSE
    ========================== */

    if (userAnswer === correctAnswer) {

        result.textContent =
            "CORRECT!";

        result.className =
            "result correct";


        score++;


        scoreDisplay.textContent =
            "Score : " +
            score +
            " / " +
            totalQuestions;


        answered = true;


        setTimeout(
            nextQuestion,
            500
        );
    }


    /* =========================
       MAUVAISE RÉPONSE
    ========================== */

    else {

        result.textContent =
            "WRONG!";

        result.className =
            "result wrong";


        answered = true;


        setTimeout(
            nextQuestion,
            1000
        );
    }
}


/* =========================
   FIN DE LA PARTIE
========================= */

function endGame() {

    game.style.display = "none";

    endScreen.style.display = "block";


    finalScore.textContent =
        "SCORE : " +
        score +
        " / " +
        totalQuestions;
}


/* =========================
   BOUTONS
========================= */

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


button.addEventListener(
    "click",
    checkAnswer
);


/* =========================
   TOUCHE ENTRÉE
========================= */

answer.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkAnswer();
        }

    }
);