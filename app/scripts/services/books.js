'use strict';

angular.module('textbookExchangeApp')

.factory('Books', function($http) {
  var baseUrl = 'some/api/site';

  return {
    getAll: function() {
      return $http.get(baseUrl + '/books/');
    },
    get: function(id) {
      return $http.get(baseUrl + '/books/' + id);
    },
    post: function(book) {
      return $http.post(baseUrl + '/books/', book);
    },
    put: function(id, book) {
      return $http.put(baseUrl + '/books/' + id, book);
    },
    delete: function(id) {
      return $http.delete(baseUrl + '/books/' + id);
    }
  };
});
