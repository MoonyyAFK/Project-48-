
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var bg;
var zombieAnimation, zombieAnimation2, zombie, zombie2;
var batAnimation, bat;
var maxDrops = 100;
var drops = []
var bomb, bombImg, bombGroup;
var zombieGroup;
var boomImg;

function preload()
{
	bg = loadImage("bg3.jpg");

	zombieAnimation = loadAnimation("zombie3.png", "zombie4.png", "zombie5.png", "zombie6.png");
	batAnimation = loadAnimation("bat/bat1.png", "bat/bat2.png", "bat/bat3.png", "bat/bat4.png", "bat/bat5.png", "bat/bat6.png", "bat/bat7.png", "bat/bat8.png", 
	"bat/bat9.png", "bat/bat10.png", "bat/bat11.png", "bat/bat12.png");

	zombieAnimation2 = loadAnimation("Z1.png", "Z2.png", "Z3.png", "Z4.png", "Z5.png", "Z6.png", "Z7.png", "Z8.png");
	
	bombImg = loadImage("bomb.png")
	boomImg = loadImage("boom.png")
}

function setup() {
	createCanvas(displayWidth, displayHeight);
	

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	for(var i = 0; i<maxDrops; i++){
		drops.push(new createDrop(random(0,displayWidth-20),random(0,50)))
	}
	bombGroup = new Group()
	zombieGroup = new Group()

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
 background(bg);
  console.log(frameCount);
  spawnZombie()
  spawnBat()
  
  if(keyDown("space")){
	  spawnBomb()
  }

  //bombGroup.addImage("b", bombImg);
  

  if(zombieGroup.isTouching(bombGroup)){
	zombieGroup[0].destroy()
	bombGroup[0].addImage(boomImg);
  }



  /* var b = createSprite(200,200,50,50);
	b.addImage(bomb)
	b.veloctiyY = 3
	b.scale = 0.1
	*/

  for(var i = 0; i<maxDrops; i++){
	drops[i].showDrop();
	drops[i].updateY();
	}
  drawSprites();
  for (var i = 0; i < zombieGroup.length; i++) {
    var temp=zombieGroup.get(i);
	textSize(50)
    text(i, temp.x, temp.y);
  }  
  
 
}

function spawnZombie(){
	if(frameCount % 100 === 0){
	zombie = createSprite(displayWidth+5,height-100)
	
	zombie.velocityX = -3
	zombie.lifetime = displayWidth/3
	rand = Math.round(random(1,2))
	switch(rand){
		case 1: zombie.addAnimation("z", zombieAnimation)
		break;
		case 2: zombie.addAnimation("z1", zombieAnimation2)
		break;
		default:break;
	}
	zombieGroup.add(zombie)
	}

}

function spawnBat(){
	if(frameCount % 150 === 0){
		bat = createSprite(random(0,displayWidth),random(0,displayHeight-200))
		bat.addAnimation("z", batAnimation)
		bat.velocityX = Math.round(random(3,-3))
		bat.velocityY = Math.round(random(2,-2))
		bat.scale = 0.3
		bat.lifetime = displayWidth/3
	}
}

function mousePressed(){
	//var sprite = createSprite(World.mouseX,World.mouseY,random(10,30),random(10,30));
	//sprite.velocityY = random(4,5)
	bomb = new Bomb(mouseX,10,20,20);
	bomb.display()
}

function spawnBomb(){
	bomb = createSprite(mouseX, random(0,displayHeight-100))
	bomb.addImage(bombImg)
	bomb.velocityY = 10
	bomb.scale = 0.1
	bomb.lifetime = displayHeight/4
	bombGroup.add(bomb)
	
}



