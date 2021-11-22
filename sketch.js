var PLAY = 2;
var WIN = 1;
var END = 0;
var gameState = PLAY;

var runner, runner_img;
var ground, invisibleGround, groundImage;

var obstaclesGroup,obstacle1;

var distance;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  runner_img = loadImage("./Assets/Man.png")
  
  groundImage = loadImage("./Assets/ground.png");
  

  
  obstacle1 = loadImage("./Assets/Obstacle.png");

  
  
  //gameOverImg = loadImage("gameOver.png")
  

}

function setup() {
  createCanvas(600, 200);


  
  runner = createSprite(50,60,20,50);
  runner.addAnimation("running", runner_img);

  

  runner.scale = 0.2;
  
  ground = createSprite(200,180,1000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  

  
  invisibleGround = createSprite(200,110,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  

  
  runner.setCollider("rectangle",0,0,500,500);
  runner.debug = true
  
  distance = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  textSize(15)
  text("Distance: "+ distance, 480,30);
  
  
  if(gameState === PLAY){


    
    ground.velocityX = -(4 + 2* distance/100)
    //scoring
    distance = distance + Math.round(getFrameRate()/60);
    
 
    
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    
     if(keyDown("space")) {
         runner.velocityY = -13;
    }
    
    //add gravity
    runner.velocityY = runner.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(runner)){
        
        gameState = END;
  
        
      
    }
    if(distance == 1000){
      gameState = WIN
    }
  }
   else if (gameState === END) {

     
      ground.velocityX = 0;
      runner.velocityY = 0
      
     obstaclesGroup.setLifetimeEach(-1);
    
     obstaclesGroup.setVelocityXEach(0);
     

    textSize(20)
    fill("Black")
    text("Oh noo.. The Lion has caught you.",200,80)
   }
   else if(gameState === WIN){
    ground.velocityX = 0;
    runner.velocityY = 0
    
   obstaclesGroup.setLifetimeEach(-1);
  
   obstaclesGroup.setVelocityXEach(0);

   textSize(20)
   fill("Black")
   text("You succesfully escaped the lion. Good Job",150,80)
   }
  
 runner.collide(invisibleGround);
  



  drawSprites();
}

function reset(){
  gameState = PLAY
  obstaclesGroup.destroyEach();
  score = 0;
}


function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(8 + distance/100);
   
   obstacle.addImage("obstacle",obstacle1)
   obstacle.debug = false
   obstacle.setCollider("rectangle",0,0,250,250)
   obstacle.scale = 0.01
   
 
   
          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   

    obstaclesGroup.add(obstacle);
 }
}



