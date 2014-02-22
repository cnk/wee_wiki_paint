// Run our static file server
"use strict";

var server = require('./src/server/server.js');
var port = process.argv[2];
var homepage = process.argv[3];
var not_found = process.argv[4];

server.start(port, homepage, not_found);
console.log("server listening on port " + port);
