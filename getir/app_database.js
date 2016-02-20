var Couch = require("yay-couch");

var couch  = new Couch.Couch();
var client = new Couch.Client(couch);
var server = new Couch.Server(client);

module.exports = new Couch.Database(client, "getir");
