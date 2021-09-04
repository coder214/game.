const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var bg;
var bgm;

var wizard, wizardImg, sad, happy;
var cauldron, cauldronImg, caul_fill;

var cutter, cutter2, cutter3, cutter4, cutter5, cutter6, cut_s;

var rope, rope2, rope3, rope4, rope5, rope6;
var link, link2, link3, link4, link5, link6;

var A_eggs, horn, weeds, mushroom;
var A_eggsImg, hornImg, weedsImg, mushroomImg;

var balloonLeft, balloonRight;

function preload() {
  bg = loadImage('./assets/bg.png');
  A_eggsImg = loadImage('./assets/AshwinderEggs.png');
  hornImg = loadImage('./assets/horn.png');
  weedsImg = loadImage('./assets/weeds.png');
  mushroomImg = loadImage('./assets/mushroom.png');

  bgm = loadSound('bgm.mp3');
  cut_s = loadSound('rope_cut.mp3');

  wizardImg = loadAnimation("./assets/wizard1.png", "./assets/wizard2.png");
  sad = loadAnimation("./assets/angry.png");
  happy = loadAnimation("./assets/happy.png");
  cauldronImg = loadAnimation("./assets/cauldron.png");
  caul_fill = loadAnimation("./assets/filled_cauldron.png");
}

function setup() {
  createCanvas(600,600);
  
  engine = Engine.create();
  world = engine.world;

  wizard = createSprite(150, 400, 10, 10);
  wizard.addAnimation('wizard_n', wizardImg);
  wizard.addAnimation('wizard_s', sad);
  wizard.addAnimation('wizard_h', happy);
  wizard.changeAnimation('wizard_n');
  wizard.scale = 2;

  cauldron = createSprite(310, 350, 10, 10);
  cauldron.addAnimation('cauldron', cauldronImg);
  cauldron.addAnimation('caul_f', caul_fill);
  cauldron.scale = 0.4;

  rope = new Rope(6, {x:580, y:50});
  rope2 = new Rope(6, {x:440, y:10});
  rope3 = new Rope(4, {x:20, y:50});
  rope4 = new Rope(6, {x:160, y:10});
  rope5 = new Rope(6, {x:250, y:10});
  rope6 = new Rope(6, {x:350, y:10});

  A_eggs = Bodies.rectangle(300, 300, 50, 50);
  Matter.Composite.add(rope.body, A_eggs);

  horn = Bodies.rectangle(300, 300, 20, 50);
  Matter.Composite.add(rope3.body, horn);

  weeds = Bodies.rectangle(300, 300, 20, 50);
  Matter.Composite.add(rope5.body, weeds);

  mushroom = Bodies.rectangle(300, 300, 50, 50);
  Matter.Composite.add(rope6.body, mushroom);

  link = new Link(rope, A_eggs);
  link2 = new Link(rope2, A_eggs);
  link3 = new Link(rope3, horn);
  link4 = new Link(rope4, horn);
  link5 = new Link(rope5, weeds);
  link6 = new Link(rope6, mushroom);

  cutter = createImg('./assets/cut_btn.png');
  cutter.position(570, 50);
  cutter.size(30, 30);
  cutter.mouseClicked(cut);

  cutter2 = createImg('./assets/cut_btn.png');
  cutter2.position(440, 10);
  cutter2.size(30, 30);
  cutter2.mouseClicked(cut2);

  cutter3 = createImg('./assets/cut_btn.png');
  cutter3.position(10, 50);
  cutter3.size(30, 30);
  cutter3.mouseClicked(cut3);

  cutter4 = createImg('./assets/cut_btn.png');
  cutter4.position(150, 10);
  cutter4.size(30, 30);
  cutter4.mouseClicked(cut4);

  cutter5 = createImg('./assets/cut_btn.png');
  cutter5.position(240, 10);
  cutter5.size(30, 30);
  cutter5.mouseClicked(cut5);

  cutter6 = createImg('./assets/cut_btn.png');
  cutter6.position(340, 10);
  cutter6.size(30, 30);
  cutter6.mouseClicked(cut6);

  balloonRight = createImg('./assets/balloonRight.png');
  balloonRight.position(500, 200);
  balloonRight.size(120, 120);
  balloonRight.mouseClicked(blow);

  balloonLeft = createImg('./assets/balloonLeft.png');
  balloonLeft.position(5, 100);
  balloonLeft.size(120, 120);
  balloonLeft.mouseClicked(blow2);
}


