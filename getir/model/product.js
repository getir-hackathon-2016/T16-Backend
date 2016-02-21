var appDb = require("../app_database.js");

var Product = {
   find: function(id, callback){
      appDb.getDocument(id, callback);
   },
   findAll: function(query, callback){
      query = query || {};
      query["limit"] = 100;
      query["descending"] = "true";
      appDb.getDocumentAll(query, null, callback);
   }
};

module.exports = Product;
