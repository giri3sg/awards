/**
 * Created by Smurf on 11/14/2016.
 */
angular.module('cms')
  .controller('admin.AdsController',function () {
    console.log("inside ads controller")
  })
  
/**
 * Created by Smurf on 10/10/2016.
 */
angular.module('cms')
  .controller('admin.DashboardController',function () {
  });
/**
 * Created by Smurf on 11/14/2016.
 */
angular.module('cms')
  .controller('admin.EditPostController',['PostsService','$stateParams','$scope','settings',function (PostsService,$stateParams,$scope,settings) {
    $scope.categories=settings.categories
    initialize = function(cat,subcat){
      $scope.selectedcat = cat
      $scope.selectedsub = subcat
    }
    $scope.addPost=function (post,cat,subcat){
      if (cat != undefined)
        post.categories.cat=cat
      if (subcat != undefined)
        post.categories.subcat=subcat
      PostsService.editPost(post,$stateParams.id).then(function(response){
        $scope.success=true
      })
    }
    PostsService.getPostById($stateParams.id).then(function(response){
      if(response.categories == undefined)
        response.categories={}
      $scope.post = response
      initialize(response.categories.cat,response.categories.subcat)
    })

  }])
  
/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('LoginController',['$scope','$http','$state', 'md5','$window','$rootScope', function($scope,$http,$state,md5,$window,$rootScope){
    $window.localStorage.clear();
    $scope.user={}
    $scope.login = function () {
      $scope.user.password=md5.createHash($scope.user.password);
      var req = {
        method: 'get',
        url: "/user/login",
        params: {username:$scope.user.username,password:$scope.user.password}
      };

      // send credentials
      $http(req)
        .then(
          function(response){ // Success callback
            $window.localStorage.token=response.data.token;
            $window.localStorage.username=$scope.user.username;
            $rootScope.isAuthenticated=response.data.isAuthenticated
            if(response.data.isAuthenticated==true){
              $state.go('root')
            }
            else{
              $scope.error=response.data
            }
          },
          function(response){ //Error callback
            console.log(response)
            $scope.error=response.data
          }
        );

    }
  }]);

/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.NewPostController',function ($scope,$http,categories) {

    $scope.tags=[]
    $scope.categories = categories

    $scope.createPost=function (post,cat,subcat) {
      post.categories = {}
      post.categories.cat=cat
      post.categories.subcat=subcat
      var d = new Date();
      post.creation_date=d.toISOString();
      post.tags = $scope.tags
      addPost(post).then(function(response) {
        console.log(response)
        $scope.success="true"
      })
    }

    addPost = function (post) {
      return $http.post("/api/post",post)
    }
  });
/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RegistrationController',['$scope','$http','md5',function($scope,$http,md5){
    
    $scope.validate = function (user) {
      if(!user){return true}
      if(!user.username){return true}
      if(!user.email){return true}
      if(!user.password){return true}
    }
    $scope.register = function () {
      $scope.user.password=md5.createHash($scope.user.password);
      console.log($scope.user)
      $scope.data=JSON.stringify($scope.user)
      var req = {
        method: 'post',
        url: "/user/register",
        data: $scope.data
      };
      // Send it
      $http(req)
        .then(
          function(response){ // Success callback
            console.log(response);
            if(response.data._id){
              $scope.success=true;
            }
          },
          function(response){ //Error callback
            console.log(response)
            $scope.error=response.data
          }
        );
    
    }
  }]);


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
/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.SettingsController',["$scope","$http","settings",function ($scope,$http,settings) {

    $scope.categories= settings.categories?settings.categories:[]
    $scope.add = function (name) {
      $scope.categories.push({"name":name})
    };   
    $scope.addSub = function (category,subCat) {
      if(category.subcat == undefined)
        category.subcat=[]
      category.subcat.push(subCat)
    };

    $scope.save = function (categories) {
      $http.post("/api/settings/categories",{"categories":categories}).then(function(response){
      })
    }
    $scope.updateSub = function (name,subs,index) {
      subs[index] = name
    }
    $scope.removeSub = function (index,cindex) {
      $scope.categories[cindex].subcat.splice(index,1)
    }
    $scope.removeCat = function (index) {
      $scope.categories.splice(index,1)
    }
  }]);
/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('CategoryController',["$scope","$stateParams","PostsService",function($scope,$stateParams,PostsService){
    $scope.category = $stateParams.cat
    $scope.subcategory = $stateParams.subcat
    PostsService.getCategoryPosts($stateParams.cat,$stateParams.subcat).then(function (response) {
      $scope.posts = response
    })

  }]);


