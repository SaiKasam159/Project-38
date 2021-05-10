class Food {

    constructor(){

        
        this.milk = loadImage('images/Milk.png')
    }

    getFoodStock(){

        var foodStockRef = database.ref('food')
        foodStockRef.on('value', function(data){
            foodStock = data.val()
        })
        
    }
    
    updateFoodStock(foodS){

        database.ref('/').update({
            food: foodS

        })
    }

    deductFood(x){

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
    
    addFood(x){
        if(x < 20){
            x += 1
        }
        database.ref('/').set({

            food: x
        })  

    }
    display(){
        var x = 20, y =220
        
        imageMode(CENTER)
        
        if(foodStock != 0){
            for(var i = 0; i<foodStock;i++){
                
                image(this.milk, x, y, 50, 50)
                x += 30
            }


        }
    }

}