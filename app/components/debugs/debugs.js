angular.module('ps.debugs', [])

.factory('PsDebugs', function() {
  return {
    sleep: function (seconds) {
      var currentTime = new Date().getTime();
      while (currentTime + 1000 * seconds >= new Date().getTime()) {
      }
    }
  };
});
