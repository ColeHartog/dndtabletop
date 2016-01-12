angular.module('mainApp')
.controller('tableTopCtrl', function($scope, $state){
    
    $scope.test = 'test';
    
    if($scope.currentUser){
    }else{
        $state.transitionTo('home');
    }
    
})