class TimeCount {
  constructor() {
    this.time = null;
  }
  start() {
    this.cronometer();
  }

  cronometer() {
    this.clean();
    var seconds = 0;
    this.time = setInterval(function () {
      seconds++;
      var sec = seconds;
      hour = Math.floor(sec / 3600);
      min = Math.floor((sec % 3600) / 60);
      secs = (sec % 3600) % 60;
      document.getElementById("hms").innerHTML = `${hour} :${min} :${secs}`;

      if (min >= 10) {
        document.getElementById("hms").innerHTML = `0${hour}:${min}:${secs}`;
      } else if (min < 10) {
        document.getElementById("hms").innerHTML = `0${hour}:0${min}:${secs}`;
      }
      if (secs < 10 && min < 10) {
        document.getElementById("hms").innerHTML = `0${hour}:0${min}:0${secs}`;
      } else if (hour <= 10 && secs < 10) {
        document.getElementById("hms").innerHTML = `0${hour}:${min}:0${secs}`;
      }
    }, 1000);
  }
  clean() {
    clearInterval(this.time);
    document.getElementById("hms").innerHTML = "00:00:00";
  }
}
var time_count = new time_count();
