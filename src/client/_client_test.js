// Basic client test
/*global describe, it, expect, dump, console, $, wwp, afterEach, beforeEach */

(function () {
    "use strict";

    describe('Drawing area', function() {
        afterEach(function() {
            $('div#drawingArea').remove();
        });

        it("should be initialized in a predefined div", function() {
            // Create the div that will be assumed to be on our web page in production
            // In other words, set up a mock for the web page
            var div = document.createElement("div");
            div.setAttribute("id", "drawingArea");
            document.body.appendChild(div);

            // Initialize it with WWP fuctions
            wwp.initializeDrawingArea('drawingArea');

            // Test the div is set up
            var tagName = $('div#drawingArea').children()[0].tagName;
            expect(tagName).to.equal('svg');
        });

        it("will be removed by the afterEach function after each run", function() {
            var da = $('div#drawingArea');
            expect(da.length).to.equal(0);
        });

        it("the Raphael canvas should be contained within the drawing area", function() {
            // set enclosing div to specific domension
            var mydiv = '<div id="raphael" style="width: 600px; height: 400px;">drawing goes here</div>';
            $(document.body).append(mydiv);

            var paper = wwp.initializeDrawingArea('raphael');
            expect(paper.width).to.equal(600);
            expect(paper.height).to.equal(400);
        });
    });
}());
