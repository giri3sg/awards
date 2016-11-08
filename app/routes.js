/** Created by Girish on 2/7/2016.*/
angular.module('routes')
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
      .state('root.404', {
        url: "404",
        views: {
          'main@':{
            templateUrl: '/404.html'
          }
        }
      })
      .state('root.post', {
        url: "post/:title?:id",
        views: {
          'main@':{
            templateUrl: '/post/post.html',
            controller: 'PostController'
          }
        }
      })
      .state('root.category', {
        url: "category/:category",
        views: {
          'main@':{
            templateUrl: '/category/category.html',
            controller: 'CategoryController'
          }
        }
      })



    $urlRouterProvider.otherwise("/404");
    });