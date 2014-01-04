// wee_wiki_paint/src/server/weewikipaint.js
// Start our node server
"use strict";

var CONTENT_DIR = "src/server/content";

var server = require('./server.js');
var port = process.argv[2];
server.start(port, CONTENT_DIR + '/homepage.html', CONTENT_DIR + '/not_found.html', function() {
    console.log('Server started');
});
