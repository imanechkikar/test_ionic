// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
app.config(function ($stateProvider,$urlRouterProvider) {

  $stateProvider.state(
    "societes",
    {
      url : "/societes",
      templateUrl:"templates/societes.html",
      controller:"societesCtrl"
    }
  );

  $stateProvider.state(
    "ordres",
    {
      url : "/ordres/:codeSociete",
      templateUrl:"templates/ordres.html",
      controller:"OrdresCtrl"
    }
  );

  $stateProvider.state(
    "detail",
    {
      url : "/detail/:idOrdre",
      templateUrl:"templates/detail.html",
      controller:"DetailCtrl"
    }
  );

  $urlRouterProvider.otherwise("societes");

});



app.controller("societesCtrl",function ($scope,$http,$state) {
  $scope.thispage=-1;
  $scope.societes=[];
  $scope.size=10;
  $scope.total=0;
  $scope.chargerSocietes=function (page) {

    $http.get("http://localhost:8080/societes?page="+page+"&size="+$scope.size).success(function (data) {
      data.content.forEach(function(item) {
        $scope.societes.push(item);
      });

      $scope.total=data.totalPages;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (err) {
      console.log(err);
    }) ;

  }

  $scope.loadMoreData=function () {

    ++$scope.thispage;
    $scope.chargerSocietes($scope.thispage);

  }

  $scope.moreDataCanBeLoaded=function () {
    if($scope.thispage<=$scope.total-1)
      $scope.loadMoreData()
  }

  $scope.goToOrdres=function($code){
	  $state.go("ordres",{
		  "codeSociete":$code
	  })
  }
});


app.controller("OrdresCtrl",function($scope,$stateParams,$http,$state){
  $scope.thispage=-1;
  $scope.listOrdres=[];
  $scope.size=10;
  $scope.total=0;
   $scope.codeSociete=$stateParams.codeSociete;




  $scope.chargerOrdres=function (page) {

      $http.get("http://localhost:8080/societes/"+$scope.codeSociete+"/Orders?page="+page+"&size="+$scope.size).success(function (data) {
      data.content.forEach(function(item) {
        $scope.listOrdres.push(item);
      });

      $scope.total=data.totalPages;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (err) {
      console.log(err);
    }) ;

  }

  $scope.loadMoreData=function () {
    ++$scope.thispage;
    $scope.chargerOrdres($scope.thispage);

  }

  $scope.moreDataCanBeLoaded=function () {
    if($scope.thispage<=$scope.total-1)
      $scope.loadMoreData()
  }


  $scope.goToDetail=function($code){
    $state.go("detail",{
      "idOrdre":$code
    })
  }
});

app.controller("DetailCtrl",function($scope,$stateParams,$http){


  $scope.idOrdre=$stateParams.idOrdre;
  $scope.ord=null;
  $http.get("http://localhost:8080/ordre?id="+$scope.idOrdre).success(function (data) {    $scope.ord=data;  });


});







