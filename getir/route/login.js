var util = require("./../util/util.js");
var appAuth = require("./../app_auth.js");
var appPayload = require("./../app_payload.js");
var appError = require("./../app_error.js");

module.exports = function(req, res, next){
   // @debug
   console.log(req.body)

   // create payload
   var payload = new appPayload();
   var pack;

   var username = util.trim(req.params.username);
   var password = util.trim(req.params.password);
   if (username == "" || req.params.password == "") {
      // fill payload error
      error = appError.get("LOGIN_EMPTY", req);
      pack  = payload.setData(null)
         .setErrorCode(error.code)
         .setErrorText(error.text).pack();
      res.send(400, pack); next();
      return;
   }
   if (username != "kerem" || req.params.password != "1") {
      // fill payload error
      error = appError.get("LOGIN_MATCH", req);
      pack  = payload.setData(null)
         setErrorCode(error.code)
         setErrorText(error.text).pack();
      res.send(404, pack); next();
      return;
   }

   // @todo keep access token in memo?
   var accessToken = appAuth.generateAccessToken();

   // pack payload
   pack = payload.setData({"access_token": accessToken}).pack();

   res.send(200, pack)
   next();
};
