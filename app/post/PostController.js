/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('PostController',["$timeout","$scope","$stateParams","PostsService",'$mdDialog',
    function($timeout,$scope,$stateParams,PostsService,$mdDialog){
    $scope.id = $stateParams.id

    $timeout(function() {
      $.ajax({ url: 'http://platform.twitter.com/widgets.js', cache:true});
    }, 1000);

    PostsService.getPostById($stateParams.id).then(function(response){
      $scope.post = response
    })
    $scope.delete = function(id){
      PostsService.deletePost(id).then(function(response){
        $scope.success = true
      })
    }
    $scope.showConfirm = function(ev,id) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete your post?')
        .textContent('All of the post content is going to be deleted.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('chesipardengu!')
        .cancel('voddura saami');

      $mdDialog.show(confirm).then(function() {
        $scope.delete(id)
      }, function() {
        console.log("not deleting")
      });
    };
  }]);

