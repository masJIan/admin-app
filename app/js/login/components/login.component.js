var angular = require('angular');

module.exports = angular.module('app.login.component', []).component('login', {
    templateUrl : '/app/js/login/components/login.template.html',
    controller  : LoginController,
});

function LoginController($scope, auth, $rootScope) {
    var ctrl = this;
    $scope.auth = auth;
}