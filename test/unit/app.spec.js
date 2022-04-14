(function(){
  describe('Controller Testing', function(){
    beforeEach(module('myApp'));
    describe('MyController', function(){
      var $scope;
      beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('MyController', {$scope: $scope});
      }));

      it('should create "spices" model with 3 spices', function() {
        expect($scope.spices.length).toBe(3);
      });

      it('should set the default value of spice', function() {
        expect($scope.spice).toBe('habanero');
      });
    });
    describe('Scope Hierarchy', function(){
      beforeEach(inject(function($rootScope, $controller) {
        mainScope = $rootScope.$new();
        $controller('MainController', {$scope: mainScope});
        childScope = mainScope.$new();
        $controller('ChildController', {$scope: childScope});
        grandChildScope = childScope.$new();
        $controller('GrandChildController', {$scope: grandChildScope});
      }));

      it('should have over and selected', function() {
        expect(mainScope.timeOfDay).toBe('morning');
        expect(mainScope.name).toBe('Nikki');
        expect(childScope.timeOfDay).toBe('morning');
        expect(childScope.name).toBe('Mattie');
        expect(grandChildScope.timeOfDay).toBe('evening');
        expect(grandChildScope.name).toBe('Gingerbread Baby');
      })
    })
  });
})();