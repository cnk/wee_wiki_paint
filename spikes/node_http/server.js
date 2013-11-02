// Play around with Node.js's built in http server
// run as `node spikes/node_http/server.js`

"use strict";

var http = require("http");
var server = http.createServer();

server.on("request", function(request, response) {
    console.log("received request");

    var body = "<h1>Spike!</h1>";

    response.end(body);
});

server.listen(8888);
console.log("server listening on port 8888");
