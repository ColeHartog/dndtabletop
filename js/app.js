angular.module('mainApp', ['ui.router', 'firebase', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'homeTmpl.html',
    })
    .state('settings', {
        url: '/settings',
        templateUrl: 'settingsTmpl.html',
        controller: 'settingsCtrl',
        resolve: {
            getImage: function($q, $http){
                var deffered = $q.defer();
                $http.get('./images/DeepForest.jpg').success(function(data){deffered.resolve(data);
                    
                });
                return deffered.promise;
            }
        }
    })
    .state('tableTop', {
        url: '/tableTop',
        templateUrl: 'tableTopTmpl.html',
        controller: 'tableTopCtrl'
    })
    
    $urlRouterProvider.otherwise('/');
    
})