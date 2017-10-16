(function () {
    "use strict";
    angular.module('starter.controllers')
    .controller("homeController", homeController);
    homeController.$inject = ["$scope","$state","$controller"];
    
    function homeController($scope, $state, $controller) {
        
        $controller('baseController', { $scope: $scope });
    }
})();