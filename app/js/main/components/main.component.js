'use strict';
var angular = require('angular');

module.exports = angular.module('app.main.component', ['auth0']).component('appMain', {
    templateUrl     : '/app/js/main/components/main.template.html',
    controller      : MainController,
    transclude      : true,
    $routeConfig    : [
        {
            path            : '/cars',
            name            : 'CarsLink',
            component       : 'carInfoComponent',
            requiresLogin   : true
        },
        {
            path            : '/contacts',
            name            : 'ContactsLink',
            component       : 'contacts',
            requiresLogin   : false
        },
        {
            path            : '/login',
            name            : 'LoginLink',
            component       : 'login',
            requiresLogin   : false,
            useAsDefault    : true
        },
    ]
});

function MainController( $scope, auth, $location, store, $q ){
    var ctrl    = this;
    $scope.auth = auth;

    $scope.getClass = function (path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }

    $scope.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/login');
    }
}