/**
 * Created by Girish on 5/9/2016.
 */
'use strict';

/**
 * @ngdoc overview
 * @name cms
 * @description
 * # cms
 *
 * Main module of the application.
 */
angular
  .module('cms', [
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'routes',
    'ui.bootstrap',
    'ngMd5',
    'ngMessages',
    'ui.tinymce'
  ]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
  }).service('authService',['$http','$window',function($http,$window) {
    var service = {}
    service.auth = function () {
      return $http.post('/api/auth',{username:$window.localStorage.username})
    }
    return service
  }]).service('userService',['$http','$window',function($http,$window) {
    var service = {}
    service.currentUser = function () {
      if ($window.localStorage.token && $window.localStorage.username){
        var req = {method:'get',url:"/api/user/user-details",params:{username:$window.localStorage.username}};
        return $http(req)
      }
      else { console.log("something is wrong ")}
    }
    return service
  }]).run(['$http','$window','$rootScope', 'authService',function($http,$window,$rootScope,authService) {
    $rootScope.tinymceOptions = {
      theme: "modern",
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
      image_advtab: true,
      min_height: 100
    };
    $rootScope.$on('$stateChangeStart', function () {
      // adding the token to the http request header field autherization
      $http.defaults.headers.common['Authorization'] =  'Bearer ' + $window.localStorage.token;
      $rootScope.username=$window.localStorage.username

      //checking if the user is admin or user
      authService.auth().then(function(response) {
        $rootScope.isAuthenticated = response.data.isAuthenticated
      })
    });
  }])
  .config(function($sceProvider) {
    $sceProvider.enabled(false);
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });
angular.module('routes', ['ui.router']);