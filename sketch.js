//creating variables for the game
var dog,dogImg,happydogImg;
var database;
var foodS,foodStock;

//preloading the images for the dog sprite
function preload(){
   dogImg=loadImage("images/dogImg.png");
   happydogImg=loadImage("images/dogImg1.png");
  }

function setup() {

  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('food');

  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);

    dog.addImage(happydogImg);
  }

  drawSprites();

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);    

  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//defining function readStock() to read the values from the database
function readStock(data){

  //to store the listened values inside the foodS variable
  foodS=data.val();
}

//defining function writeStock() to calculate the reduction of food after being fed and updating the same in the database
function writeStock(x){     //x is passed as an argument Eg:20
  if(x<=0){                 
    x=0;
  }
  else{
    x=x-1;              //20-1 (=19)
  } 
  database.ref('/').update({
    food:x      //x refers to the reduced food (19)
  })
}