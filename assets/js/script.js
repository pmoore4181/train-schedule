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
    	
    $(tableRow).append("<td id='minutesAway-" + counter + "'>");

    // set firebase info
    database.ref().set({
      trainName: trainName,
      trainDestination: trainDestination,
      trainFrequency: trainFrequency,
      trainFirstTime: trainFirstTime
    });

    counter++;

});

// Create Firebase "watcher" Hint: .on("value")
// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  // console.log(snapshot.val().email);
  // console.log(snapshot.val().age);
  // console.log(snapshot.val().comment);


  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

