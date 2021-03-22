var gameState = "PLAY" 
var ghost, tower, door, climber, invsibleBlock
var ghostImg, towerImg, doorImg, climberImg
var doorGroup, climberGroup, invisbleBlockGroup
var spookySound 

function preload(){
 towerImg= loadImage("tower.png")
 ghostImg= loadImage("ghost-standing.png")
 doorImg= loadImage("door.png")
 climberImg= loadImage("climber.png")
 spookySound= loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600)
  
  spookySound.loop()
  
  tower= createSprite(300,300)
  tower.addImage("towerImage", towerImg)
  tower.velocityY= 4
  
  ghost= createSprite(200,200)
  ghost.addImage("ghostImage", ghostImg)  
  ghost.scale= 0.5;
  
  doorGroup=new Group()
  climberGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw(){
  background(31)
  if (gameState === "PLAY"){
  if (tower.y > 400){
    tower.y=300
  }
  
  if (keyDown ("left_arrow")){
    ghost.x-=3
  }
  
    if (keyDown ("right_arrow")){
    ghost.x+=3
  }
  
  if (keyDown ("space")){
    ghost.velocityY= -2
  }
  
  if (invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    ghost.destroy()
    gameState= "END"
  } 
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0  
  }
  
  ghost.velocityY+=1
  spawnDoor() 
  }
   if (gameState === "END"){
     fill("white")
     textSize(50)
     text("GaMe OvEr", 300,250)
   }
  drawSprites()
}
function spawnDoor(){
  if (frameCount% 220===0){
    var door= createSprite(200, 50)
        door.addImage(doorImg)
        door.x=Math.round(random(120,400))
        door.velocityY= 3
        door.lifeTime=800
        doorGroup.add(door)
    
    var climber= createSprite(200, 50)
        climber.addImage(climberImg)
        climber.x=door.x
        climber.velocityY= 3  
        climber.lifeTime=800
        climberGroup.add(climber)
    
    var invisibleBlock= createSprite(200, 55) 
        invisibleBlock.width= climber.width
        invisibleBlock.height= 2
        invisibleBlock.x=door.x
        invisibleBlock.velocityY= 3 
        invisibleBlock.lifeTime=800
        invisibleBlockGroup.add(climber)
        invisibleBlock.debug=true
    
  ghost.depth=door.depth
  ghost.depth+=1
   }
  }
  