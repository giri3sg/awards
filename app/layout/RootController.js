/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RootController',function($rootScope,$scope, $timeout, $mdSidenav,$state,$window,MenuService,categories){
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.logout=function () {
      $rootScope.username = undefined;
      $window.localStorage.clear();
      $state.go('login')
    }

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
        });

    };


    $scope.publicMenu = MenuService.publicMenu

    $scope.adminMenu = MenuService.adminMenu


    $scope.categories = categories

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }, 200);
    }
  });

