class Tablero {
  constructor() {
    this.order = [];
    //
    this.win = false;
    this.blank_space = 15;
    this.allowedMovements = null;
    //
    this.cronometro = new TimeCount();

    this.init(true);

    this.startListeners();
  }

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
        }
      }
    });
  }

  init(orden = false) {
    this.win = false;
    if (!orden) {
      this.shuffle();
      this.cronometro.start();
    }

    this.reorderBlocks();
    this.checkMovements();
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
    for (let arrow in allowedMovements) {
      if (allowedMovements[arrow]) {
        document.getElementById(arrow).style.display = "block";
      } else {
        document.getElementById(arrow).style.display = "none";
      }
    }
  }

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

  reorderBlocks() {
    this.order.forEach((block, i) => {
      var el = document.getElementById(block);
      el.style.order = `${i + 1}`;
    });
  }

  changePosition(x, y) {
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
    this.checkMovements();
    this.checkWin();
    console.log(this.order);
  }

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
    this.cronometro.clean();
    this.win = true;
    alert("ganaste");
  }
}

var tablero = new Tablero();

document.getElementById("test").onclick = () => {
  document.getElementById("test").innerHTML = "reiniciar";
  tablero.init();
  time_count.start();
};
