var redis = require("redis");
var client = redis.createClient();

var Redis = {
   setAccessToken: function(accessToken, callback){
      client.set("app.accessToken", accessToken);
      if (callback) {
         callback(client);
      }
   },
   getAccessToken: function(callback){
      client.get("app.accessToken", callback);
   },
   removeAccessToken: function(accessToken, callback){
      client.del("app.accessToken", callback);
   }
};

module.exports = Redis;
