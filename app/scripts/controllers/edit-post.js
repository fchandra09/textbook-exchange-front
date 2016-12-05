'use strict';

angular.module('textbookExchangeApp')

.controller('EditPostCtrl', function($scope, $routeParams, $location, $window, $q, Books, Posts, PostData) {
  if (!$window.localStorage.getItem('userId')) {
    $location.path('/browse');
  }

  Posts.get($routeParams.postId)
  .then(function (response) {
    $scope.post = response.data.data;
    $scope.post.existing = true;

    var storedData = PostData.get();
    if (Object.keys(storedData).length > 0) {
      $scope.post.condition = storedData.condition;
      $scope.post.price = storedData.price;
      $scope.post.status = storedData.status;
      $scope.post.selectedTrades = storedData.selectedTrades;
    }
    else {
      $scope.post.status = '1';
      if (!$scope.post.active) {
        $scope.post.status = '0';
      }

      $scope.post.selectedTrades = {};
      for (var i = 0; i < $scope.post.trades.length; i++) {
        Books.get($scope.post.trades[i])
        .then(function(response) {
          var tradeBook = response.data.data;
          $scope.post.selectedTrades[tradeBook._id] = {
            '_id': tradeBook._id,
            title: tradeBook.title
          };
        });
      }
    }

    Books.get($scope.post.bookId)
    .then(function(response) {
      $scope.book = response.data.data;
    });
  });

  $scope.searchBooksToTrade = function() {
    PostData.set($scope.post);
    $location.path('/trade-search/' + $scope.post.bookId);
  };

  $scope.removeSelectedBook = function(bookId) {
    delete $scope.post.selectedTrades[bookId];
  };

  $scope.submitPost = function() {
    $scope.post.active = ($scope.post.status === '1' ? true : false);
    $scope.post.trades = Object.keys($scope.post.selectedTrades);

    Posts.put($routeParams.postId, $scope.post)
      .success(function() {
        // TODO: Display success message
        $location.path('/account');
      })
      .error(function() {
        // TODO: Display error message
      });
  };
});
