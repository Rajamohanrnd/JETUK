(function () {
    "use strict";
    angular.module('starter.controllers')
    .controller("homeStartController", homeStartController);
    
    homeStartController.$inject = ["$scope", "$state", "$controller","$ionicSideMenuDelegate"];

    function homeStartController($scope, $state, $controller,$ionicSideMenuDelegate) {
        $controller('baseController', { $scope: $scope });
        $scope.$on('$ionicView.beforeEnter', function (e, data) {
            if (data.enableBack) {
                $ionicSideMenuDelegate.canDragContent(false)
            } else {
                $scope.$root.showMenuIcon = false;
            }
        });
        $scope.$on('$ionicView.enter', function(e,data){
            if (data.enableBack) {
                $scope.$root.showMenuIcon = true;
                $ionicSideMenuDelegate.canDragContent(false)
            } else {
                $scope.$root.showMenuIcon = false;
            }
          });
          $scope.$on('$ionicView.afterEnter', function(e,data){
            if (data.enableBack) {
                $scope.$root.showMenuIcon = true;
                $ionicSideMenuDelegate.canDragContent(false)
            } else {
                $scope.$root.showMenuIcon = false;
            }
          });
    }
})();