// Basic client test
/*global describe, it, expect, dump, console, $, wwp, afterEach, beforeEach */

(function () {
    "use strict";

    describe('Drawing area', function() {
        var drawingDiv = $('<div id="drawingArea" style="width: 600px; height: 400px;">drawing goes here</div>');
        var paper;

        beforeEach(function() {
            // Create the div that will be assumed to be on our web page in production
            // In other words, set up a mock for the web page
            $(document.body).append(drawingDiv);
            paper = wwp.initializeDrawingArea('drawingArea');
        });

        afterEach(function() {
            $('div#drawingArea').remove();
        });

        it("should be initialized in a predefined div", function() {
            // Test the div is set up
            var tagName = $('div#drawingArea').children()[0].tagName;
            expect(tagName).to.equal('svg');
        });

        it("the Raphael canvas should be contained within the drawing area", function() {
            expect(paper.width).to.equal(600);
            expect(paper.height).to.equal(400);
        });

        it("should draw a line", function() {
            var startX = 20; var startY = 200; var endX = 200; var endY = 400;
            wwp.drawLine(startX, startY, endX, endY);

            // DrawLine added a single element to the paper
            var elements = [];
            paper.forEach(function(element) {
                elements.push(element);
            });
            expect(elements.length).to.equal(1);

            // The new element is a path with the expected attributes
            var line = elements[0].node.attributes.d.value;
            var expected = ['M', startX, ',', startY, 'L', endX, ',', endY].join('');
            expect(line).to.equal(expected);
        });
    });
}());
