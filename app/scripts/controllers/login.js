'use strict';

angular.module('textbookExchangeApp')

.controller('LoginCtrl', function($location, $mdToast, $rootScope, $scope, Users) {
  var success = function(message) {
    $rootScope.loggedIn = true;
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .hideDelay(2500)
    );

    $location.path('/');
  };

  var failure = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .hideDelay(2500)
    );
  };

  $scope.login = function() {
    Users.login($scope.user).then(function() {
      success('Logged in!');
    }, function(response) {
      failure(response.data.message);
    });
  };

  $scope.register = function() {
    Users.register($scope.user).then(function() {
      success('Registered!');
    }, function(response) {
      failure(response.data.message);
    });
  };
});
