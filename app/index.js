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
    console.log(JSON.stringify(exercise, null, 2));
    const speed = exercise.stats.speed.current;
    console.log(speed);
    speedLabel.text = (speed.value===undefined) ? "0 mph" : speed.value+" mph" ;
    // this.lblSpeedUnits.text = `speed ${speed.units}`;

  //   const speedAvg = utils.formatSpeed(exercise.stats.speed.average);
  //   this.lblSpeedAvg.text = speedAvg.value;
  //   this.lblSpeedAvgUnits.text = `speed avg ${speedAvg.units}`;

  //   const speedMax = utils.formatSpeed(exercise.stats.speed.max);
  //   this.lblSpeedMax.text = speedMax.value;
  //   this.lblSpeedMaxUnits.text = `speed max ${speedMax.units}`;

  //   const distance = utils.formatDistance(exercise.stats.distance);
  //   this.lblDistance.text = distance.value;
  //   this.lblDistanceUnits.text = `distance ${distance.units}`;

  //   this.lblActiveTime.text = utils.formatActiveTime(exercise.stats.activeTime);

  //   this.lblCalories.text = utils.formatCalories(exercise.stats.calories);
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