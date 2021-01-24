let document = require("document");
import { HeartRateSensor } from "heart-rate";
import exercise from "exercise";

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");
//let updatedLabel = document.getElementById("updated");
let gayTimeLabel = document.getElementById("gaytimetext1");
let gayTimeLabel2 = document.getElementById("gaytimetext2");
let speedLabel = document.getElementById("speed");
let enableFlag = false;
let lastValueTimestamp = undefined;
let firstLoad = true;

var frog = document.getElementById("frog");
// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
hrLabel.text = "--";
//updatedLabel.text = "...";

// This function takes a number of milliseconds and returns a string
// such as "5min ago".
function convertMsAgoToString(millisecondsAgo) {
  let h,m,s;
  h = Math.floor(millisecondsAgo/1000/60/60);
  m = Math.floor((millisecondsAgo/1000/60/60 - h)*60);
  s = Math.floor(((millisecondsAgo/1000/60/60 - h)*60 - m)*60);
  s < 10 ? s = `0${s}`: s = `${s}`
  m < 10 ? m = `0${m}`: m = `${m}`
  h < 10 ? h = `0${h}`: h = `${h}`

  return `${h}:${m}:${s}`;
}

// This function updates the label on the display that shows when data was last updated.
function updateDisplay() {
  
  if (exercise && exercise.stats) {
    //change icon
    document.getElementById("walk-icon").href="gay-walk.png";
    const speed = exercise.stats.speed.current;
    console.log("speed" + speed);
    //Update screen
    speedLabel.text = (speed===undefined) ? "0 m/s" : speed+" m/s" ;
    
    //Check if gay mode
    //Average speed for 20-29 year olds is 1.34 to 1.36 m/s
    //threshold at 0.5m/s though because kinda hard to walk inside
    if (speed >= 0.5) {
      if(firstLoad) { lastValueTimestamp = Date.now(); }
      firstLoad = false;
      console.log("pride")
      if (lastValueTimestamp === undefined) {
        lastValueTimestamp = Date.now();
      }
      gayTimeLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
      gayTimeLabel2.text = "";
      
      let pride = document.getElementById("pride");
      pride.style.display = "inline";
      let gaymode = document.getElementById("gaymode");
      gaymode.style.display = "inline";
      
      //Animate kinda bad tho LOL 
      if (enableFlag === false) {
        enableFlag = true;
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
        var gayModeLabelShadow = document.getElementById("gayModeLabelShadow");
        gayModeLabelShadow.animate("enable");
        var gayModeLabel = document.getElementById("gayModeLabel");
        gayModeLabel.animate("enable");
        var frog = document.getElementById("frog");
        frog.animate("enable");

      }
      else {
        enableFlag = false;
      }
      
    }
    else {
      if (lastValueTimestamp && !firstLoad) {
        gayTimeLabel.text = "Last gay walk:";
        gayTimeLabel2.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
        lastValueTimestamp = undefined
      }
      let pride = document.getElementById("pride");
      pride.style.display = "none";
      document.getElementById("walk-icon").href="walk-icon.png";
      var gaymode = document.getElementById("gaymode");
      gaymode.style.display = "none";
      hrLabel.style.display = "inline";
      speedLabel.style.display = "inline";
    }
   
  }
}

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = "♥ " + hrm.heartRate;
}

// Begin monitoring the sensor
hrm.start();

// And update the display every second
setInterval(updateDisplay, 1000);


//Begin an exercise automatically
exercise.start("walk", { gps: false });

document.onkeypress = function(e) {
  console.log("Key pressed: " + e.key);

  if (e.key==="up") {
      exercise.stop();
      me.exit();
  }
}