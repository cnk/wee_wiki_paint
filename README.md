Example project from [Let's Code Javascript](http://letscodejavascript.com)

An in-browser drawing tool - created with CI and TDD.

## USAGE

This project comes with an automatic build script. To build, assuming
you have Node.js installed, `run: ./jake.sh`

Or to see things in the browser, run: `node file_server.js 5000 src/server/content/homepage.html src/server/content/not_found.html`

### In-browser testing

  1. Start the karma server: `./karma.sh start`
  3. Attach one or more browsers by nagivating to http://localhost:9876/
  3. Run the karma tests: `./karma.sh run`
   
