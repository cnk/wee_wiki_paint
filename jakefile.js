/*global desc, task, jake, fail, complete */
(function() {

    "use strict";

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Test everything by default");
    task("test", ["node"], function() {
        var reporter = require("nodeunit").reporters["default"];
        reporter.run(['src/server/_server_test.js'], null, function(failures) {
            if (failures) fail("Tests failed");
            complete();
        });
    }, {async: false});

    desc("Lint everything by default");
    task("lint", [], function() {
        var lint = require("./build/lint/lint_runner.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");

        var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
        if (!passed) fail("Lint failed");
    });

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

    // desc("Ensure correct version of node is present");
    task("node", [], function() {
        var desiredNodeVersion = 'v0.10.9\n';
        var cmd = "node --version";
        var process = jake.createExec([cmd]);
        var version = '';
        process.addListener('stdout', function(buf) {
            version += buf;
            if (version !== desiredNodeVersion) fail("This code was written for NodeJS version " + desiredNodeVersion + " You are currently running " + version);
            complete();
        });
        process.run();
    }, {async: true});

}());
