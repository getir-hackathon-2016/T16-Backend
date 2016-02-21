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

   appCache.getAccessData(deviceId, function(err, data){
      // authorized?
      if (!data.token || !accessToken || data.token !== accessToken) {
         var error = appError.get("AUTHORIZATION", req);
         var payload = new Payload(null, error.code, error.text);

         res.send(401, payload.pack());
         return next();
      }

      Basket.getItemAll(function(err, data){
         var items = [];
         var totalItem = 0;
         var totalAmount = 0.00;
         if (data.rows) {
            data.rows.forEach(function(row){
               if (row.doc
                  && row.doc.doc_type == "basket_item"
                  && row.doc.access_token == accessToken
               ) {
                  items.push({
                     "id": row.doc._id,
                     "name": row.doc.name,
                     "price": row.doc.price,
                     "image": row.doc.image,
                     "qty": row.doc.qty
                  });
                  totalAmount += row.doc.price * row.doc.qty;
               }
            });
         }
         data = null;
         if (items.length) {
            data = {};
            data.items = items;
            data.totalItem = items.length;
            data.totalAmount = totalAmount;
         }

         var payload = new Payload(data);
         res.send(200, payload.pack());

         return next();
      });
   });
};
