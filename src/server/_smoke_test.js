// wee_wiki_paint/src/server/_server_test.js
"use strict";

var child_process = require("child_process");
var child; // to hold the process as a global
var http = require('http');

function runServer(nodeArgs, callback) {
    child = child_process.spawn("node", nodeArgs);
    child.stdout.setEncoding('utf8');
    child.stdout.on("data", function(chunk) {
        // process.stdout.write('server stdout: ' + chunk );
        if (chunk.trim() === "Server started") {
            callback();
        }
    });
    child.stderr.on("data", function(chunk) {
        process.stdout.write('server stderr: ' + chunk );
    });
    child.on("exit", function(code, signal) {
        // console.log("Server process exited with code [" + code + "] and signal [" + signal + "]");
    });
}

function httpGet(url, callback) {
    var request = http.get(url);
    request.on("response", function(response) {
        response.setEncoding('utf8');
        var responseData = '';
        response.on("data", function(chunk) {
            responseData += chunk;
        });
        response.on("end", function() {
            callback(response, responseData);
        });
    });
}

exports.setUp = function(done) {
    runServer(['src/server/weewikipaint'], done);
};

exports.tearDown = function(done) {
    child.on("exit", function() {
        done();
    });
    child.kill();
};

exports.test_HomepageServed = function(test) {
    httpGet('http://localhost:8080', function(response, receivedData) {
        test.ok(receivedData.indexOf('Welcome to WeeWikiPaint!') !== -1);
        test.done();
    });
};

exports.test_NotFoundServed = function(test) {
    httpGet('http://localhost:8080/beetlejuice', function(response, receivedData) {
        test.ok(receivedData.indexOf('File not found') !== -1);
        test.done();
    });
};
