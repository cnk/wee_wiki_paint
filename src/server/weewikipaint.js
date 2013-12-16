// wee_wiki_paint/src/server/weewikipaint.js
// Start our node server
"use strict";

var server = require('./server.js');
server.start('8080', 'src/server/content/homepage.html', 'src/server/content/not_found.html', function() {
    console.log('Server started');
});
