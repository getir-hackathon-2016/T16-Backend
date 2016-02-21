var fs = require("fs");
var appPayload = require("./app_payload.js");
var appError = require("./app_error.js");

module.exports = {
   root: function(req, res, next){
      // fill payload error
      var error = appError.get("NO_ROUTE", req);
      var pack  = new appPayload(null, error.code, error.text).pack();
      res.send(404, pack);
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

   fileName = fileName.split("_", 2);
   console.log("Registering route: '%s /%s' from '%s'.",
      // do: get_productList => GET
      // do: productList     => product-list
      fileName[0].toUpperCase(), fileName[1].replace(/[A-Z]/g, function(char){
         return "-"+ char.toLowerCase();
      }), filePath);
});
