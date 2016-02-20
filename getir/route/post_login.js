var util = require("../util/util.js");
var appAuth = require("../app_auth.js");
var appPayload = require("../app_payload.js");
var appError = require("../app_error.js");
var appCache = require("../app_cache.js");

var User = require("../model/user.js");

module.exports = function(req, res, next){
   // @debug
   console.log(req.body)

   var deviceId = req.header("X-Device-Id");
   console.log("X-Device-Id:", deviceId);
   if (util.isNone(deviceId)) {
      // fill payload error
      var error = appError.get("MISSING_HEADER", req);
      var pack  = new appPayload(null, error.code, error.text).pack();

      res.send(400, pack);
      return next();
   }

   var email = util.trim(req.params.email);
   var password = util.trim(req.params.password);
   if (email == "" || password == "") {
      // fill payload error
      var error = appError.get("LOGIN_EMPTY", req);
      var pack  = new appPayload(null, error.code, error.text).pack();

      res.send(400, pack);
      return next();
   }

   User.find(email, function(stream, data){
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

      if (data == null || email != data.doc.email || password != data.doc.password) {
         // fill payload error
         var error = appError.get("LOGIN_MATCH", req);
         var pack  = new appPayload(null, error.code, error.text).pack();

         res.send(404, pack);
         next();
      } else {
         var accessToken = appAuth.generateAccessToken();
         // keep access token in memo (expire?)
         appCache.setAccessData(deviceId, accessToken, email);
         // pack payload
         pack = new appPayload({"access_token": accessToken}).pack();

         res.send(200, pack);
         next();
      }
   });
};
