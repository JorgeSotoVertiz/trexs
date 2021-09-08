var PLAY=1;
var END=0;
var gamestate=PLAY;
var trex, trex_running, edges;
var groundImage;
var piso;
var nube;
var nube2;
var cactus,cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var cactusperoquesemueve;
var score=0;
var cloudsgroup;
var obstaclesgroup;
var PERDISTE;
var end;
var END;
var reset;
var RESET;  
var jump;
var checkpoint;
var die;
var fondo;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  PERDISTE =loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  nube2 =  loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png") ;
   cactus3 = loadImage("obstacle3.png");
   cactus4 = loadImage("obstacle4.png");
   cactus5 = loadImage("obstacle5.png");
   cactus6 = loadImage("obstacle6.png");
   end = loadImage("gameOver.png");
   reset = loadImage("restart.png");
   checkpoint = loadSound("checkPoint.mp3");
   jump = loadSound("jump.mp3");
   die = loadSound("die.mp3");
   fondo=loadImage("desierto.jpg");
}

function setup(){
  createCanvas(600,200);
  
  //crea el Trex
  END = createSprite(300,100,60,15);
  END.addImage(end);
  END.scale=.5;
  END.visible=false;
  RESET = createSprite(300,130,20,20);
  RESET.addImage(reset);
  RESET.scale=.5;
  RESET .visible=false;
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("CMATO",PERDISTE);
  edges = createEdgeSprites(); 
  //crea el piso
  piso=createSprite(300,180,600,10);
  piso.addImage(groundImage);
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  obstaclesgroup=new Group();
  cloudsgroup=new Group();
             trex.setCollider("rectangle",0,0,trex.widht,trex.height);
  //trex.debug=true;
  //aqui se hace el radio de colicion
  //console.log(mensaje);
}


    function draw(){
    //establece un color de fondo 
    background(fondo);
     
    text("puntos:3"+score,450,15);
    text("De Jorge Soto por byjus futureSchool",15,40);
  
   //estado de que el jugador
   if(gamestate==PLAY){
    
  score=score+Math.round(getFrameRate()/60);
  piso.velocityX=-(5+score/100);
  if(score>0 && score%100==0){
      
  checkpoint.play();    
       
       
       }
  if(keyDown("space")&& trex.y>=170){
    trex.velocityY = -10;
  jump.play();
  }    
  if(piso.x<0) {
    piso.x=piso.width/2;
  }  
  trex.velocityY = trex.velocityY + 0.5;  
  Nube(); 
  Cactus();   
  if(obstaclesgroup.isTouching(trex)){
  die.play();
  gamestate=END;
}   
    
    
  }
  //estado de que perdio el jugador
  else if(gamestate==END){
  piso.velocityX=0;
    trex.velocityY=0;
    trex.changeAnimation("CMATO",PERDISTE);
  obstaclesgroup.setVelocityXEach(0);     
  cloudsgroup.setVelocityXEach(0);
  obstaclesgroup.setLifetimeEach(-1);
  cloudsgroup.setLifetimeEach(-1);
    
  END.visible=true;
  RESET.visible=true;
  if(mousePressedOver(RESET)){
  reinicio(); 
  console.log(1)   
    
    }
          
          
     }
  //eso es la concatenacion que le dise al jugador que si pierde se compra un gansito

  
 
  //salta cuando se presiona la barra espaciadora
  
  
  
  
  
  //evita que el Trex caiga
  trex.collide(edges[3])
  drawSprites();
}
  function reinicio(){
  
  gamestate=PLAY;
  RESET.visible=false;
  END.visible=false;
  console.log(2)
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running)   
}
  function Nube(){
  
  if(frameCount%60==0){
  nube=createSprite(600,100,40,10);
    nube.addImage(nube2);
  nube.velocityX=-6;    
  nube.y=Math.round(random(20,100));
  nube.depth=trex.depth;  
  trex.depth=trex.depth+1;  
  nube.lifetime=100;
  cloudsgroup.add(nube); 
    
     }
  
}

 function Cactus(){
  
 if(frameCount%60==0)
{ 
    
 cactus=createSprite(400,170,10,40);
cactus.velocityX=-(5+score/100);
 var rand=Math.round(random(1,6)) ; 
 switch (rand){
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
  default:break;
     
 }   
 cactus.lifetime=120;   
 cactus.scale=.5;
 obstaclesgroup.add(cactus);
    
  }
  
  
  
}

  