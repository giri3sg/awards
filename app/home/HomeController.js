/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('HomeController',["$scope","$http","PostsService",function($scope,$http,PostsService){

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

  }]);

