"use strict";

var min = 0
var max = 11

var Game = function(name){
  this.name = name
  this.purse = 100
  // this.bet = null;
  // this.guess = null;
  // this.answer = null;
}

Game.prototype = {

  "newRound" : function(guess,bet){
    if (bet > this.purse) {
      return feedback.innerHTML = "<span style='color:red;'>You can't bet more than your bank... Try again</style>"
    } else {
      this.answer = Math.floor(Math.random() * (max - min)) + min;
      this.bet = parseInt(bet);
      this.guess = guess;
      this.updateBank(-this.bet);
      this.checkAnswer();
    }
  },

  "checkAnswer" : function(){
    (this.guess == this.answer || this.guess == (this.answer+1) || this.guess == (this.answer-1)) ? this.answerRight() : this.answerWrong();
  },

  "answerRight" : function(){
    var check = "<span style='color:green;text-shadow:0 0 5px green;'>&#x2713;</span>"
    if(this.guess == this.answer){
      feedback.innerHTML = check + "Answer: " + this.answer + " Guess: " + this.guess + ". Perfect! Double up!"
      this.updateBank(this.bet*2)
    } else {
      feedback.innerHTML = "Answer: " + this.answer + " Guess: " + this.guess + ". Not bad... here's your money back"
      this.updateBank(this.bet)
    };
    this.nextRound();
  },

  "answerWrong" : function(){ 
    feedback.innerHTML = "<span style='color:red;'>&#x2717;</span> Answer: " + this.answer + " Guess: " + this.guess + ". Sorry!"
    this.nextRound();
  },

  "nextRound" : function(){
    if (this.purse <= 0 || this.purse == "0") {
      betForm.style.display = "none";
      tryAgain.style.display = "inline-block";
      feedback.innerHTML = "<span style='color:red;'>GAME OVER!</span> " + this.name + ". Refresh the page to try again"
    } else {
      return false; 
    };
  },

  "updateBank" : function(money){
    this.purse += money
    bank.innerHTML = "$" + this.purse
  },

}

var feedback = document.querySelector('#feedback');
var bank = document.querySelector('#bank');

var nameForm = document.querySelector('#name');
var nameField = document.querySelector('#nameField');

var console = document.querySelector('#console');

var betForm = document.querySelector('#bet');
var betField = document.querySelector('#betField');
var numberField = document.querySelector('#numberField');

var tryAgain = document.querySelector('#tryAgain');

tryAgain.style.display = "none";


var game;

feedback.innerHTML = "What's your name gambler?"

numberField.onkeyup = function(e){
  if(e.target.value > 10){
    e.target.value = 10
  }
  if(e.target.value < 0){
    e.target.value = 0
  }
}

betField.onkeyup = function(e){
  if(e.target.value < 0){
    e.target.value = ""
  }
}

nameForm.onsubmit = function(e){
  e.preventDefault(); 
  game = new Game(nameField.value);
  nameForm.style.display = "none";
  betForm.style.display = "block";
  console.style.lineHeight = '70px';
  feedback.innerHTML = game.name + ", lets go! Choose a number and place your bet!"
  bank.innerHTML = "$" + game.purse;
}

betForm.onsubmit = function(e){
  e.preventDefault(); 
  game.newRound(parseInt(numberField.value),betField.value);
}

tryAgain.onclick = function(e){
  game = new Game(game.name);
  feedback.innerHTML = "OK " + game.name + ", let's go again!"
  bank.innerHTML = "$ " + game.purse
  tryAgain.style.display = "none";  
  betForm.style.display = "block";
}
