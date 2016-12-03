'use strict';

angular.module('textbookExchangeApp')

.factory('Books', function($http, BaseApiUrl) {
  return {
    getAll: function(params) {
      return $http.get(BaseApiUrl + '/books/', { params: params });
    },
    get: function(id) {
      var params = {
        where: {
          '_id': id
        }
      };
      return $http.get(BaseApiUrl + '/books/', { params: params });
    }
  };
});
