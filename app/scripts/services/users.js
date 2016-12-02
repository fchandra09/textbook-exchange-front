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
    post: function(user) {
      return $http.post(BaseApiUrl + '/users/', user);
    },
    put: function(id, user) {
      return $http.put(BaseApiUrl + '/users/' + id, user);
    },
    delete: function(id) {
      return $http.delete(BaseApiUrl + '/users/' + id);
    },
    login: function(user) {
      return $http.post(BaseApiUrl + '/login', user);
    },
    register: function(user) {
      return $http.post(BaseApiUrl + '/signup', user);
    }
  };
});
