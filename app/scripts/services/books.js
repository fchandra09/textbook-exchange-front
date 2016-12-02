'use strict';

angular.module('textbookExchangeApp')

.factory('Books', function($http) {
  var baseUrl = 'http://fa16-cs498rk-037.cs.illinois.edu:3000/api';

  return {
    getAll: function(params) {
      return $http.get(baseUrl + '/books/', { params: params });
    },
    get: function(id) {
      var params = {
        where: {
          '_id': id
        }
      };
      return $http.get(baseUrl + '/books/', { params: params });
    }
  };
});
