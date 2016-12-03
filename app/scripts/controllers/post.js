'use strict';

angular.module('textbookExchangeApp')

.controller('PostCtrl', function($scope, $routeParams, $location, $window, Books, Posts, PostData) {
  $scope.post = {
    bookId: $routeParams.bookId
  };

  Books.get($routeParams.bookId)
  .then(function(response) {
    $scope.book = response.data.data[0];
  });

  var storedData = PostData.get();
  if (storedData) {
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
      sellerId: $window.sessionStorage.userId,
      condition: $scope.post.condition,
      price: $scope.post.price,
      trades: Object.keys($scope.post.selectedTrades)
    };

    Posts.post(data)
    .success(function() {
      // Display success message
      $location.path('/');
    })
    .error(function() {
      // Display error message
    });
  };
});
