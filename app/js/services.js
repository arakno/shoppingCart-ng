'use strict';


angular.module('myApp.services', [])
  .service('productService', ['$q', function ($q) {

    // product class
    function product(sku, name, description, price) {
      this.sku = sku;
      this.name = name;
      this.description = description;
      this.price = price;
    }


    var Products = [
      new product("APL", "Apple", "Eat one every day to keep the doctor away!", 12),
      new product("AVC", "Avocado", "Guacamole anyone?", 16),
      new product("BAN", "Banana", "These are rich in Potassium and easy to peel.", 4),
      new product("CTP", "Cantaloupe", "Delicious and refreshing.", 3),
      new product("FIG", "Fig", "OK, not that nutritious, but sooo good!", 10),
      new product("GRF", "Grapefruit", "Pink or red, always healthy and delicious.", 11),
      new product("GRP", "Grape", "Wine is great, but grapes are even better.", 8),
      new product("GUA", "Guava", "Exotic, fragrant, tasty!", 8),
      new product("KIW", "Kiwi", "These come from New Zealand.", 14),
      new product("LYC", "Lychee", "Unusual and highly addictive!", 18),
      new product("MAN", "Mango", "Messy to eat, but well worth it.", 8),
      new product("ORG", "Orange", "Vitamin C anyone? Go ahead, make some juice.", 9),
      new product("PAP", "Papaya", "Super-popular for breakfast.", 5),
      new product("PCH", "Peach", "Add some cream and enjoy.", 19),
      new product("PER", "Pear", "Delicious fresh, or cooked in red wine, or distilled.", 8),
      new product("PMG", "Pomegranate", "Delicious, healthy, beautiful, and sophisticated!", 19),
      new product("PNP", "Pineapple", "Enjoy it (but don't forget to peel first).", 4)
    ];

    this.getAll = function () {
      return $q.when({ data: Products });
    }


  }]).service('cartService', function () {

    var items = [];

    function findProduct(product) {
      var matched;
      angular.forEach(items, function (item) {
        if (item.product.sku == product.sku) {
          matched = item;
          return;
        }
      });
      return matched;
    }

    this.getItems = function () {
      return items;
    }

    this.removeItem = function (item) {
      var index = items.indexOf(item);
      items.splice(index, 1);
    }

    this.total = function (delivery) {
      var sum = 0;
      angular.forEach(items, function (item) {
        sum += item.product.price * item.quantity;
      });

      this.countItems = function () {
        return items.length;
      }

      if (delivery) {
        sum += delivery.cost;
      }
      return sum;
    }

    this.addToCart = function (product, quantity) {

      var item = findProduct(product);


      if (item) {
        item.quantity += quantity;
      } else {
        item = {
          product: product,
          quantity: quantity
        };

        items.push(item);

      }

    }
  }).service('delivery', ['$q', function ($q) {

    function delivery(name, cost) {
      this.name = name;
      this.cost = cost;
    }

    var Deliveries = [
      new delivery("deliveroo", 20),
      new delivery("DHL", 10)
    ];

    this.getAll = function () {
      return $q.when({ data: Deliveries });
    }

  }]);
