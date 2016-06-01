var
    angular           = require('angular'),
    carsComponent     = require('../cars/cars.module.js'),
    contactsComponent = require('../contacts/contacts.module.js'),
    loginComponent    = require('../login/login.module.js'),
    mainComponent     = require('./components/main.component.js');

module.exports = angular.module("app.main", [
    carsComponent.name,
    mainComponent.name,
    loginComponent.name,
    contactsComponent.name
]);