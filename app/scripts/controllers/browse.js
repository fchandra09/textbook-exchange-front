'use strict';

angular.module('textbookExchangeApp')

.controller('BrowseCtrl', function($scope, $location, Posts, Books) {
  var page = 1;
  var limit = 20;

  Posts.getAll({'limit': limit, 'skip': (page - 1) * limit}).then(function(response) {
    $scope.posts = response.data.data;

    angular.forEach($scope.posts, function(post) {
      Books.get(post.bookId).then(function(response) {
        post.book = response.data.data;
      });
    });
  });

  $scope.goToBookDetail = function(postId) {
    $location.path('/view/' + postId);
  };
});
