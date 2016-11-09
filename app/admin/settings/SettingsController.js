/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.SettingsController',["$scope","$http","settings",function ($scope,$http,settings) {

    $scope.categories= settings.categories?settings.categories:[]
    $scope.add = function (name) {
      $scope.categories.push({"name":name})
    };   
    $scope.addSub = function (category,subCat) {
      if(category.subcat == undefined)
        category.subcat=[]
      category.subcat.push(subCat)
    };

    $scope.save = function (categories) {
      $http.post("/api/settings/categories",{"categories":categories}).then(function(response){
      })
    }
    $scope.updateSub = function (name,subs,index) {
      subs[index] = name
    }
    $scope.removeSub = function (index,cindex) {
      $scope.categories[cindex].subcat.splice(index,1)
    }
    $scope.removeCat = function (index) {
      $scope.categories.splice(index,1)
    }
  }]);