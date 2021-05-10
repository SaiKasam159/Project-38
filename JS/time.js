class Time {

    constructor(){

    }

    gettimeStock(){

        var timeStockRef = database.ref('feedTime')
        timeStockRef.on('value', function(data){
            timeStock = data.val()
        })
        
    }
    
    updatetimeStock(timeS){

        database.ref('/').update({
            time: timeS

        })
    }

   
    
    addtime(x){
       
        database.ref('/').set({

            time: x
        })  

    }
    display(){
        var x = 20, y =220
        
        
    }

}