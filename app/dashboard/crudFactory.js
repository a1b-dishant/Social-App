'use strict';
socialApp.factory('crudFactory', ['$http',
    function($http) {
        return {
            getData: function() {
                return $http.get('dashboard/data.json')
            }
        }
    }
]);
