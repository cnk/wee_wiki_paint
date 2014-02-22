// wee_wiki_paint/src/server/_server_test.js
"use strict";

var http = require('http');

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

exports.test_isOnHeroku = function(test) {
    httpGet('http://lcj.herokuapp.com', function(response, receivedData) {
        test.ok(receivedData.indexOf('Welcome to WeeWikiPaint!') !== -1);
        test.done();
    });
};
