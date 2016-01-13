angular.module('mainApp')
.service('chatService', function($firebaseArray, $firebaseObject){
    
    this.messageCheck = function(data){
        if(data.search('Roll') === -1){
            return null;
        }
        else{
            var nums = this.isolateNums(data);
            var rolledResult = this.Roll(nums);
            if(data.indexOf('+') === -1){
                return rolledResult;
            }
            else{
                var final = this.extraMath(data, rolledResult);
                return final;
            }
        }
    };
    
    
    this.isolateNums = function(data){
        var numStart = data.search('Roll')+5;
        
        
        if(data[numStart+1] === 'd'){
            if((isNaN(data[numStart+3]))){
                return [data[numStart], data[numStart+2]];
            }
            else{
                return [data[numStart], data[numStart+2]+data[numStart+3]];
            }
        }
        else{
            if((isNaN(data[numStart+4]))){
                return [data[numStart]+data[numStart+1], data[numStart+3]];
            }
            else{
                return [data[numStart]+data[numStart+1], data[numStart+3]+data[numStart+4]];
            }
        }
        
    };
    
    var DiceSound = new Audio('./images/DiceRoll.mp3');
    DiceSound.volume = .5;
    
    this.Roll = function(data){
        var total = 0;
        for(var i = 0; i < data[0]; i++){
            total += Math.floor(Math.random()*(data[1])) + 1;
        }
        DiceSound.play();
        return total;
    };
    
    this.extraMath = function(data, addTo){
        var addStart = data.indexOf('+')+1;
        var endExtra = data.indexOf(';'), addStart;
        var extraNum = data.substring(addStart, endExtra);
        var final = parseInt(extraNum) + parseInt(addTo);
        return final;
    };
    
    
})