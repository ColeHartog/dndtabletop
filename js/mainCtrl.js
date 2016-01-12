angular.module('mainApp')
.controller('mainCtrl', function($scope, $state, mainService, $firebaseArray, $firebaseObject, $firebaseAuth){
    
    $scope.popUp = false;
    
    $scope.showPop = function(){
        
        if($scope.popUp === false && ($scope.currentUser)){
            $state.transitionTo('tableTop')
        }
        else{
        $scope.popUp = !$scope.popUp;
        }
    }
    
    $scope.errorMessage = '';
    
    var ref = ('https://chdndtabletop.firebaseio.com/');
    var auth = new Firebase(ref);
    var usersRef = new Firebase(ref + 'users/');
    var users = $firebaseArray(usersRef);
    
    
    $scope.logIn = function(data){
        
        auth.authWithPassword({
            email: data.email,
            password: data.password,
        }, function(error, authData){
                
            if(error){
                $scope.errorMessage = error.code;
                $scope.$apply();
            }else{
                $scope.showPop();
                
                $scope.currentUser = $scope.setCurrentUser(authData);
                
                for(var i = 0; i < users.length; i++){
                    if(users[i].uid === authData.uid){
                        $scope.currentUser.id = users[i].$id;
                        (new Firebase(ref + 'users/' + $scope.currentUser.id)).update({id: $scope.currentUser.id});
                    }
                }
                
                $scope.$apply();
                $scope.gameTime();
            }
            
        });
        
    }
    
    $scope.signUp = function(data){
            
            var updatedUsers = users;
            var existing = false;
                    
            for(var i = 0; i < updatedUsers.length; i++){
                if(updatedUsers[i].email === data.email){
                    existing = true;
                }
            }
                    
            if(existing){
                $scope.errorMessage = 'email already in use';
            }
            else{
                auth.createUser(data, function(error, user){
                    if(error){
                        $scope.errorMessage = error.code;
                        $scope.$apply();
                    }
                    else{
                        $scope.errorMessage = 'Signed Up';
                        $scope.$apply();
                        alert('Sign Up Successful!');
                        $scope.logIn(data);
                        
                    }
                });
            }
    };
    
    $scope.gameTime = function(){
        $state.transitionTo('tableTop');
    }
    
    $scope.setCurrentUser = function(data){
        for(var i = 0; i < users.length; i++){
            if(users[i].uid === data.uid){
                return users[i];
            }
        }
        var newData = {uid: data.uid, email: data.password.email, profilePic: data.password.profileImageURL, bgColor: 'white', mainColor: 'lightblue', color: 'black'};
        
        users.$add(newData);
        return newData;
        
    }
    
})