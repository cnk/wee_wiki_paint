// wee_wiki_paint/src/server/_server_test.js
"use strict";

var child_process = require("child_process");
var child; // to hold the process as a global
var http = require('http');
var fs = require('fs');
var procfile = require('procfile');
var PORT = '5000';

function parseProcfile() {
    var file = fs.readFileSync('Procfile', 'utf8');
    var conf = procfile.parse(file).web;
    // if the procfile has an environment var placeholder, put in default port: 5000
    conf.options = conf.options.map(function(element) {
        if (element === '$PORT') return '5000';
        else return element;
    });
    return conf;
}

function runServer(callback) {
    var conf = parseProcfile();
    child = child_process.spawn(conf.command, conf.options);
    child.stdout.setEncoding('utf8');
    child.stdout.on("data", function(chunk) {
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
    runServer(done);
};

exports.tearDown = function(done) {
    child.on("exit", function() {
        done();
    });
    child.kill();
};

exports.test_HomepageServed = function(test) {
    httpGet('http://localhost:' + PORT, function(response, receivedData) {
        test.ok(receivedData.indexOf('Welcome to WeeWikiPaint!') !== -1);
        test.done();
    });
};

exports.test_NotFoundServed = function(test) {
    httpGet('http://localhost:' + PORT + '/beetlejuice', function(response, receivedData) {
        test.ok(receivedData.indexOf('File not found') !== -1);
        test.done();
    });
};
