// global variables including the object variables.
var questions = [{
	"question": "What is the name of Klaus’s and Hayley’s child?",
	"option1": "Hope Mikaelson",
	"option2": "Katherine",
	"option3": "Kaitlyn",
	"option4": "Angela",
	"answer": "option1",
	"image": "hope.gif"
}, {
	"question": "In season 3, who’s sire line is broken?",
	"option1": "Elijah",
	"option2": "Kohl",
	"option3": "Klaus",
	"option4": "Rebekah",
	"answer": "option3",
	"image": "klaus.gif"
}, {
	"question": "How were the originals turned?",
	"option1": "Freya turned them",
	"option2": "Esther turned them",
	"option3": "Davina turned them",
	"option4": "Marcel turned them",
	"answer": "option2",
	"image": "esther.gif"
}, {
	"question": "How many original siblings are there?",
	"option1": "7",
	"option2": "8",
	"option3": "5",
	"option4": "4",
	"answer": "option1",
	"image": "siblings.gif"
}, {
	"question": "What is Freya?",
	"option1": "Hybrid",
	"option2": "A witch",
	"option3": "Human",
	"option4": "Werewolf",
	"answer": "option2",
	"image": "freya.gif"
}, {
	"question": "Who does Hayley marry?",
	"option1": "Klaus",
	"option2": "Josh",
	"option3": "Jackson",
	"option4": "Elijah",
	"answer": "option3",
	"image": "jhwed.gif"
}, {
	"question": "Which Original calls Hayley 'Little Wolf'?",
	"option1": "Rebekah",
	"option2": "Elijah",
	"option3": "Klaus",
	"option4": "Kol",
	"answer": "option3",
	"image": "hayleyklaus.gif"
}, {
	"question": "What makes Klaus Mikaelson so special?",
	"option1": "He's an original",
	"option2": "He both a wolf and vampire",
	"option3": "He's a werewolf",
	"option4": "He's a witch",
	"answer": "option2",
	"image": "hybridklaus.gif"
}, {
	"question": "What is Elijah called?",
	"option1": "The noble brother",
	"option2": "The forgiven brother",
	"option3": "The forgotten brother",
	"option4": "The angry brother",
	"answer": "option1",
	"image": "elijah.gif"
}, {
	"question": "Why did Esther Mikaelson come back?",
	"option1": "To live happily everafter",
	"option2": "To make her family whole again",
	"option3": "To be forgiven",
	"option4": "To kill her family and restore balance",
	"answer": "option4",
	"image": "family.gif"
}];
var currentQuestion = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var totalQuestions = questions.length;
var selectedCheck;
var set;
var flag = 0;
var checkGIF = 0;
var time = 10;
var score = 0;
var selectedOption;

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
		return
	}
};

// funtion to shuffle the questions array
function shuffleArray(){
	for(i=0;i<questions.length;i++){
		var j = Math.floor(Math.random()*questions.length);
		var temp = questions[i];
		questions[i] = questions[j];
		questions[j] = temp;
	}
}

// reset the values
function myrReset(){
    time = 10;
    score = 0;
    currentQuestion = 0;
    correctAns = 0;
    incorrectAns = 0;
	unanswered = 0;
	shuffleArray();
}

// function to display gif image
function displayGif(index,checkValue){
	if (checkValue == 0){
		selectedOption.checked = false;
		var newDiv = $("<div>");
		var paraElmt = $("<h2>").text("Correct!");
		newDiv.append(paraElmt);
		var url = "assets/images/"+questions[index].image;
		var imageElmt = $("<img style = 'height:250px; width:400px;' src='"+url+"'>");
		newDiv.append(imageElmt);
		$("#gif-container").append(newDiv);
		return newDiv;
	}else if(checkValue == 1){
		selectedOption.checked = false;
		var newDiv = $("<div>");
		var paraElmt = $("<h2>").text("Incorrect!");
		newDiv.append(paraElmt);
		var ans = questions[index].answer;
		var paraElmt2 = $("<h2>").text("The correct answer was: "+ questions[index][ans]);
		newDiv.append(paraElmt2);
		var url = "assets/images/"+questions[index].image;
		var imageElmt = $("<img style = 'height:250px; width:400px;' src='"+url+"'>");
		newDiv.append(imageElmt);
		$("#gif-container").append(newDiv);
		return newDiv;
	}else if(checkValue == 2){
		var newDiv = $("<div>");
		var paraElmt = $("<h2>").text("Out of Time!");
		newDiv.append(paraElmt);
		var ans = questions[index].answer;
		var paraElmt2 = $("<h2>").text("The correct answer was: "+ questions[index][ans]);
		newDiv.append(paraElmt2);
		var url = "assets/images/"+questions[index].image;
		var imageElmt = $("<img style = 'height:250px; width:400px;' src='"+url+"'>");
		newDiv.append(imageElmt);
		$("#gif-container").append(newDiv);
		return newDiv;
	}
}

// function to load the question.
function loadQuestion(questionIndex) { 
	var q = questions[questionIndex];
	$("#question").text((questionIndex + 1) + '. ' + q.question);
	$("#label1").text(q.option1);
	$("#label2").text(q.option2);
	$("#label3").text(q.option3);
	$("#label4").text(q.option4);
	$("#time").text("00:10");
	intervalId = setInterval(waits,1000);
};

// display switch function.
function displaySwitch(switchElement){
    if ($(switchElement).css("display") != "none"){
        $(switchElement).css("display","none");
    }else {
        $(switchElement).css("display","inline-block");
    }
}

// function to perform timeout
function timeDelay(divObj){
	displaySwitch("#question-time-container");
    displaySwitch("#option-container");
	var set = setTimeout(function(){ divObj.remove(),afterTimeout(); }, 5000);
}

// function to perform after timeout.
function afterTimeout(){
	currentQuestion++;
	clearTimeout(set);
	displaySwitch("#question-time-container");
    displaySwitch("#option-container");
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

// function to load the next question.
function loadNextQuestion() {
    selectedOption = document.querySelector('input[type=radio]:checked');
    selectedCheck = selectedOption;
    if (selectedOption != null){
		var answer = selectedOption.value;
	    if(questions[currentQuestion].answer == answer){
			correctAns++;
			var divObj = displayGif(currentQuestion,0);
			timeDelay(divObj);
	    } else {
			incorrectAns++;
			var divObj = displayGif(currentQuestion,1);
			timeDelay(divObj);
		}
	} else {
		unanswered++;
		var divObj = displayGif(currentQuestion,2);
		timeDelay(divObj);
    }
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