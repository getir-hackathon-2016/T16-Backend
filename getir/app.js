var app = {};

app.Auth = require("./app_auth.js");
app.Route = require("./app_route.js");
app.Payload = require("./app_payload.js");
app.Error = require("./app_error.js");
app.Database = require("./app_database.js");
app.Redis = require("./app_redis.js");

module.exports = app;
