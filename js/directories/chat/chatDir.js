angular.module('mainApp')
.directive('chatDir', function(){
    return {
        
        templateUrl: 'chatTmpl.html',
        restrict: 'E',
        scope: {
            currentUser: '=',
        },
        controller: 'chatCtrl',
    }
})