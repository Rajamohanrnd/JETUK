(function () {
    "use strict";
angular.module('starter.controllers')//, ['ngCordova','ionic.service.core', 'ionic.service.push',])
.service("rssServiceData1",rssServiceData);
function rssServiceData(){
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
  }
})();