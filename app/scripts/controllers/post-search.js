'use strict';

angular.module('textbookExchangeApp')

.controller('PostSearchCtrl', function($scope, $location, $window, $mdToast, Books, PostData, extraParams) {
  $scope.multiple = extraParams.multiple;
  $scope.filter = {};

  if (!$window.localStorage.getItem('userId')) {
    $location.path('/browse');
  }

  var storedData;
  if ($scope.multiple) {
    storedData = PostData.get();
  }

  $scope.searchBooks = function() {
    var limit = 20;

    // title AND author
    var where = {};
    if ($scope.filter.title) {
      where.title = {
        '$regex': '.*' + $scope.filter.title + '.*',
        '$options': 'i'
      };
    }
    if ($scope.filter.authors) {
      where.authors = {
        '$regex': '.*' + $scope.filter.authors + '.*',
        '$options': 'i'
      };
    }

    if (Object.keys(where).length > 0 && $scope.filter.isbn) {
      // ISBN or (title and author)
      where = {
        '$or': [
          { isbn: $scope.filter.isbn },
          where
        ]
      };
    }
    else if ($scope.filter.isbn) {
      where.isbn = $scope.filter.isbn;
    }

    if ($scope.multiple) {
      var excludeItself = {
        '_id': { '$ne': storedData.bookId }
      };

      if (Object.keys(where).length > 0) {
        where = {
          '$and': [where, excludeItself]
        };
      }
      else {
        where = excludeItself;
      }
    }

    var params = {
      sort: {
        title: 1,
        authors: 1
      },
      limit: limit
    };
    if (Object.keys(where).length > 0) {
      params.where = where;
    }

    Books.getAll(params)
    .then(function(response) {
      $scope.books = response.data.data;
    });
  };

  if ($scope.multiple) {
    $scope.selectedTrades = {};
    if (storedData.selectedTrades) {
      $scope.selectedTrades = storedData.selectedTrades;
    }

    $scope.selectBook = function(bookId, title) {
      $scope.selectedTrades[bookId] = {
        '_id': bookId,
        title: title
      };

      $mdToast.show(
        $mdToast.simple()
          .textContent(title + ' has been selected')
          .hideDelay(2500)
      );
    };

    $scope.removeSelectedBook = function(bookId) {
      delete $scope.selectedTrades[bookId];
    };

    $scope.goBackToPost = function() {
      storedData.selectedTrades = $scope.selectedTrades;
      PostData.set(storedData);

      if (storedData.existing) {
        $location.path('/edit-post/' + storedData._id);
      }
      else {
        $location.path('/post/' + storedData.bookId);
      }
    };
  }
  else {
    $scope.selectBook = function(bookId) {
      $location.path('/post/' + bookId);
    };
  }
});
