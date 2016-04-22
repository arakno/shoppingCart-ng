'use strict';


angular.module('myApp.services', [])
  .service('productService', ['$q', function ($q) {

    // product class
    function Product(sku, name, description, price) {
      this.sku = sku;
      this.name = name;
      this.description = description;
      this.price = price;
    }


    var products = [
      new Product("APL", "Apple", "Eat one every day to keep the doctor away!", 12),
      new Product("AVC", "Avocado", "Guacamole anyone?", 16),
      new Product("BAN", "Banana", "These are rich in Potassium and easy to peel.", 4),
      new Product("CTP", "Cantaloupe", "Delicious and refreshing.", 3),
      new Product("FIG", "Fig", "OK, not that nutritious, but sooo good!", 10),
      new Product("GRF", "Grapefruit", "Pink or red, always healthy and delicious.", 11),
      new Product("GRP", "Grape", "Wine is great, but grapes are even better.", 8),
      new Product("GUA", "Guava", "Exotic, fragrant, tasty!", 8),
      new Product("KIW", "Kiwi", "These come from New Zealand.", 14),
      new Product("LYC", "Lychee", "Unusual and highly addictive!", 18),
      new Product("MAN", "Mango", "Messy to eat, but well worth it.", 8),
      new Product("ORG", "Orange", "Vitamin C anyone? Go ahead, make some juice.", 9),
      new Product("PAP", "Papaya", "Super-popular for breakfast.", 5),
      new Product("PCH", "Peach", "Add some cream and enjoy.", 19),
      new Product("PER", "Pear", "Delicious fresh, or cooked in red wine, or distilled.", 8),
      new Product("PMG", "Pomegranate", "Delicious, healthy, beautiful, and sophisticated!", 19),
      new Product("PNP", "Pineapple", "Enjoy it (but don't forget to peel first).", 4)
    ];

    this.getAll = function () {
      return $q.when({ data: products });
    }


  }]).service('cartService', function () {

    var items = [];

    function findProduct(product) {
      angular.forEach(items, function (item) {
        if (item.product.sku == product.sku) {
          return item;
        }
      });
    }

    this.getItems = function () {
      return items;
    }

    this.removeItem = function (item, e) {
      var index = items.indexOf(item);
      items.splice(index, 1);
      e.preventDefault();
    }
    
    this.removeAll = function (e) {
      items.length = 0;
      e.preventDefault();
    }
    
    this.total = function (delivery) {
      var sum = 0;
      angular.forEach(items, function (item) {
        sum += item.product.price * item.quantity;
      });

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

    function Delivery(name, cost) {
      this.name = name;
      this.cost = cost;
    }
    
    var deliveries = [
      new Delivery("deliveroo", 20),
      new Delivery("DHL", 10)
    ];

    this.getAll = function () {
      return $q.when({ data: deliveries });
    }

  }]);
