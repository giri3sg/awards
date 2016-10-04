/** Created by Girish on 2/7/2016.*/
angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('root',{
        url:"/",
        views: {
          'content@':{
            templateUrl: 'layout/content.html'
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
      .state('register', {
        url: "/register",
        views: {
          'content@':{
            templateUrl: 'admin/register/register.html',
            controller: 'RegistrationController'
          }
        }
      })
      .state('login', {
        url: "/login",
        views: {
          'content@': {
            templateUrl: 'admin/login/login.html',
            controller: 'LoginController'
          }
        }
      })



      .state('404', {
        url: "/404",
        views: {
          'content@':{
            templateUrl: '/404.html'
          }
        },
        data: { requireAuth: false }
      })

    });