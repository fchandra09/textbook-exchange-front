'use strict';

angular.module('textbookExchangeApp')

.factory('PostData', function($window) {
  var postData = {};

  return {
    set: function(data) {
      postData = data;
    },
    get: function() {
      var data = postData;
      postData = {};

      return data;
    }
  };
});
