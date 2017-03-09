(function(){
var app = angular.module('app', ['ionic', 'ngCordova']);
app.controller('CameraCtrl', function($scope, $cordovaCamera) {
    $scope.pictureUrl = 'http://placehold.it/300x300';
    $scope.takePicture = function(){
        $cordovaCamera.getPicture({})
        .then(function(data)) {
              console.log('camera data: ' + angular.toJson(data));
    },function(error) {
        console.log('camera error: ' + angular.toJson(data));
    };
    };        
    });
               
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
