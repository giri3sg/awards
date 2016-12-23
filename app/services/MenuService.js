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
        "link" :"root.vm.dashboard"
      },
      {
        "name" :"Settings",
        "link" :"root.vm.settings"
      },
      {
        "name" :"Ads",
        "link" :"root.vm.ads"
      },
      {
        "name" :"New Post",
        "link" :"root.vm.newpost"
      }
    ];
    return service
  }]);

