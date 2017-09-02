angular.module('acharyaApp.services', ['ngCordova','ionic.service.core', 'ionic.service.push'])
    .service('rssServiceData', function(){
        this.staticFeedDataEvents;

        this.setRssFeedEvents = function(data){
          if(data){
            window.localStorage["eventsRss"] = JSON.stringify(data);
          }
          this.staticFeedDataEvents = data;
        }

        this.getFeedDataEvents = function(){
          if(window.localStorage["eventsRss"])
             return JSON.parse(window.localStorage["eventsRss"]);
          return this.staticFeedDataEvents;
        }

        this.staticFeedDataDates;

        this.setRssFeedDates = function(data){
          if(data){
            window.localStorage["datesRss"] = JSON.stringify(data);
          }
          this.staticFeedDataDates = data;
        }

        this.getFeedDataDates = function(){
          if(window.localStorage["datesRss"])
             return JSON.parse(window.localStorage["datesRss"]);
          return this.staticFeedDataDates;
        }

        this.staticFeedDataDiscourses;

        this.setRssFeedDiscourses = function(data){
          if(data){
            window.localStorage["discourceRss"] = JSON.stringify(data);
          }
          this.staticFeedDataDiscourses = data;
        }

        this.getFeedDataDiscourses = function(){
          if(window.localStorage["discourceRss"])
             return JSON.parse(window.localStorage["discourceRss"]);
          return this.staticFeedDataDiscourses;
        }

        this.staticFeedDataVideos;

        this.setRssFeedVideos = function(data){
          if(data){
            window.localStorage["videosRss"] = JSON.stringify(data);
          }
          this.staticFeedDataVideos = data;
        }

        this.getFeedDataVideos = function(){
          if(window.localStorage["videosRss"])
             return JSON.parse(window.localStorage["videosRss"]);
          return this.staticFeedDataVideos;
        }

        this.staticSlokas;

        this.setStaticSlokas = function(data){
          this.staticSlokas = data;
        }

        this.getStaticSlokas = function(){
          return this.staticSlokas;
        }
    })




    .service('rssService', function($http, $q){
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
    })







    .service('staticDataService', function(){
        var result;
        return{
          getStaticSlokas: function(){
            var d = $q.defer();
          $http.get('lib/slokas.json').then(function(response){
             
            result = response.data;
            d.resolve(result);
          });
          return d.promise;;
          }
        };
    })

    .service('dummyService', function(){
    })