var Memcached = require("memcached");
var client = new Memcached();


// time to live in secs (1 day)
var TTL = 86400;

var Cache = {
   setAccessToken: function(accessToken, accessTokenEmail, callback){
      var data = JSON.stringify({
         "accessToken": accessToken,
         "accessTokenEmail": accessTokenEmail
      };
      // WTF?
      // https://github.com/3rd-Eden/memcached
      // value: Mixed Either a buffer, JSON, number or string that you want to store.
      client.set("app.accessToken", data), TTL, callback);
   },
   getAccessToken: function(callback){
      client.get("app.accessToken", function(err, data){
         callback(err, JSON.parse(data))
      });
   },
   removeAccessToken: function(accessToken, callback){
      client.delete("app.accessToken", callback);
   }
};

module.exports = Cache;
