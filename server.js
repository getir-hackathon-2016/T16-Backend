// import externals
var restify = require("restify");
var restifyErrors = require("restify-errors");

// import internals
var app = require("./getir/app.js");
var util = require("./getir/util/util.js");

// server stuff
var server = restify.createServer();
restify.defaultResponseHeaders = false;
server.use(restify.bodyParser({mapParams: true})); // required for json bodies
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.authorizationParser());
server.use(restify.acceptParser(server.acceptable));

// register routes
server.get("/", app.Route.root);
server.get("/init", app.Route.get_init);
server.post("/login", app.Route.post_login);
server.get("/product-list", app.Route.get_product_list);

// listen!
server.listen(3000, function(){
   console.log("Server listening at: %s.", server.url);
});
