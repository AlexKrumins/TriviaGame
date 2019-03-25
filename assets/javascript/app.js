window.onload = function(){

    // questions
    var listquestionArray = [
        {
            listquestion: "Who does Number Two work for?",
            answer: "Dr. Evil",
            allAnswers: ["Dr. Evil", "Mr. Evil", "Lorne Michaels", "Anyone with Metamucil"],
            image: "<img src='./assets/images/MF0qT3I.gif'/>",
        },
        {
            listquestion: "From what country to Fortune Cookies originate?",
            answer: "USA",
            allAnswers: ["USA","China", "Taiwan", "Thailand"],
            image: "<img src='./assets/images/giphy.gif'/>",
        },
        {
            listquestion: "If you were prompted to pick 'A', you would...",
            answer: "A. Pick this one",
            allAnswers: ["D. All of the above","C. Not pick this one", "B. Pick A", "A. Pick this one"],
            image: "<img src='./assets/images/confused.gif'/>",
        },
    ];
    
    /////QUESTIONS Manifested
    var currentQuestion = 0
    var questionData;
    $("#newGame").click(newPage)
    $("#finalscorebutton").click(finalScore);
    $("#timer").addClass("hidden");
    
    function newPage() {
        $("#finalScore").empty();
        $("#evaluation").empty();
        $("#display").empty();
        $("#newGame").addClass("hidden");
        $("#timer").removeClass("hidden");

        questionData = listquestionArray[currentQuestion];
        var displayQuestion = questionData.listquestion;
        var allAnswers = questionData.allAnswers;
        
        $("#questionDisplay").text(displayQuestion);
        for(i = 0; i < allAnswers.length; i++){
          var answerbutton = $("<button>").html(allAnswers[i]).attr("data-name", allAnswers[i]).addClass("guess btn btn-secondary btn-block");
          $("#answersList").prepend(answerbutton, '<br>');
        };
        clearTimeout(timeoutId);
        fullTimer = 21;
        startTimer();
        $(".guess").click(checkGuess);
      };
      
      function checkGuess(){
        clearInterval(intervalId);
      $("#timer").addClass("hidden").html("20");
        if ($(this).attr("data-name") === questionData.answer){
          $("#evaluation").text("You're frickin' right!");
          correctGuesses ++;
        } else {
          $("#evaluation").text("So sorry. The correct answer was '" + questionData.answer + "'");
          incorrectGuesses ++;
        };
        $("#display").append(questionData.image);
        $("#questionDisplay").empty();
        $("#answersList").empty();
        currentQuestion ++;
        if (currentQuestion === listquestionArray.length){
          $("#finalscorebutton").removeClass("hidden");
          startGameOver();
        }else{
          $("#newGame").removeClass("hidden").text("Next Question...");
          startTimeout();
        };
    };

    // TIMER
    var timeoutId;
    var intervalId;
    var fullTimer;
    function startTimeout(){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(newPage, 1000 * 10);
    };
    function startGameOver(){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(finalScore, 1000 * 10);
    };
    function startTimer(){
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    };
    function decrement() {
        fullTimer--;
        $("#timer").html(fullTimer);
        if (fullTimer === 0) {
            incorrectGuesses --;
            nonGuesses ++;
            checkGuess();
        };
    };

    // finalscore
    var correctGuesses = 0;
    var incorrectGuesses = 0;
    var nonGuesses = 0;

    function finalScore() {
        clearTimeout(timeoutId);
        $("#finalscorebutton").addClass("hidden");
        $("#newGame").removeClass("hidden").text("Try a New Game");
        $("#finalScore").html("<h2>Congratulations on making it this far. There is nowhere else to go.</h2><h3>Here are you final scores<h3><p>Correct Answers: " + correctGuesses + "</p><p>Incorrect Answers: " + incorrectGuesses + "</p><p>The timer ran out before you could be bothered to answer: " + nonGuesses + "</p>");
        $("#evaluation").empty();
        $("#display").empty();currentQuestion = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
        nonGuesses = 0;
    };
};

//ATTEMPT TO MAKE THE ANSWERS APPEAR IN RANDOM ORDER EVERY TIME
// // https://osric.com/chris/accidental-developer/2012/07/javascript-array-sort-random-ordering/
// <script type="text/javascript">
//   var arr = ['apple','cat','Adam','123','Zorro','petunia']; 
//   var n = arr.length;
//   var tempArr = [];
//   for ( var i = 0; i < n-1; i++ ) {
//     // The following line removes one random element from arr
//     // and pushes it onto tempArr
//     tempArr.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
//   }
//   // Push the remaining item onto tempArr
//   tempArr.push(arr[0]);
//   arr=tempArr;
// </script>