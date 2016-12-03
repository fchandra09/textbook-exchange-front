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
