var visible = document.getElementById("show");

document.getElementById("visible").onclick = () => {
  if (visible.classList.contains("menu_game--visible")) {
    visible.classList.remove("menu_game--visible");
    document.getElementById("visible").style.display = "none";
  }
};
document.getElementById("hidden").onclick = () => {
  if (!visible.classList.contains("menu_game--visible")) {
    visible.classList.add("menu_game--visible");
    document.getElementById("visible").style.display = "block";
  }
};
const sum1 = (init, max) => {
  while (init != max) {
    init++;
  }
};
console.log(sum1(0, 15));
var cuadritos = [1, 2];
document.getElementById("image2").onclick = () => {
  var x = document.getElementById("image_container");
  var arr = x.getElementsByClassName("number");
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.background = `url("../oficial.png")`;
    showBackground();
  }
  document.getElementById(
    "image_complete"
  ).style.background = `url("../oficial.png")`;
  document.getElementById("image_complete").style.backgroundSize =
    "150px 150px";
};
