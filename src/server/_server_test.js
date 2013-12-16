// wee_wiki_paint/src/server/_server_test.js
"use strict";

var PORT = 8080;
var URL = 'http://localhost:' + PORT + '/';
var TEST_FILE = "generated/test/a_file.html";
var NOT_FOUND_FILE = "generated/test/404.html";

var server = require("./server.js");
var http = require("http"); // Require node's http module so we can use it's testing methods
var fs = require('fs'); // For testing the file system dependent tests
var assert = require("assert");

function cleanUpFile(file) {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        assert.ok(!fs.existsSync(file), "The requested file was not removed");
    }
}

exports.tearDown = function(done) {
    cleanUpFile(TEST_FILE);
    cleanUpFile(NOT_FOUND_FILE);
    done();
};

function httpGet(url, callback) {
    server.start(PORT, TEST_FILE, NOT_FOUND_FILE, function() {
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

exports.test_serverServes404PageForEverythingExceptHomepage = function(test) {
    fs.writeFileSync(TEST_FILE, 'homepage data');
    test.ok(fs.existsSync(TEST_FILE), "The test file was not created");
    var notFoundMsg = "File not found";
    fs.writeFileSync(NOT_FOUND_FILE, notFoundMsg);
    test.ok(fs.existsSync(NOT_FOUND_FILE), "The not found file was not created");

    httpGet(URL + 'junk', function(response, responseData) {
        test.equals(404, response.statusCode, "We did not get 404 status code");
        test.equals(notFoundMsg, responseData, "We did not get the correct 404 message");
        test.done();
    });
};

exports.test_serverRunsCallbackWhenStopCalled = function(test) {
    server.start(PORT, TEST_FILE, NOT_FOUND_FILE);
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

exports.test_serverThrowsExceptionWhenStartedWithoutHomepageFile = function(test) {
    test.throws(function() {
        server.start(PORT);
    }, /Path to a homepage file is required/);
    test.done();
};

exports.test_serverThrowsExceptionWhenStartedWithoutA404File = function(test) {
    test.throws(function() {
        server.start(PORT, TEST_FILE);
    }, /Path to a 404 file is required/);
    test.done();
};
