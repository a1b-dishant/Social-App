'use strict';

angular.module('socialApp.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/index.html',
            controller: 'dashboardController'
        });
    }])
    .controller('dashboardController', ['$scope', 'crudFactory', function($scope, curdFactory) {
        curdFactory.getData().then(
            function(resp) {
                $scope.people = resp.data;
            },
            function(error) {
                $scope.message = "Some thing went wrong.";
            }
        )
    }])
    .directive('block', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'dashboard/block-template.html'
        }
    })