const calcMaxHp = (level) => Math.round(75 * (1 + Math.random()) * level);
const calcMaxPp = (level) => Math.round(30 * (1 + Math.random()) * level);

class Attack {
  constructor(name, type, damage, pp, accuracy) {
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.pp = pp;
    this.accuracy = accuracy;
  }
  hit() {
    return Math.random() < this.accuracy;
  }
}

const attackTable = {
  Fire: {
    Plant: 1.5,
    Fire: 0.2,
  },
  Plant: {
    Fire: 0.2,
    Plant: 0.2,
    Water: 1.5,
  },
};

const calcDamage = (attack, attacker, receiver) => {
  var attackDmg = attack.damage;
  var dmgMultiplier = attackTable[attacker.type][receiver.type];

  var dmg = attackDmg * dmgMultiplier;
  dmg = dmg - (attacker.level - receiver.level) * 0.25;

  return Math.round(dmg);
};

class Pokemon {
  constructor(name, level, type, attack_list) {
    this.name = name;
    this.level = level;
    this.type = type;
    this.hp = calcMaxHp(this.level);
    this.pp = calcMaxPp(this.level);
    this.attack_list = attack_list;
    this.alive = true;
  }

  attack(attack_index, target) {
    // Determino si me dan los pp para atacar
    if (!target.alive) {
      console.log("Dejalo, ya esta muerto");
      return;
    }

    var current_attack = this.attack_list[attack_index];
    if (current_attack.pp > this.pp) {
      console.log(`No tienes suficiente PP para usar ${current_attack.name}`);
      return;
    }
    // Restar los pp a mi mismo
    this.pp = this.pp - current_attack.pp;
    // Reviso si el ataque dio o fallo
    if (current_attack.hit()) {
      // Enviar ataque
      target.receiveAttack(current_attack, this);
    } else {
      console.log(`${this.name} ha fallado ${current_attack.name}`);
    }
  }
  receiveAttack(attack, enemy) {
    // Restar hp
    var dmg = calcDamage(attack, enemy, this);
    console.log(`${attack.name} inflige ${dmg} de daño a ${this.name}`);
    // Revisar si sigo vivo
    if (dmg >= this.hp) {
      this.alive = false;
      this.hp = 0;
      console.log(`${this.name} Se murio, gana ${enemy.name}`);
    } else {
      this.hp = this.hp - dmg;
      console.log(`HP de ${this.name} se redujo a ${this.hp}`);
    }
  }
}

var charizard_attacks = [
  new Attack("Llamarada", "Fire", 100, 15, 0.95),
  new Attack("Bola de fuego", "Fire", 60, 5, 0.7),
  new Attack("Volar", "Dragon", 75, 10, 0.8),
];

var bulbasaur_attacks = [
  new Attack("Drain", "Plant", 95, 15, 1),
  new Attack("Latigo", "Plant", 60, 5, 0.8),
  new Attack("Random attack", "Normal", 50, 2, 0.9),
];

var charizard = new Pokemon("Charizard", 15, "Fire", charizard_attacks);
var bulbasaur = new Pokemon("Bulbasaur", 11, "Plant", bulbasaur_attacks);

var seconds = 7350;

var sec = seconds;
hour = Math.floor(sec / 3600);
min = Math.floor((sec % 3600) / 60);
secs = (sec % 3600) % 60;
console.log(hour, min, secs);
//// los segundos es lo que sobra de las horas y eso de lo que sobra dividido en 60
