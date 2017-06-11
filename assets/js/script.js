// Initialize Firebase
var config = {
    apiKey: "AIzaSyAwy5j_zxQbdFMoNi_38k6FOD0jk5XLmmg",
    authDomain: "train-schedule-8c8a6.firebaseapp.com",
    databaseURL: "https://train-schedule-8c8a6.firebaseio.com",
    projectId: "train-schedule-8c8a6",
    storageBucket: "train-schedule-8c8a6.appspot.com",
    messagingSenderId: "716943721472"
};
firebase.initializeApp(config);

// Current Time
var currentTime = moment();
var currentTimeNew = moment(currentTime).format("hh:mm");
console.log(currentTimeNew);

// variable to reference firebase
var database = firebase.database();

var counter = 0;
var trainName = "";
var trainDestination = "";
var trainFirstTime = "";
var trainFrequency = "";


$("#addTrain").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // get value of form input
    trainName = $("#addTrainName").val().trim();
    trainDestination = $("#addTrainDestination").val().trim();
    trainFirstTime = $("#firstTrainTime").val().trim();
    trainFrequency = $("#addTrainFrequency").val().trim();
    trainFirstTime = $("#firstTrainTime").val().trim();

    var newFormat = "HH:mm";
    var trainFirstTimeNew = moment(trainFirstTime, "HH:mm");
    console.log(trainFirstTimeNew);

    console.log(trainFrequency);





    // Difference between the times
    var diffTime = moment().diff(moment(trainFirstTimeNew), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    var tRemainderNew = moment(tRemainder, "HH:mm");
    console.log(tRemainderNew);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainNew = moment(nextTrain).format("hh:mm")
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    tableRow = $("<tr>");

    // create new table row on click
    $(".tableBody").append(tableRow);
    $(tableRow).attr("class", "trainRow");
    $(tableRow).attr("id", "trainRow-" + counter);

    // append info to each section
    $(tableRow).append("<td id='trainName-" + counter + "'>");
    $("#trainName-" + counter).text(trainName);
    $(tableRow).append("<td id='trainDestination-" + counter + "'>");
    $("#trainDestination-" + counter).text(trainDestination);
    $(tableRow).append("<td id='trainFrequency-" + counter + "'>");
    $("#trainFrequency-" + counter).text(trainFrequency);
    $(tableRow).append("<td id='nextArrival-" + counter + "'>");
    $("#nextArrival-" + counter).text(nextTrainNew);
    $(tableRow).append("<td id='minutesAway-" + counter + "'>");
    $("#minutesAway-" + counter).text(tMinutesTillTrain);

    // set firebase info
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFrequency: trainFrequency,
        trainFirstTime: trainFirstTime,
        currentTime: currentTimeNew
    });

    counter++;

    trainName = "";
    trainDestination = "";
    trainFirstTime = "";
    trainFrequency = "";



});
