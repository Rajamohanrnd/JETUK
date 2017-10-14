(function () {
    "use strict";
    angular.module('starter.controllers')
    .controller("baseController",baseController);
    
    baseController.$inject = ["$scope","$window"];

    function baseController($scope,$window){
        $scope.openUrl = function(url) {
            $window.open(url, "_system", "location=no", "toolbar=yes");
            $window.event.preventDefault();
        }
    }
})();