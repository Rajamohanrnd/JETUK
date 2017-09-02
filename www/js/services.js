angular.module('acharyaApp.services', ['ngCordova','ionic.service.core', 'ionic.service.push'])
    .service('rssService', function($http, $q){
        var storedData = {};

        var setData = function(data, type){
            if(data){
                storedData[type] = data;
            }
        }

        var getData = function(url){
            var deferred = $q.defer();
            //TODO error handling
            return $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%20%3D%20'"+ url +"'&format=json&callback=")
                .then(function(response){
                    //TODO empty response handling
                    deferred.resolve(response.data.query.results.item);
                    return deferred.promise;
                })
        };

        this.getEvents = function(reload){
            if(storedData.events && !reload){
                return storedData.events;
            }
            else{
                return getData('https://www.jetuk.org/ach/jetuk-updates.xml').then(function(results){
                    setData(results, 'events');
                    return storedData.events;
                });
            }
        };

        this.getDates = function(reload){
            if(storedData.dates && !reload){
                return storedData.dates;
            }
            else{
                return getData('https://www.jetuk.org/ach/jetuk-ekadasidates.xml').then(function(results){
                    setData(results, 'dates');
                    return storedData.dates;
                });
            }
        };

        this.getDiscourses = function(reload){
            if(storedData.discourses && !reload){
                return storedData.discourses;
            }
            else{
                return getData('https://www.jetuk.org/ach/jetuk-discourses.xml').then(function(results){
                    setData(results, 'discourses');
                    return storedData.discourses;
                });
            }
        };

        this.getVideos = function(){
            if(storedData.videos && !reload){
                return storedData.videos;
            }
            else{
                return getData('https://www.jetuk.org/ach/jetuk-videos.xml').then(function(results){
                    //TODO modify videos to be embed
                    setData(results, 'videos');
                    return storedData.videos;
                });
            }
        };

    })


    .service('staticDataService', function($http, $q){
        var data = {};
        return {
            getStaticSlokas: function(){
                if(data.slokas) {
                    return data.slokas;
                }
                else{
                    var deferred = $q.defer();
                    return $http.get('lib/slokas.json').then(function(response){
                        data.slokas = response.data;
                        deferred.resolve(response.data);
                        return deferred.promise;
                    });
                }
            }

        };
    })

    .service('dummyService', function(){
        //as a template
    })