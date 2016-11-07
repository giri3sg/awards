/**
 * Created by Smurf on 11/6/2016.
 */
angular.module('cms')
  .service('PostsService',function($http){
    var service = {};
    service.getRecentPosts = function () {
      return $http.get('/api/post/list').then(function (response) {
        return response.data
      })
    };
    service.getCategoryPosts = function (category) {
      return $http.get('/api/category/posts',{params:{category:category}}).then(function (response) {
        return response.data
      })
    };
    service.recentPosts = []
    
    service.getPostByTitle = function (title) {
      console.log(service.recentPosts)
    }
    service.getPostById = function (id) {
      return $http.get("/api/post/",{params:{id:id}}).then(function(response){
        return response.data
      })
    }
    
    return service
  });

