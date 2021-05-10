//Create variables here
var foodStock, timeStock, timeS, timeObj
var happyDog, dog, foodS, database, dogSad
var happyDogSprite, sadDogSprite, dogSprite, feedTime, lastFed, addFoodButton, eatFoodButton, foodObj
foodS = 20

function preload()
{

  happyDog = loadImage('images/dogImg1.png')
  dogSad = loadImage('images/doggo.jpg')
  dog = loadImage('images/dogImg.png')
  hall = loadImage('bg imgs/images/Bed Room.png')
  bed = loadImage('bg imgs/images/Living Room.png')
  park = loadImage('bg imgs/images/Garden.png')
  bath = loadImage('bg imgs/images/washroom.png')
  backgroundImg = hall

}

function setup() {
  createCanvas(800, 500);
  database = firebase.database()
  dogSprite = createSprite(750, 250, 1, 1)
  dogSprite.scale = 0.5
  dogSprite.addImage(dog)
  foodStock = database.ref('food')
  timeStock = database.ref('feedTime')
  foodStock.on('value', readStock, showError)
  timeStock.on('value', readStock, showError)
  
  foodObj = new Food()
  timeObj = new Time()

  addFoodButton = createButton('Give Dog more to eat')
  addFoodButton.position(250, 250)

  addFoodButton.mousePressed(function (){
    foodObj.addFood(foodS)
    foodObj.display() 
    database.ref('/').set({
      food:foodObj.getFoodStock(),
      
    })     
})

  eatFoodButton = createButton('Give Dog Food')
  eatFoodButton.position(250, 200)

  eatFoodButton.mousePressed(function (){
      foodObj.deductFood(foodS)
      foodObj.display() 
      database.ref('/').set({
        food:foodObj.getFoodStock(),
        feedTime: hour()
        
      })
      //console.log(hour())

  })

  BathButton = createButton('Give Dog Bath')
  BathButton.position(250, 170)

  BathButton.mousePressed(function (){
      backgroundImg = bath

  })

  parkButton = createButton('Play with Dog')
  parkButton.position(250, 120)

  parkButton.mousePressed(function (){
    backgroundImg = park
      //console.log(hour())

  })
  hallFoodButton = createButton('Go to the hall')
  hallFoodButton.position(250, 70)

  hallFoodButton.mousePressed(function (){
    backgroundImg = hall
      //console.log(hour())

  })
  bedButton = createButton('Sleepy Time!')
  bedButton.position(250, 20)

  bedButton.mousePressed(function (){
    backgroundImg = bed
  })
}


function draw() {  

  background(backgroundImg, 400, 250)

  if(foodS === 0){

    dogSprite.addImage(dogSad)

  }

  else{
    dogSprite.addImage(dog)
  }

  foodObj.display()
  drawSprites();

  feedTime = database.ref('feedTime')
  feedTime.on('value', function(data){
    lastFed = data.val()
  })
  //add styles here

  console

}

function writeStockNegative(x){

  if(x<=0){
    //nothing
  }
  else{
    x -= 1
  }
    database.ref('/').set({

      food: x
    })
  
}

function writeStockPositive(x){

  x += 1
  
  database.ref('/').set({

    food: x
  })
  
}

function readStock(data){

  foodS = data.val()

}

//if we get errors but i won't get none cuz i am master programmer 
function showError(){

  console.log('error in writing the value in database')
}