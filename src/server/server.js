// wee_wiki_paint/src/server/server.js
"use strict";

var http = require("http");
var server;

exports.start = function(portNumber) {
    if (!portNumber) throw new Error("Port number is required to start the server");
    console.log("Server started");
    server = http.createServer();
    server.on("request", function(request, response) {
        console.log("Request called");
        response.end("Hello World!");
    });
    server.listen(portNumber);
};

exports.stop = function(callback) {
    console.log("Server stopping");
    server.close(callback);
};
