/*
Train App
Brett Billman
December 6th 2018
*/

// Initialize Firebase
$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyCSj4VozDNVAh0ZVay2XS70vzFGwh3rVbc",
        authDomain: "train-app-data.firebaseapp.com",
        databaseURL: "https://train-app-data.firebaseio.com",
        projectId: "train-app-data",
        storageBucket: "train-app-data.appspot.com",
        messagingSenderId: "999241241117"
    };
    firebase.initializeApp(config);

    let database = firebase.database();

    let train = "";
    let destination = "";
    let firTrain = "";
    let freq = "";


    $("#new-train").on("click", function(event){
        event.preventDefault();

        train = $("#name").val().trim();
        destination = $("#destination").val().trim();
        firTrain = $("#fir-train").val().trim();
        freq = $("#freq").val().trim();
    
        database.ref().push({
            train: train,
            destination: destination,
            firTrain: firTrain,
            freq: freq
        });

    });

    database.ref().on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.loging the last user's data
        console.log(sv.train);
        console.log(sv.destination);
        console.log(sv.firTrain);
        console.log(sv.freq);

        // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });

});

