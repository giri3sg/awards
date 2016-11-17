/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.NewPostController',function ($scope,$http,categories) {

    $scope.tags=[]
    $scope.categories = categories

    $scope.addPost=function (post,cat,subcat) {
      post.categories = {}
      post.categories.cat=cat
      post.categories.subcat=subcat
      var d = new Date();
      post.creation_date=d.toISOString();
      post.tags = $scope.tags
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