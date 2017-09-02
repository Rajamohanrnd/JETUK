angular.module('acharyaApp.controllers', ['ngCordova','ionic.service.core', 'ionic.service.push'])
  .controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPlatform,$rootScope,$ionicPush,rssService,rssServiceData) {

  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	$ionicPlatform.ready(function() {

    

        $ionicPush.register({
          canShowAlert: true, //Can pushes show an alert on your screen?
          canSetBadge: true, //Can pushes update app icon badges?
          canPlaySound: true, //Can notifications play a sound?
          canRunActionsOnWake: true, //Can run actions outside the app,
          onNotification: function(notification) {
            // Handle new push notifications here
            alert(notification);
            return true;
          }
        }); 
    });
    
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller("homeController",function($scope){
  $scope.openUrl = function(url){
    window.open(url,"_blank","location=yes");
    }
})
.controller("eventController", function($scope,$rootScope,rssService,rssServiceData){

  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedEvents(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataEvents().item;
            });
});
  $scope.doRefresh = function(){
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedEvents(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataEvents().item;
                $scope.$broadcast('scroll.refreshComplete');
            });
  }
  $scope.$watch('rssServiceData.getFeedDataEvents()',function(nval,oldVal){
    if(rssServiceData.getFeedDataEvents()){
      $scope.eventList = rssServiceData.getFeedDataEvents().item;
    }
  });
})
.controller('priestController',function($scope){
  $scope.openUrl = function(url){
    window.open(url,"_blank","location=yes");
  }
})
.controller('slokasController', function($scope,$window) {
  var vm = this;
  $scope.sendEmail = sendEmail;
    var slokas = [{ title: "Haryastakam", key: "HARI"},
  {title: "Krishnastakam" ,key:"KRISHNA"},{title: "Adityahrdhayam" ,key:"AADITYA"},
{title:"Pancha:yudha Stho:tram", key:"PANCHA"},
{title:"Guruparampara", key:"GURU"},
{title:"Slokadwayam or Gajendramokshamu", key:"SLOKADVAYAM"},
{title:"Sri Saranagati Slokam", key:"SARANAGATHI"}];
  $scope.slokas = slokas;
  function sendEmail() {
  // if ($window.plugins && $window.plugins.emailComposer) { //check if plugin exists

  //   $window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
  //       //console.log("Email sent successfully");
  //     },

  //     'Acharya-Beta - Test Email',        // Subject
  //     'How are you? Nice greetings from JETUK',        // Body
  //     ['rajamohanrnd@gmail.com'],     // To (Email to send)
  //     'jetuk.seva@gmail.com',        // CC
  //     null,        // BCC
  //     true,       // isHTML
  //     null,        // Attachments
  //     null);       // Attachment Data
  // }
  }

  var email = {
    to: 'rajamohanrnd@gmail.com',
    cc: 'jetuk.seva@gmail.com',
    //bcc: ['john@doe.com', 'jane@doe.com'],
    
    subject: 'Acharya-Beta - Test Email',
    body: 'How are you? Nice greetings from JETUK',
    isHtml: true
  };


})
.controller("ekadasiController",function($scope,$rootScope,rssService,rssServiceData){
  rssService.getEntries('https://www.jetuk.org/ach/jetuk-ekadasidates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDates(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataDates().item;
            });
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-ekadasidates.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDates(entries.rss.channel)
                $scope.eventList = rssServiceData.getFeedDataDates().item;
            });
});
           $scope.$watch('rssServiceData.getFeedDataDates()',function(nval,oldVal){
    if(rssServiceData.getFeedDataDates()){
      $scope.eventList = rssServiceData.getFeedDataDates().item;
    }
  });
})
.controller("videoController",function($scope,$rootScope,rssService,rssServiceData){
  rssService.getEntries('https://www.jetuk.org/ach/jetuk-videos.xml',true).then(function(entries) {
                rssServiceData.setRssFeedVideos(entries.rss.channel)
                var videos = rssServiceData.getFeedDataVideos().item;
                for (var index = 0; index < videos.length; index++) {
                  var element = videos[index];
                  if(element.link){
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  videos[index].link = link;
                  }
                }
                $scope.videos = videos;
            });
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-videos.xml',true).then(function(entries) {
                rssServiceData.setRssFeedVideos(entries.rss.channel)
                var videos = rssServiceData.getFeedDataVideos().item;
                for (var index = 0; index < videos.length; index++) {
                  var element = videos[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  videos[index].link = link;
                }
                $scope.videos = videos;
            });
});
           $scope.$watch('rssServiceData.getFeedDataVideos()',function(nval,oldVal){
    if(rssServiceData.getFeedDataVideos()){
      $scope.videos = rssServiceData.getFeedDataVideos().item;
    }
  });
})
.controller("discoursesController",function($scope,$sce,rssService,rssServiceData){
  
   function trustSrc(src) {
    return $sce.trustAsResourceUrl(src).toString();
  }
  
  rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDiscourses(entries.rss.channel)
                var discourses = rssServiceData.getFeedDataDiscourses().items;
                for (var index = 0; index < discourses.item.length; index++) {
                  var element = discourses.item[index];
                  //var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  //discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
                }
                $scope.discourses = discourses.item;
                
            });
             
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDiscourses(entries.rss.channel)
                var discourses = rssServiceData.getFeedDataDiscourses().item;
                for (var index = 0; index < discourses.length; index++) {
                  var element = discourses[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
                }
                $scope.discourses = discourses;
            });
  });
          $scope.$on('$ionicView.leave', function(ev) {
          });
          $scope.$on('$ionicNavView.enter',function(ev){
               if(ev.targetScope !== $scope)
        return;
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml',true).then(function(entries) {
                rssServiceData.setRssFeedDiscourses(entries.rss.channel)
                var discourses = rssServiceData.getFeedDataDiscourses().items;
                for (var index = 0; index < discourses.item.length; index++) {
                  var element = discourses.item[index];
                  var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                  discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
                }
                $scope.discourses = discourses.item;
            });
          });
  $scope.$watch('rssServiceData.getFeedDataDiscourses()',function(nval,oldVal){
    if(rssServiceData.getFeedDataDiscourses()){
      $scope.discourses = rssServiceData.getFeedDataDiscourses().items.item;
      //$scope.testLink = $sce.trustAsResourceUrl($scope.discourses[0].link).toString();
    }
  });
})
.controller("discourseController",function($scope,$sce,$stateParams,rssService,rssServiceData){
  $scope.title = $stateParams.key; 
  var items = rssServiceData.getFeedDataDiscourses().items.item;
  $scope.selectedDiscourse = items.filter(function(data){
    if(data.title === $stateParams.key)
      return true;
    return false;
  });
  loadData();
  function loadData(){
    var selectedItem = $scope.selectedDiscourse[0].items.item;
  for (var index = 0; index < selectedItem.length; index++) {
    var element = selectedItem[index];
    var link = element.link.replace('watch?v=','embed/') + "?rel=0";
    selectedItem[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
  }
  $scope.selectedItem = selectedItem;
}

})
.controller('slokaController', function($scope,$state, $stateParams,staticDataService) {
  var vm = this;
  $scope.onlanguageChange = onlanguageChange;
  staticDataService.getStaticSlokas().then(function(data){
    var s = data;
    setData(s);
  });
  function setData(data){
    var slokas = data;
    //$scope.dynamicTrack = {};
    $scope.options = [{ code:"en",text:"English"},{code:"te",text:"Telugu"}];
    $scope.lang = $scope.options[0];//{ code:"en",text:"English"};
    //$scope.selectedLang = {};
    $scope.title = $stateParams.key; 
    $scope.selectedSloka = slokas.filter(function(d){
        if(d.key === $stateParams.key)
          return true;
        return false;
    });
      if($scope.selectedSloka[0]){
       $scope.slokaText =  $scope.selectedSloka[0].sloka.filter(function(d){
        if(d.lang === "en")
          return true;
        return false;
     })[0];
      }
      if($scope.selectedSloka[0]){
     $scope.dynamicTrack = { url: $scope.selectedSloka[0].url, 
            artist: $scope.selectedSloka[0].artist,
            title: $scope.selectedSloka[0].title };   // assign one track
      }
     $scope.togglePlayback = !$scope.togglePlayback;
  }
    
      //refreshText($scope.selectedLang);
      function refreshText(newVal,oldVal){
        if(newVal === oldVal) return;
          $scope.slokaText =  $scope.selectedSloka[0].sloka.filter(function(d){
        if(d.lang === newVal.code)
          return true;
        return false;
     })[0];
      }
      function onlanguageChange(lang){
        //vm.selectedLang = val;
        //var cc = $scope.lang.code;
        refreshText(lang);
    }
    
    
      //$scope.$watch(function(){return $scope.lang},refreshText);
})
.controller('playlistController', function($scope, $stateParams,MediaManager) {
  $scope.dynamicTrack = {};   // we use this scope variable to dynamically assign a track
    $scope.tracks = [
      {
        url: '/android_asset/www/audio/haryashtakam.mp3', // audio file stored in device's app folder
            artist: 'Prahaladha',
            title: 'Haryashtakam',
            index:0
      },
          {
            url: 'http://www.prapatti.com/slokas/mp3/aadityahrudayam.mp3', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Aadityahrudayam',
            index:1
          }
    ]
    $scope.track = 
      {
            url: 'http://www.prapatti.com/slokas/mp3/aadityahrudayam.mp3', // audio file stored in device's app folder
            artist: 'Prahaladha',
            title: 'Haryashtakam'
        };
          
    $scope.stopPlayback = function() {
        MediaManager.stop();  // will stop any audio currently playing
    };

    $scope.playTrack = function(index) {
        $scope.dynamicTrack = $scope.tracks[index];   // assign one track

        $scope.togglePlayback = !$scope.togglePlayback; // start playback when track changes    
    };
});


    

angular.module('ionicApp', ['ionic', 'ionic.rating'])

.controller('MainCtrl', function($scope) {

  $scope.ratingFull = {};
  $scope.ratingFull.rate = 3;
  $scope.ratingFull.max = 5;
  
  $scope.ratingHalf = {};
  $scope.ratingHalf.rate = 3.5;
  $scope.ratingHalf.max = 5;
  
  $scope.reset = function(){
    $scope.ratingFull.rate = 0;
  }
});
