angular.module('mainApp')
.directive('controlPanelDir', function(){
    return {
        
        templateUrl: 'controlPanelTmpl.html',
        restrict: 'E',
        controller: 'gameBoardCtrl'
        
    }
})