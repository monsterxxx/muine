(function(){

'use strict';

angular.module('psApp.services.experiment', [])

.factory('PSExperimentService', function(){
  var value = 0;
  return {
    value: value,
    getValue: function(){
      return value;
    },
    incValue: function(){
      console.log('>PSExperimentService>incValue');
      value++;
      console.log(value);
    }
  };
})
.factory('PSAnotherExperimentFactory', function(PSExperimentService){
  return function(){
    return PSExperimentService.getValue();
  };
});

})();
