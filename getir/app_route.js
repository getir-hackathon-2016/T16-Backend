var fs = require("fs");
var appError = require("./app_error.js");

var Payload = require("./app_payload.js");

module.exports = {
   root: function(req, res, next){
      // fill payload error
      var error = appError.get("NO_ROUTE", req);
      var payload = new Payload(null, error.code, error.text);

      res.send(404, payload.pack());
      return next();
   }
};

// auto require & register routes
var files = fs.readdirSync(__dirname +"/route");
files.forEach(function(file){
   var fileName = file.slice(0, -3);
   var filePath = "./route/"+ file;

   // use file name as route handler
   module.exports[fileName] = require(filePath);

   var tmp = fileName.split("_");
   console.log("Registering route: '%s /%s' from '%s'.",
      // do: get_product_all => GET
      // do: product_list    => product-list
      tmp[0].toUpperCase(), tmp.slice(1).join("-"), filePath);
});
