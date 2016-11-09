/** Created by Girish on 2/7/2016.*/
angular.module('routes')
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $stateProvider
      .state('vm',{
        url:"/vm",
        views:{
          'content@':{
            templateUrl: 'layout/content.html',
            controller:'RootController'
          }
        },
        resolve: {
          checklogin: function (authService,$state,$rootScope) {
            authService.auth().then(function(response){
                $rootScope.isAuthenticated = response.data.isAuthenticated
                if(!response.data.isAuthenticated){$state.go('login')}
              },
              function (err) {
                console.log(err)
                $window.localStorage.clear();
                $state.go('login')}
            );
          },
          currentuser: function (userService) {
            return userService.currentUser()
          }
        }
      })
      .state('register', {
        url: "/vm/register",
        views: {
          'content@':{
            templateUrl: 'admin/register/register.html',
            controller: 'RegistrationController'
          }
        }
      })
      .state('login', {
        url: "/vm/login",
        views: {
          'content@': {
            templateUrl: 'admin/login/login.html',
            controller: 'LoginController'
          }
        }
      })
      .state('vm.dashboard', {
        url: "/dashboard",
        views: {
          'main@': {
            templateUrl: 'admin/dashboard/dashboard.html',
            controller: 'admin.DashboardController'
          }
        }
      })
      .state('vm.newpost', {
        url: "/newpost",
        views: {
          'main@': {
            templateUrl: 'admin/newpost/new-post.html',
            controller: 'admin.NewPostController'
          }
        }
      })
      .state('vm.settings', {
        url: "/settings",
        views: {
          'main@': {
            templateUrl: 'admin/settings/settings.html',
            controller: 'admin.SettingsController'
          }
        },
        resolve:{
          settings: function (PostsService){
            return PostsService.getSettings()
          }
        }
      })
    });