'use strict';

angular.module('textbookExchangeApp')

.factory('PostData', function($window) {
  var dataCollection = {};

  return {
    set: function(data) {
      dataCollection[$window.sessionStorage.userId] = data;
    },
    get: function() {
      var data = dataCollection[$window.sessionStorage.userId];
      if (data) {
        delete dataCollection[$window.sessionStorage.userId];
      }
      return data;
    }
  };
});
