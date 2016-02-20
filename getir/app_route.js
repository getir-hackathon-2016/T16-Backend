var _fs = require("fs");

module.exports = {
   root: function(req, res, next){
      res.send("nö!");
      next();
   }
};

// auto require & register routes
var files = _fs.readdirSync(__dirname +"/route");
files.forEach(function(file){
   var fileName = file.slice(0, -3);
   var filePath = "./route/"+ file;

   // use file name as route handler
   module.exports[fileName] = require(filePath);

   fileName = fileName.split("_")
   console.log("Registering route: '%s /%s' from '%s'.",
      fileName[0].toUpperCase(), fileName[1], filePath)
});
