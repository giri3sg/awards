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
    service.getCategoryPosts = function (cat,subcat) {
      return $http.get('/api/category/posts',{params:{cat:cat,subcat:subcat}}).then(function (response) {
        return response.data
      })
    };
    service.getTagPosts = function (tag) {
      return $http.get('/api/tag/posts',{params:{tag:tag}}).then(function (response) {
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
    
    service.getSettings = function () {
      return $http.get("/api/settings/categories").then(function (response) {
        return response.data
      })
    }
    return service
  });

