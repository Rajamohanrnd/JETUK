angular.module('acharyaApp', ['ionic','ngCordova', 
'acharyaApp.controllers', 'acharyaApp.services', 'acharyaApp.directives','ionic-audio','ionic.cloud','ngSanitize','pdf'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.config(function($sceDelegateProvider) {
 $sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'https://www.youtube.com/**','http://www.jetuk.org/**']);
 })
.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "2790e52b"
    },
    "push": {
      "sender_id": "446840311919",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeController'
                }
            }
        })
         .state('app.ekadasidates', {
            url: '/ekadasidates',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ekadasidates.html',
                    controller: 'ekadasiController'
                }
            }
        })
        .state('app.slokas', {
            url: '/slokas',
            views: {
                'menuContent': {
                    templateUrl: 'templates/slokas.html',
                    controller: 'slokasController'
                }
            }
        })
        .state('app.slokaIndex', {
            url: '/sloka:key',
             views: {
                 'menuContent': {
                    templateUrl: 'templates/sloka.html',
                    controller: 'slokaController'
                 }
             }
         })
             .state('app.event', {
            url: '/events',
            views: {
                'menuContent': {
                    templateUrl: 'templates/events.html',
                    controller: 'eventController'
                }
            }
        })
        .state('app.discourses', {
            url: '/discourses',
            views: {
                'menuContent': {
                    templateUrl: 'templates/discourses.html',
                    controller: 'discoursesController'
                }
            }
        })
        .state('app.discourseIndex', {
            url: '/discourse:key',
             views: {
                 'menuContent': {
                    templateUrl: 'templates/discourseIndex.html',
                    controller: 'discourseController'
                 }
             }
         })
        .state('app.videos', {
            url: '/videos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/videos.html',
                    controller: 'videoController'
                }
            }
        })
        .state('app.aboutus', {
            url: '/aboutus',
            views: {
                'menuContent': {
                    templateUrl: 'templates/aboutus.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.statueofequality', {
            url: '/statueofequality',
            views: {
                'menuContent': {
                    templateUrl: 'templates/statueofequality.html',
                    controller: 'homeController'
                }
            }
        })

    .state('app.calender', {
            url: '/calender',
            views: {
                'menuContent': {
                    templateUrl: 'templates/calender.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.feedback', {
            url: '/feedback',
            views: {
                'menuContent': {
                    templateUrl: 'templates/feedback.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.faqs', {
            url: '/faqs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/faqs.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.starbirth', {
            url: '/starbirth',
            views: {
                'menuContent': {
                    templateUrl: 'templates/starbirth.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.songs', {
            url: '/songs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/songs.html',
                    controller: 'homeController'
                }
            }
        })
        
        .state('app.bhakthinivedana', {
            url: '/bhakthinivedana',
            views: {
                'menuContent': {
                    templateUrl: 'templates/bhakthinivedana.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.priest', {
            url: '/priest',
            views: {
                'menuContent': {
                    templateUrl: 'templates/priest.html',
                    controller: 'homeController'
                }
            }
        })
.state('app.allnethravidyalayas', {
            url: '/allnethravidyalayas',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allnethravidyalayas.html'
                }
            }
        })
    .state('app.contactus', {
            url: '/contactus',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contactus.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.donate', {
            url: '/donate',
            views: {
                'menuContent': {
                    templateUrl: 'templates/donate.html',
                    controller: 'homeController'
                }
            }
        })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'homeController'
            }
        }
    })

    // .state('app.browse', {
    //         url: '/browse',
    //         views: {
    //             'menuContent': {
    //                 templateUrl: 'templates/browse.html',
    //                 controller: 'homeController'
    //             }
    //         }
    //     })
    //     .state('app.english', {
    //         url: '/browse',
    //         views: {
    //             'menuContent': {
    //                 templateUrl: 'templates/english.html',
    //                 controller: 'homeController'
    //             }
    //         }
    //     })
    //     .state('app.Tamil', {
    //         url: '/browse',
    //         views: {
    //             'menuContent': {
    //                 templateUrl: 'templates/Tamil.html',
    //                 controller: 'homeController'
    //             }
    //         }
    //     })
    //     .state('app.Telugu', {
    //         url: '/browse',
    //         views: {
    //             'menuContent': {
    //                 templateUrl: 'templates/Telugu.html',
    //                 controller: 'homeController'
    //             }
    //         }
    //     })
       
        .state('app.more', {
            url: '/more',
            views: {
                'menuContent': {
                    templateUrl: 'templates/more.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.prajna', {
            url: '/prajna',
            views: {
                'menuContent': {
                    templateUrl: 'templates/prajna.html',
                    controller: 'homeController'
                }
            }
        })
       
        
        .state('app.healthservices', {
            url: '/healthservices',
            views: {
                'menuContent': {
                    templateUrl: 'templates/healthservices.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.gosala', {
            url: '/gosala',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gosala.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.prajnateacher', {
            url: '/prajnateacher',
            views: {
                'menuContent': {
                    templateUrl: 'templates/prajnateacher.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.prajnastudent', {
            url: '/prajnastudent',
            views: {
                'menuContent': {
                    templateUrl: 'templates/prajnastudent.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.healthservicescamps', {
            url: '/healthservicescamps',
            views: {
                'menuContent': {
                    templateUrl: 'templates/healthservicescamps.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.healthserviceswomen', {
            url: '/healthserviceswomen',
            views: {
                'menuContent': {
                    templateUrl: 'templates/healthserviceswomen.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.allhealthservices', {
            url: '/allhealthservices',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allhealthservices.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.vedicschools', {
            url: '/vedicschools',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vedicschools.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.allvedicschools', {
            url: '/allvedicschools',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allvedicschools.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.gunturvedicschool', {
            url: '/gunturvedicschool',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gunturvedicschool.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.vishakapatnamvedicschool', {
            url: '/vishakapatnamvedicschool',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vishakapatnamvedicschool.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.shamsabadvedicschool', {
            url: '/shamsabadvedicschool',
            views: {
                'menuContent': {
                    templateUrl: 'templates/shamsabadvedicschool.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.karimnagarvedicschool', {
            url: '/karimnagarvedicschool',
            views: {
                'menuContent': {
                    templateUrl: 'templates/karimnagarvedicschool.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.gurukulams', {
            url: '/gurukulams',
            views: {
                'menuContent': {
                    templateUrl: 'templates/gurukulams.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.allgurukulams', {
            url: '/allgurukulams',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allgurukulams.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.katarivaripalemgurukulam', {
            url: '/katarivaripalemgurukulam',
            views: {
                'menuContent': {
                    templateUrl: 'templates/katarivaripalemgurukulam.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.allampallyutnurgurukulam', {
            url: '/allampallyutnurgurukulam',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allampallyutnurgurukulam.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.allampallyadilabadgurukulam', {
            url: '/allampallyadilabadgurukulam',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allampallyadilabadgurukulam.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.nethravidyalaya', {
            url: '/nethravidyalaya',
            views: {
                'menuContent': {
                    templateUrl: 'templates/nethravidyalaya.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.nethravidyalayavijayanagaram', {
            url: '/nethravidyalayavijayanagaram',
            views: {
                'menuContent': {
                    templateUrl: 'templates/nethravidyalayavijayanagaram.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.nethravidyalayahyderabad', {
            url: '/nethravidyalayahyderabad',
            views: {
                'menuContent': {
                    templateUrl: 'templates/nethravidyalayahyderabad.html',
                    controller: 'homeController'
                }
            }
        })
        .state('app.nethravidyalayadegreehyderabad', {
            url: '/nethravidyalayadegreehyderabad',
            views: {
                'menuContent': {
                    templateUrl: 'templates/nethravidyalayadegreehyderabad.html',
                    controller: 'homeController'
                }
            }
        })
        /* .state('app.live', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/live.html',
                    controller: 'homeController'
                }
            }
        }); */

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});



angular.module('ionicApp', ['ionic', 'ionic.rating'])

.controller('MainCtrl', function($scope) {

    $scope.ratingFull = {};
    $scope.ratingFull.rate = 3;
    $scope.ratingFull.max = 5;

    $scope.ratingHalf = {};
    $scope.ratingHalf.rate = 3.5;
    $scope.ratingHalf.max = 5;

    $scope.reset = function() {
        $scope.ratingFull.rate = 0;
    }
});




var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .donate("/", {
            templateUrl: "donate.html"
        })
});