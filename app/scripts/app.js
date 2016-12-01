'use strict';

/**
 * @ngdoc overview
 * @name textbookExchangeApp
 * @description
 * # textbookExchangeApp
 *
 * Main module of the application.
 */
angular
  .module('textbookExchangeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
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
  });
