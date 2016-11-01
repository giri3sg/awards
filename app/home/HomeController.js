/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('HomeController',function($scope,$http){
    console.log("inside home controller");
    $http.get('/api/post/list').then(function (response) {
      console.log(response)
      $scope.posts = response.data 
    })
  });

