const question = document.getElementById("question");
const choices = Array.from (document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript ?",
        choice1: "<script>",
        choice2: "<Javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: 
                 "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script herf='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script scr='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
    question: "How do you write 'Hello World' in a alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choice1: "var",
        choice2: "let",
        choice3: "Both A and b",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choice1: "getElementById",
        choice2: "getElementByClassName",
        choice3: "Both A and b",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choice1: "document.write()",
        choice2: "console.log()",
        choice3: "window.alert",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        choice1: "const",
        choice2: "var",
        choice3: "let",
        choice4: "constant",
        answer: 1
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; 
    getNewQuestion();   
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        console.log(classToApply);

        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
