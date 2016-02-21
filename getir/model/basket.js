var appDb = require("../app_database.js");

var Basket = {
   addItem: function(item, callback){
      appDb.createDocument(item, callback);
   },
   getItem: function(itemId, callback){
      appDb.getDocument(itemId, callback);
   },
   getItemAll: function(callback){
      appDb.getDocumentAll({}, null, callback);
   },
   removeItem: function(itemId, callback){
      appDb.deleteDocument(itemId, callback);
   },
};

module.exports = Basket;
