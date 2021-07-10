var satellite, satelliteImg;
var space, spaceImg;
var comet, cometImg, cometG;
var rocket1, rocket1Img, rocket1G;
var rocket2, rocket2Img, rocket2G;
var topFuel, bottomFuel, rightFuel, fuelImg;

var explosion;

var topEdge, bottomEdge, leftEdge, rightEdge;

var health = 1000;
var score;

var gameState = "play";

var gameOver, gameOverImg;


function preload(){
  satelliteImg = loadImage("satellite.gif");
  spaceImg = loadImage("space.jpg");
  cometImg = loadImage("comet.gif");
  rocket1Img = loadImage("rocket.png");
  rocket2Img = loadImage("rocket2.png");
  fuelImg = loadImage("fuel.png");

  explosion = loadSound("explosion.mp3");

  gameOverImg = loadImage("gameOver.jpg");
}

function setup() {
  createCanvas(2000, 1010);
  
  space = createSprite(width/2,height/2);
  space.addImage("space", spaceImg);
  space.scale = 0.6;
  space.velocityX = -0.3;

  satellite = createSprite(200,height/2);
  satellite.addImage("satellite", satelliteImg);
  satellite.scale = 0.3;

  topEdge = createSprite(width/2, 0, 4000, 1);
  topEdge.visible = false;

  bottomEdge = createSprite(width/2, 1010, 4000, 1);
  bottomEdge.visible = false;

  leftEdge = createSprite(0, height/2, 1, 2020);
  leftEdge.visible = false;

  rightEdge = createSprite(2000, height/2, 1, 2020);
  rightEdge.visible = false;

  satellite.collide(topEdge, leftEdge, rightEdge, bottomEdge);

  cometG = new Group();
  rocket1G = new Group();
  rocket2G = new Group();

  score = 0;
}

function draw() {
  background(0);

  if(gameState == "play"){
    score = score + Math.round(getFrameRate()/60);
  
    if(space.x < 850){
    space.x = space.width/4;
    }
 
    health = health + Math.round(getFrameRate()/-60);

    satellite.x = mouseX;
    satellite.y = mouseY;
    satellite.setCollider("rectangle",0,0, 500, 600);
    satellite.debug = false;
    
    if(satellite.isTouching(cometG)){
      gameState == "end";
      satellite.destroy();
  
      cometG.destroyEach();
      cometG.setVelocityXEach(0);
      cometG.setVelocityYEach(0);

      rocket1G.destroyEach();
      rocket1G.setVelocityXEach(0);
      rocket1G.setVelocityYEach(0);
    
      rocket2G.destroyEach();
      rocket2G.setVelocityXEach(0);
      rocket2G.setVelocityYEach(0);

      explosion.play();
    }

    if(satellite.isTouching(rocket1G)){
      gameState == "end";
      satellite.destroy();
  
      cometG.destroyEach();
      cometG.setVelocityXEach(0);
      cometG.setVelocityYEach(0);

      rocket1G.destroyEach();
      rocket1G.setVelocityXEach(0);
      rocket1G.setVelocityYEach(0);
    
      rocket2G.destroyEach();
      rocket2G.setVelocityXEach(0);
      rocket2G.setVelocityYEach(0);

      explosion.play();
      health = health * 0;
    }

    if(satellite.isTouching(rocket2G)){
      gameState == "end";
      satellite.destroy();

      cometG.destroyEach();
      cometG.setVelocityXEach(0);
      cometG.setVelocityYEach(0);

      rocket1G.destroyEach();
      rocket1G.setVelocityXEach(0);
      rocket1G.setVelocityYEach(0);
    
      rocket2G.destroyEach();
      rocket2G.setVelocityXEach(0);
      rocket2G.setVelocityYEach(0);

      explosion.play();
      health = health * 0;
    }

    spawnComets();
    spawnRockets1();
    spawnRockets2();
    spawnFuel();
 }

  drawSprites();
  textSize(75);
  fill("white");
  text("Score: " + score,width/2.2, 100);
  textSize(40);
  text("Fuel remaining: " + health,width/7, 100)
 
}

function spawnComets() {
  if(frameCount % 144 == 0 && score >= 500){
     comet = createSprite(2400, Math.round(random(50, 900)));
     comet.addImage("comet", cometImg);
     comet.velocityX = Math.round(random(-12, -8));
     comet.lifetime = 1000;

     cometG.add(comet);
  }
}

function spawnRockets1() {
  if(frameCount % 270 == 0 && score >= 100){
     rocket1 = createSprite(Math.round(random(100, 1500)), 1200);
     rocket1.addImage("rocket", rocket1Img);
     rocket1.scale = random(0.3, 0.5);
     rocket1.velocityX = Math.round(random(3, 6));
     rocket1.velocityY = Math.round(random(-6, -3));
     rocket1.lifetime = 1000;

     rocket1G.add(rocket1);
  }
}

function spawnRockets2() {
  if(frameCount % 120 == 0 && score >= 250){
     rocket2 = createSprite(Math.round(random(100, 1500)), 1300);
     rocket2.addImage("rocket2", rocket2Img);
     rocket2.scale = random(0.2, 0.4);
     rocket2.velocityY = Math.round(random(-12, -9));
     rocket2.lifetime = 900;

     rocket2G.add(rocket2);
  }
}

function spawnFuel() {
  if(frameCount % 240 == 0 && health <= 200) {
    if(satellite.isTouching(topFuel)){
      health = health + 300;
    }

    if(satellite.isTouching(rightFuel)){
      health = health + 300;
    }

    if(satellite.isTouching(bottomFuel)){
      health = health + 300;
    }
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: topFuel = createSprite(Math.round(random(100, 1500)), -100);
              topFuel.addImage(fuelImg);
              topFuel.velocityY = 7;
              topFuel.velocityX = Math.round(random(-5, -8)) || Math.round(random(5, 8));
              topFuel.scale = 0.05;
              topFuel.lifetime = 600;
              topFuel.collide(rightEdge);
              topFuel.collide(bottomEdge);
              topFuel.collide(leftEdge);
              break;
      case 2: bottomFuel = createSprite(Math.round(random(100, 1500)), 1100);
              bottomFuel.addImage(fuelImg);
              bottomFuel.velocityY = -7;
              bottomFuel.velocityX = Math.round(random(-5, -8)) || Math.round(random(5, 8));
              bottomFuel.scale = 0.05;
              bottomFuel.lifetime = 600;
              bottomFuel.collide(topEdge);
              bottomFuel.collide(rightEdge);
              bottomFuel.collide(leftEdge);
              break;
      case 3: rightFuel = createSprite(2100, Math.round(random(100, 900)));
              rightFuel.addImage(fuelImg);
              rightFuel.velocityY = -1;
              rightFuel.velocityX = Math.round(random(-5, -8));
              rightFuel.scale = 0.05;
              rightFuel.lifetime = 600;
              rightFuel.collide(topEdge);
              rightFuel.collide(bottomEdge);
              rightFuel.collide(leftEdge);
              break;
      default: break;
    }
  }
}