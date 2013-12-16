/*global desc, task, jake, fail, complete */
(function() {

    "use strict";

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Test everything by default");
    task("test", ["node"], function() {
        var testFiles = new jake.FileList();
        testFiles.include("**/_*_test.js");
        testFiles.exclude("node_modules");

        var reporter = require("nodeunit").reporters["default"];
        reporter.run(testFiles.toArray(), null, function(failures) {
            if (failures) fail("Tests failed");
            complete();
        });
    }, {async: false});

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

        var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

    // desc("Ensure correct version of node is present");
    task("node", [], function() {
        var desiredNodeVersion = 'v0.10.9';
        var runningVersion = process.version;

        console.log("\nRunning NodeJS version: " + runningVersion);
        if (runningVersion !== desiredNodeVersion) fail("This code was written for NodeJS version " + desiredNodeVersion + ". You are currently running " + runningVersion + ".");
    });

    function sh(cmd, callback) {
        var process = jake.createExec([cmd]);
        var stdout = '';
        process.addListener('stdout', function(buf) {
            stdout += buf;
        });
        process.addListener('cmdEnd', function() {
            callback(stdout);
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
