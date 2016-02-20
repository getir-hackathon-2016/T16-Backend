var memcache = require("./util/memcache");
var client = new memcache.Client();
client.on("connect", function(){
   console.log("Connected to Memcache.")
});
client.connect();

// time to live in secs (1 day)
var TTL = 86400;

var Cache = {
   setAccessData: function(token, tokenEmail, callback){
      var data = JSON.stringify({
         "token": token,
         "tokenEmail": tokenEmail
      });
      console.log(data)
      client.set("app.access", data, TTL, callback);
   },
   getAccessData: function(callback){
      client.get("app.access", function(err, data){
         console.log(data)
         try {
            data = JSON.parse(data)
         } catch(e) {}
         callback(err, data || {});
      });
   },
   removeAccessData: function(callback){
      client.del("app.access", callback);
   }
};

module.exports = Cache;
