const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Pb", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}



function showQuestion() {
    resetState();
    progress.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }}

    function selectAnswer(e) {
         const selectedBtn = e.target;
         const isCorrect = selectedBtn.dataset.correct === "true";
         if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
         } else {
            selectedBtn.classList.add("incorrect");
         }
         Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
         });
         nextButton.style.display = "block";
    }

    function showScore(){

    resetState();

    const percentage =
        Math.round(score/questions.length*100);

    let message="";

    if(percentage===100)
        message="🏆 Perfect!";
    else if(percentage>=80)
        message="🎉 Excellent!";
    else if(percentage>=60)
        message="👍 Good Job!";
    else
        message="📚 Keep Practicing!";

    questionElement.innerHTML=`
        <h2>${message}</h2>
        <br>
        <p>You scored <strong>${score}</strong> out of <strong>${questions.length}</strong></p>
        <p>${percentage}%</p>
    `;

    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

    function handleNextButton() {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }
    nextButton.addEventListener("click", () => {
       if(currentQuestionIndex < questions.length ){
           handleNextButton();
       }else{
        startQuiz();
       }
    });
startQuiz();