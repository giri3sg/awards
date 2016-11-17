/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('PostController',["$scope","$stateParams","PostsService",function($scope,$stateParams,PostsService){
    PostsService.getPostById($stateParams.id).then(function(response){
      $scope.post = response
    })
  }]);
