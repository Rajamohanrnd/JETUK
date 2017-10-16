(function () {
    "use strict";
    angular.module('starter.controllers')
    .factory("staticDataService", staticDataService);
    staticDataService.$inject = ["$http", "$q"];
    function staticDataService($http, $q) {
        var result;
        return {
            getStaticSlokas: function() {
                var d = $q.defer();
                $http.get('lib/slokas.json').then(function(response) {
    
                    result = response.data;
                    d.resolve(result);
                });
                return d.promise;
            },
            getsbStaticSlokas: function() {
                var d = $q.defer();
                $http.get('lib/sbSlokas.json').then(function(response) {
    
                    result = response.data;
                    d.resolve(result);
                });
                return d.promise;;
            },
            getPrajnaSlokas: function() {
                var d = $q.defer();
                $http.get('lib/prajnaSlokas.json').then(function(response) {
    
                    result = response.data;
                    d.resolve(result);
                });
                return d.promise;;
            }
        };
    }
})();