var util = require("./../util/util.js");
// var klas = require("./../util/klas.js");

module.exports = function(req, res, next){
   res.send("login!")
   next();
};
