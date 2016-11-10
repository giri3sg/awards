/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.NewPostController',function ($scope,$http,categories) {
    $scope.tinymceOptions = {
      theme: "modern",
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
      image_advtab: true,
      min_height: 300
    };
    $scope.tags=[]
    $scope.categories = categories

    $scope.addPost=function (post,cat,subcat) {
      post.categories = []
      post.categories.push(cat)
      post.categories.push(subcat)
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