let document = require("document");
import { HeartRateSensor } from "heart-rate";
import exercise from "exercise";

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");
let updatedLabel = document.getElementById("updated");
let speedLabel = document.getElementById("speed");

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
hrLabel.text = "--";
updatedLabel.text = "...";

// This function takes a number of milliseconds and returns a string
// such as "5min ago".
function convertMsAgoToString(millisecondsAgo) {
  if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000) + "s ago";
  }
  else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000)) + "min ago";
  }
  else {
    return Math.round(millisecondsAgo / (60*60*1000)) + "h ago"
  }
}

// This function updates the label on the display that shows when data was last updated.
function updateDisplay() {
  if (lastValueTimestamp !== undefined) {
    updatedLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
  }
  
  if (exercise && exercise.stats) {
    //console.log(JSON.stringify(exercise, null, 2));
    const speed = exercise.stats.speed.current;
    const pace = exercise.stats.pace;
    console.log("speed" + speed);
    console.log("pace" + speed);
    //Update screen
    speedLabel.text = (speed===undefined) ? "0 m/s" : speed+" m/s" ;
    
    //Check if gay mode
    //Average speed for 20-29 year olds is 1.34 to 1.36 m/s
    //threshold at 0.5m/s though because kinda hard to walk inside
    if (speed >= 0.5) {
      console.log("pride")
      let pride = document.getElementById("pride");
      pride.style.display = "inline";
      
      //Animate kinda bad tho LOL 
      var pridered = document.getElementById("pridered");
      pridered.animate("enable"); 
      var prideorange = document.getElementById("prideorange");
      prideorange.animate("enable"); 
      var prideyellow = document.getElementById("prideyellow");
      prideyellow.animate("enable"); 
      var pridegreen = document.getElementById("pridegreen");
      pridegreen.animate("enable"); 
      var prideblue = document.getElementById("prideblue");
      prideblue.animate("enable"); 
      var pridepurple = document.getElementById("pridepurple");
      pridepurple.animate("enable"); 
    }
    else {
      let pride = document.getElementById("pride");
      pride.style.display = "none";
    }
    
    
    
  }
}

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
  lastValueTimestamp = Date.now();
}

// Begin monitoring the sensor
hrm.start();

// And update the display every second
setInterval(updateDisplay, 1000);


//Begin an exercise automatically
exercise.start("walk", { gps: false });
if (exercise.state === "started") {
   //exercise.stop();
}