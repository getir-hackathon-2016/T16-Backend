var util = require("../util/util.js");
var appAuth = require("../app_auth.js");
var appPayload = require("../app_payload.js");
var appError = require("../app_error.js");
var appCache = require("../app_cache.js");

var Product = require("../model/product.js");

module.exports = function(req, res, next){
   var deviceId = req.header("X-Device-Id");
   var accessToken = req.header("X-Access-Token");
   console.log("X-Device-Id:", deviceId);
   console.log("X-Access-Token:", accessToken);
   if (util.isNone(deviceId) || util.isNone(accessToken)) {
      // fill payload error
      var error = appError.get("MISSING_HEADER", req);
      var pack  = new appPayload(null, error.code, error.text).pack();

      res.send(400, pack);
      return next();
   }

   appCache.getAccessData(deviceId, function(err, data){
      // authorized?
      if (!data.token || !accessToken || data.token !== accessToken) {
         var error = appError.get("AUTHORIZATION", req);
         var pack  = new appPayload(null, error.code, error.text).pack();

         res.send(401, pack);
         return next();
      }

      // find all products
      Product.findAll({}, function(stream, data){
         // console.log(stream.request.toString());
         // console.log(stream.response.toString());
         if (!stream.response.isStatusCode(200)) {
            console.log(stream.request.toString());
            console.log(stream.response.toString());

            // fill payload error
            var error = appError.get("", req);
            var pack  = new appPayload(null, error.code, error.text).pack();

            res.send(500, pack);
            return next();
         }

         var rows = util.dig(data, "rows");
         if (rows && rows.length) {
            data = [];
            rows.forEach(function(row){
               if (!row.doc || !row.doc.name) {
                  return;
               }

               data.push({
                  "id": row.doc._id,
                  "name": row.doc.name,
                  "price": row.doc.price,
                  "stock": row.doc.stock,
                  "image": row.doc.image,
                  "category": row.doc.category
               });
            });

            // should be done while select
            data.sort(function(a, b){
               return a.name > b.name;
            });
         } else {
            data = null;
         }

         res.send(200, new appPayload(data).pack());
         return next();
      });
   });
};
