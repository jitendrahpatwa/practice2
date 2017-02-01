angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$timeout) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

/*Working*/
  var checkAuthorization = function(){
    cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
        alert("Location is " + (authorized ? "authorized" : "unauthorized"));
        if(authorized){
            checkDeviceSetting();
        }else{
            cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                switch(status){
                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        alert("Permission granted");
                        checkDeviceSetting();
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        alert("Permission denied");
                        // User denied permission
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        alert("Permission permanently denied");
                        // User denied permission permanently
                        break;
                }
            }, function(error){
                alert("switch case checkAuthorization "+error);
            });
        }
    }, function(error){
        alert("The following checkAuthorization error occurred: "+error);
    });
}

var checkDeviceSetting = function(){
    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        alert("GPS location setting is " + (enabled ? "enabled" : "disabled"));
        if(!enabled){
            cordova.plugins.locationAccuracy.request(function (success){
                alert("Successfully requested high accuracy location mode: "+success.message);
            }, function onRequestFailure(error){
                alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    }, function(error){
        alert("The following error occurred: "+error);
    });
}

  $timeout(function(){
    //alert("im in timeout");
    cordova.plugins.diagnostic.isLocationAvailable(function(available){
        alert("first Location is " + (available ? "available" : "not available"));
        if(!available){
          checkAuthorization();
          localStorage.LocationAvailable = "No";
          alert("second "+localStorage.LocationAvailable);
        }else{
          localStorage.LocationAvailable = "Yes";
          alert("second "+localStorage.LocationAvailable);
        }
    }, function(error){
        localStorage.LocationAvailable = "No";
        alert("The following error occurred: "+error+" "+localStorage.LocationAvailable);
    });
  },5000);
/*Working*/

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
