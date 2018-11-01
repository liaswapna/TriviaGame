// global variables including the object variables.
var questions = [{
	"question": "What is the name of Klaus’s and Hayley’s child?",
	"option1": "Hope Mikaelson",
	"option2": "Katherine",
	"option3": "Kaitlyn",
	"option4": "Angela",
	"answer": "option1"
}, {
	"question": "In season 3, who’s sire line is broken?",
	"option1": "Elijah",
	"option2": "Kohl",
	"option3": "Klaus",
	"option4": "Rebekah",
	"answer": "option3"
}, {
	"question": "How were the originals turned?",
	"option1": "Freya turned them",
	"option2": "Esther turned them",
	"option3": "Davina turned them",
	"option4": "Marcel turned them",
	"answer": "option2"
}, {
	"question": "How many original siblings are there?",
	"option1": "7",
	"option2": "8",
	"option3": "5",
	"option4": "4",
	"answer": "option1"
}, {
	"question": "What is Freya?",
	"option1": "Hybrid",
	"option2": "A witch",
	"option3": "Human",
	"option4": "Werewolf",
	"answer": "option2"
}, {
	"question": "Who does Hayley marry?",
	"option1": "Klaus",
	"option2": "Josh",
	"option3": "Jackson",
	"option4": "Elijah",
	"answer": "option3"
}, {
	"question": "Which Original calls Hayley 'Little Wolf'?",
	"option1": "Rebekah",
	"option2": "Elijah",
	"option3": "Klaus",
	"option4": "Kol",
	"answer": "option3"
}, {
	"question": "What makes Klaus Mikaelson so special?",
	"option1": "He's an original",
	"option2": "He both a wolf and vampire",
	"option3": "He's a werewolf",
	"option4": "He's a witch",
	"answer": "option2"
}, {
	"question": "What is Elijah called?",
	"option1": "The noble brother",
	"option2": "The forgiven brother",
	"option3": "The forgotten brother",
	"option4": "The angry brother",
	"answer": "option1"
}, {
	"question": "Why did Esther Mikaelson come back?",
	"option1": "To live happily everafter",
	"option2": "To make her family whole again",
	"option3": "To be forgiven",
	"option4": "To kill her family and restore balance",
	"answer": "option3"
}];
var currentQuestion = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var totalQuestions = questions.length;
var selectedCheck;
var time = 10;
var score = 0;

// time converter function to display in a format
function timeConverter(t) {

	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);
	
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	
	if (minutes === 0) {
		minutes = "00";
	}
	else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	
	return minutes + ":" + seconds;
};

// funtion to set the time delay and display
function waits(){
	time--;
	var converted = timeConverter(time);
    $("#time").text(converted);
    var selectedOption = document.querySelector('input[type=radio]:checked');
    selectedCheck = selectedOption;
	if(time == 0 || selectedCheck != null){
		clearInterval(intervalId);
        time = 10;
		loadNextQuestion();
	}
};

// reset the values
function myrReset(){
    time = 10;
    score = 0;
    currentQuestion = 0;
    correctAns = 0;
    incorrectAns = 0;
    unanswered = 0;
}

// function to load the question.
function loadQuestion(questionIndex) { 
	var q = questions[questionIndex];
	$("#question").text((questionIndex + 1) + '. ' + q.question);
	$("#label1").text(q.option1);
	$("#label2").text(q.option2);
	$("#label3").text(q.option3);
    $("#label4").text(q.option4);
    intervalId = setInterval(waits,1000);
};

// display switch function
function displaySwitch(switchElement){
    if ($(switchElement).css("display") != "none"){
        $(switchElement).css("display","none");
    }else {
        $(switchElement).css("display","inline-block");
    }
}

// function to load the next question
function loadNextQuestion() {
    var selectedOption = document.querySelector('input[type=radio]:checked');
    selectedCheck = selectedOption;
    if (selectedOption != null){
		var answer = selectedOption.value;
	    if(questions[currentQuestion].answer == answer){
            correctAns++;
	    } else {
            incorrectAns++;
        }
        selectedOption.checked = false;
	} else {
        unanswered++;
    }
	currentQuestion++;
	if(currentQuestion == totalQuestions){
        displaySwitch("#start");
        displaySwitch("#question-time-container");
        displaySwitch("#option-container");
        displaySwitch("#result-container");
        $("#correct-ans").text("Correct Answers: "+correctAns);
        $("#incorrect-ans").text("Incorrect Answers: "+incorrectAns);
        $("#unans").text("Unanswered: "+unanswered);
		return;
	}
	loadQuestion(currentQuestion);
}

// Button Click event.
$("#start").click(function(){
    myrReset();
    if ($("#result-container").css("display") != "none"){
        displaySwitch("#result-container");
    }
    displaySwitch("#start");
    displaySwitch("#question-time-container");
    displaySwitch("#option-container");
    loadQuestion(currentQuestion);
}); 