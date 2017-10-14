angular.module('starter.controllers')
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
        $scope.slokas = data;
    });
})
.controller("shareController",function($scope,$http,$state){
    $scope.submitSharedata = function() {
        
                    var _sendRequestMailtoJetUK = JSON.stringify({
                        FromEmailAddress: $scope.shareData.FromEmail,
                        ToEmailAddress: $scope.shareData.ToEmail,
                        Subject: "Acharya App",
                        Body: "<p>I just downloaded ACHARYA on my smart phone.<h5></h5> This is an one stop shop app for all needs of multilingual Discourses, offline functionality, Download feature of Devotional Audios and Slokas recitation, Videos, Ekadasi reminders, Calendar, and many other useful things to learn about our tradition. ACHARYA is available for iPhone, Android and Widows phone and more over it's FREE of cost.<h5></h5> You can get it now from htts://jetuk.org/ACHARYA. Or else you can reach on info@jetuk.org</p>"
                    });
        
                    var _sendThanksMailtoRequestor = JSON.stringify({
                        FromEmailAddress: "info@jetuk.org",
                        ToEmailAddress: $scope.shareData.FromEmail,
                        Subject: "Thanks for sharing ACHARYA app",
                        Body: "Thank you for sharing ACHARYA app and acharya's managalashasanams(blessings) to your family."
                    });
        
                    $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendRequestMailtoJetUK).
                    success(function(data, status, headers, config) {
        
                        $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendThanksMailtoRequestor).
                        success(function(data, status, headers, config) {
                            $state.go('app.thankyou');
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
            index: 1
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FAstangaVimana.mp3?alt=media&token=98a0e966-64ee-4da9-8398-4925f1cb8a36', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Astanga Vimana',
            index: 2
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FChudarandiJanulara.mp3?alt=media&token=fec62a69-91f3-4888-afc9-cfb01b303c96', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Chudarandi Janulara',
            index: 3
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FDhanyulamayyaNeeDarsanaBhagyam.mp3?alt=media&token=5d6f1bc4-0608-4105-9d03-d08059038c72', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Dhanyulamayya Nee Darsana Bhagyam',
            index: 4
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FGovindaAniPalukaveManasa.mp3?alt=media&token=4193ecc0-c5e4-4b8a-a4fc-e280860edf37', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Govinda Ani Palukave Manasa',
            index: 5
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJagatguruvukiJayamJayam.mp3?alt=media&token=fa4557b9-3a9a-4a11-8009-c4c1fd430461', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Jagatguruvuki Jayam Jayam',
            index: 6
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJayaJayaYatindra%20JayaRamanuja.mp3?alt=media&token=70ada774-c9e0-4bbf-b1ad-e37b7311446f', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Jaya Jaya Yatindra Jaya Ramanuja',
            index: 7
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2001-Sri%20Vistnotthamundadugo.mp3?alt=media&token=c0e0b3e4-4fea-45b9-958a-2459bb8bd41e', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Vistnotthamundadugo',
            index: 8
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2002-Giyyaru%20Giyyaru%20Giyyaru.mp3?alt=media&token=1db21c62-9ae3-4244-a91f-3fd80688b0ab', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Giyyaru Giyyaru Giyyaru',
            index: 9
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2003-Gopala%20Krishnudu.mp3?alt=media&token=2e9687ea-c628-45e2-b7de-105f767a4b97', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Gopala Krishnudu',
            index: 10
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2004-Guruvu%20Mata.mp3?alt=media&token=5b63bd05-d320-4f35-970c-4a322c83fed4', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Guruvu Mata',
            index: 11
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2005-Aanati%20Ramudu.mp3?alt=media&token=fd370179-22b9-4ebd-9fce-9f75f4e3b2e2', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Aanati Ramudu',
            index: 12
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2006-Yevarivayya%20Neevu.mp3?alt=media&token=ba5a1f6c-8bc8-4e47-9aac-3b315d68830e', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Yevarivayya Neevu',
            index: 13
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2007-Rama%20Rama%20Rama.mp3?alt=media&token=77fd7228-b57f-4e44-8775-f3466e76f69e', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Rama Rama Rama',
            index: 14
        }, {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJET%20DS%20MS%2008-Sri%20vishanava%20Sampradaya.mp3?alt=media&token=1dc834f2-4dff-4557-9112-a1e05af2d6c9', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Sri vishanava Sampradaya',
            index: 15
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FJyotiniVeligiddandiRandi.mp3?alt=media&token=6296c948-2f4a-4487-903f-3e0d022aa3ac', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Jyotini Veligiddandi Randi',
            index: 16
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FKshudrapedaParrihara-Hanuman.mp3?alt=media&token=efb5f272-5502-4b7f-90fa-efb3ff1590e7', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'KshudrapedaParrihara-Hanuman',
            index: 17
        }, {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FManavaJanmakuParamardamGeetaJyoti.mp3?alt=media&token=cf1c258c-140e-4648-9f5e-4ef1c6d2ce35', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Manava Janmaku Paramardam GeetaJyoti',
            index: 18
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FRamachandraSwami.mp3?alt=media&token=aa7cb99d-8e27-4882-ac26-82ff981b95e9', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Ramachandra Swami',
            index: 19
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FRamaRamaYanuma.mp3?alt=media&token=35589659-a394-4d19-b10b-c68d2d33afbe', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Rama Rama Yanuma',
            index: 20
        }, {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FRanga%20Ranga%20Vaibhavame.mp3?alt=media&token=38cda55d-0dcc-47d5-a47a-b79e63f9f749', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Ranga Ranga Vaibhavame',
            index: 21
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FSrimannarayana.mp3?alt=media&token=3d42a717-8b99-4f97-b745-402fb34007a3', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Srimannarayana',
            index: 22
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FSriRamachandruduAlladigo.mp3?alt=media&token=f27b7de4-619a-45da-9be2-d11ce4f2782f', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Sri Ramachandrudu Alladigo',
            index: 23
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FTridandiTridandi.mp3?alt=media&token=2790e200-3237-46d5-a47f-baf5441af573', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Tridandi Tridandi',
            index: 24
        },
        {
            url: 'https://firebasestorage.googleapis.com/v0/b/acharya-6bf2a.appspot.com/o/songs%2FVishwasantikaiVilasille.mp3?alt=media&token=552d5707-d146-422e-9fd5-ac8818ec3e90', // audio file stored in device's app folder
            artist: 'Agastyar',
            title: 'Vishwasantikai Vilasille',
            index: 25
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