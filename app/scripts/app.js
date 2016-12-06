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
      .when('/view/:postId', {
        templateUrl: 'views/view.html',
        controller: 'ViewCtrl'
      })
      .when('/edit-post/:postId', {
        templateUrl: 'views/post.html',
        controller: 'EditPostCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .otherwise({
        redirectTo: '/browse'
      });
  })
  .run(function($location, $rootScope, $window, $mdSidenav, Users) {
    $rootScope.loggedIn = function() {
      var userId = $window.localStorage.getItem('userId');
      return (userId ? true : false);
    };

    $rootScope.goToView = function(view) {
      $location.path(view);
      $mdSidenav('sidenav').close();
    };

    $rootScope.logout = function() {
      Users.logout()
      .then(function() {
        $window.localStorage.removeItem('userId');
        $location.path('/browse');
      });
    };

    $rootScope.isNavigationActive = function(viewLocation) {
      return (viewLocation === $location.path());
    }

    $rootScope.toggleMenu = function() {
      $mdSidenav('sidenav').toggle();
    }
  });
