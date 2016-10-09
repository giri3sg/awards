/** Created by Girish on 2/7/2016.*/
angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('root',{
        url:"/",
        views: {
          'content@':{
            templateUrl: 'layout/content.html',
            controller:'RootController'
          } ,
          'sidenav@':{
            templateUrl: 'layout/sidenav.html',
            controller:'SideNavController'
          },
          'main@':{
            templateUrl: 'home/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('vm',{
        url:"/vm",
        views:{
          'content@':{
            templateUrl: 'layout/content.html',
            controller:'RootController'
          }
        },
        resolve: {
          checklogin: function (authService,$window,$state) {
            authService.auth($window.localStorage.token,$window.localStorage.username).then(function(response){
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
      .state('404', {
        url: "/404",
        views: {
          'content@':{
            templateUrl: '/404.html'
          }
        }
      })


    $urlRouterProvider.otherwise("/404");
    });