'use strict';

angular.module('textbookExchangeApp')

.controller('PostCtrl', function($scope, $routeParams, $location, $window, Books, Posts, PostData) {
  if (!$window.localStorage.getItem('userId')) {
    $location.path('/browse');
  }

  $scope.post = {
    bookId: $routeParams.bookId,
    existing: false,
    selectedTrades: {}
  };

  Books.get($routeParams.bookId)
  .then(function(response) {
    $scope.book = response.data.data;
  });

  var storedData = PostData.get();
  if (Object.keys(storedData).length > 0) {
    $scope.post = storedData;
  }

  $scope.searchBooksToTrade = function() {
    PostData.set($scope.post);
    $location.path('/trade-search/' + $routeParams.bookId);
  };

  $scope.removeSelectedBook = function(bookId) {
    delete $scope.post.selectedTrades[bookId];
  };

  $scope.submitPost = function() {
    var data = {
      bookId: $scope.post.bookId,
      sellerId: $window.localStorage.getItem('userId'),
      condition: $scope.post.condition,
      price: $scope.post.price,
      trades: Object.keys($scope.post.selectedTrades)
    };

    Posts.post(data)
    .success(function() {
      // TODO: Display success message
      $location.path('/account');
    })
    .error(function() {
      // TODO: Display error message
    });
  };
});
