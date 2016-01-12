angular.module('mainApp')
.service('gameBoardService', function($firebaseArray, $firebaseObject){
    
    var firebaseRoot = 'https://chdndtabletop.firebaseio.com/';
        
    this.minormaxSwitch = function(tof){
        
        if(tof === true){
            
            document.getElementById('momicon').classList.remove('fa-angle-double-down');
            document.getElementById('momicon').classList.add('fa-angle-double-up');
            $('#controlPaneldiv').css({'height' : '2vh'});
            $('#gameBoarddiv').css({'height' : '93vh'});
            
        }
        else{
            
            document.getElementById('momicon').classList.remove('fa-angle-double-up');
            document.getElementById('momicon').classList.add('fa-angle-double-down');
            $('#controlPaneldiv').css({'height' : '15vh'});
            $('#gameBoarddiv').css({'height' : '80vh'});
        }
        
    }
    
    
    this.showOrHide = function(data){
        if(data === 'Show'){
            return 'Hide';
        }
        else if(data === 'Hide'){
            return 'Show';
        }
    }
    
    
    var tokensFB = new Firebase(firebaseRoot + 'tokens');
    var tokens = $firebaseArray(tokensFB);
    
    
    
    
    
    
    
    this.addNewToken = function(data , currentHP, maxHP){
        
        var index = tokens.length || 0;
        
        tokens.$add({
            index: index,
            imageUrl: data,
            width: '5%',
            height: '9%',
            top: '45%',
            left: '45%',
            show: true,
            currentHP: currentHP,
            maxHP: maxHP,
            hpPercent: ((currentHP/maxHP)*100).toString()+'%',
        });
    }
    
    
    
    
    
    this.makeDandR = function(Length){
        
        var index = Length - 1;
        
        setTimeout(function(){
        
            $('#token'+index).draggable({
                containment: "#gameBoard",
                drag: function(){
                    tokens[index].top = (((parseFloat($('#token'+index).css('top')))/(parseFloat($('#gameBoard').css('height'))))*100).toString()+'%';
                    tokens[index].left = (((parseFloat($('#token'+index).css('left')))/(parseFloat($('#gameBoard').css('width'))))*100).toString()+'%';
                    tokens.$save(index);
                }
            })
            
            
            
            $('#token'+index).resizable({
                containment: "#gameBoard",
                resize: function(event, ui){
                    tokens[index].height = ((ui.size.height/(parseFloat($('#gameBoard').css('height'))))*100).toString()+'%';
                    tokens[index].width = ((ui.size.width/(parseFloat($('#gameBoard').css('width'))))*100).toString()+'%';
                    tokens.$save(index);
                }
            })
        }, 100);
        
    }
    
    
    this.makeTokensDraggableResizable = function(){
        var tlength = tokens.length;
        
        for(var i = 0; i < tlength; i++){
            this.makeDandR(i+1);
        }
        
    }
    
    
    
})