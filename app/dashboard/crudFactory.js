'use strict';
socialApp.factory('crudFactory', ['$http', '$timeout', '$q', '$resource', function($http, $timeout, $q, $resource) {
    return {
        getData: function() {
            var defer = $q.defer();
            $http.get('dashboard/data.json')
                .then(function(data) {
                    $timeout(function() {
                        defer.resolve(data);
                    }, 0);
                }, function(error) {
                    defer.reject(error);
                });
            return defer.promise;
        }
    }
}]);
socialApp.factory("Post", ['$resource', '$q', function($resource) {
    var res = $resource("http://192.168.39.49:5000/profile/:id", {}, {
        query: { method: "GET", isArray: true },
        fetch: { method: "GET", isArray: false }
    });
    return {
        getAllProfiles: function() {
            return res.query().$promise;
        },
        getProfile: function(id) {
            return res.fetch({ id: id }).$promise;
        }
    }
}]);
