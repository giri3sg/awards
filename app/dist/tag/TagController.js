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

