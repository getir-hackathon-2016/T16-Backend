var appDb = require("../app_database.js");

var User = {
   find: function(id, callback){
      appDb.getDocument(id, callback);
   }
};

module.exports = User;
