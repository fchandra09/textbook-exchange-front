'use strict';

angular.module('textbookExchangeApp')

.controller('BrowseCtrl', function($scope, $location, $mdToast, Posts, Books) {
  var limit = 20;
  $scope.page = 1;
  $scope.sortBy = '1';
  $scope.searchQuery = '';

  var getPosts = function() {
    var sort = {};
    switch ($scope.sortBy) {
      case "1":
        sort = { price: 1 };
        break;
      case "2":
        sort = { price: -1 };
    }

    Posts.getAll({
      limit: limit,
      skip: ($scope.page - 1) * limit,
      where: {
        active: true
      },
      sort: sort
    }).then(function(response) {
      // If API goes past the last page, go back
      if (response.data.data.length === 0) {
        $scope.page -= 1;
        getPosts();
        return;
      }

      $scope.posts = response.data.data;

      angular.forEach($scope.posts, function(post) {
        Books.get(post.bookId).then(function(response) {
          post.book = response.data.data;
        });
      });
    }, function(errorResponse) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(errorResponse.data.message)
          .hideDelay(5000)
      );
    });
  };

  getPosts();

  $scope.goToBookDetail = function(postId) {
    $location.path('/view/' + postId);
  };

  $scope.previousPage = function() {
    $scope.page--;
    if ($scope.page < 1) {
      $scope.page = 1;
    }

    getPosts();
  };

  $scope.nextPage = function() {
    $scope.page++;
    getPosts();
  };

  $scope.refreshPost = function() {
    $scope.page = 1;
    getPosts();
  };
});
