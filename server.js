var restify = require("restify");
var restifyErrors = require("restify-errors");

var app = require("./getir/app.js");
var util = require("./getir/util/util.js");

// function respond(req, res, next) {
//    res.send("hello, "+ req.params.name);
//    next();
// }

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.fullResponse());
server.use(restify.gzipResponse());
server.use(restify.authorizationParser());
server.use(restify.acceptParser(server.acceptable));

server.get("/", app.route.root);
server.post("/login", app.route.login);

server.listen(3000, function(){
   console.log("Server listening at: %s.", server.url);
});
