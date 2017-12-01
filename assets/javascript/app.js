var triviaQuestions = [
    {
        question: "What year was the company 'Nintendo' founded?",
        answers: ["1889","1985","1978","1954"],
        correct: "1889",
        img: "assets/images/Nintendo-Logo.png"
    },
    {
        question: "What was the first video game ever created?",
        answers: ["Tennis for Two","Pong","Asteroid","Snake"],
        correct: "Tennis for Two",
        img: "assets/images/tennisfortwo.jpg"
    },
    {
        question: "What popular game created in 1984 was made in the Soviet Union?",
        answers: ["Pac-Man","Duck Hunt","Excitebike","Tetris"],
        correct: "Tetris",
        img: "assets/images/tetris.gif"
    },
    {
        question: "The 'Super Nintendo' was released in Japan with what name?",
        answers: ["Super Nintendo Entertainment System","Mega Drive","Super Famicom","Super Comboy"],
        correct: "Super Famicom",
        img: "assets/images/superfamicom.jpg"
    },
    {
        question: "What is the current best selling video game of all time?",
        answers: ["Grand Theft Auto V","Wii Sports","Minecraft","Tetris"],
        correct: "Tetris",
        img: "assets/images/tetris.jpg"
    },
    {
        question: "Before receiving his iconic name of 'Mario', what was the red-clad plumber's very first name?",
        answers: ["Mr. Game and Watch","Ossan","Mr. Video","Jumpman"],
        correct: "Ossan",
        img: "assets/images/ossan.jpg"
    },
    {
        question: "What was the first home video game console?",
        answers: ["Atari 2600","Super Famicom","Sega Advent","Magnavox Odyssey"],
        correct: "Magnavox Odyssey",
        img: "assets/images/magnavoxodyssey.jpg"
    },
    {
        question: "What was another name for the commonly owned system known as the 'Sega Genesis'?",
        answers: ["Jagua","NeoGeo","Mega Drive","TurboGraf"],
        correct: "Mega Drive",
        img: "assets/images/megadrive.jpg"
    },
    {
        question: "What console was released first?",
        answers: ["N64","Sega Dreamcast","Playstation","XBOX"], 
        correct: "Playstation",
        img: "assets/images/playstation.jpg"
    },
    {
        question: "What video game was first unveiled in the movie 'The Wizard'?",
        answers: ["Final Fight","Donkey Kong Country","Teenage Mutant Ninja Turtles","Super Mario Bros. 3"],
        correct: "Super Mario Bros. 3",
        img: "assets/images/thewizard.jpg"
    }

]



// List of variables

var correctQuestions = 0
var incorrectQuestions = 0
var score = 0 //Calculate percentage based on correct/incorrect
var currentQuestion = 0
var chosenAnswer = ""
var timeLeft = 10
var count;
var nextQuestion;
//Various function calls

//Creates Question with answer buttons

function createQuestion() {
    clearInterval(nextQuestion)
    emptyDivs()
    timeLeft = 10
    $(".question").html("<h1>" + triviaQuestions[currentQuestion].question + "</h1>")
    for (i = 0; i < triviaQuestions[currentQuestion].answers.length; i++) {
        var answerButton = $("<button>")
        answerButton.attr("id", "poss-answer")
        answerButton.addClass("m-1")
        answerButton.attr("data-name", triviaQuestions[currentQuestion].answers[i])
        answerButton.text(triviaQuestions[currentQuestion].answers[i])
        $(".answer").append(answerButton)
    }
    $(".timer").text("Time remaining: " + timeLeft + "s")
    count = setInterval(timer, 1000)
}

function emptyDivs(){
    $(".question").empty()
    $(".answer").empty()
    $(".picture").empty()
}

$(".answer").on("click","#poss-answer", function() {
    chosenAnswer = $(this).attr("data-name")
    correctIncorrect()
    console.log(chosenAnswer)
});

function timer(){
    if (timeLeft > 0 ){
        timeLeft--;
        $(".timer").text("Time remaining: " + timeLeft + "s")
    }
    else if (timeLeft <= 0 ){
        correctIncorrect()
    }
}

function correctAnswer() {
    $(".timer").empty()
    $(".question").text("You were correct!")
    $(".answer").text(triviaQuestions[currentQuestion].correct)
    $(".picture").html("<img src='" + triviaQuestions[currentQuestion].img +"' class = 'img-fluid'>")
    nextQuestion = setInterval(createQuestion,1000)
}

function displayCorrect(){
    $(".timer").empty()
    $(".question").text("The correct answer was:")
    $(".answer").text(triviaQuestions[currentQuestion].correct)
    $(".picture").html("<img src='" + triviaQuestions[currentQuestion].img +"' class = 'img-fluid'>")
    nextQuestion = setInterval(createQuestion,1000)
}

function correctIncorrect (){
    clearInterval(count)
    if (chosenAnswer === triviaQuestions[currentQuestion].correct) {
        correctQuestions++
        correctAnswer()
        currentQuestion++
        gameOver()
    }
    else if (chosenAnswer != triviaQuestions[currentQuestion].correct) {
        incorrectQuestions++
        displayCorrect()
        currentQuestion++
        gameOver()
    }
   
}
function gameOver() {
        if(currentQuestion >= triviaQuestions.length){
        emptyDivs()
        currentQuestion = 0;
        $(".timer").empty()
        $("#correct").text("Number correct: " + correctQuestions)
        $("#incorrect").text("Number incorrect: " + incorrectQuestions)
        var restartButton = $("<button>")
        restartButton.attr("#start-button")
        restartButton.text("Play again?")
        $(".start").append(restartButton)
        }
}
$(".start").on("click","#start-button", function() {
    $(".instruction").empty()
    $(".start").empty()
    createQuestion()
})