'use strict';

angular.module('textbookExchangeApp')

.controller('BrowseCtrl', function($scope) {
  var page = 1;
  var limit = 20;

  // Posts.getAll({'limit': limit, 'skip': page * limit}).then(function(response) {
  //   $scope.posts = response.data.data;

  //   angular.forEach($scope.posts, function(post) {
  //     Books.get(post.bookId).then(function(response) {
  //       post.book = response.data.data;
  //     });
  //   });
  // });

  $scope.posts = [{
    condition: 'New',
    trades: ['Some book'],
    price: 1234.56,
    bookId: 'some id',
    sellerId: 'some id',
    dateCreated: new Date(),
    book: {
      authors: ['some author', 'some Author 2'],
      classes: ['some classes'],
      coverImage: 'images/books/978-0-06-050577-6.jpg',
      title: 'This Book is Lit'
    }
  }];
});
