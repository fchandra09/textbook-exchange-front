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
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($location, $rootScope) {
    $rootScope.loggedIn = false;
    $rootScope.goToView = function(view) {
      $location.path(view);
    };
  });
