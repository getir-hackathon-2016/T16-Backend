var util = require("../util/util.js");
var appAuth = require("../app_auth.js");
var appError = require("../app_error.js");
var appCache = require("../app_cache.js");

var User = require("../model/user.js");
var Payload = require("../app_payload.js");

module.exports = function(req, res, next){
   // @debug
   console.log(req.body)

   var deviceId = req.header("X-Device-Id");
   console.log("X-Device-Id:", deviceId);
   if (util.isNone(deviceId)) {
      // fill payload error
      var error = appError.get("MISSING_HEADER", req);
      var palpack = new Payload(null, error.code, error.text);

      res.send(400, payload.pack());
      return next();
   }

   var email = util.trim(req.params.email);
   var password = util.trim(req.params.password);
   if (email == "" || password == "") {
      // fill payload error
      var error = appError.get("LOGIN_EMPTY", req);
      var palpack = new Payload(null, error.code, error.text);

      res.send(400, payload.pack());
      return next();
   }

   // find user
   User.find(email, function(stream, data){
      // console.log(stream.request.toString());
      // console.log(stream.response.toString());
      if (!stream.response.isStatusCode(200)) {
         console.log(stream.request.toString());
         console.log(stream.response.toString());

         // fill payload error
         var error = appError.get("", req);
         var palpack = new Payload(null, error.code, error.text);

         res.send(500, payload.pack());
         return next();
      }

      if (data == null || email != data.doc.email || password != data.doc.password) {
         // fill payload error
         var error = appError.get("LOGIN_MATCH", req);
         var palpack = new Payload(null, error.code, error.text);

         res.send(404, payload.pack());
         return next();
      } else {
         var accessToken = appAuth.generateAccessToken();
         // keep access token in memo (expire?)
         appCache.setAccessData(deviceId, accessToken, email);
         // pack payload
         var palpack= new Payload({"access_token": accessToken});

         res.send(200, payload.pack());
         return next();
      }
   });
};
