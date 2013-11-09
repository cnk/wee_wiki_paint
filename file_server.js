// Run our static file server
"use strict";

var server = require('./src/server/server.js')

server.start(8888, 'README');
console.log("server listening on port 8888");
