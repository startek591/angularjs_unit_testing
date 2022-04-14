(function(){
  const myApp = angular.module('myApp', []);
  myApp.controller('MyController', function($scope) {
    $scope.spices = [{"name":"pasilla", "spiciness":"mild"},
                     {"name":"jalapeno", "spiciness":"hot hot hot!"},
                     {"name":"habenero", "spiciness":"LAVA HOT!!"}];
    $scope.spice = "habanero";
  });
  myApp.controller('PasswordController', function PasswordController($scope) {
    $scope.password = '';
    $scope.grade = function() {
      var size = $scope.password.length;
      if (size > 8) {
        $scope.strength = 'strong';
      } else if (size > 3) {
        $scope.strength = 'medium';
      } else {
        $scope.strength = 'weak';
      }
    }
  });
  myApp.controller('MainController', ['$scope', function($scope) {
    $scope.timeOfDay = 'morning';
    $scope.name = 'Nikki';
  }]);
  myApp.controller('ChildController', ['$scope', function($scope) {
    $scope.name = 'Mattie';
  }]);
  myApp.controller('GrandChildController', ['$scope', function($scope) {
    $scope.timeOfDay = 'evening';
    $scope.name = 'Gingerbread Baby';
  }]);
  myApp.controller('MyController2', ['$scope', 'notify', function($scope, notify) {
    $scope.callNotify = function(msg) {
      notify(msg);
    };
  }])
  .factory('notify', ['$window', function(win) {
    var msgs = [];
    return function(msg) {
      msgs.push(msg);
      if (msgs.length === 3) {
        win.alert(msgs.join('\n'));
        msgs = [];
      }
    };
  }]);
  myApp.component('heroDetail', {
    templateUrl:'heroDetail.html',
    controller: function HeroDetailController() {
      var ctrl = this;
      ctrl.delete = function() {
        ctrl.onDelete({hero: ctrl.hero});
      };
  
      ctrl.update = function(prop, value) {
        ctrl.onUpdate({hero: ctrl.hero, prop: prop, value: value});
      };
    },
    bindings: {
      hero: '<',
      onDelete: '&',
      onUpdate: '&'
    }
  });
})();