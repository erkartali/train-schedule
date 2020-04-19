var config = {
	  apiKey: "AIzaSyC24WSFEj7B3tyDr7Qx-TL9CATnDUOemLs",
    authDomain: "train-schedule-1d0e0.firebaseapp.com",
    databaseURL: "https://train-schedule-1d0e0.firebaseio.com",
    projectId: "train-schedule-1d0e0",
    storageBucket: "train-schedule-1d0e0.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

$('.submit-button').on('click', function(event) {
    event.preventDefault();
    
    var trainName = $('#train-name').val();
    var destination = $('#destination').val();
    var frequency = $('#frequency').val();
    var firstTime = $('#first-time').val();
    console.l

    database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
    });
  
    $('#train-name').val('');
    $('#destination').val('');
    $('#first-time').val('');
    $('#frequency').val('');

})
  
  database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var nameyMcnameface = snapshot.val().trainName;
    var destinationMcdestinationface = snapshot.val().destination;
    var firsttimeMcfirsttimeface = snapshot.val().firstTime;
    var frequencyMcfrequencyface = snapshot.val().frequency;

    var newRow = $('<tr>');
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firsttimeMcfirsttimeface, "HH:mm");
    var currentTime = moment();
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequencyMcfrequencyface;
    var tMinutesTillTrain = frequencyMcfrequencyface - tRemainder;
    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");
    
    newRow.append('<td>' + nameyMcnameface + '</td>')
    newRow.append('<td>' + destinationMcdestinationface + '</td>')
    newRow.append('<td>' + firsttimeMcfirsttimeface + '</td>')
    newRow.append('<td>' + nextTrain + '</td>')
    newRow.append('<td>' + tMinutesTillTrain + '</td>')

    $('#tbody').append(newRow);


  });
