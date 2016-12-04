'use strict';

angular.module('textbookExchangeApp')

.controller('BrowseCtrl', function($scope, $location, $mdToast, Posts, Books) {
  var page = 1;
  var limit = 20;

  var getPosts = function() {
    Posts.getAll({'limit': limit, 'skip': (page - 1) * limit}).then(function(response) {
      // If API goes past the last page, go back
      if (response.data.data.length === 0) {
        page -= 1;
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
    page--;
    if (page < 0) {
      page = 0;
    }

    getPosts();
  };

  $scope.nextPage = function() {
    page++;
    getPosts();
  };
});
