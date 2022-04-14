(function(){
  const myApp = angular.module('myApp', []);
  myApp.controller('MyController', function($scope) {
    $scope.spices = [{"name":"pasilla", "spiciness":"mild"},
                     {"name":"jalapeno", "spiciness":"hot hot hot!"},
                     {"name":"habenero", "spiciness":"LAVA HOT!!"}];
    $scope.spice = "habanero";
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
})();