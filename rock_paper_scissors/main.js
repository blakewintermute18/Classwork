
var moves = ["Rock", "Scissors", "Paper"];
var results = ["Tie", "Loss", "Win"]
var wins = 0;
var losses = 0;
var ties = 0;
var result = 0;
var plays = 1;

var winsBox = document.getElementById("wins");
var tiesBox = document.getElementById("ties");
var lossesBox = document.getElementById("losses");

var table = document.getElementById("table");


function play(input) {
  var rand = Math.floor(Math.random()*3)+1;

  if (document.getElementById("1").checked){
    input = 1;
  }
  if (document.getElementById("3").checked){
    input = 3;
  }
  if (document.getElementById("2").checked){
    input = 2;
  }

  console.log(input);

  if (rand === input){
    console.log("Tie")
    result = 0;
    ties++;

  }
  else if (((rand+1) === input) || (rand == 3 && input == 1)){
    console.log("Computer Wins")
    result = 1;
    losses++;
  }
  else if (((input+1) === rand) || (input == 3 && rand == 1)) {
    console.log("Human Wins")
    result = 2;
    wins++;
  }

  var row = table.insertRow(1);


  row.insertCell(0).textContent = plays;
  row.insertCell(1).textContent = moves[input-1];
  row.insertCell(2).textContent = moves[rand-1];
  row.insertCell(3).textContent = results[result];

  winsBox.textContent = "Wins: " + wins;
  tiesBox.textContent = "Ties: " + ties;
  lossesBox.textContent = "Losses: " + losses;

  plays++;

}
