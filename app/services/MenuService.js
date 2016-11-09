/**
 * Created by Smurf on 11/6/2016.
 */
angular.module('cms')
  .service('MenuService',['$http','$rootScope','authService',function($http,$rootScope,authService){
    var service = {};

    service.publicMenu = [
      {
        "name":"Home",
        "link":"root"
      }
    ];
    service.adminMenu = [
      {
        "name" :"Dashboard",
        "link" :"vm.dashboard"
      },
      {
        "name" :"Settings",
        "link" :"vm.settings"
      }
    ];
    service.getMenu = function () {
      var menu = publicMenu
      if($rootScope.isAuthenticated){
        menu = menu.concat(adminMenu)
      }
      return menu
    }
    service.getSettings = function () {
      return $http.get("/api/settings/categories").then(function (response) {
        return response.data
      })
    }
    return service
  }]);

