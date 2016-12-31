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