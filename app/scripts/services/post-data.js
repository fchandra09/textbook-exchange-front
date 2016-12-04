'use strict';

angular.module('textbookExchangeApp')

.factory('PostData', function() {
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
