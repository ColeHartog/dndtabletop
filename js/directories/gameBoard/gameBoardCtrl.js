angular.module('mainApp')
.controller('gameBoardCtrl', function($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, gameBoardService){
    
    if($scope.currentUser){
        $scope.loggedin = true;
    }
    if($scope.loggedin === false){
        $state.transitionTo('home')
    }
    
    $scope.cps = false;
    
    $scope.minormaxSwitch = function(){
        if($scope.cps === true){
            $scope.cps = false;
            gameBoardService.minormaxSwitch(true);
        }
        else{
            $scope.cps = true;
            gameBoardService.minormaxSwitch(false);
        }
    };
    
    var firebaseRoot = 'https://chdndtabletop.firebaseio.com/';
    
    var messages = new Firebase(firebaseRoot + 'messages');
    
    var bgImageRef = new Firebase(firebaseRoot + 'bgImage');
    var bgImage = $firebaseObject(bgImageRef);
    $scope.bgImage = bgImage;
    
    
    $scope.changeBg = function(data){
            $scope.bgImage.imageUrl = data;
            bgImage.$save({imageUrl: data});
            $scope.newBgUrl = '';
        
    };
    
    $scope.eraseMessages = function(){
        messages.remove();
    }
    
    
    var tokensFB = new Firebase(firebaseRoot + 'tokens');
    var tokens = $firebaseArray(tokensFB);
    
    $scope.tokens = tokens;
    
    $scope.addNewToken = function(data, currentHP, maxHP){
        gameBoardService.addNewToken(data, currentHP, maxHP);
        $scope.newTokenUrl = '';
    }
    
    
    
    
    $scope.selectedToken = {};
    
    $scope.hiddenTokens = [];
            
    $scope.selectToken = function(data){
        $scope.selectedToken = data;
        $scope.currentHPInput = data.currentHP;
        $scope.maxHPInput = data.maxHP;
    }
    
    $scope.removeSelectedToken = function(){
        tokens[$scope.selectedToken.index].show = false;
        tokens.$save($scope.selectedToken.index);
    }
    
    
    
    $scope.removeAllTokens = function(){
        tokensFB.remove();
    }
    
    
    
    
    var defaultImagesRef = new Firebase(firebaseRoot + 'DI');
    var defaultImages = $firebaseArray(defaultImagesRef);
    
    $scope.defaultImages = defaultImages;
    
    
    
    $scope.currentHPInput = 1;
    $scope.maxHPInput = 1;
    
    $scope.showHPText = 'Show';
    $scope.showHPBar = 'Show';
    
    $scope.HPFontColor = 'black';
    
    $scope.updateHP = function(){
        tokens[$scope.selectedToken.index].currentHP = $scope.currentHPInput;
        tokens[$scope.selectedToken.index].maxHP = $scope.maxHPInput;
        tokens[$scope.selectedToken.index].hpPercent = (($scope.currentHPInput / $scope.maxHPInput)*100).toString()+'%';
        tokens.$save($scope.selectedToken.index);
    }
    
    
    $scope.showHideHPBar = function(){
        $scope.showHPBar = gameBoardService.showOrHide($scope.showHPBar);
    };
    
    $scope.showHideHPText = function(){
        $scope.showHPText = gameBoardService.showOrHide($scope.showHPText);
    };
    
    $scope.changeHPFontColor = function(colorChoice){
        $scope.HPFontColor = colorChoice;
    }
    
})