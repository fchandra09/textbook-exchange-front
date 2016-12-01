'use strict';

angular.module('textbookExchangeApp')

.factory('Users', function($http) {
  var baseUrl = 'some/api/site';

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
    }
  };
});
