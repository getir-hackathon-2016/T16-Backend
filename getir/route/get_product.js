var util = require("../util/util.js");
var appAuth = require("../app_auth.js");
var appError = require("../app_error.js");
var appCache = require("../app_cache.js");

var Product = require("../model/product.js");
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

      res.send(400, palpack.pack());
      return next();
   }

   var id = util.trim(req.params.id);
   if (util.isNone(id)) {
      // fill payload error
      var error = appError.get("MISSING_PARAM", req);
      var payload = new Payload(null, error.code, error.text);

      res.send(400, palpack.pack());
      return next();
   }

   appCache.getAccessData(deviceId, function(err, data){
      // authorized?
      if (!data.token || !accessToken || data.token !== accessToken) {
         var error = appError.get("AUTHORIZATION", req);
         var payload = new Payload(null, error.code, error.text);

         res.send(401, palpack.pack());
         return next();
      }

      // find all products
      Product.find(id, function(stream, data){
         // console.log(stream.request.toString());
         // console.log(stream.response.toString());
         if (!stream.response.isStatusCode(200)) {
            console.log(stream.request.toString());
            console.log(stream.response.toString());

            // fill payload error
            var error = appError.get("", req);
            var payload = new Payload(null, error.code, error.text);

            res.send(500, palpack.pack());
            return next();
         }

         var row = data;
         if (row && row.doc) {
            data = {
               "id": row.doc._id,
               "name": row.doc.name,
               "price": row.doc.price,
               "stock": row.doc.stock,
               "image": row.doc.image,
               "category": row.doc.category
            };
         } else {
            data = null;
         }

         res.send(200, new Payload(data).pack());
         return next();
      });
   });
};
