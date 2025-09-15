const questions = [
    {
        question: "What is the capital of India?",
        answers:[
            { text: "New Delhi", correct: true },
            { text: "Mumbai", correct: false },
            { text: "Chh.Sambhajinagar", correct: false },
            { text: "Banglore", correct: false }
        ]

    },
    {
        question: "What is the capital of Maharashtra?",
        answers:[
            { text: "Chh.Sambhajinagar", correct: false },
            { text: "Mumbai", correct: true },
            { text: "Pune", correct: false },
            { text: "Nagpur", correct: false }
        ]
    },
    {
        question: "What is the Largest Animal in the world?",
        answers:[
            { text: "Dog", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Camel", correct: false }
        ]
    },
    {
        question: "Which Indian Cricket player has Hall of fame award Recived in 2025?",
        answers:[
            { text: "Sachin Tendulkar", correct: false },
            { text: "MS Dhoni", correct: true },
            { text: "Virat Kohli", correct: false },
            { text: "Rohit Sharma", correct: false }
        ]
    },
    {
        question: "Which ipl team has won the most number of ipl titiles?",
        answers:[
            { text: "Chennai Super Kings", correct: true },
            { text: "Mumbai Indians", correct: true },
            { text: "Kings Punjab", correct: false },
            { text: "Royal Challengers Bangalore", correct: false }
        ]
    }
];
const questionElement = document.querySelector("#que");
const answerButtons = document.querySelector("#ans-button");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

}

function showQuestion(){
    resetstate();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)

    }
}

function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("Incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
} 

function showScore(){
    resetstate();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
       showQuestion(); 
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();