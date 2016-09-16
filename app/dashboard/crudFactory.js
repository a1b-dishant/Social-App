'use strict';
socialApp.factory('crudFactory', ['$http', '$timeout', '$q',
    function($http, $timeout, $q) {
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
    }
]);
