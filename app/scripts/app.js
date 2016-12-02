'use strict';

angular
  .module('textbookExchangeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .constant('BaseApiUrl', 'http://fa16-cs498rk-037.cs.illinois.edu:3000/api')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/post-search', {
        templateUrl: 'views/post-search.html',
        controller: 'PostSearchCtrl',
        resolve: {
          extraParams: function() {
            return { multiple: false };
          }
        }
      })
      .when('/trade-search/:bookId', {
        templateUrl: 'views/post-search.html',
        controller: 'PostSearchCtrl',
        resolve: {
          extraParams: function() {
            return { multiple: true };
          }
        }
      })
      .when('/post/:bookId', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl'
      })
      .otherwise({
        redirectTo: '/browse'
      });
  })
  .run(function($location, $rootScope) {
    $rootScope.loggedIn = false;
    $rootScope.goToView = function(view) {
      $location.path(view);
    };
  });
