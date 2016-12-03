'use strict';

angular.module('textbookExchangeApp')

.factory('Users', function($http) {
  var baseUrl = 'http://fa16-cs498rk-037.cs.illinois.edu:3000/api';

  return {
    getAll: function() {
      return $http.get(baseUrl + '/users/');
    },
    get: function(id) {
      return $http.get(baseUrl + '/users/' + id);
    },
    post: function(user) {
      return $http.post(baseUrl + '/users/', user);
    },
    put: function(id, user) {
      return $http.put(baseUrl + '/users/' + id, user);
    },
    delete: function(id) {
      return $http.delete(baseUrl + '/users/' + id);
    },
    login: function(user) {
      return $http.post(baseUrl + '/login', user);
    },
    register: function(user) {
      return $http.post(baseUrl + '/signup', user);
    }
  };
});
