/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RootController',function($state,$scope,$rootScope,userService,currentuser){
    console.log(currentuser);
    if(currentuser){
      console.log(currentuser)
    }
  });

