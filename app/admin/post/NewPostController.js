/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.NewPostController',function ($scope,$http) {
    console.log("inside new post controller")
    $scope.addPost=function (post) {
      var d = new Date();
      var n = d.toISOString();
      post.creation_date=n
      console.log(post)
      var req = {
        method: 'post',
        url: "/api/post",
        data: post
      };

      $http(req).then(function(response) {
        console.log(response)
      })
      $http.get('/api/post/list').then(function (response) {
        console.log(response)
      })
      
    }

  });