// Basic client test
/*global describe, it, expect, dump, console, $, wwp, afterEach, beforeEach */

(function () {
    "use strict";

    describe('Drawing area', function() {
        var drawingDiv = $('<div id="drawingArea" style="width: 600px; height: 400px;">drawing goes here</div>');

        beforeEach(function() {
            // Create the div that will be assumed to be on our web page in production
            // In other words, set up a mock for the web page
            $(document.body).append(drawingDiv);
        });

        afterEach(function() {
            $('div#drawingArea').remove();
        });

        it("should be initialized in a predefined div", function() {
            // Initialize it with WWP fuctions
            wwp.initializeDrawingArea('drawingArea');

            // Test the div is set up
            var tagName = $('div#drawingArea').children()[0].tagName;
            expect(tagName).to.equal('svg');
        });

        it("the Raphael canvas should be contained within the drawing area", function() {
            var paper = wwp.initializeDrawingArea('drawingArea');

            expect(paper.width).to.equal(600);
            expect(paper.height).to.equal(400);
        });

        it("should draw a line", function() {
            var paper = wwp.initializeDrawingArea('drawingArea');
            wwp.drawLine(20,200,200,400);

            var elements = [];
            paper.forEach(function(element) {
                elements.push(element);
            });
            expect(elements.length).to.equal(1);
        });
    });
}());
