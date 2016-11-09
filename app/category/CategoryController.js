/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('CategoryController',["$scope","$stateParams","PostsService",function($scope,$stateParams,PostsService){

    $scope.category = $stateParams.category
    PostsService.getCategoryPosts($stateParams.category).then(function (response) {
      console.log(response)
      $scope.posts = response
    })

  }]);

