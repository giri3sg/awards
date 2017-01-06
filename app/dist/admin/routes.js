/** Created by Girish on 2/7/2016.*/
angular.module('routes')
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $stateProvider
      .state('root.vm',{
        url:"vm",
        resolve: {
          checklogin: function (authService,$state,$rootScope) {
            authService.auth().then(function(response){
              $rootScope.isAuthenticated = response.data.isAuthenticated
              if(!response.data.isAuthenticated){$state.go('login')}
              }
            ,function(e){
                console.log("token expired")
                $state.go('login')
              }
            );
          },
          currentuser: function (userService) {
            return userService.currentUser()
          },
          settings: function (PostsService){
            return PostsService.getSettings()
          }
        }
      })
      .state('register', {
        url: "/vm/register",
        views: {
          'content@':{
            templateUrl: 'dist/admin/register/register.html',
            controller: 'RegistrationController'
          }
        }
      })
      .state('login', {
        url: "/vm/login",
        views: {
          'content@': {
            templateUrl: 'dist/admin/login/login.html',
            controller: 'LoginController'
          }
        }
      })
      .state('root.vm.dashboard', {
        url: "/dashboard",
        views: {
          'main@': {
            templateUrl: 'dist/admin/dashboard/dashboard.html',
            controller: 'admin.DashboardController'
          }
        }
      })
      .state('root.vm.newpost', {
        url: "/newpost",
        views: {
          'main@': {
            templateUrl: 'dist/admin/newpost/new-post.html',
            controller: 'admin.NewPostController'
          }
        }
      })
      .state('root.vm.settings', {
        url: "/settings",
        views: {
          'main@': {
            templateUrl: 'dist/admin/settings/settings.html',
            controller: 'admin.SettingsController'
          }
        }
      })
      .state('root.vm.ads', {
        url: "/ads",
        views: {
          'main@': {
            templateUrl: 'dist/admin/ads/ads.html',
            controller: 'admin.AdsController'
          }
        }
      })
      .state('root.vm.editpost', {
        url: "/post/edit/:id",
        views: {
          'main@': {
            templateUrl: 'dist/admin/editpost/edit-post.html',
            controller: 'admin.EditPostController'
          }
        }
      })
    });