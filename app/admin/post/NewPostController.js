/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.NewPostController',function ($scope) {
    console.log("inside new post controller")
    $scope.addPost=function (post) {
      console.log(post)
      var d = new Date();
      var n = d.toISOString();
      console.log(n)
    }

  });