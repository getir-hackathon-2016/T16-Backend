var Memcached = require("memcached");
var client = new Memcached();


// time to live in secs (1 day)
var TTL = 86400;

var Cache = {
   setAccessData: function(token, tokenEmail, callback){
      var data = JSON.stringify({
         "token": token,
         "tokenEmail": tokenEmail
      });
      // WTF?
      // https://github.com/3rd-Eden/memcached
      // value: Mixed Either a buffer, JSON, number or string that you want to store.
      client.set("app.access", data, TTL, callback);
   },
   getAccessData: function(callback){
      client.get("app.access", function(err, data){
         data = data || "{}"
         try {
            data = JSON.parse(data)
         } catch(e) {}
         callback(err, data);
      });
   },
   removeAccessData: function(callback){
      client.del("app.access", callback);
   }
};

module.exports = Cache;
