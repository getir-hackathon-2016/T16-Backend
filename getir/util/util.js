// safe trim
function trim(input) {
   return (input != null)
      ? (""+ input).trim() : "";
}

function extend(target, source) {
   for (var i in source) {
      target[i] = source[i];
   }
   return target;
}

function dig(object, key) {
   var keys = key.split(".");
   var key  = keys.shift();
   return (keys.length)
      ? dig(keys.join("."), object[key])
      : object[key];
}

function isNone(input) {
   return (input == null || input.trim() === "");
}

function CacheClient() {
   var memcache = require("./memcache.js");
   var client = new memcache.Client();

   if (!CacheClient.connected) {
      CacheClient.connected = true;
      client.on("connect", function(){
         console.log("Connected to Memcache.");
      });
   }
   client.connect();

   return client;
}
CacheClient.connected = false;

module.exports = {
   trim: trim,
   extend: extend,
   dig: dig,
   isNone: isNone,
   CacheClient: CacheClient
};
