// using the setTimeout ------------------------------------
function clock2() {
  let prepend;
  let date = new Date();
  let hour = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();

  if (hour >= 12) {
    prepend = "PM";
    hour = hour - 12;
  } else {
    prepend = "AM";
    hour = hour;
  }

  if (hour === 0 && prepend === "AM") {
    if (mins === 0 && seconds === 0) {
      hour = 12;
      prepend = "midnight";
      console.clear();
      console.log(hour + ": " + mins + ": " + secs + " " + prepend);
      return;
    }
  }
  if (hour === 0 && prepend === "PM") {
    if (mins === 0 && seconds === 0) {
      hour = 12;
      prepend = "noon";
      console.clear();
      console.log(hour + ": " + mins + ": " + secs + " " + prepend);
      return;
    }
  }
  console.clear();
  console.log(hour + ": " + mins + ": " + secs + " " + prepend);
  setTimeout(clock2, 1000);
}
// clock2();

// using the setInterval ---------------------------------------------------

let prepend;

function clock() {
  let date = new Date();
  let hour = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();

  if (hour >= 12) {
    prepend = "PM";
    hour = hour - 12;
  } else {
    prepend = "AM";
  }

  if (hour === 0 && prepend === "AM") {
    if (mins === 0 && secs === 0) {
      hour = 12;
      prepend = "midnight";
      console.clear();
      console.log(hour + ": " + mins + ": " + secs + " " + prepend);
      return;
    }
  } else if (hour === 0 && prepend === "PM") {
    if (mins === 0 && secs === 0) {
      hour = 12;
      prepend = "noon";
      console.clear();
      console.log(hour + ": " + mins + ": " + secs + " " + prepend);
      return;
    }
  }

  console.clear();
  console.log(hour + ": " + mins + ": " + secs + " " + prepend);
}
// clock();
setInterval(clock, 1000);
