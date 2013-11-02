// wee_wiki_paint/src/server/_server_test.js
"use strict";

var PORT = 8080;
var URL = 'http://localhost:' + PORT + '/';

var server = require("./server.js");
// Require node's http module so we can use it's testing methods
var http = require("http");

exports.test_serverRespondsToGetRequests = function(test) {
    server.start(PORT);
    http.get(URL, function(response) {
        test.equals(200, response.statusCode, 'status code should be 200');
        response.on("data", function() {});
        server.stop();
        test.done();
    });
};

exports.test_serverReturnsHelloWorld = function(test) {
    server.start(PORT);
    var request = http.get(URL);
    request.on("response", function(response) {
        response.setEncoding('utf8');
        response.on("data", function(chunk) {
            test.equals("Hello World!", chunk, "response body contains hello world");
        });
        server.stop();
        test.done();
    });
};

exports.test_serverRunsCallbackWhenStopCalled = function(test) {
    server.start(PORT);
    server.stop(function() {
        test.done();
    });
};

exports.test_serverThrowsExceptionWhenStoppedBeforeStarting = function(test) {
    test.throws(function() {
        server.stop();
    }, /Not running/);
    test.done();
};

exports.test_serverThrowsExceptionWhenStartedWithoutAPort = function(test) {
    test.throws(function() {
        server.start();
    }, /Port number is required/);
    test.done();
};
