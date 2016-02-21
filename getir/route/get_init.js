var util = require("../util/util.js");
var appAuth = require("../app_auth.js");
var appError = require("../app_error.js");
var appCache = require("../app_cache.js");

var User = require("../model/user.js");
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
      if (!data.token || !data.tokenEmail || !accessToken || data.token !== accessToken) {
         var error = appError.get("AUTHORIZATION", req);
         var payload = new Payload(null, error.code, error.text);

         res.send(401, payload.pack());
         return next();
      }

      // find user if exists
      User.find(data.tokenEmail, function(stream, data){
         if (!stream.response.isStatusCode(200)) {
            console.log(stream.request.toString());
            console.log(stream.response.toString());

            // fill payload error
            var error = appError.get("", req);
            var payload = new Payload(null, error.code, error.text);

            res.send(500, payload.pack());
            return next();
         }

         if (data == null) {
            var error = appError.get("LOGIN_MATCH", req);
            var payload = new Payload(null, error.code, error.text);

            res.send(404, payload.pack());
            return next();
         } else {
            var payload = new Payload({
               "id": data.doc.id,
               "email": data.doc.email
            });

            res.send(200, payload.pack());
            return next();
         }
      });
   });
};
