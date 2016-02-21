var util = require("../util/util.js");
var appAuth = require("../app_auth.js");
var appError = require("../app_error.js");
var appCache = require("../app_cache.js");

var Basket = require("../model/basket.js");
var Payload = require("../app_payload.js");

module.exports = function(req, res, next){
   var deviceId = req.header("X-Device-Id");
   var accessToken = req.header("X-Access-Token");
   console.log("X-Device-Id:", deviceId);
   console.log("X-Access-Token:", accessToken);
   if (util.isNone(deviceId) || util.isNone(accessToken)) {
      // fill payload error
      var error = appError.get("MISSING_HEADER", req);
      var payload = new Payload(null, error.code, error.text);

      res.send(400, payload.pack());
      return next();
   }

   var id = util.trim(req.params.id);
   if (util.isNone(id)) {
      // fill payload error
      var error = appError.get("MISSING_PARAM", req);
      var payload = new Payload(null, error.code, error.text);

      res.send(400, payload.pack());
      return next();
   }

   appCache.getAccessData(deviceId, function(err, data){
      // authorized?
      if (!data.token || !accessToken || data.token !== accessToken) {
         var error = appError.get("AUTHORIZATION", req);
         var payload = new Payload(null, error.code, error.text);

         res.send(401, payload.pack());
         return next();
      }

      Basket.getItem(id, function(err, data){
         var row = data;
         if (row && row.doc) {
            data = {
               "item": {
                  "_id": row.doc._id,
                  "id": row.doc.id,
                  "name": row.doc.name,
                  "price": row.doc.price,
                  "image": row.doc.image,
                  "qty": row.doc.qty
               },
            };
            data.totalItem = 1;
            data.totalAmount = row.doc.price * row.doc.qty;
         } else {
            data = null;
         }

         var payload = new Payload(data);
         res.send(200, payload.pack());

         return next();
      });
   });
};
