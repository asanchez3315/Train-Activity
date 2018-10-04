$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBHEdLOZAfbdlJa7TccRJ9GnnyvZTLPJms",
        authDomain: "train-8c20d.firebaseapp.com",
        databaseURL: "https://train-8c20d.firebaseio.com",
        projectId: "train-8c20d",
        storageBucket: "",
        messagingSenderId: "661813938208"
      };
      firebase.initializeApp(config);
    var database = firebase.database();

   

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function (childsnapshot) {

        trainName = childsnapshot.val().trainName;
        destination = childsnapshot.val().destination;
        firstTrain = childsnapshot.val().firstTrain;
        frequency = childsnapshot.val().frequency;

        console.log(childsnapshot.val().trainName);
        console.log(childsnapshot.val().destination);
        console.log(childsnapshot.val().firstTrain);
        console.log(childsnapshot.val().frequency);

        // var startTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

        // // Current Time
        // var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // // Difference between the times
        // var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // // Time apart (remainder)
        // var tRemainder = diffTime % frequency;
        // console.log(tRemainder);
    
        // // Minute(s) Until Train
        // var tMinutesTillTrain = frequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // // Next Train
        // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
        // // Clear input fields
        // $("#trainName, #destination, #firstTrain, #interval").val("")
        // return false;

        var tbody = $("#display-info")
        var tr = $("<tr>")
        var trainName = $("<td>").text(trainName)
        var destination = $("<td>").text(destination)
        var firstTrain = $("<td>").text(firstTrain)
        var frequency = $("<td>").text(frequency)
        tr.append(trainName, destination, firstTrain, frequency)
        tbody.append(tr)


    },
    //Handle the errors
    function (errorObj) {
        console.log("Errors handled: " + errorObj.code);
    });



    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        // Change the HTML to reflect
        $("#trainName").text(snapshot.val().trainName);
        $("#destination").text(snapshot.val().destination);
        $("#firstTrain").text(snapshot.val().firstTrain);
        $("#interval").text(snapshot.val().interval);
    });

    // Capture Button Click

    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text boxes
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#interval").val().trim();

        // Code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });





});