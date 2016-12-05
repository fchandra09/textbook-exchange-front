'use strict';

angular.module('textbookExchangeApp')

.controller('BrowseCtrl', function($scope, $location, $mdToast, Posts, Books) {
  var limit = 20;
  $scope.page = 1;
  $scope.sortBy = '1';
  $scope.searchQuery = '';
  $scope.recordsCount = 0;
  $scope.start = 0;
  $scope.end = 0;

  var getPosts = function() {
    var sort = {};
    switch ($scope.sortBy) {
      case "1":
        sort = { price: 1 };
        break;
      case "2":
        sort = { price: -1 };
        break;
      case "3":
        sort = { title: 1 };
        break;
      case "4":
        sort = { title: -1 };
        break;
      case "5":
        sort = { authors: 1 };
        break;
      case "6":
        sort = { authors: -1 };
        break;
    }

    var params = {
      limit: limit,
      skip: ($scope.page - 1) * limit,
      where: {
        active: true
      },
      sort: sort
    };

    if ($scope.searchQuery) {
      var likeSearch = {
        '$regex': '.*' + $scope.searchQuery + '.*',
        '$options': 'i'
      };

      params.where = {
        active: true,
        '$or': [
          { title: likeSearch },
          { authors: likeSearch },
          { courses: likeSearch },
          { isbn: $scope.searchQuery }
        ]
      };
    }

    Posts.getAll(params)
    .then(function(response) {
      $scope.posts = response.data.data;
    });

    var countParams = {
      count: true
    };
    countParams.where = params.where;
    Posts.getAll(countParams)
    .then(function(response) {
      $scope.recordsCount = response.data.data;
      if ($scope.recordsCount > 0) {
        $scope.start = ($scope.page - 1) * limit + 1;
        $scope.end = $scope.page * limit;
        if ($scope.end > $scope.recordsCount) {
          $scope.end = $scope.recordsCount;
        }
      }
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
