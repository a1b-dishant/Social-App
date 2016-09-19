'use strict';

angular.module('socialApp.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'dashboard/index.html',
                controller: 'allProfileController',
                /*resolve: {
                    message: ['crudFactory', '$q', function(crudFactory, $q) {
                        //show spinner
                        return crudFactory.getData();
                    }]
                }*/
                resolve: {
                    people: ['Post', '$q', function(Post, $q) {
                        var defer = $q.defer();
                        Post.getAllProfiles().then(function(data) {
                            defer.resolve(data);
                        }, function(error) {
                            defer.reject(error);
                        });
                        return defer.promise;
                    }]
                }
            })
            .when('/profile/:id', {
                templateUrl: 'dashboard/profile.html',
                controller: 'singleProfileController',
                resolve: {
                    person: ['Post', '$q', '$route', function(Post, $q, $route) {
                        var defer = $q.defer();
                        Post.getProfile($route.current.params.id).then(function(data) {
                            defer.resolve(data);
                        }, function(error) {
                            defer.reject(error);
                        });
                        return defer.promise;
                    }]
                }
            });
    }])
    .controller('dashboardController', ['$scope', 'crudFactory', function($scope, curdFactory, message) {
        $scope.message = message;
        curdFactory.getData().then(
            function(resp) {
                $scope.people = resp.data;
            },
            function(error) {
                $scope.message = "Some thing went wrong.";
            }
        )
    }])
    .controller("allProfileController", ['$scope', '$resource', 'people', function($scope, $resource, people) {
        $scope.people = people;
    }])
    .controller("singleProfileController", ['$scope', '$routeParams', 'person', function($scope, $routeParams, person) {
        $scope.person = person;
    }])
    .directive('block', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'dashboard/block-template.html'
        }
    })
    .filter('nameFilter', function($mdToast) {
        return function(people, searchuser) {
            if (searchuser) {
                var rearr = _.filter(people, function(person) {
                    return person.name.toLowerCase().indexOf(searchuser.toLowerCase()) > -1;
                });
                /*if (rearr && !rearr.length) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('No Data Found')
                        .position('top right')
                        .hideDelay(3000)
                    );
                }*/
                return rearr;
            } else {
                return people;
            }
        }
    })
