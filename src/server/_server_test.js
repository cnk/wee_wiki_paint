// wee_wiki_paint/src/server/_server_test.js
"use strict";

var PORT = 8080;
var URL = 'http://localhost:' + PORT + '/';
var TEST_FILE = "generated/test/a_file.html";

var server = require("./server.js");
var http = require("http"); // Require node's http module so we can use it's testing methods
var fs = require('fs'); // For testing the file system dependent tests
var assert = require("assert");

exports.tearDown = function(done) {
    if (fs.existsSync(TEST_FILE)) {
        fs.unlinkSync(TEST_FILE);
        assert.ok(!fs.existsSync(TEST_FILE), "The test file was not removed");
    }
    done();
};

function httpGet(url, callback) {
    server.start(PORT, TEST_FILE);
    var request = http.get(url);
    request.on("response", function(response) {
        response.setEncoding('utf8');
        var responseData = '';
        response.on("data", function(chunk) {
            responseData += chunk;
        });
        response.on("end", function() {
            callback(response, responseData);
            server.stop();
        });
    });
}

exports.test_serverServesHomepageFromFile = function(test) {
    var testData = "This is from the test file";
    fs.writeFileSync(TEST_FILE, testData);
    test.ok(fs.existsSync(TEST_FILE), "The test file was not created");

    httpGet(URL, function(response, responseData) {
        test.equals(200, response.statusCode, "got 200 status code");
        test.equals(testData, responseData, "response body contains hello world");
        test.done();
    });
};

exports.test_serverServesHomepageAtIndex = function(test) {
    var testData = "This is from the test file";
    fs.writeFileSync(TEST_FILE, testData);
    test.ok(fs.existsSync(TEST_FILE), "The test file was not created");

    httpGet(URL + "index.html", function(response, responseData) {
        test.equals(200, response.statusCode, "got 200 status code");
        test.equals(testData, responseData, "response body contains hello world");
        test.done();
    });
};

exports.test_serverSends404sForEverythingExceptHomepage = function(test) {
    var testData = "This is from the test file";
    fs.writeFileSync(TEST_FILE, testData);
    test.ok(fs.existsSync(TEST_FILE), "The test file was not created");

    httpGet(URL + 'junk', function(response, responseData) {
        test.equals(404, response.statusCode, "did not get 404 status code");
        test.done();
    });
};

exports.test_serverRunsCallbackWhenStopCalled = function(test) {
    server.start(PORT, TEST_FILE);
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
        server.start('', TEST_FILE);
    }, /Port number is required/);
    test.done();
};

exports.test_serverThrowsExceptionWhenStartedWithoutFileToServe = function(test) {
    test.throws(function() {
        server.start(PORT);
    }, /Path to a file to serve is required/);
    test.done();
};
