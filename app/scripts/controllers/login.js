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

  $scope.showLogin = true;
  $scope.user = {};

  $scope.goToRegister = function() {
    $scope.showLogin = false;
  };

  $scope.goToLogin = function() {
    $scope.showLogin = true;
  };

  $scope.login = function() {
    if (!$scope.user.email) {
      failure('Email is required');
    } else if (!$scope.user.password) {
      failure('Password is required!');
    } else {
      Users.login($scope.user).then(function(response) {
        success('Logged in!', response.data.data);
      }, function(response) {
        failure(response.data.message);
      });
    }
  };

  $scope.register = function() {
    if (!$scope.user.email) {
      failure('Email is required');
    } else if (!$scope.user.password) {
      failure('Password is required!');
    } else if (!$scope.name.name) {
      failure('Name is requried');
    } else {
      Users.register($scope.user).then(function(response) {
        success('Registered!', response.data.data);
      }, function(response) {
        failure(response.data.message);
      });
    }
  };
});
