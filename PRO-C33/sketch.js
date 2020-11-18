var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];
var ground;
var turn = 0 ;

var divisionHeight=300;
var score =0;
var maxScore = [500,500,500,500,100,100,100,200,200,200];
var gameState = "play"
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20)
  textAlign(LEFT)
 text("Score : "+score,50,30);
  Engine.update(engine);
 
  if(particle){
    particle.display();
    var pos = particle.body.position;
    if(pos.y>760){
      if(pos.x>0 && pos.x<=300){
        score = score + 500;
      }
      if(pos.x>300 && pos.x<=600){
        score = score + 100;
      }
      if(pos.x>600 && pos.x<900){
        score = score+ 200;
      }
  if(turn ===5){gameState = "end"}

      //reset particle to prevent score recalculation
      particle = null;
    }


  }
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
     
   }
  
 
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
     text(maxScore[k],30+k*80,550)
   }
   ground.display();
  //  text(mouseX+","+mouseY,mouseX,mouseY)
   
   if(gameState === "end"){
    textSize(40)
    textAlign(CENTER)
    text("GAME OVER ",400,225);
   }

}

function mousePressed(){
  if(gameState!=="end"){
  turn++;
  particle=new Particle(mouseX, 10,10);
  }
}