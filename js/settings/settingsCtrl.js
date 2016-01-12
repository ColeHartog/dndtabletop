angular.module('mainApp')
.controller('settingsCtrl', function($scope, $state, $firebaseArray, $firebaseObject, $firebaseAuth, settingsService){
    
    var auth = new Firebase('https://chdndtabletop.firebaseio.com/');
    
    if($scope.currentUser){
    }else{
        $state.transitionTo('home')
    }
    
    $scope.gameTime = function(){
        $state.transitionTo('tableTop');
    }
    
    $scope.changeProfilePicture = function(data){
        $scope.currentUser.profilePic = settingsService.changeProfilePicture(data, $scope.currentUser);
        $scope.newProfilePicUrl = '';
    }
    
    $scope.logOut = function(){
        auth.unauth();
        $scope.currentUser = '';
        location.reload();
    }
    
    
    var ref = ('https://chdndtabletop.firebaseio.com/');
    var auth = new Firebase(ref);
    var usersRef = new Firebase(ref + 'users/');
    var users = $firebaseArray(usersRef);
    
    $scope.changeBgColor = function(){
        $scope.currentUser.bgColor = $('#bgColorChoice').css('background-color');
        settingsService.updateColors($scope.currentUser);
    };
    
    $scope.changeMainColor = function(){
        $scope.currentUser.mainColor = $('#messageColorChoice').css('background-color');
        settingsService.updateColors($scope.currentUser);
    };
    
    $scope.changeFontColor = function(){
        $scope.currentUser.color = $('#fontColorChoice').css('color');
        settingsService.updateColors($scope.currentUser);
    };
    
})