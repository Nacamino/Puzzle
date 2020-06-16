const addZero = (num) => {
  return num < 10 ? `0${num}` : num;
};
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
    document.getElementById("hms").innerHTML = "00:00:00";
  }
}
