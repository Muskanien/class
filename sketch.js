var bg,ground;
var fish1,fish_sprite;
var stars,star_img1,star_img2;
var score=0;
var stargrp;
var obsgrp;
var obs,obs_img1,obs_img2;
var gameState = 0;
var gameover,gameover_img;

function preload(){
bg = loadImage("Backgrounds.jpg");
fish1 = loadAnimation("fish1.png","fish2.png","fish3.png","fish4.png");
star_img1 = loadImage("golden star.png");
star_img2 = loadImage("blue star.png");
obs_img1 = loadImage("blue moon.png");
obs_img2 = loadImage("pink moon.png");
gameover_img = loadImage("game over.jpg")

}


function setup() {
  createCanvas(1000,1000);
  ground = createSprite(400, 200, 50, 50);
  ground.addImage(bg);
  ground.scale = 3;
  ground.velocityY = 5;
  fish_sprite = createSprite(450,850,60,70)
  fish_sprite.addAnimation("mainCharacter",fish1);
  fish_sprite.scale = 1.5;

  stargrp = new Group();
  obsgrp = new Group();

}

function draw() {

  background(0,0,0);  

  if(gameState===0){

  if(ground.y>700){
    ground.y = 500
  }

  if(keyDown(LEFT_ARROW)){
    fish_sprite.x = fish_sprite.x - 10

  }

  if(keyDown(RIGHT_ARROW)){
    fish_sprite.x = fish_sprite.x + 10

  }
  if(fish_sprite.isTouching(stargrp)){
    stars.destroy();
    console.log("reached")
    score = score+10
  }

  if(fish_sprite.isTouching(obsgrp)){
    fish_sprite.destroy();
    console.log("end")
    gameState=1;
    stargrp.destroyEach();
    obsgrp.destroyEach(); 
    stargrp.setVelocityYEach(0);
    obsgrp.setVelocityYEach(0);
  }
  
  spawnStars();
  obstacles();
  drawSprites();

  fill("white");
  text("Score:"+score,100,50);


}


  if(gameState===1){
    ground.velocityY=0;
    ground.visible=false;
    background(gameover_img)
}


}

function spawnStars (){
  if(frameCount%150===0){
  stars = createSprite(Math.round(random(50, 850),Math.round(random(0, 650))));
  stars.velocityY = 5;
  var rand=Math.round(random(1,2));
  if (rand===1){
    stars.addImage(star_img1);
  }else{
    stars.addImage(star_img2);
  } 
  stars.scale = 0.3
  stargrp.add(stars);
  

  }


}




function obstacles (){
  if(frameCount%160===0){
  obs = createSprite(Math.round(random(50, 850),Math.round(random(0, 650))));
  obs.velocityY = 5;
  var rand=Math.round(random(1,2));
  if (rand===1){
    obs.addImage(obs_img1);
  }else{
    obs.addImage(obs_img2);
  } 
  obs.scale = 1.3
  obsgrp.add(obs);

  }

}



