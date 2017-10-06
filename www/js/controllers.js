angular.module('starter.controllers', ['ngCordova', 'ionic.service.core', 'ionic.service.push', ])
.service("rssServiceData", function() {
    this.staticFeedDataEvents;
    this.setRssFeedEvents = function(data) {
        if (data) {
            window.localStorage["eventsRss"] = JSON.stringify(data);
        }
        this.staticFeedDataEvents = data;
    }
    this.getFeedDataEvents = function() {
        if (window.localStorage["eventsRss"])
            return JSON.parse(window.localStorage["eventsRss"]);
        return this.staticFeedDataEvents;
    }
    this.staticFeedDataDates;
    this.setRssFeedDates = function(data) {
        if (data) {
            window.localStorage["datesRss"] = JSON.stringify(data);
        }
        this.staticFeedDataDates = data;
    }
    this.getFeedDataDates = function() {
        if (window.localStorage["datesRss"])
            return JSON.parse(window.localStorage["datesRss"]);
        return this.staticFeedDataDates;
    }
    this.staticFeedDataDiscourses;
    this.setRssFeedDiscourses = function(data) {
        if (data) {
            window.localStorage["discourceRss"] = JSON.stringify(data);
        }
        this.staticFeedDataDiscourses = data;
    }
    this.getFeedDataDiscourses = function() {
        if (window.localStorage["discourceRss"])
            return JSON.parse(window.localStorage["discourceRss"]);
        return this.staticFeedDataDiscourses;
    }
    this.staticFeedDataVideos;
    this.setRssFeedVideos = function(data) {
        if (data) {
            window.localStorage["videosRss"] = JSON.stringify(data);
        }
        this.staticFeedDataVideos = data;
    }
    this.getFeedDataVideos = function() {
        if (window.localStorage["videosRss"])
            return JSON.parse(window.localStorage["videosRss"]);
        return this.staticFeedDataVideos;
    }
    this.staticSlokas;
    this.setStaticSlokas = function(data) {
        this.staticSlokas = data;
    }
    this.getStaticSlokas = function() {
        return this.staticSlokas;
    }
})
.factory('rssService', function($http, $q) {
    var entries;
    return {

        getEntries: function(url, reload) {
            var deferred = $q.defer();
            if (entries && !reload) {
                deferred.resolve(entries);
            } else {


                $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'" + url + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
                    .then(function(results) {
                        entries = results.data.query.results;
                        deferred.resolve(entries);


                    }, function error(d) {
                        console.log(d);
                    });

            }
            return deferred.promise;
        }

    };
})
.factory("staticDataService", function($http, $q) {
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
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform, $rootScope, $ionicPush, $http, $httpParamSerializer, $state, rssService, rssServiceData) {

    $scope.contactusData = {};
    $scope.prajanaTeacherData = {};
    $scope.prajanaStudentData = {};

    $scope.submitPrajnaStudentData = function() {

        var _sendPrajanStudentRegistrationMailtoJetUK = JSON.stringify({
            FromEmailAddress: $scope.prajanaStudentData.Email,
            ToEmailAddress: "info@jetuk.org",
            Subject: "Acharya - Prajna Student - Registration",
            Body: "<p><h5>Name:" + $scope.prajanaStudentData.Name + "</h5><h5>Email:" + $scope.prajanaStudentData.Email + "</h5><h5>Contact:" + $scope.prajanaStudentData.Contact + "</h5><h5>Address:</h5>" + $scope.prajanaStudentData.Address + "<h5>ChildName:" + $scope.prajanaStudentData.ChildName + "</h5><h5>ChildAge:" + $scope.prajanaStudentData.Age + "</p>"
        });

        var _sendPrajanStudentThanksMailtoRequestor = JSON.stringify({
            FromEmailAddress: "info@jetuk.org",
            ToEmailAddress: $scope.prajanaStudentData.Email,
            Subject: "Thank you for registering for Prajana Student for " + $scope.prajanaStudentData.ChildName,
            Body: "<p><h4>Jai Srimannarayana!!</h4></br></br><h5>Namaste " + $scope.prajanaStudentData.Name + " ji," + "</h5></br>" + "Thank you for registering for Prajna Teacher/Student. Our volunteer from JETUK will contact you shortly. For any questions please reach out to info@jetuk.org.Thank you once again and acharya's managalashasanams(blessings) to your family." + " </br>" + "Regards," + " </br><b>Team JetUK</b> " + " </p>"
        });

        $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanStudentRegistrationMailtoJetUK).
        success(function(data, status, headers, config) {

            $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanStudentThanksMailtoRequestor).
            success(function(data, status, headers, config) {
                $state.go('app.home');
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.submitprajnateacherdata = function() {

        var _sendPrajanTeacherRegistrationMailtoJetUK = JSON.stringify({
            FromEmailAddress: $scope.prajanaTeacherData.Email,
            ToEmailAddress: "info@jetuk.org" + ";" + $scope.prajanaStudentData.Email,
            Subject: "Acharya - Prajna Teacher - Registration",
            Body: "<p><h5>Name:" + $scope.prajanaTeacherData.Name + "</h5></br><h5>Email:" + $scope.prajanaTeacherData.Email + "</h5></br><h5>Contact:" + $scope.prajanaTeacherData.Contact + "</h5></br><h5>Full Address:</h5>" + $scope.prajanaTeacherData.FullAddress + "</p>"
        });

        var _sendPrajanTeacherThanksMailtoRequestor = JSON.stringify({
            FromEmailAddress: "info@jetuk.org",
            ToEmailAddress: $scope.prajanaTeacherData.Email,
            Subject: "Thank you for registering for Prajna Teacher",
            Body: "<p><h4>Jai Srimannarayana!!</h4></br></br><h5>Namaste " + $scope.prajanaTeacherData.Name + " ji," + "</h5></br>" + "Thank you for registering for Prajna Teacher/Student. Our volunteer from JETUK will contact you shortly. For any questions please reach out to info@jetuk.org. Thank you once again and acharya's managalashasanams(blessings) to your family." + "</br></br>" + "Regards," + "</br><b>Team JetUK</b>" + "</p>"
        });

        $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanTeacherRegistrationMailtoJetUK).
        success(function(data, status, headers, config) {

            $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanTeacherThanksMailtoRequestor).
            success(function(data, status, headers, config) {
                $state.go('app.home');
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.submitcontactusdata = function() {


        var _sendRequestMailtoJetUK = JSON.stringify({
            FromEmailAddress: $scope.contactusData.Email,
            ToEmailAddress: "info@jetuk.org",
            Subject: "Acharya Contact Us page enquiry",
            Body: "<p><h5>Name:" + $scope.contactusData.Name + "</h5></br><h5>Email:" + $scope.contactusData.Email + "</h5></br><h5>Contact:" + $scope.contactusData.Contact + "</h5></br><h5>Message:</h5>" + $scope.contactusData.Message + "</p>"
        });

        var _sendThanksMailtoRequestor = JSON.stringify({
            FromEmailAddress: "info@jetuk.org",
            ToEmailAddress: $scope.contactusData.Email,
            Subject: "Thanks for contacting JETUK group",
            Body: "<p><h4>Jai Srimannarayana!!</h4></br></br><h5>Namaste " + $scope.contactusData.Name + "," + "</h5></br>" + "Our team member will contact you soon shortly." + "</br></br>" + "Regards," + "</br><b>Team JetUK</b>" + "</p>"
        });

        $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendRequestMailtoJetUK).
        success(function(data, status, headers, config) {

            $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendThanksMailtoRequestor).
            success(function(data, status, headers, config) {
                $state.go('app.home');
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
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
.controller("baseController",function($scope,$window){
    $scope.openUrl = function(url) {
        $window.open(url, "_system", "location=no", "toolbar=yes");
        $window.event.preventDefault();
    }
})
.controller("homeController", function($scope, $state, $controller) {
    
    $controller('baseController', { $scope: $scope });
})
.controller("homeStartController", function($scope, $state, $controller,$ionicSideMenuDelegate) {
    
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
})
.controller("eventController", function($scope, $rootScope,$controller, rssService, rssServiceData) {
    $controller('baseController', { $scope: $scope });
    $scope.$on('$ionicView.enter', function(ev) {
        if (ev.targetScope !== $scope)
            return;
        rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml', true).then(function(entries) {
            rssServiceData.setRssFeedEvents(entries.rss.channel)
            $scope.eventList = rssServiceData.getFeedDataEvents().item;
        });
    });
    // $scope.doRefresh = function() {
    //     rssService.getEntries('https://www.jetuk.org/ach/jetuk-updates.xml', true).then(function(entries) {
    //         rssServiceData.setRssFeedEvents(entries.rss.channel)
    //         $scope.eventList = rssServiceData.getFeedDataEvents().item;
    //         $scope.$broadcast('scroll.refreshComplete');
    //     });
    // }
    $scope.$watch('rssServiceData.getFeedDataEvents()', function(nval, oldVal) {
        if (rssServiceData.getFeedDataEvents()) {
            $scope.eventList = rssServiceData.getFeedDataEvents().item;
        }
    });
})
.controller('priestController', function($scope,$controller) {
    $controller('baseController', { $scope: $scope });
})
.controller('slokasController', function($scope, $controller,staticDataService) {
    $controller('baseController', { $scope: $scope });
    var vm = this;
    staticDataService.getStaticSlokas().then(function(data) {
        var s = data;
        //setData(s);
        $scope.slokas = s;
    });
    var slokas = [{ title: "Haryastakam", key: "HARI" },
        { title: "Krishnastakam", key: "KRISHNA" }, { title: "Adityahrdhayam", key: "AADITYA" },
        { title: "Pancha:yudha Stho:tram", key: "PANCHA" },
        { title: "Guruparampara", key: "GURU" },
        { title: "Slokadwayam or Gajendramokshamu", key: "SLOKADVAYAM" },
        { title: "Sri Saranagati Slokam", key: "SARANAGATHI" }
    ];
    
})
.controller("ekadasiController", function($scope, $rootScope,$controller, rssService, rssServiceData) {
    $controller('baseController', { $scope: $scope });
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-ekadasidates.xml', true).then(function(entries) {
        rssServiceData.setRssFeedDates(entries.rss.channel)
        $scope.eventList = rssServiceData.getFeedDataDates().item;
    });
    $scope.$on('$ionicView.enter', function(ev) {
        if (ev.targetScope !== $scope)
            return;
        rssService.getEntries('https://www.jetuk.org/ach/jetuk-ekadasidates.xml', true).then(function(entries) {
            rssServiceData.setRssFeedDates(entries.rss.channel)
            $scope.eventList = rssServiceData.getFeedDataDates().item;
        });
    });
    $scope.$watch('rssServiceData.getFeedDataDates()', function(nval, oldVal) {
        if (rssServiceData.getFeedDataDates()) {
            $scope.eventList = rssServiceData.getFeedDataDates().item;
        }
    });
})
.controller("videoController", function($scope, $rootScope,$controller, rssService, rssServiceData) {
    $controller('baseController', { $scope: $scope });
    rssService.getEntries('https://www.jetuk.org/ach/jetuk-videos.xml', true).then(function(entries) {
        rssServiceData.setRssFeedVideos(entries.rss.channel)
        var videos = rssServiceData.getFeedDataVideos().item;
        for (var index = 0; index < videos.length; index++) {
            var element = videos[index];
            if (element.link) {
                var link = element.link.replace('watch?v=', 'embed/') + "?rel=0";
                videos[index].link = link;
            }
        }
        $scope.videos = videos;
    });
    $scope.$on('$ionicView.enter', function(ev) {
        if (ev.targetScope !== $scope)
            return;
        rssService.getEntries('https://www.jetuk.org/ach/jetuk-videos.xml', true).then(function(entries) {
            rssServiceData.setRssFeedVideos(entries.rss.channel)
            var videos = rssServiceData.getFeedDataVideos().item;
            for (var index = 0; index < videos.length; index++) {
                var element = videos[index];
                var link = element.link.replace('watch?v=', 'embed/') + "?rel=0";
                videos[index].link = link;
            }
            $scope.videos = videos;
        });
    });
    $scope.$watch('rssServiceData.getFeedDataVideos()', function(nval, oldVal) {
        if (rssServiceData.getFeedDataVideos()) {
            $scope.videos = rssServiceData.getFeedDataVideos().item;
        }
    });
})
.controller("discoursesController", function($scope, $sce, $controller, rssService, rssServiceData) {
    $controller('baseController', { $scope: $scope });
    function trustSrc(src) {
        return $sce.trustAsResourceUrl(src).toString();
    }

    rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml', true).then(function(entries) {
        rssServiceData.setRssFeedDiscourses(entries.rss.channel)
        var discourses = rssServiceData.getFeedDataDiscourses().items;
        for (var index = 0; index < discourses.item.length; index++) {
            var element = discourses.item[index];
            discourses.item[index].title = toTitleCase(discourses.item[index].title);
            //var link = element.link.replace('watch?v=','embed/') + "?rel=0";
            //discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
        }
        $scope.discourses = discourses.item;

    });

    $scope.$on('$ionicView.enter', function(ev) {
        if (ev.targetScope !== $scope)
            return;
        rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml', true).then(function(entries) {
            rssServiceData.setRssFeedDiscourses(entries.rss.channel)
            var discourses = rssServiceData.getFeedDataDiscourses().items;
            for (var index = 0; index < discourses.item.length; index++) {
                var element = discourses.item[index];
                discourses.item[index].title = toTitleCase(discourses.item[index].title);
                //var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                //discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
            }
            $scope.discourses = discourses.item;
        });
    });
    $scope.$on('$ionicView.leave', function(ev) {});
    $scope.$on('$ionicNavView.enter', function(ev) {
        if (ev.targetScope !== $scope)
            return;
        rssService.getEntries('https://www.jetuk.org/ach/jetuk-discourses.xml', true).then(function(entries) {
            rssServiceData.setRssFeedDiscourses(entries.rss.channel)
            var discourses = rssServiceData.getFeedDataDiscourses().items;
            for (var index = 0; index < discourses.item.length; index++) {
                var element = discourses.item[index];
                discourses.item[index].title = toTitleCase(discourses.item[index].title);
                //var link = element.link.replace('watch?v=','embed/') + "?rel=0";
                //discourses[index].link = link;//"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";
            }
            $scope.discourses = discourses.item;
        });
    });
    $scope.$watch('rssServiceData.getFeedDataDiscourses()', function(nval, oldVal) {
        if (rssServiceData.getFeedDataDiscourses()) {
            $scope.discourses = rssServiceData.getFeedDataDiscourses().items.item;
            //$scope.testLink = $sce.trustAsResourceUrl($scope.discourses[0].link).toString();
        }
    });

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
})
.controller("discourseController", function($scope, $sce, $stateParams, $controller, rssService, rssServiceData) {
    $controller('baseController', { $scope: $scope });
    $scope.title = $stateParams.key;
    var items = rssServiceData.getFeedDataDiscourses().items.item;
    $scope.selectedDiscourse = items.filter(function(data) {
        if (data.title.toUpperCase() === $stateParams.key.toUpperCase())
            return true;
        return false;
    });
    loadData();

    function loadData() {
        var selectedItem = $scope.selectedDiscourse[0].items.item;
        for (var index = 0; index < selectedItem.length; index++) {
            var element = selectedItem[index];
            var link = element.link.replace('watch?v=', 'embed/') + "?rel=0";
            selectedItem[index].link = link; //"https://www.youtube.com/embed/W_gM4HbEkuI?rel=0";

        }
        $scope.selectedItem = selectedItem;
    }

    function convertText(text) {
        var strArray = text.split[" "];
        for (var i = 0; i < strArray.length; i++) {
            var element = strArray[i].toLowerCase();
            var firstLetter = element.subString(0, 1).toUpperCase();

        }
    }

})
.controller('sbSlokasController', function($scope, $controller, staticDataService) {
    $controller('baseController', { $scope: $scope });
    var vm = this;
    staticDataService.getsbStaticSlokas().then(function(data) {
        var s = data;
        $scope.slokas = data;
    });
})
.controller('sbIndexController', function($scope, $state, $stateParams, $controller, staticDataService) {
    var vm = this;
    $controller('baseController', { $scope: $scope });
    $scope.onlanguageChange = onlanguageChange;
    staticDataService.getsbStaticSlokas().then(function(data) {
        var s = data;
        setData(s);
    });

    function setData(data) {
        var slokas = data;
        //$scope.dynamicTrack = {};
        $scope.options = [{ code: "EN", text: "English" }, { code: "TN", text: "Tamil" }, { code: "TE", text: "Telugu" }];
        $scope.lang = $scope.options[0]; //{ code:"en",text:"English"};
        //$scope.selectedLang = {};
        $scope.title = $stateParams.key;
        $scope.selectedSloka = slokas.filter(function(d) {
            if (d.key === $stateParams.key)
                return true;
            return false;
        });
        if ($scope.selectedSloka[0]) {
            $scope.slokaText = $scope.selectedSloka[0].sloka.filter(function(d) {
                if (d.lang.toUpperCase() === "EN")
                    return true;
                return false;
            })[0];
        }
        if ($scope.selectedSloka[0]) {
            $scope.dynamicTrack = {
                url: $scope.selectedSloka[0].url,
                artist: $scope.selectedSloka[0].artist,
                title: $scope.selectedSloka[0].title
            }; // assign one track
        }
        $scope.togglePlayback = !$scope.togglePlayback;
    }

    //refreshText($scope.selectedLang);
    function refreshText(newVal, oldVal) {
        if (newVal === oldVal) return;
        $scope.slokaText = $scope.selectedSloka[0].sloka.filter(function(d) {
            if (d.lang === newVal.code)
                return true;
            return false;
        })[0];
    }

    function onlanguageChange(lang) {
        //vm.selectedLang = val;
        //var cc = $scope.lang.code;
        refreshText(lang);
    }
})
.controller('slokaController', function($scope, $state, $stateParams, $controller, staticDataService) {
    var vm = this;
    $controller('baseController', { $scope: $scope });
    $scope.onlanguageChange = onlanguageChange;
    staticDataService.getStaticSlokas().then(function(data) {
        var s = data;
        setData(s);
    });

    function setData(data) {
        var slokas = data;
        //$scope.dynamicTrack = {};
        $scope.options = [{ code: "en", text: "English" }, { code: "te", text: "Telugu" }];
        $scope.lang = $scope.options[0]; //{ code:"en",text:"English"};
        //$scope.selectedLang = {};
        $scope.title = $stateParams.key;
        $scope.selectedSloka = slokas.filter(function(d) {
            if (d.key === $stateParams.key)
                return true;
            return false;
        });
        if ($scope.selectedSloka[0]) {
            $scope.slokaText = $scope.selectedSloka[0].sloka.filter(function(d) {
                if (d.lang === "en")
                    return true;
                return false;
            })[0];
        }
        if ($scope.selectedSloka[0]) {
            $scope.dynamicTrack = {
                url: $scope.selectedSloka[0].url,
                artist: $scope.selectedSloka[0].artist,
                title: $scope.selectedSloka[0].title
            }; // assign one track
        }
        $scope.togglePlayback = !$scope.togglePlayback;
    }

    //refreshText($scope.selectedLang);
    function refreshText(newVal, oldVal) {
        if (newVal === oldVal) return;
        $scope.slokaText = $scope.selectedSloka[0].sloka.filter(function(d) {
            if (d.lang === newVal.code)
                return true;
            return false;
        })[0];
    }

    function onlanguageChange(lang) {
        //vm.selectedLang = val;
        //var cc = $scope.lang.code;
        refreshText(lang);
    }


    //$scope.$watch(function(){return $scope.lang},refreshText);
})
.controller('prajnaSlokaController', function($scope, $controller, MediaManager,staticDataService) {
    $controller('baseController', { $scope: $scope });
    staticDataService.getPrajnaSlokas().then(function(data) {
        var s = data;
        $scope.tracks = data;
        $scope.dynamicTrack = $scope.tracks[0];
    });
    
    $scope.stopPlayback = function() {
        MediaManager.stop(); // will stop any audio currently playing
    };

    $scope.playTrack = function(index) {

        $scope.dynamicTrack = $scope.tracks[index]; // assign one track

        $scope.togglePlayback = !$scope.togglePlayback; // start playback when track changes    
    };
})
.controller('songsController', function($scope, $controller, MediaManager) {
    $controller('baseController', { $scope: $scope });
    $scope.tracks = [{
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2F09-adigadigo1.mp3?alt=media&token=f583d2e2-2537-4dff-aa2e-f83096cc478f', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Adigadigo',
            index: 0
        },
        
       
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FAcharyaSevaYatraPavanamPavitram.mp3?alt=media&token=b7153652-57c1-43dc-a716-db7d1d008228', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Acharya Seva Yatra Pavanam Pavitram',
            index: 2
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FAstangaVimana.mp3?alt=media&token=98a0e966-64ee-4da9-8398-4925f1cb8a36', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Astanga Vimana',
            index: 3
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FChudarandiJanulara.mp3?alt=media&token=fec62a69-91f3-4888-afc9-cfb01b303c96', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Chudarandi Janulara',
            index: 4
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FDhanyulamayyaNeeDarsanaBhagyam.mp3?alt=media&token=5d6f1bc4-0608-4105-9d03-d08059038c72', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Dhanyulamayya Nee Darsana Bhagyam',
            index: 5
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FGovindaAniPalukaveManasa.mp3?alt=media&token=4193ecc0-c5e4-4b8a-a4fc-e280860edf37', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Govinda Ani Palukave Manasa',
            index: 6
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJagatguruvukiJayamJayam.mp3?alt=media&token=fa4557b9-3a9a-4a11-8009-c4c1fd430461', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Jagatguruvuki Jayam Jayam',
            index: 7
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJayaJayaYatindra%20JayaRamanuja.mp3?alt=media&token=70ada774-c9e0-4bbf-b1ad-e37b7311446f', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Jaya Jaya Yatindra Jaya Ramanuja',
            index: 8
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2001-Sri%20Vistnotthamundadugo.mp3?alt=media&token=c0e0b3e4-4fea-45b9-958a-2459bb8bd41e', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Vistnotthamundadugo',
            index: 9
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2002-Giyyaru%20Giyyaru%20Giyyaru.mp3?alt=media&token=1db21c62-9ae3-4244-a91f-3fd80688b0ab', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Giyyaru Giyyaru Giyyaru',
            index: 10
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2003-Gopala%20Krishnudu.mp3?alt=media&token=2e9687ea-c628-45e2-b7de-105f767a4b97', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Gopala Krishnudu',
            index: 11
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2004-Guruvu%20Mata.mp3?alt=media&token=5b63bd05-d320-4f35-970c-4a322c83fed4', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Guruvu Mata',
            index: 12
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2005-Aanati%20Ramudu.mp3?alt=media&token=fd370179-22b9-4ebd-9fce-9f75f4e3b2e2', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Aanati Ramudu',
            index: 13
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2006-Yevarivayya%20Neevu.mp3?alt=media&token=ba5a1f6c-8bc8-4e47-9aac-3b315d68830e', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Yevarivayya Neevu',
            index: 14
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2007-Rama%20Rama%20Rama.mp3?alt=media&token=77fd7228-b57f-4e44-8775-f3466e76f69e', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Rama Rama Rama',
            index: 15
        }, {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2008-Sri%20vishanava%20Sampradaya.mp3?alt=media&token=1dc834f2-4dff-4557-9112-a1e05af2d6c9', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Sri vishanava Sampradaya',
            index: 16
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJyotiniVeligiddandiRandi.mp3?alt=media&token=6296c948-2f4a-4487-903f-3e0d022aa3ac', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Jyotini Veligiddandi Randi',
            index: 17
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FKshudrapedaParrihara-Hanuman.mp3?alt=media&token=efb5f272-5502-4b7f-90fa-efb3ff1590e7', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'KshudrapedaParrihara-Hanuman',
            index: 18
        }, {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FManavaJanmakuParamardamGeetaJyoti.mp3?alt=media&token=cf1c258c-140e-4648-9f5e-4ef1c6d2ce35', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Manava Janmaku Paramardam GeetaJyoti',
            index: 19
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FRamachandraSwami.mp3?alt=media&token=aa7cb99d-8e27-4882-ac26-82ff981b95e9', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Ramachandra Swami',
            index: 20
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FRamaRamaYanuma.mp3?alt=media&token=35589659-a394-4d19-b10b-c68d2d33afbe', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Rama Rama Yanuma',
            index: 21
        }, {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FRanga%20Ranga%20Vaibhavame.mp3?alt=media&token=38cda55d-0dcc-47d5-a47a-b79e63f9f749', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Ranga Ranga Vaibhavame',
            index: 22
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FSrimannarayana.mp3?alt=media&token=3d42a717-8b99-4f97-b745-402fb34007a3', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Srimannarayana',
            index: 23
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FSriRamachandruduAlladigo.mp3?alt=media&token=f27b7de4-619a-45da-9be2-d11ce4f2782f', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Sri Ramachandrudu Alladigo',
            index: 24
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FTridandiTridandi.mp3?alt=media&token=2790e200-3237-46d5-a47f-baf5441af573', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Tridandi Tridandi',
            index: 25
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FVishwasantikaiVilasille.mp3?alt=media&token=552d5707-d146-422e-9fd5-ac8818ec3e90', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Vishwasantikai Vilasille',
            index: 26
        }

    ];
    $scope.dynamicTrack = $scope.tracks[0];
    $scope.stopPlayback = function() {
        MediaManager.stop(); // will stop any audio currently playing
    };

    $scope.playTrack = function(index) {

        $scope.dynamicTrack = $scope.tracks[index]; // assign one track

        $scope.togglePlayback = !$scope.togglePlayback; // start playback when track changes    
    };
})
.controller('playlistController', function($scope, $stateParams, $controller, MediaManager) {
    $controller('baseController', { $scope: $scope });
    $scope.dynamicTrack = {}; // we use this scope variable to dynamically assign a track
    $scope.tracks = [
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2F2%20Kaavave.mp3?alt=media&token=a3371728-22ed-4ed1-9661-baac5ca9b250', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Kaavave',
            index: 1
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FAcharyaSevaYatraPavanamPavitram.mp3?alt=media&token=b7153652-57c1-43dc-a716-db7d1d008228', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Acharya Seva Yatra Pavanam Pavitram',
            index: 2
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FAstangaVimana.mp3?alt=media&token=98a0e966-64ee-4da9-8398-4925f1cb8a36', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Astanga Vimana',
            index: 3
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FChudarandiJanulara.mp3?alt=media&token=fec62a69-91f3-4888-afc9-cfb01b303c96', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Chudarandi Janulara',
            index: 4
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FDhanyulamayyaNeeDarsanaBhagyam.mp3?alt=media&token=5d6f1bc4-0608-4105-9d03-d08059038c72', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Dhanyulamayya Nee Darsana Bhagyam',
            index: 5
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FGovindaAniPalukaveManasa.mp3?alt=media&token=4193ecc0-c5e4-4b8a-a4fc-e280860edf37', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Govinda Ani Palukave Manasa',
            index: 6
        }
    ]
    $scope.track = {
        url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FAcharyaSevaYatraPavanamPavitram.mp3?alt=media&token=b7153652-57c1-43dc-a716-db7d1d008228', // audio file stored in device's app folder
        artist: 'Prahaladha',
        title: 'Acharya Seva Yatra Pavanam Pavitram'
    };

    $scope.stopPlayback = function() {
        MediaManager.stop(); // will stop any audio currently playing
    };

    $scope.playTrack = function(index) {
        $scope.dynamicTrack = $scope.tracks[index]; // assign one track

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

$scope.reset = function() {
    $scope.ratingFull.rate = 0;
}
});