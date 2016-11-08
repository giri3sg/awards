/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('CategoryController',["$scope","$stateParams","PostsService",function($scope,$stateParams,PostsService){
    console.log("inside category controller");
    $scope.category = $stateParams.category
    PostsService.getCategoryPosts($stateParams.category).then(function (response) {
      $scope.posts = response
    })

  }]);

