var angular     = require('angular');
var mainModule  = require('./main/main.module.js');

require('@angular/router/angular1/angular_1_router');
require('auth0-angular/build/auth0-angular.js');
require('angular-cookies/angular-cookies.js');
require('angular-storage/dist/angular-storage.js');
require('angular-jwt/dist/angular-jwt.js');


angular.module('app', [ mainModule.name, 'ngComponentRouter', 'ngCookies', 'auth0', 'angular-storage', 'angular-jwt' ])
.config(function ($locationProvider, $routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
    $locationProvider.html5Mode(true);

    authProvider.init({
        domain: 'mkharla.eu.auth0.com',
        clientID: 'RAlhilY3VWIKyJTA8pufBXJNKXlrr57s',
        loginUrl: '/login'
    });

    authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
        console.log("Login Success");
        profilePromise.then(function(profile) {
            store.set('profile', profile);
            store.set('token', idToken);
        });

        $location.path('/cars');
    });

    authProvider.on('loginFailure', function() {
        alert("Error");
    });

    authProvider.on('authenticated', function($location) {
        console.log("Authenticated");
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

})
.value('$routerRootComponent', 'appMain')
.run(function($rootScope, auth, store, jwtHelper, $location) {
    $rootScope.$on('$locationChangeStart', function() {

        var token = store.get('token');
        if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
                if (!auth.isAuthenticated) {
                    auth.authenticate(store.get('profile'), token);
                }
            } else {
                // Either show the login page or use the refresh token to get a new idToken
                $location.path('/login');
            }
        }

    });
})
