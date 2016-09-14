'use strict';

// Declare app level module which depends on views, and components
var socialApp = angular.module("socialApp", [
        'ngMaterial',
        'ngRoute',
        'socialApp.dashboard'
    ])
    .config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
        $routeProvider.otherwise({ redirectTo: '/dashboard' });
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    }]);
