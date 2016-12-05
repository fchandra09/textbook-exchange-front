'use strict';

angular.module('textbookExchangeApp')

.controller('ViewCtrl', function($scope, $routeParams, $rootScope, $location, $window, $mdToast, Posts, Books, Users) {
  $scope.displaySellerInfo = false;

  Posts.get($routeParams.postId)
  .then(function(response) {
    $scope.post = response.data.data;

    $scope.trades = [];
    angular.forEach($scope.post.trades, function(tradeBookId) {
      Books.get(tradeBookId).then(function(response) {
        $scope.trades.push(response.data.data);
      });
    });

    $scope.isSeller = false;
    $scope.isPotentialBuyer = false;
    if ($rootScope.loggedIn()) {
      if ($scope.post.sellerId === $window.localStorage.userId) {
        $scope.isSeller = true;
      }
      else {
        $scope.isPotentialBuyer = true;
      }
    }

    return Books.get($scope.post.bookId);
  })
  .then(function(response) {
    $scope.book = response.data.data;

    return Users.get($scope.post.sellerId);
  })
  .then(function(response) {
    $scope.seller = response.data.data;
  });

  $scope.contactSeller = function() {
    $scope.displaySellerInfo = true;
  };

  $scope.editPost = function() {
    $location.path('/edit-post/' + $routeParams.postId);
  };

  $scope.deletePost = function() {
    if ($window.confirm('Are you sure you want to delete this post?')) {
      Posts.delete($routeParams.postId)
      .then(function() {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Your post has been deleted.")
            .hideDelay(2500)
        );
        $location.path('/account');
      });
    }
  };

  $scope.markAsSold = function() {
    var newPost = angular.copy($scope.post);
    newPost.active = false;

    Posts.put($routeParams.postId, newPost)
    .then(function() {
      $mdToast.show(
        $mdToast.simple()
          .textContent("Your post has been marked as sold.")
          .hideDelay(2500)
      );
      $scope.post = newPost;
    });
  };
});
