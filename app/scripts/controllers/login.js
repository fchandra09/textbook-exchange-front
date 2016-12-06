'use strict';

angular.module('textbookExchangeApp')

.controller('LoginCtrl', function($location, $mdToast, $scope, $window, Users) {
  var success = function(message, user) {
    $window.localStorage.setItem('userId', user._id);
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

  if ($window.localStorage.getItem('userId')) {
    $location.path('/browse');
  }

  $scope.showLogin = true;
  $scope.user = {};
  $scope.newUser = {};

  $scope.goToRegister = function() {
    $scope.showLogin = false;
  };

  $scope.goToLogin = function() {
    $scope.showLogin = true;
  };

  $scope.login = function() {
    Users.login($scope.user).then(function(response) {
      success('You are successfully logged in.', response.data.data);
    }, function(response) {
      failure(response.data.message || "Unable to login. Email and/or password are incorrect.");
    });
  };

  $scope.register = function() {
    if ($scope.newUser.password !== $scope.newUser.confirmPassword) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Password and confirm password do not match.')
          .hideDelay(5000)
      );
    }
    else {
      Users.register($scope.newUser).then(function (response) {
        success('You are successfully registered.', response.data.data);
      }, function (response) {
        failure(response.data.message || "Unable to register. Email has already been registered.");
      });
    }
  };
});
