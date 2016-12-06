'use strict';

angular.module('textbookExchangeApp')

.controller('AccountCtrl', function($location, $mdToast, $scope, $window, Books, Posts, Users) {
  var userId = $window.localStorage.getItem('userId');

  if (!userId) {
    $location.path('/browse');
  }

  Users.get(userId).then(function(response) {
    $scope.user = response.data.data;
    delete $scope.user.password;
  });

  Posts.getAll({ where: {sellerId: userId } }).then(function(response) {
    $scope.posts = response.data.data;
  });

  var message = function(message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .hideDelay(5000)
    );
  };

  $scope.updateAccount = function() {
    var proceed = true;

    if ($scope.user.newPassword) {
      if ($scope.user.newPassword !== $scope.user.confirmNewPassword) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Password and confirm password do not match.')
            .hideDelay(5000)
        );
        proceed = false;
      } else {
        $scope.user.password = $scope.user.newPassword;
      }
    }

    if (proceed) {
      Users.put(userId, $scope.user).then(function () {
        message('User updated!');
      }, function (response) {
        message(response.data.message);
      });
    }
  };

  $scope.goToBookDetail = function(postId) {
    $location.path('/view/' + postId);
  };
});
