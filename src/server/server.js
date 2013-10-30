// wee_wiki_paint/src/server/server.js
"use strict";

var http = require("http");
var server;

exports.start = function() {
    console.log("Server started");
    server = http.createServer();
    server.on("request", function(request, response) {
	console.log("Request called");
	response.end("OK");
    });
    server.listen(8080);
};

exports.stop = function() {
    console.log("Server stopping");
    server.close();
};
