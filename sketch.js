var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fruit;

var score = 0;
var swordImage

var fruitGroup;
var enemyGroup;

var monsterImage

function preload() {
  swordImage = loadImage("sword.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterImage = loadImage("alien1.png");

  gameOver = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(400, 400);


  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7

  fruitGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background("white");

  text("Score: " + score, 340, 20);

  if (gameState === PLAY) {
    sword.x = mouseX
    sword.y = mouseY
    //position = Math.round(random(1, 2));
    //if (position == 1) {
    //fruit.x = 400;
    //fruit.velocityX = -(7 + (score / 4));
    //} else {
    //if (position === 2) {
    //fruit.x = 0;
    //fruit.velocityX = (7 + (score / 4));
    //}
    //}
    fruits();
    Enemy();
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();

      knifeSwooshSound.play();
      score = score + 2
    }
    if (enemyGroup.isTouching(sword)) {
      gameOverSound.play();
      gameState = END;
    }
  }

  if (gameState === END) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityX = 0;
    enemyGroup.setVelocityX = 0;
    sword.y = 200;
    sword.x = 200;
    sword.addImage(gameOver);
  }
  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2
    r = Math.round(random(1, 4));
    if (r === 1) {
      fruit.addImage(fruit1);
    } else if (r === 2) {
      fruit.addImage(fruit2);
    } else if (r === 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -50;
    fruitGroup.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addImage(monsterImage);
    monster.velocityX = -105;
    monster.y = Math.round(random(50, 340));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}