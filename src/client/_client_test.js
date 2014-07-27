// Basic client test
/*global describe, it, expect, assert, dump, console, wwp */

(function () {
    "use strict";

    describe('Drawing area', function() {
        it("should be initialized in a predefined div", function() {
            // Create the div that will be assumed to be on our web page in production
            // In other words, set up a mock for the web page
            var div = document.createElement("div");
            div.setAttribute("id", "drawingArea");
            div.setAttribute("foo", "bar");
            document.body.appendChild(div);

            // Initialize it with WWP fuctions
            wwp.initializeDrawingArea();

            // Test the div is set up
            var extractedDiv = document.getElementById("drawingArea");
            expect(extractedDiv.getAttribute("foo")).to.equal("bar");
        });
    });
}());
