angular.module('mainApp')
.directive('gameBoardDir', function(){
    return {
        
        templateUrl: 'gameBoardTmpl.html',
        restrict: 'E',
        controller: 'gameBoardCtrl',
        
    }
})