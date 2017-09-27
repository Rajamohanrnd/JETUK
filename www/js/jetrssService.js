(function(){
    angular.module('starter.controllers')
    .factory('rssService1', rssService);
    rssService.$inject = ["$http","$q"];
    function rssService($http,$q) {
        var entries;
        return {

            getEntries: function(url,reload) {
                var deferred = $q.defer();
                if(entries && !reload) {
                    deferred.resolve(entries);
                } else {
					

                    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'"+ url +"'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
                    .then(function(results) {
                    entries = results.data.query.results;
                    deferred.resolve(entries);
                                

                            },function error(d){
                    console.log(d);
                  });

                }
                return deferred.promise;
            }

        };
    }
    angular.module('starter.controllers')
      .factory("staticDataService1",staticDataService);
      staticDataService.$inject = ["$http","$q"];
      function staticDataService($http,$q){
        var result;
        return{
          getStaticSlokas: function(){
            var d = $q.defer();
          $http.get('lib/slokas.json').then(function(response){
             
            result = response.data;
            d.resolve(result);
          });
          return d.promise;
          },
          getsbStaticSlokas:function(){
            var d = $q.defer();
            $http.get('lib/sbSlokas.json').then(function(response){
               
              result = response.data;
              d.resolve(result);
            });
            return d.promise;;
          }
        };
      }
})();