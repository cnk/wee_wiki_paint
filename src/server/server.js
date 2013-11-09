// wee_wiki_paint/src/server/server.js
"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function(portNumber) {
    if (!portNumber) throw new Error("Port number is required to start the server");
    var my_file = "generated/test/a_file.html";

    server = http.createServer();
    server.on("request", function(request, response) {
        fs.readFile(my_file, function(err, data) {
            if (err) throw err;
            response.end(data);
        });
    });
    server.listen(portNumber);
};

exports.stop = function(callback) {
    server.close(callback);
};
