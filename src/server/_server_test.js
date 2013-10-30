// wee_wiki_paint/src/server/_server_test.js
"use strict";

var server = require("./server.js");
// Require node's http module so we can use it's testing methods
var http = require("http");

exports.tearDown = function(finished) {
    server.stop();
    finished();
};

exports.testServerRespondsToGetRequests = function(test) {
    server.start();
    http.get('http://localhost:8080/', function(response) {
	console.log("Got response: " + response.statusCode);
	response.on("data", function() {});
	test.done();
    }).on('error', function(err) {
	console.log("Got error: " + err.message);
    });
};
