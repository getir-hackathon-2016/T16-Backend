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
// server.use(restify.gzipResponse());
server.use(restify.authorizationParser());
server.use(restify.acceptParser(server.acceptable));

// @debug stream logger
server.on("after", function(req, res, route, err){
   // request stream
   console.log("\r\n%s %s", req.method, req.url);
   for (var name in req.headers) {
      if (name == "user-agent") {
         continue;
      }
      console.log("%s%s: %s", name.substring(0,1).toUpperCase(),
         name.substring(1).replace(/-[a-z]/g, function(char){
            return char.toUpperCase();
         }), req.headers[name]);
   };
   console.log("");
   if (req.body) {
      if (typeof req.body == "object") {
         console.log(JSON.stringify(req.body));
      } else {
         console.log(req.body);
      }
   }
   console.log("");
   // response stream
   console.log("%s%s\r\n", res._header, res._data || "");
});

// register routes
server.get("/", app.Route.root);
server.get("/init", app.Route.get_init);
server.post("/login", app.Route.post_login);
server.get("/product-list", app.Route.get_product_list);

// listen!
server.listen(3000, function(){
   console.log("Server listening at: %s.", server.url);
});
