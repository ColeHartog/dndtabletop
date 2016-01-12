angular.module('mainApp')
.controller('chatCtrl', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth, chatService){
    
    var firebaseRoot = 'https://chdndtabletop.firebaseio.com/';
    var ref = new Firebase(firebaseRoot);
    
    var messagesRef = new Firebase(firebaseRoot+'messages/');
    var messages = $firebaseArray(messagesRef);
    
    var usersRef = new Firebase(firebaseRoot + 'users/');
    var users = $firebaseArray(usersRef);
    
    $scope.messages = messages;
    
    
    $scope.addNewMessage = function(data){
        var rollResult = chatService.messageCheck(data);
        messages.$add({text: data, roll: rollResult ,posted: (new Date()).toLocaleTimeString().toString(), postedProfilePic: $scope.currentUser.profilePic});
        $scope.newMessage = '';
    };
    
})