/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('HomeController',["$scope","$http","PostsService","$state","$mdDialog",function($scope,$http,PostsService,$state,$mdDialog){

    generatePostUrl = function (posts) {
      posts.forEach(function (post) {
        post.urlTitle = post.title.replace(/ /g,"-")
      })
    }
    PostsService.getRecentPosts().then(function (response) {
      $scope.posts = response
      PostsService.recentPosts = response
      generatePostUrl($scope.posts)
    })
    $scope.delete = function(id){
      PostsService.deletePost(id).then(function(response){
        $scope.success = true
        $state.reload();
      })
    }
    $scope.showConfirm = function(ev,id) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete your post?')
        .textContent('All of the post content is going to be deleted.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('chesipardengu!')
        .cancel('voddura saami');
    
      $mdDialog.show(confirm).then(function() {
        $scope.delete(id)
      }, function() {
        console.log("not deleting")
      });
    };
  }]);


/**
 * Created by Girish on 10/03/2016.
 */
angular.module('cms')
  .controller('NavigationController', function($scope, $rootScope, $window,$state,$mdSidenav,$mdMedia){

  });


/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RootController',['$mdMedia','$rootScope','$scope','$timeout','$mdSidenav','$state','$window','MenuService','categories',
      function($mdMedia,$rootScope,$scope, $timeout, $mdSidenav,$state,$window,MenuService,categories){
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

    $scope.$watch(function() { return $mdMedia('gt-sm'); }, function(big) {
      $rootScope.largeScreen = big;
    });
    
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
  }]);


/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('SideNavController', function($scope){
    $scope.sideMenu=[]

    $scope.userSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.dashboard'},
      {'label':'Settings','state':'root.settings'}
    ]
    $scope.chairSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.chair.dashboard'},
      {'label':'Settings','state':'root.chair.settings'},
      {'label':'Assign','state':'root.chair.assign'}
    ]

    $scope.sideMenu =  $scope.userSidenavMenu
  });


/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('PostController',["$timeout","$scope","$stateParams","PostsService",'$mdDialog',
    function($timeout,$scope,$stateParams,PostsService,$mdDialog){
    $scope.id = $stateParams.id

    $timeout(function() {
      $.ajax({ url: 'lib/twitter/widgets.js', cache:true});
    }, 1000);

    PostsService.getPostById($stateParams.id).then(function(response){
      $scope.post = response
    })
    $scope.delete = function(id){
      PostsService.deletePost(id).then(function(response){
        $scope.success = true
      })
    }
    $scope.showConfirm = function(ev,id) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete your post?')
        .textContent('All of the post content is going to be deleted.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('chesipardengu!')
        .cancel('voddura saami');

      $mdDialog.show(confirm).then(function() {
        $scope.delete(id)
      }, function() {
        console.log("not deleting")
      });
    };
  }]);


/**
 * Created by Smurf on 11/6/2016.
 */
angular.module('cms')
  .service('MenuService',function(){
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
  });


/**
 * Created by Smurf on 11/6/2016.
 */
angular.module('cms')
  .service('PostsService',function($http){
    var service = {};
    service.getRecentPosts = function () {
      return $http.get('/api/post/list').then(function (response) {
        return response.data
      })
    };
    service.getCategoryPosts = function (cat,subcat) {
      return $http.get('/api/category/posts',{params:{cat:cat,subcat:subcat}}).then(function (response) {
        return response.data
      })
    };
    service.getTagPosts = function (tag) {
      return $http.get('/api/tag/posts',{params:{tag:tag}}).then(function (response) {
        return response.data
      })
    };
    service.recentPosts = []
    
    service.getPostByTitle = function (title) {
      console.log(service.recentPosts)
    }
    service.getPostById = function (id) {
      return $http.get("/api/post/",{params:{id:id}}).then(function(response){
        return response.data
      })
    }
    service.deletePost = function (id) {
      return $http.post('/api/post/delete',{id:id}).then(function(response){
        console.log("delete successfull")
      })
    }
    
    service.getSettings = function () {
      return $http.get("/api/settings/categories").then(function (response) {
        return response.data
      })
    }
    service.editPost = function (data,id) {
      return $http.post('/api/post/edit',data,{params:{id:id}}).then(function (response) {
        return response.data
      })

    }
    return service
  });


/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('TagController',["$scope","$stateParams","PostsService",function($scope,$stateParams,PostsService){
    $scope.tag = $stateParams.tag
    PostsService.getTagPosts($stateParams.tag).then(function (response) {
      $scope.posts = response
    })

  }]);

