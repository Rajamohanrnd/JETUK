(function () {
    "use strict";
    angular.module('starter.controllers')
    .controller('AppCtrl',AppCtrl);
    
    AppCtrl.$inject = ["$scope", "$ionicModal", "$timeout", "$ionicPlatform", "$rootScope", "$ionicPush", "$http", "$httpParamSerializer", "$state", "rssService", "rssServiceData"];
    
    function AppCtrl($scope, $ionicModal, $timeout, $ionicPlatform, $rootScope, $ionicPush, $http, $httpParamSerializer, $state, rssService, rssServiceData){
        $scope.contactusData = {};
        $scope.prajanaTeacherData = {};
        $scope.prajanaStudentData = {};
        $scope.feedbackData = {};
        $scope.shareData = {};
        $scope.subscriberData = {};
        $scope.submitPrajnaStudentData = function() {
    
            var _sendPrajanStudentRegistrationMailtoJetUK = JSON.stringify({
                FromEmailAddress: $scope.prajanaStudentData.Email,
                ToEmailAddress: "info@jetuk.org",
                Subject: "Acharya - Prajna Student - Registration",
                Body: "<p><h5>Name:" + $scope.prajanaStudentData.Name + "</h5><h5>Email:" + $scope.prajanaStudentData.Email + "</h5><h5>Contact:" + $scope.prajanaStudentData.Contact + "</h5><h5>Address:" + $scope.prajanaStudentData.FullAddress + "</h5><h5>PostCode:" + $scope.prajanaStudentData.PostCode + "</h5><h5>ChildName:" + $scope.prajanaStudentData.StudentName + "</h5><h5>ChildAge:" + $scope.prajanaStudentData.StudentAge + "</p>"
            });
    
            var _sendPrajanStudentThanksMailtoRequestor = JSON.stringify({
                FromEmailAddress: "info@jetuk.org",
                ToEmailAddress: $scope.prajanaStudentData.Email,
                Subject: "Thank you for registering for Prajana Student - " + $scope.prajanaStudentData.StudentName,
                Body: "<p><h4>Jai Srimannarayana!!</h4><h4>Namaste " + $scope.prajanaStudentData.Name + " ji," + "</h4>" + "Thank you for registering for Prajna Student. Our volunteer from JETUK will contact you shortly. For any questions please reach out to info@jetuk.org. Thank you once again and acharya's managalashasanams(blessings) to your family." + "<h5></h5>" + "Regards," + "<h5></h5><b>Team JETUK</b>" + "</p>"
            });
    
            $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanStudentRegistrationMailtoJetUK).
            success(function(data, status, headers, config) {
    
                $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanStudentThanksMailtoRequestor).
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
    
        $scope.submitprajnateacherdata = function() {
    
            var _sendPrajanTeacherRegistrationMailtoJetUK = JSON.stringify({
                FromEmailAddress: $scope.prajanaTeacherData.Email,
                ToEmailAddress: "info@jetuk.org" + ";" + $scope.prajanaStudentData.Email,
                Subject: "Acharya - Prajna Teacher - Registration",
                Body: "<p><h5>Name:" + $scope.prajanaTeacherData.Name + "</h5><h5>Email:" + $scope.prajanaTeacherData.Email + "</h5><h5>Contact:" + $scope.prajanaTeacherData.Contact + "</h5><h5>Full Address:" + $scope.prajanaTeacherData.FullAddress + "</h5><h5>Postcode:" + $scope.prajanaTeacherData.PostCode + "</h5></p>"
    
            });
    
            var _sendPrajanTeacherThanksMailtoRequestor = JSON.stringify({
                FromEmailAddress: "info@jetuk.org",
                ToEmailAddress: $scope.prajanaTeacherData.Email,
                Subject: "Thank you for registering for Prajna Teacher",
                Body: "<p><h4>Jai Srimannarayana!!</h4><h4>Namaste " + $scope.prajanaTeacherData.Name + " ji," + "</h4>" + "Thank you for registering for Prajna Teacher. Our volunteer from JETUK will contact you shortly. For any questions please reach out to info@jetuk.org. Thank you once again and acharya's managalashasanams(blessings) to your family." + "<h5></h5>" + "Regards," + "<h5></h5><b>Team JETUK</b>" + "</p>"
    
            });
    
            $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanTeacherRegistrationMailtoJetUK).
            success(function(data, status, headers, config) {
    
                $http.post("http://jetuk-org.azurewebsites.net/api/SendEmail/post", _sendPrajanTeacherThanksMailtoRequestor).
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
    
        $scope.submitcontactusdata = function() {
    
    
            var _sendRequestMailtoJetUK = JSON.stringify({
                FromEmailAddress: $scope.contactusData.Email,
                ToEmailAddress: "info@jetuk.org",
                Subject: "Acharya Contact Us page enquiry",
                Body: "<p><h7>Name:" + $scope.contactusData.Name + "</h7>" + "<h5></h5>" + "<h7>Email:" + $scope.contactusData.Email + "</h7><h5></h5><h7> Contact: " + $scope.contactusData.Contact + "</h7><h5></h5><h7>Message:" + $scope.contactusData.Message + "</h7></p>"
            });
    
            var _sendThanksMailtoRequestor = JSON.stringify({
                FromEmailAddress: "info@jetuk.org",
                ToEmailAddress: $scope.contactusData.Email,
                Subject: "Thanks for contacting JETUK",
                Body: "<p><h4>Jai Srimannarayana!!</h4><h5></h5><h5>Namaste " + $scope.contactusData.Name + "," + "</h5><h5></h5>" + "Our team member will contact you soon." + "<h5></h5>" + "<p><h7>Name:" + $scope.contactusData.Name + "</h7>" + "<h5></h5>" + "<h7>Email:" + $scope.contactusData.Email + "</h7><h5></h5><h7> Contact: " + $scope.contactusData.Contact + "</h7><h5></h5><h7>Message:" + $scope.contactusData.Message + "</h7></p>" + "<h5></h5>" + "Regards," + "<h5></h5><b>Team JETUK</b>" + "</p>"
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
    
        $scope.submitFeedbackdata = function() {
            
                var _sendRequestMailtoJetUK = JSON.stringify({
                    FromEmailAddress: $scope.feedbackData.Email,
                    ToEmailAddress: "info@jetuk.org",
                    Subject: "Acharya Feedback page enquiry",
                    Body: "<p><h7>Name:" + $scope.feedbackData.Name + "</h7>" + "<h5></h5>" + "<h7>Email:" + $scope.feedbackData.Email + "</h7><h5></h5><h7> Contact: " + $scope.feedbackData.Contact + "</h7><h5></h5><h7>Message:" + $scope.feedbackData.Message + "</h7></p>"
                });
    
                var _sendThanksMailtoRequestor = JSON.stringify({
                    FromEmailAddress: "info@jetuk.org",
                    ToEmailAddress: $scope.feedbackData.Email,
                    Subject: "Thanks for providing the feedback",
                    Body: "<p><h4>Jai Srimannarayana!!</h4><h5></h5><h5>Namaste " + $scope.feedbackData.Name + "," + "</h5><h5></h5>" + "We really appreciate your Feedback.Our team member will contact you shortly." + "<h5></h5><h5></h5>" + "Regards," + "<h5></h5><b>Team JETUK</b>" + "</p>"
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
            $scope.submitsubcriberdata = function() {
                
                            var _sendRequestMailtoJetUK = JSON.stringify({
                                FromEmailAddress: $scope.subscriberData.Email,
                                ToEmailAddress: "info@jetuk.org",
                                Subject: "New subscriber - Acharya App",
                                Body: "<p><h7>New Subscriber registered with Acharya App</h7></p>"
                            });
                
                            var _sendThanksMailtoRequestor = JSON.stringify({
                                FromEmailAddress: "info@jetuk.org",
                                ToEmailAddress: $scope.subscriberData.Email,
                                Subject: "Welcome to Jeeyar Educational Trust UK",
                                Body: "<p><h5>Dear Devotee,</h5><h5></h5><p>Thank you for expressing your interest in our activities. With Acharya’s blessings, we conduct various spiritual and social events throughout the year at different locations. </p><p>We will do our best to update you with the upcoming events in your area and around the world while making sure you are not spammed with junk. </p><p>Please feel free to visit <a href='www.jetuk.org'>JET UK</a> or  <a href='https://chinnajeeyar.guru/chinnajeeyar/'>JET Bharat</a> for more information about our services to the society.</p><p>If you would like to participate, volunteer or support, please do get in touch with us on info@jetuk.org</p><p>May Acharya's grace be upon us. </p><p>At your service,<h5>TEAM JETUK</h5></p>"
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
    }
})();