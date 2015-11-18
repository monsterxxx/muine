(function(){

'use strict';

describe('navbar component', function() {

  var $controller, $rootScope, mockMuineDataSvc;

  beforeEach(function () {
    module('ui.router');
    module(function($provide){
      $provide.factory('mockMuineDataSvc', function(){
        return {
          getData: function(){
              return {
                clubs: [{
                  name: 'Rids'
                },{
                  name: 'Surf4You'
                },{
                  name: 'VKS'
                },{
                  name: 'Kitesurf Vietnam'
                }]
              };
          }
        };
        //this.showModalDialog = jasmine.createSpy('showModalDialog');
      });
    });
    module('ps.muine.navbar');
    inject(function(_$controller_, _$rootScope_ ,_mockMuineDataSvc_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      mockMuineDataSvc = _mockMuineDataSvc_;
    });
  });

  describe('navbar controller', function(){

    var $scope, controller;

    beforeEach(function() {
      $scope = $rootScope.$new();
      controller = $controller('NavbarCtrl', {
        $scope: $scope,
        MuineDataSvc: mockMuineDataSvc
      });
    });

    it('should find prev and next indexes in array', function() {

      $scope.data = {
        clubs: [{
          name: 'Rids'
        },{
          name: 'Surf4You'
        },{
          name: 'VKS'
        },{
          name: 'Kitesurf Vietnam'
        }]
      };

      expect($scope.prevId('clubs', 0)).toEqual(3);
      expect($scope.prevId('clubs', 2)).toEqual(1);

      expect($scope.nextId('clubs', 3)).toEqual(0);
      expect($scope.nextId('clubs', 1)).toEqual(2);
    });

  });
});

})();
