'use strict';

angular.module('textbookExchangeApp')

.factory('Posts', function($http, BaseApiUrl) {
  return {
    getAll: function(params) {
      return $http.get(BaseApiUrl + '/posts/', { params: params });
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
