// wee_wiki_paint/src/server/server.js
"use strict";

var http = require("http");
var fs = require("fs");
var server;

function serveFile(response, file) {
    fs.readFile(file, function(err, data) {
        if (err) throw err;
        response.end(data);
    });
}

exports.start = function(portNumber, homepage_file, not_found_file, callback) {
    if (!portNumber) throw new Error("Port number is required to start the server");
    if (!homepage_file) throw new Error("Path to a homepage file is required to start the server");
    if (!not_found_file) throw new Error("Path to a 404 file is required to start the server");

    server = http.createServer();
    server.on("request", function(request, response) {
        if (request.url === '/' || request.url === '/index.html') {
            serveFile(response, homepage_file);
        } else {
            response.statusCode = 404;
            serveFile(response, not_found_file);
        }
    });
    server.listen(portNumber, callback);
};

exports.stop = function(callback) {
    server.close(callback);
};
