module.exports = angular.module('app.cars.component.car_info', ['auth0']).component('carInfoComponent', {
    templateUrl : '/app/js/cars/components/car_info.template.html',
    controller  : CarInfoController,
    transclude  : true
});

function CarInfoController(CarInfoService, $scope, auth, $http, $location, store, $rootScope ){
    'use strict';

    $scope.auth = auth;

    console.log($location.path())

    var ctrl = this;
    var variableToPass = "This is some stuff from car info";

    ctrl.variableToPass = variableToPass;
    ctrl.carInfo = CarInfoService.getCarInfoByEngine('petrol');
    ctrl.carText = "So the car has";
    ctrl.functionToBePassed = functionToBePassed;

    function functionToBePassed() {

    }

    $scope.callApi = function() {
        // Just call the API as you'd do using $http
        $http({
            url: 'http://localhost:3001/secured/ping',
            method: 'GET'
        }).then(function() {
            alert("We got the secured data successfully");
        }, function(response) {
            if (response.status == -1) {
                alert("Please download the API seed so that you can call it.");
            }
            else {
                alert(response.data);
            }
        });
    };

}