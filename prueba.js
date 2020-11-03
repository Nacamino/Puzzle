const addZero = (num) => {
  return num < 10 ? `0${num}` : num;
};
class TimeCount {
  constructor() {
    this.time = null;
    this.seconds = 0;
  }
  start() {
    this.cronometer();
  }

  cronometer() {
    this.clean();

    this.time = setInterval(() => {
      this.seconds++;
      var sec = this.seconds;
      var hour = Math.floor(sec / 3600);
      var min = Math.floor((sec % 3600) / 60);
      var secs = (sec % 3600) % 60;

      document.getElementById("hms").innerHTML = `${addZero(hour)}:${addZero(
        min
      )}:${addZero(secs)}`;
    }, 1000);
  }
  clean() {
    clearInterval(this.time);
    this.seconds = 0;
    document.getElementById("hms").innerHTML = "00:00:00";
  }
  restart() {
    clearInterval(this.time);
    this.time = setInterval(() => {
      this.seconds++;
      var sec = this.seconds;
      var hour = Math.floor(sec / 3600);
      var min = Math.floor((sec % 3600) / 60);
      var secs = (sec % 3600) % 60;

      document.getElementById("hms").innerHTML = `${addZero(hour)}:${addZero(
        min
      )}:${addZero(secs)}`;
    }, 1000);
  }
}
