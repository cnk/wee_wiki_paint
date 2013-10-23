// wee_wiki_paint/src/server/_server_test.js
"use strict";

var server = require("./server.js");

exports.testServersNumberMethod = function(test) {
    test.equal(3, server.number(), "number");
    test.done();
};
