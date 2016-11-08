/**
 * Created by Smurf on 10/22/2016.
 */

angular.module('cms')
  .controller('admin.SettingsController',["$scope","$http","settings",function ($scope,$http,settings) {
    console.log("inside settings controller")

    $scope.categories= settings.categories?settings.categories:[]
    console.log($scope.categories)
    $scope.add = function (name) {
      $scope.categories.push({"name":name})
      console.log($scope.categories)
    };   
    $scope.addSub = function (category,subCat) {
      if(category.subcat == undefined)
        category.subcat=[]
      category.subcat.push(subCat)
    };

    $scope.save = function (categories) {
      console.log(categories)
      $http.post("/api/settings/categories",{"categories":categories}).then(function(response){
        console.log(response)
      })
    }
    $scope.updateSub = function (name,subs,index) {
      subs[index] = name
      console.log(index)
      console.log(subs)
    }

  }]);