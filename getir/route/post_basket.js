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

   var id    = util.trim(req.params.id);
   var name  = util.trim(req.params.name);
   var price = parseFloat(req.params.price);
   var image = util.trim(req.params.image);
   var qty   = parseInt(req.params.qty, 10);
   if (util.isNone(id) || util.isNone(name) || util.isNone(image) || !price || !qty) {
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

      var item = {
         "id": id,
         "access_token": accessToken,
         "doc_type": "basket_item",
         "name": name,
         "price": price,
         "image": image,
         "qty": qty
      };

      Basket.addItem(item, function(stream, data){
         var payload = new Payload(data);
         res.send(200, payload.pack());

         return next();
      });
   });
};
