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
      });
    });
    describe('Unit Testing on Service', function(){
      beforeEach(function() {
        mock = {alert: jasmine.createSpy()};
        module(function($provide) {
          $provide.value('$window', mock);
        });

        inject(function($injector) {
          notify = $injector.get('notify');
        });
      });
      it('should not alert first two notifications', function() {
        notify('one');
        notify('two');
        expect(mock.alert).not.toHaveBeenCalled();
      });
      it('should alert all after third notification', function() {
        notify('one');
        notify('two');
        notify('three');
        expect(mock.alert).toHaveBeenCalledWith("one\ntwo\nthree");
      });
      it('should clear messages after alert', function() {
        notify('one');
        notify('two');
        notify('third');
        notify('more');
        notify('two');
        notify('third');
        expect(mock.alert.calls.count()).toEqual(2);
        expect(mock.alert.calls.mostRecent().args).toEqual(["more\ntwo\nthird"]);
      });
    })
  });
})();