/*
Train App
Brett Billman
December 6th 2018
*/

let train = "";
let destination = "";
let firTrain = "";
let freq = "";

$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCSj4VozDNVAh0ZVay2XS70vzFGwh3rVbc",
    authDomain: "train-app-data.firebaseapp.com",
    databaseURL: "https://train-app-data.firebaseio.com",
    projectId: "train-app-data",
    storageBucket: "train-app-data.appspot.com",
    messagingSenderId: "999241241117"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $(".button").on("click", function(){
    event.preventDefault();

    train = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firTrain = $("#fir-train").val().trim();
    freq = $("#freq").val().trim();

    console.log(train);
    console.log(destination);
    console.log(firTrain);
    console.log(freq);

    database.ref().push({
        train: train,
        destination: destination,
        firTrain: firTrain,
        freq = freq
    });


  });


});