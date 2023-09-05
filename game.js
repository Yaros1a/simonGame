let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];

var started = false;
var level = 0;

let nextSequence = () => {
    let randomNumber = Math.floor((Math.random() * 4 ))
    let randomChosenColour =  buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeAnimation(randomChosenColour)
    playAudio(randomChosenColour)

    level++;
    $("#level-title").text("Level " + level);
}

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});


$(".btn").on("click",function(){
    let userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour)

    playAudio(userChosenColour)
    makeAnimation(userChosenColour)

    checkAnswer(userClickPattern.length - 1)
})

function playAudio(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play()
}

function makeAnimation(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
     }, 100)
}

let checkAnswer = (currentColor) => {

    if (gamePattern[currentColor] === userClickPattern[currentColor]) {
        console.log("success")
        if(userClickPattern.length === gamePattern.length){
            userClickPattern = [];
           
            setTimeout(nextSequence, 1000)
        }
    } else {
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        startOver();
    }

}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
    userClickPattern = [];
}