var util = require("./util/util.js");
var client = util.CacheClient();

// time to live in secs (1 day)
var TTL = 86400;

var Cache = {
   setAccessData: function(deviceId, token, tokenEmail, callback){
      var data = JSON.stringify({
         "deviceId": deviceId,
         "token": token,
         "tokenEmail": tokenEmail,
      });
      console.log("Memcache set:", data);
      client.set("app.access."+ deviceId, data, TTL, callback);
   },
   getAccessData: function(deviceId, callback){
      client.get("app.access."+ deviceId, function(err, data){
         console.log("Memcache get:", data);
         try {
            data = JSON.parse(data)
         } catch(e) {}
         callback(err, data || {});
      });
   },
   removeAccessData: function(deviceId, callback){
      client.delete("app.access."+ deviceId, callback);
   }
};

module.exports = Cache;
