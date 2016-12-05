'use strict';

angular.module('textbookExchangeApp')

.factory('Users', function($http, BaseApiUrl) {
  return {
    getAll: function() {
      return $http.get(BaseApiUrl + '/users/');
    },
    get: function(id) {
      return $http.get(BaseApiUrl + '/users/' + id);
    },
    put: function(id, user) {
      return $http.put(BaseApiUrl + '/users/' + id, user);
    },
    login: function(user) {
      return $http.post(BaseApiUrl + '/login', user);
    },
    logout: function() {
      return $http.get(BaseApiUrl + '/logout');
    },
    register: function(user) {
      return $http.post(BaseApiUrl + '/signup', user);
    }
  };
});
