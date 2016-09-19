'use strict';

// Declare app level module which depends on views, and components
var socialApp = angular.module("socialApp", [
        'ngMaterial',
        'ngRoute',
        'socialApp.dashboard',
        'ngResource'
    ])
    .config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
        $routeProvider.otherwise({ redirectTo: '/dashboard' });
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    }])
    .run(['$rootScope', '$location', '$mdToast', function($rootScope, $location, $mdToast) {
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
            $location.path("/dashboard");
            $mdToast.show(
                $mdToast.simple()
                .textContent(rejection)
                .position("top right")
                .hideDelay(3000)
            );
        })
    }]);