function draw() {
  background(bg);

  /*if(!bgm.isPlaying()){
    bgm.play();
    bgm.setVolume(0.5);
  }*/

  push();
  if(A_eggs!=null){
    imageMode(CENTER);
    image(A_eggsImg, A_eggs.position.x, A_eggs.position.y, 50, 50);
  }
  pop();

  push();
  if(horn!=null){
    imageMode(CENTER);
    image(hornImg, horn.position.x, horn.position.y, 20, 50);
  }
  pop();

  push();
  if(weeds!=null){
    imageMode(CENTER);
    image(weedsImg, weeds.position.x, weeds.position.y, 50, 50);
  }
  pop();

  push();
  if(mushroom!=null){
    imageMode(CENTER);
    image(mushroomImg, mushroom.position.x, mushroom.position.y, 50, 50);
  }
  pop();

  if(collide(mushroom, cauldron, link6)){
    World.remove(engine.world, mushroom);
    mushroom = null;
  }

  if(collide(weeds, cauldron, link5)){
    World.remove(engine.world, weeds);
    weeds = null;
  }

  if(collide(A_eggs, cauldron, link)){
    World.remove(engine.world, A_eggs);
    A_eggs = null;
  }

  if(collide(horn, cauldron, link3)){
    World.remove(engine.world, horn);
    horn = null;
  }

  if(A_eggs==null&&weeds==null&&horn==null&&mushroom==null){
    wizard.changeAnimation('wizard_h');
    wizard.scale = 1;
    cauldron.changeAnimation('caul_f');
  }

  if(mushroom.position.y > 600){
    wizard.changeAnimation('wizard_s');
    wizard.scale = 1;
  }

  if(horn.position.y > 600){
    wizard.changeAnimation('wizard_s');
    wizard.scale = 1;
  }

  if(A_eggs.position.y > 600){
    wizard.changeAnimation('wizard_s');
    wizard.scale = 1
  }

  if(weeds.position.y > 600){
    wizard.changeAnimation('wizard_s');
    wizard.scale = 0.5;
  }

  Engine.update(engine);
  drawSprites();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  rope5.show();
  rope6.show();
}

function cut(){
  cut_s.play();
  rope.break();
  link.detach();
  link = null;
}

function cut2(){
  cut_s.play();
  rope2.break();
  link2.detach();
  link2 = null;
}

function cut3(){
  cut_s.play();
  rope3.break();
  link3.detach();
  link3 = null;
}

function cut4(){
  cut_s.play();
  rope4.break();
  link4.detach();
  link4 = null;
}

function cut5(){
  cut_s.play();
  rope5.break();
  link5.detach();
  link5 = null;
}

function cut6(){
  cut_s.play();
  rope6.break();
  link6.detach();
  link6 = null;
}

function collide(body,sprite,link_n)
{
  if(body!=null&&link_n==null)
        {
         var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
          if(d<=30)
            {
              World.remove(engine.world,body);
               body = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function blow(){
  Matter.Body.applyForce(A_eggs, {x:0,y:0}, {x:-0.03, y:0});
  Matter.Body.applyForce(mushroom, {x:0,y:0}, {x:-0.03, y:0});
}

function blow2(){
  Matter.Body.applyForce(horn, {x:0,y:0}, {x:0.05, y:0});
  Matter.Body.applyForce(weeds, {x:0,y:0}, {x:0.03, y:0});
}