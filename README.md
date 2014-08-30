Example project from [Let's Code Javascript](http://letscodejavascript.com)

An in-browser drawing tool - created with CI and TDD.

## USAGE

This project comes with an automatic build script. To build, assuming
you have Node.js installed, `run: ./jake.sh`

Or to see the node.js server, run:
   node file_server.js 5000 src/server/content/homepage.html src/server/content/not_found.html
and then look at the result in the browser at http://localhost:5000/

### In-browser testing

  1. Start the karma server: `./karma.sh start`
  3. Attach one or more browsers by nagivating to http://localhost:9876/
  3. Run the karma tests: `./karma.sh run`


### Raphael spike 8/30/14

I want to be able to look at code results in the browser, not just
with Karma / Chai tests, so I added our client scripts to the homepage
content. Our node.js server only serves the homepage, not javascript
from the client directory. So to see those work, one needs to open the
file rather than navigating to localhost:5000. Then the relative urls
in homepage.html resolve correctly.

