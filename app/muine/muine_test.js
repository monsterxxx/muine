'use strict';

describe('myApp.muine module', function() {

  beforeEach(module('ui.router'));
  beforeEach(module('myApp.muine'));

  describe('muine controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var MuineCtrl = $controller('MuineCtrl');
      expect(MuineCtrl).toBeDefined();
    }));

  });
});
