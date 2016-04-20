'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.services',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'partials/products.html', 
    controller: 'Store'});
  $routeProvider.when('/view2', {
    templateUrl: 'partials/cart.html', 
    controller: 'Cart'});
  $routeProvider.when('/view3', {
    templateUrl: 'partials/thanks.html'
  });    
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);