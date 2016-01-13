angular.module('mainApp')
.service('settingsService', function($firebaseArray, $firebaseObject){
    
    var ref = ('https://chdndtabletop.firebaseio.com/');
    var usersRef = new Firebase(ref + 'users/');
    var users = $firebaseArray(usersRef);
    
    this.changeProfilePicture = function(data, cu){
        var index = users.$indexFor(cu.id);
        (new Firebase(ref + 'users/' + cu.id)).update({profilePic: data});
        console.log(users[index]);
        return users[index].profilePic;    
    }
    
    
    this.updateColors = function(cu){
        
        var index = users.$indexFor(cu.id);
        
        (new Firebase(ref + 'users/' + cu.id)).update({bgColor: cu.bgColor, mainColor: cu.mainColor, color: cu.color});
        
    }
    
})