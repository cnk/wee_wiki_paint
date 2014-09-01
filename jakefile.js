/*global desc, task, jake, fail, complete */
(function() {
    "use strict";

    // var DESIRED_NODE_VERSION = 'v0.10.9';
    var DESIRED_NODE_VERSION = 'v0.10.28';
    var SUPPORTED_BROWSERS = [
        "Chrome",
        "Safari",
        "Firefox",
        // "iOS",
    ];

    var lint = require("./build/lint/lint_runner.js");

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Test everything by default");
    task("test", ["testServer", "testClient"]);

    desc("Test our node server");
    task("testServer", ["nodeVersion"], function() {
        var reporter = require("nodeunit").reporters["default"];
        reporter.run(nodeTestFiles(), null, function(failures) {
            if (failures) fail("Tests failed");
            complete();
        });
    }, {async: true});

    desc("Test our client-side code in multiple browsers at once.");
    task("testClient", function() {
        sh("node_modules/.bin/karma run", "One ore more client side tests failed", function(output) {
            var browserMissing = false;
            SUPPORTED_BROWSERS.forEach(function(browser) {
                browserMissing = checkIfBrowserIsTested(browser, output) || browserMissing;
            });
            if (browserMissing && process.env.strict) fail("Did not test all the supported browsers (use 'strict=false' to all skipping some browsers)");
            if (output.indexOf("TOTAL: 0 SUCCESS") !== -1) fail("Client tests did not run!");
        });
    }, {async: true});

    function checkIfBrowserIsTested(browserName, output) {
        var re = new RegExp(browserName + ".*: Executed ");
        var found = output.match(re);
        if (found)
            console.log('Testing against ' + browserName);
        else
            console.log(browserName + " was not tested! Be sure you have an instance of " + browserName + " pointed to http://localhost:9876/");
        return !found;
    }

    desc("clean out test files");
    task("clean", [], function() {
        var testFiles = "generated/test/*";
        var cmd = 'rm ' + testFiles;
        sh(cmd, function(stdout){ });
    });

    desc("Lint everything by default");
    task("lint", ["lintServer", "lintClient"]);

    desc("Lint our server code");
    task("lintServer", [], function() {
        var passed = lint.validateFileList(nodeFiles(), nodeLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

    desc("Lint our client tests");
    task("lintClient", [], function() {
        var passed = lint.validateFileList(clientFiles(), browserLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

    // desc("Ensure correct version of node is present");
    task("nodeVersion", [], function() {
        var runningVersion = process.version;

        console.log("\nRunning NodeJS version: " + runningVersion);
        if (runningVersion !== DESIRED_NODE_VERSION) fail("This code was written for NodeJS version " + DESIRED_NODE_VERSION + ". You are currently running " + runningVersion + ".");
    });

    function sh(cmd, errorMsg, callback) {
        // console.log("Run: " + cmd);

        var stdout = '';
        var process = jake.createExec(cmd, {printStdout: true, printStderr: true});
        process.addListener('stdout', function(buf) {
            stdout += buf;
        });
        process.addListener('cmdEnd', function() {
            callback(stdout);
        });
        process.addListener('error', function() {
            fail(errorMsg);
        });
        process.run();
    }

    function nodeFiles() {
        var jsFiles = new jake.FileList();
        jsFiles.include("**/*.js");
        jsFiles.exclude("node_modules");
        jsFiles.exclude("src/client/**");
        jsFiles.exclude("vendor/client/**");
        return jsFiles.toArray();
    }

    function nodeTestFiles() {
        var testFiles_ = new jake.FileList();
        testFiles_.include("**/_*_test.js");
        testFiles_.exclude("node_modules");
        testFiles_.exclude("src/client/**");
        return testFiles_.toArray();
    }

    function clientFiles() {
        var clientFiles_ = new jake.FileList();
        clientFiles_.include("src/client/**/*.js");
        return clientFiles_.toArray();
    }

    function globalLintOptions() {
        return {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true
        };
    }

    function nodeLintOptions() {
        var options = globalLintOptions();
        options.node = true;
        return options;
    }

    function browserLintOptions() {
        var options = globalLintOptions();
        options.browser = true;
        return options;
    }

}());
