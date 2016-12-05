'use strict';

angular.module('textbookExchangeApp')

.controller('AccountCtrl', function($location, $mdToast, $scope, $window, Books, Posts, Users) {
  var userId = $window.localStorage.getItem('userId');

  if (!userId) {
    $location.path('/browse');
  }

  Users.get(userId).then(function(response) {
    $scope.user = response.data.data;
  });

  Posts.getAll({ sellerid: userId }).then(function(response) {
    $scope.posts = response.data.data;

    angular.forEach($scope.posts, function(post) {
      Books.get(post.bookId).then(function(response) {
        post.book = response.data.data;
      });
    });
  });

  var message = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .hideDelay(5000)
    );
  };

  $scope.updateAccount = function() {
    if ($scope.user.newPassword) {
      if ($scope.user.newPassword !== $scope.user.confirmNewPassword) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Password does not match!')
            .hideDelay(5000)
        );
      } else {
        $scope.user.password = $scope.user.newPassword;
      }
    }

    if (!$scope.user.email) {
      message('Email is required!');
    } else if (!$scope.user.name) {
      message('Name is required!');
    } else {
      Users.put(userId, $scope.user).then(function() {
        message('User updated!');
      }, function(response) {
        message(response.data.message);
      });
    }
  };

  $scope.goToBookDetail = function(postId) {
    $location.path('/view/' + postId);
  };
});
