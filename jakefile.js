/*global desc, task, jake, fail, complete */
(function() {

    "use strict";

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Test everything by default");
    task("test", ["testServer", "testClient"]);

    desc("Test our node server");
    task("testServer", ["nodeVersion"], function() {
        var testFiles = new jake.FileList();
        testFiles.include("**/_*_test.js");
        testFiles.exclude("node_modules");
        testFiles.exclude("src/client/**");

        var reporter = require("nodeunit").reporters["default"];
        reporter.run(testFiles.toArray(), null, function(failures) {
            if (failures) fail("Tests failed");
            complete();
        });
    }, {async: true});

    desc("Test our client-side code in multiple browsers at once.");
    task("testClient", function() {
        sh("node_modules/.bin/karma run", "Client-side tets failed!", complete);
    }, {async: true});

    desc("clean out test files");
    task("clean", [], function() {
        var testFiles = "generated/test/*";
        var cmd = 'rm ' + testFiles;
        sh(cmd, function(stdout){ });
    });

    desc("Lint everything by default");
    task("lint", [], function() {
        var lint = require("./build/lint/lint_runner.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");
        files.exclude("src/client/**");

        var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

    // desc("Ensure correct version of node is present");
    task("nodeVersion", [], function() {
        var desiredNodeVersion = 'v0.10.9';
        var runningVersion = process.version;

        console.log("\nRunning NodeJS version: " + runningVersion);
        if (runningVersion !== desiredNodeVersion) fail("This code was written for NodeJS version " + desiredNodeVersion + ". You are currently running " + runningVersion + ".");
    });

    function sh(cmd, errorMsg, callback) {
        console.log("Run: " + cmd);

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

    function nodeLintOptions() {
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
            trailing: true,
            node: true
        };
    }

}());
