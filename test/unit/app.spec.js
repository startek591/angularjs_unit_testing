(function(){
  describe('Unit Testing', function(){
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
    describe('PasswordController', function(){
      var $controller;
      beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
      }));

      describe('$scope.grade', function() {
        var $scope, controller;
        beforeEach(function(){
          $scope = {};
          controller = $controller('PasswordController', { $scope: $scope});
        })
        it('sets the strength to "strong" if the password length is > 8 chars', function(){
          $scope.password = 'longerthaneightchars';
          $scope.grade();
          expect($scope.strength).toEqual('strong');
        });
        it('sets the strength to "weak" if the password length <3 chars', function() {
          $scope.password = 'a';
          $scope.grade();
          expect($scope.strength).toEqual('weak');
        })
      })
    })
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
    });
    describe('HeroDetailController', function(){
      var $componentController;
      beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
      }));

      it('should call the `onDelete` binding, when deleting the hero', function() {
        var onDeleteSpy = jasmine.createSpy('onDelete');
        var bindings = {hero: {}, onDelete: onDeleteSpy};
        var ctrl = $componentController('heroDetail', null, bindings);

        ctrl.delete();
        expect(onDeleteSpy).toHaveBeenCalledWith({hero: ctrl.hero});
      });

      it('should call the `onUpdate` binding, when updating a property', function() {
        var onUpdateSpy = jasmine.createSpy('onUpdate');
        var bindings = {hero: {}, onUpdate: onUpdateSpy};
        var ctrl = $componentController('heroDetail', null, bindings);
        
        ctrl.update('foo', 'bar');
        expect(onUpdateSpy).toHaveBeenCalledWith({
          hero: ctrl.hero,
          prop: 'foo',
          value: 'bar'
        });
      });
    })
  });
})();