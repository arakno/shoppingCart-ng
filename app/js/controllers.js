'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
  .controller('Cart', ['$scope', 'cartService', 'delivery', function ($scope, cartService, delivery) {
      $scope.cart = cartService;
      delivery.getAll().then(function(response) {
        $scope.deliveries = response.data;
      })
    }
  ])
  .controller('Store', ['$scope','productService', 'cartService', function($scope, productService, cartService) {
      
    productService.getAll().then(function(response){
      $scope.products = response.data;
    });
    
    $scope.addToCart = function(product){
      cartService.addToCart(product,1);
    };
    
    $scope.countItems = cartService.getItems().length;

  }]);
