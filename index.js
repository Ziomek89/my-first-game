const canvas = document.querySelector("#example");
console.log(canvas);

const ctx = canvas.getContext("2d");

let start = false;

window.onload = () => {
  document.getElementById('start').onclick = () => {
    startGame();
  };





//----------------------------------------------CONSTANTS FOR ATTACK DAMAGE
const damage1 = Math.floor(Math.random() * 500) + 50;
const damage2 = Math.floor(Math.random() * 600) + 100;
const damage3 = Math.floor(Math.random() * 800) + 150;
const damage4 = Math.floor(Math.random() * 1000) + 200;

const damage11 = Math.floor(Math.random() * 500) + 50;
const damage22 = Math.floor(Math.random() * 600) + 100;
const damage33 = Math.floor(Math.random() * 800) + 150;
const damage44 = Math.floor(Math.random() * 1000) + 200;

//boolean to keep track of whos turn it is -- true means its players turn
let playerTurn = true;

let checkIfDead = (e) => {
  if (e.health < 0) {
    return true;
  }
};

//----------------------------------------------CLASS DECLARATIONS
class Fighter {
  constructor(health, attack1, attack2, attack3, attack4) {
    this.health = health;
    console.log(this.health);

    this.attack1 = attack1;
    console.log(this.attack1);

    this.attack2 = attack2;
    console.log(this.attack2);

    this.attack3 = attack3;
    console.log(this.attack3);

    this.attack4 = attack4;
    console.log(this.attack4);
  }
}

class Player extends Fighter {
  constructor(name, health, attack1, attack2, attack3, attack4) {
    super(health, attack1, attack2, attack3, attack4);
    this.name = name;
    //stores attack picked, gets it from arrowkey event listener
    this.pickedAttack = {};
    console.log(this.name);
  }

  attack() {
    //if statement to check if it is the players turn
    if (playerTurn) {
      //damage the enemy
      enemy.health -= this.pickedAttack.damage;
      alert(
        `${this.name} attacks ${enemy.name} with ${this.pickedAttack.name} dealing ${this.pickedAttack.damage} damage!`
      );
    }
    //check if dead
    if (checkIfDead(enemy)) {
      alert("YOU WON!!");
    }
    drawAll()
    //end players turn
    playerTurn = false;
  }
}

class Enemy extends Fighter {
  constructor(name, health, attack1, attack2, attack3, attack4) {
    super(health, attack1, attack2, attack3, attack4);
    this.name = name;
    console.log(this.name);
  }
  

  //picks a random attack for the enemy and returns it, called in attack method
  pickRandomAttack() {
    let randomNum = Math.floor(Math.random() * 4) + 1;
    console.log(randomNum);
    if (randomNum == 1) {
      return this.attack1;
    } else if (randomNum == 2) {
      return this.attack2;
    } else if (randomNum == 3) {
      return this.attack3;
    } else {
      return this.attack4;
    }
  }

  attack() {
    //calls pickrandomattack to pick a random attack
    let attack = this.pickRandomAttack();
    alert(
      `${this.name} attacks ${player.name} with ${attack.name} dealing ${attack.damage} damage!`
    );
    //damages the player
    player.health -= attack.damage;
    //check if dead
    if (checkIfDead(player)) {
      alert("YOU LOST!!");
    }
    drawAll()
    //ends enemy turn
    playerTurn = true;
  }
  
}
//----------------------------------------------INITIATE PLAYER AND ENEMY
let player = new Player(
  "Goku",
  5000,
  {
    damage: damage1,
    name: "ki blast",
  },
  {
    damage: damage2,
    name: "destructo disc",
  },
  {
    damage: damage3,
    name: "kamehameha",
  },
  {
    damage: damage4,
    name: "spirit bomb",
  }
  
);

let enemy = new Enemy(
  "Freiza",
  5000,
  {
    damage: damage11,
    name: "eye laser",
  },
  {
    damage: damage22,
    name: "death comet",
  },
  {
    damage: damage33,
    name: "supernova",
  },
  {
    damage: damage44,
    name: "destroy the planet",
  }
);

//----------------------------------------------Constants for images

const background = new Image()
const playerImage = new Image();
const enemyImage = new Image();

background.src="./images/PlayStation 2 - Dragon Ball Z Budokai Tenkaichi 3 - Wasteland Versus Menu.png";
playerImage.src="./images/Custom Edited - Dragon Ball Customs - Goku SSJB Legendary Super Warriors-Style.png";
enemyImage.src="./images/My project-1.png";

//-----------------------------------------------Health bars

 function drawEnemyHealth() {
  let enemy_health = 5000;
  let cw = (enemy.health / enemy_health) * 300;
  ctx.fillStyle = 'red';
  ctx.fillRect(650, 50, cw, 25)
};

function drawPlayerHealth() {
  let player_health = 5000;
  let cw1 = (player.health / player_health) * 300;
  ctx.fillStyle = 'red';
  ctx.fillRect(100, 300, cw1, 25)
};



function drawAll(){
//clear your canvas
ctx.clearRect(0, 0, 1024, 576)
//redraw each image
ctx.drawImage(background, 0, 0, 1024, 576)
ctx.drawImage(playerImage, 100, 350, 200, 200)
ctx.drawImage(enemyImage, 750, 100, 200, 200)

//draw enemy health bar
drawEnemyHealth()
//draw player health bar
drawPlayerHealth()
};


let count = 3;

function finishedLoading(){
  if(count == 0 && start){
    console.log('finished loading - count is ', count)
    drawAll()
  }
}


background.onload = (event) => {
  count--
  console.log(count)
  finishedLoading()
};

playerImage.onload = (event) => {
  count--
  console.log(count)
  finishedLoading()

};

enemyImage.onload = (event) => {
  count--
  console.log(count)
  finishedLoading()
};

//----------------------------------------------EVENT LISTENER FOR PLAYER ATTACKS
window.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.code === "ArrowRight") {
    //sets the picked attack in player to attack1
    player.pickedAttack = player.attack1;
    //executes the attack method
    player.attack();
    alert(enemy.health);
    enemy.attack();
    alert(player.health);
  }
  if (event.code === "ArrowLeft") {
    player.pickedAttack = player.attack2;
    player.attack();
    alert(enemy.health);
    enemy.attack();
    alert(player.health);
  }
  if (event.code === "ArrowDown") {
    player.pickedAttack = player.attack3;
    player.attack();
    alert(enemy.health);
    enemy.attack();
    alert(player.health);
  }
  if (event.code === "ArrowUp") {
    player.pickedAttack = player.attack4;
    player.attack();
    alert(enemy.health);
    enemy.attack();
    alert(player.health);
  }
});

function startGame() {
  let button = document.getElementById('start');
  button.style.display = 'none';
  start = true;
  finishedLoading();


  window.addEventListener("keydown", (e) => {
   if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }
    },
    false
  );

}


};