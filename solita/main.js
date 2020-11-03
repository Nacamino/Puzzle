const showBackground = () => {
  var els = document.querySelectorAll(".number");
  els.forEach((el, i) => {
    if (el.id == "hueco") {
      return null;
    }
    var row;
    var col;
    var pos_block = el.id;
    row = Math.ceil(pos_block / 4);
    col = pos_block - (row - 1) * 4;
    var left = `-${(col - 1) * 100}px`;
    var top = `-${(row - 1) * 100}px`;
    console.log(left, top);
    el.style.backgroundPosition = `left ${left} top ${top}`;
  });
};

showBackground();

class Tablero {
  constructor() {
    this.order = [];
    //
    this.win = false;
    this.blank_space = 15;
    this.allowedMovements = null;
    this.gamestarted = false;
    this.cronometro = new TimeCount();
    this.init(true);
    this.stop();
    this.reanudar_game(true);

    this.startListeners();
    this.sounEnabled = true;

    this.sound = {
      deslizar: new Audio(`/sounds/mv.wav`),
    };
  }
  //tablero funcionando
  shuffle() {
    this.blank_space = 15;
    var orden_actual = [];
    for (let i = 1; i < 16; i++) {
      orden_actual.push(i);
    }

    var orden_nuevo = [];
    while (orden_actual.length) {
      let random_el = orden_actual.splice(
        Math.floor(Math.random() * orden_actual.length),
        1
      );
      orden_nuevo.push(random_el[0]);
    }
    orden_nuevo.push("hueco");
    this.order = orden_nuevo;
    console.log(this.order);
  }
  checkMovements() {
    var row;
    var col;
    var pos_hueco = this.blank_space + 1;
    row = Math.ceil(pos_hueco / 4);
    col = pos_hueco - (row - 1) * 4;

    var allowedMovements = {
      left: col + 1 <= 4,
      right: col - 1 > 0,
      down: row - 1 > 0,
      up: row + 1 <= 4,
    };

    var movementIndexes = {};

    if (allowedMovements.right) {
      movementIndexes.right = this.blank_space - 1;
    }
    if (allowedMovements.left) {
      movementIndexes.left = this.blank_space + 1;
    }
    if (allowedMovements.up) {
      movementIndexes.up = this.blank_space + 4;
    }
    if (allowedMovements.down) {
      movementIndexes.down = this.blank_space - 4;
    }

    this.allowedMovements = movementIndexes;
    console.log(this.allowedMovements);
  }

  reorderBlocks() {
    this.order.forEach((block, i) => {
      var el = document.getElementById(block);
      var row;
      var col;
      var pos_block = i + 1;
      row = Math.ceil(pos_block / 4);
      col = pos_block - (row - 1) * 4;

      var left = `${(col - 1) * 25}%`;
      var top = `${(row - 1) * 25}%`;
      el.style.left = left;
      el.style.top = top;
    });
  }

  //inicio del juego
  init(orden = false) {
    this.win = false;

    if (!orden) {
      this.gamestarted = true;
      this.shuffle();
      this.cronometro.start();
    } else {
      this.order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "hueco"];
    }

    this.reorderBlocks();
    this.checkMovements();
  }
  //movimientos
  changePosition(x, y) {
    if (!this.gamestarted) {
      return null;
    }
    if (this.win) {
      return null;
    }

    var temp = this.order[x];
    if (temp == "hueco") {
      this.blank_space = y;
    } else if (this.order[y] == "hueco") {
      this.blank_space = x;
    }
    this.order[x] = this.order[y];
    this.order[y] = temp;

    this.reorderBlocks();
    this.movement_sound();
    this.checkMovements();
    this.checkWin();
    console.log(this.order);
  }
  //controles
  startListeners() {
    document.addEventListener("keydown", (event) => {
      var allowedKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

      if (allowedKeys.indexOf(event.key) != -1) {
        var key = event.key;
        var movement = key.split("Arrow")[1].toLowerCase();

        if (this.allowedMovements[movement] != undefined) {
          this.changePosition(
            this.blank_space,
            this.allowedMovements[movement]
          );
          //si init no se ha iniciado el sonido tampoco.
          if (this.init(!orden)) {
            this.startListeners();
          }
        }
      }
    });

    // Setear listeners en botones de flechas
  }
  //fin del juego ganas o pierdes
  checkWin() {
    var ordenDeseado = [];
    for (let i = 1; i < 16; i++) {
      ordenDeseado.push(i);
    }
    ordenDeseado.push("hueco");

    for (let i = 0; i < this.order.length; i++) {
      if (ordenDeseado[i] != this.order[i]) {
        return;
      }
    }
    var tiempoQueToma = this.cronometro.seconds;
    console.log(tiempoQueToma);
    this.cronometro.clean();
    this.win = true;
    alert("ganaste");
  }
  //sonidos
  movement_sound() {
    this.sounEnabled = document.getElementById("checkbox").checked;
    if (this.sounEnabled) {
      return;
    }
    this.sound.deslizar.currentTime = 0;
    this.sound.deslizar.play();
  }
  //tiempo del juego

  stop() {
    clearInterval(this.cronometro.time);
    this.gamestarted = false;
  }
  reanudar_game(rea = false) {
    if (!rea) {
      this.gamestarted = true;

      this.cronometro.restart();
    }
  }
}

var tablero = new Tablero();

document.getElementById("test").onclick = () => {
  document.getElementById("test").innerHTML = "reiniciar";
  tablero.init();
};
document.getElementById("stop").onclick = () => {
  tablero.stop();
  if (document.getElementById("pause").classList.contains("paused--hidden")) {
    document.getElementById("pause").classList.remove("paused--hidden");
    document.getElementById("test").disabled = true;
  }
  if (!document.getElementById("pause").classList.contains("paused--hidden")) {
    visible.classList.add("menu_game--visible");
    document.getElementById("visible").style.display = "block";
  }

  document.getElementById("pause").onclick = () => {
    tablero.reanudar_game();
    if (
      !document.getElementById("pause").classList.contains("paused--hidden")
    ) {
      document.getElementById("pause").classList.add("paused--hidden");
      document.getElementById("test").disabled = false;
    }
  };
};
