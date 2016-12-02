'use strict';

angular.module('textbookExchangeApp')

.factory('Posts', function($http, BaseApiUrl) {
  return {
    getAll: function() {
      return $http.get(BaseApiUrl + '/posts/');
    },
    get: function(id) {
      return $http.get(BaseApiUrl + '/posts/' + id);
    },
    post: function(data) {
      return $http.post(BaseApiUrl + '/posts/', data);
    },
    put: function(id, data) {
      return $http.put(BaseApiUrl + '/posts/' + id, data);
    },
    delete: function(id) {
      return $http.delete(BaseApiUrl + '/posts/' + id);
    }
  };
});
