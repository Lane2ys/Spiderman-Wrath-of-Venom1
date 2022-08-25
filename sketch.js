



var Spiderman , Venom , SpidermanImg , VenomImg , Attack1 , Attack2 , Attack1img , Attack2img
var groundImg;
var ground;
var SMSwing , SMDeath , VenomAttack , VenomMoving , VenomDeath;
var Building , BuildingSP , Building2;
var attackextend1 ,extended1 , attackextend2 , extended2;
var GreenGoblinImg , GreenGoblin

var Villain;

var GameOverImg , GameOver
var SMWeb;

var Level1 = 1;
var Level2 = 2;
var END = 3;
var STOP = 4;

var gameState = Level1;

var score = 0;
var Level = 0;

function preload(){
SpidermanImg = loadAnimation("./Sprites/SpidermanStanding.png");
VenomImg = loadImage("./Sprites/VenomStanding.png");
Attack1img = loadAnimation("./Sprites/SM-attack1.png");
Attack2img = loadAnimation("./Sprites/SM-attack2.png");
attackextend1 = loadImage("./Sprites/SM-attackextend.png");
attackextend2 = loadImage("./Sprites/Attack2.png");
GreenGoblinImg = loadImage("./Sprites/greengoblin.png");
VenomDeath = loadAnimation("./Animations/VenomDeath1.png","./Animations/VenomDeath2.png");
VenomMoving = loadAnimation("./Animations/VenomMoving1.png","./Animations/VenomMoving2.png","./Animations/VenomMoving3.png","./Animations/VenomMoving4.png","./Animations/VenomMoving5.png");
VenomAttack = loadAnimation("./Animations/VenomAttack1.png","./Animations/VenomAttack2.png","./Animations/VenomAttack3.png","./Animations/VenomAttack4.png","./Animations/VenomAttack5.png","./Animations/VenomAttack6.png");
SMDeath = loadAnimation("./Animations/SMDeath1.png","./Animations/SMDeath2.png","./Animations/SMDeath3.png","./Animations/SMDeath4.png");
SMSwing = loadAnimation("./Animations/SMSwing1.png","./Animations/SMSwing2.png","./Animations/SMSwing3.png","./Animations/SMSwing4.png","./Animations/SMSwing5.png",);
groundImg = loadImage("ground2.png");
Building = loadImage("Building.jpg");
Building2 = loadImage("./Sprites/Building2.png");
GameOverImg = loadImage("./Animations/gameover.png");
SMWeb = loadSound("./Animations/SM-WEB.mp3");


VenomDeath.looping = false;
SMDeath.looping = false;
VenomAttack.looping = false;


 
}


function setup() {
  createCanvas(1000,900);

  Spiderman = createSprite(100,810,20,20);
  Spiderman.scale = 2.5;
  Spiderman.addAnimation('SM', SpidermanImg);
  Spiderman.addAnimation('Attack' , Attack2img);
  Spiderman.addAnimation('Attacks' , Attack1img);
  Spiderman.addAnimation('Swing' , SMSwing);
  Spiderman.addAnimation('Death' , SMDeath);
  Spiderman.changeAnimation('Swing');
  Spiderman.velocityX = 2;
  

  Venom = createSprite(900,825,20,20);
    Venom.scale = 2;
    Venom.addImage("Monster", VenomImg);
    Venom.addAnimation('Move', VenomMoving);
    Venom.addAnimation('Dead', VenomDeath);
    Venom.addAnimation('Attacks' , VenomAttack);
    Venom.changeAnimation('Move');
    Venom.velocityX = -5;

  extended1 = createSprite(100,825,10,10);
  extended1.addImage('Extend', attackextend1);
  extended1.scale = 2;
  extended1.visible = false;

  extended2 = createSprite(100,825,10,10);
  extended2.addImage('Extending' , attackextend2);
  extended2.scale = 0.2;
  extended2.visible = false;
  extended2.debug;
  
  GameOver = createSprite(500,200);
  GameOver.addImage("GG" , GameOverImg);
  GameOver.visible = false;
  


  ground = createSprite(100,870,100,200);
  ground.addImage("ground",groundImg);
 
  ground.x = ground.width /2;
  ground.velocityX = -3;
  
  
Villain = new Group();


 
  
  
  
}






function draw() 
{
  background(Building);
  
 if(gameState === Level1){
  textSize(50);
  text("Level:"+ Level , 300 , 50);
  Level = 1;
  ground.velocityX = -3;

  

  if(Venom.isTouching(Spiderman)){
    Venom.changeAnimation('Attacks');
    Spiderman.changeAnimation('Death');
    Spiderman.velocityX = 0;
    Spiderman.velocityY = 2;
    GameOver.visible = true;
    extended1.destroy();
    Venom.velocityX = 0;
    Spiderman.destroy();
    Venom.destroy();
    ground.destroy();
   
    
      
   
      

    
    
  }

  if(Venom.isTouching(extended1)){
    Venom.changeAnimation('Dead');
    Venom.visible = false;
    gameState = Level2;  
           
    
  }
  
 
  

 }
 
 if(ground.x < 0){
  ground.x = ground.width/2;

}

if(gameState === Level2){
  textSize(50);
  text("Score: "+ score, 500,50);


  text("Level:"+ Level , 300 , 50);
  Level = 2;
  
  Spiderman.changeAnimation('SM');
  Spiderman.velocityX = 0;
  Spiderman.x = 30;
  background(Building2);
  ground.velocityX = 0;

  
  if(Villain.isTouching(extended2)){
    GreenGoblin.destroy();
    score += 5;
  }

  if(Villain.isTouching(Spiderman)){
   gameState = END;
    
  }

  if(gameState === END){
    GameOver.visible = true;
    Spiderman.destroy();
    ground.destroy();
    GreenGoblin.destroy();
  }

  
  

  spawnVillain();

  
}


  
 
  
  drawSprites();

 
  
}

function keyPressed(){
if(keyCode == 32){
  Spiderman.changeAnimation('Attack');
  extended1.visible = true;
  extended1.velocityX = 20;
  

  
}

if(gameState === Level2){
  if(keyCode == 16){
    Spiderman.changeAnimation('Attacks');
    extended2.visible = true;
    extended2.velocityX = 20;
    SMWeb.play();
  }

}


}

function keyReleased(){
 //Spiderman.changeAnimation('Swing');
 extended1.visible = false;
 extended1.velocityX = 0;
 extended1.x = Spiderman.x;

 if(gameState === Level2){
  Spiderman.changeAnimation('SM')
  extended2.visible = false;
  extended2.velocityX = 0;
  extended2.x = 1;
  
}
}

function spawnVillain(){

  if(frameCount % 90 == 0){
    GreenGoblin = createSprite(900,800,10,40);
    GreenGoblin.addImage('Goblin' , GreenGoblinImg);
    

    Villain.add(GreenGoblin);

    GreenGoblin.x = Math.round(random(200,400));
    GreenGoblin.velocityX = -2;

  

    GreenGoblin.lifetime = 1000;
  }

  
}

