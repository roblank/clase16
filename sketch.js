var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudimg;
var cactusm,cactusmimg;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,cactus;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cactusGrupo,nubesGrupo;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimg = loadImage ("cloud.png");

  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generar numeros aleatorios
 // var rand =  Math.round(random(1,100))
  //console.log(rand)
cactusGrupo=new Group();
nubesGrupo=new Group();
}

function draw() {
  //establecer color de fondo
  background(180);
  
  //console.log(trex.y)
  
  text ("score"+score,400,50);
  if (gameState === PLAY){
    ground.velocityX=-4
    score = score + Math.round(frameCount/60);
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
  
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds()
    spawnObstacles();
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  if(cactusGrupo.isTouching(trex)){
    gameState=END;
  }  
}  
  
  else if(gameState===END){
 ground.velocityX=0;
 cactusGrupo.setVelocityXEach(0);
 nubesGrupo.setVelocityXEach(0);
  }
  //hacer que el Trex salte al presionar la barra espaciadora
 
  
 
  
 
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  
  //aparecer nubes
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí tu código
 if (frameCount % 60 == 0){
  cloud=createSprite(600,100,40,10);
  cloud.addImage(cloudimg);
  cloud.y = Math.round(random(10,60));
  cloud.velocityX=-3;
 cloud.depth = trex.depth;
 trex.depth = trex.depth+1;
cloud.lifetime = 200;
nubesGrupo.add(cloud);
}
 } 
 
 function spawnObstacles(){
  if (frameCount % 80 === 0){
  var cactus = createSprite(400,165,10,40);
cactus.velocityX = -3;
cactus.scale =0.6;
cactus.lifetime = 200;
var rand = Math.round(random(1,6));
switch(rand){
  case 1: cactus.addImage(cactus1);
  break;
case 2: cactus.addImage(cactus2);
break;
case 3: cactus.addImage(cactus3);
break;
case 4: cactus.addImage(cactus4);
break;
case 5: cactus.addImage(cactus5);
break;
case 6: cactus.addImage(cactus6);
break;
default: break;
}
cactusGrupo.add(cactus);
}

}




