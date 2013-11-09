// wee_wiki_paint/src/server/_server_test.js
"use strict";

var PORT = 8080;
var URL = 'http://localhost:' + PORT + '/';

var server = require("./server.js");

var http = require("http"); // Require node's http module so we can use it's testing methods
var fs = require('fs'); // For testing the file system dependent tests

exports.test_serverServesAFile = function(test) {
    var testDir = "generated/test";
    var testFile = testDir + "/a_file.html";
    var testData = "This is from the test file";
    fs.writeFileSync(testFile, testData);
    test.ok(fs.existsSync(testFile), "testFile was not created");

    server.start(PORT);
    var request = http.get(URL);
    request.on("response", function(response) {
        response.setEncoding('utf8');
        test.equals(200, response.statusCode, "got 200 status code");

        response.on("data", function(chunk) {
            test.equals(testData, chunk, "response body contains hello world");
        });
        response.on("end", function() {
            server.stop(function() {
                fs.unlinkSync(testFile);
                test.ok(!fs.existsSync(testFile), "testFile was not removed");
                test.done();
            });
        });
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
