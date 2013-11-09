// wee_wiki_paint/src/server/server.js
"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function(portNumber, file_to_serve) {
    if (!portNumber) throw new Error("Port number is required to start the server");
    if (!file_to_serve) throw new Error("Path to a file to serve is required to start the server");

    server = http.createServer();
    server.on("request", function(request, response) {
        fs.readFile(file_to_serve, function(err, data) {
            if (err) throw err;
            response.end(data);
        });
    });
    server.listen(portNumber);
};

exports.stop = function(callback) {
    server.close(callback);
};
