/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('CategoryController',["$scope","$stateParams","PostsService",function($scope,$stateParams,PostsService){
    $scope.category = $stateParams.cat
    PostsService.getCategoryPosts($stateParams.cat,$stateParams.subcat).then(function (response) {
      $scope.posts = response
    })

  }]);

