// wee_wiki_paint/src/server/_server_test.js
"use strict";

var PORT = 8080;
var URL = 'http://localhost:' + PORT + '/';

var server = require("./server.js");
// Require node's http module so we can use it's testing methods
var http = require("http");

exports.setUp = function(callback) {
    server.start(PORT);
    callback();
};

exports.tearDown = function(finished) {
    server.stop();
    finished();
};

exports.test_serverRespondsToGetRequests = function(test) {
    http.get(URL, function(response) {
        test.equals(200, response.statusCode, 'status code should be 200');
        response.on("data", function() {});
        test.done();
    });
};

exports.test_serverReturnsHelloWorld = function(test) {
    var request = http.get(URL);
    request.on("response", function(response) {
        response.setEncoding('utf8');
        response.on("data", function(chunk) {
            test.equals("Hello World!", chunk, "response body contains hello world");
        });
        test.done();
    });
};
