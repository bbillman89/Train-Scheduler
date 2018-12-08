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

    database.ref().limitToLast(5).on("child_added", function(snapshot) {

        var sv = snapshot.val();

        //console.log(sv.train);
        //console.log(sv.destination);
        //console.log(sv.firTrain);
        //console.log(sv.freq);
        

        var firstTimeConverted = moment(sv.firTrain, "HH:mm").subtract(1, "days");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % sv.freq;
        console.log(tRemainder);

        var tMinutesTillTrain = sv.freq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        var nextDisplay = moment(nextTrain).format("HH:mm");



        $("#sch-table").append(
            "<tr>" +
                "<td>" + sv.train + "</td>" +
                "<td>" + sv.destination + "</td>" +
                "<td>" + sv.firTrain + "</td>" +
                "<td>" + nextDisplay + "</td>" +
                "<td>" + tMinutesTillTrain + "</td>" +
            "</tr>"
        );

        // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });

});

