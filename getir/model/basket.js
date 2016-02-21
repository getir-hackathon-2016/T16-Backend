var appDb = require("../app_database.js");

var Basket = {
   addItem: function(item, callback){},
   getItem: function(itemId, callback){},
   getItemAll: function(callback){
      appDb.getDocumentAll({}, null, callback);
   },
   removeItem: function(itemId, callback){},
};

module.exports = Basket;
