var util = require("./../util/util.js");
// var klas = require("./../util/klas.js");
var appAuth = require("./../app_auth.js");

module.exports = function(req, res, next){
   var username = util.trim(req.params.username);
   var password = util.trim(req.params.password);
   if (username == "" || req.params.password == "") {
      res.send(400); next();
      return;
   }
   if (username != "kerem" || req.params.password != "1") {
      res.send(404); next();
      return;
   }

   // @todo keep access token in memo?
   var accessToken = appAuth.generateAccessToken();

   res.send(200, {"access_token": accessToken})
   next();
};
