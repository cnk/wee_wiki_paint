// Basic client test
/*global describe, it, expect, dump, console, $, wwp, afterEach, beforeEach, jQuery */

(function () {
    "use strict";

    describe('Drawing area', function() {
        var drawingDivHeight = 400;
        var drawingDivWidth = 600;
        var drawingDiv = $('<div id="drawingArea" style="width: ' + drawingDivWidth + 'px; height: ' + drawingDivHeight + 'px;">drawing goes here</div>');
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
            expect(paper.width).to.equal(drawingDivWidth);
            expect(paper.height).to.equal(drawingDivHeight);
        });

        it("should draw a line", function() {
            var startX = 20; var startY = 200; var endX = 200; var endY = 400;
            wwp.drawLine(startX, startY, endX, endY);

            // DrawLine added a single element to the paper
            var elements = pageElements(paper);
            expect(elements.length).to.equal(1);

            // The new element is a path with the expected attributes
            var expected = ['M', startX, ',', startY, 'L', endX, ',', endY].join('');
            expect(lineValues(elements[0])).to.equal(expected);
        });

        it("should draw a line to where the mouse was clicked", function() {
            var startX = 0; var startY = 0; var endX = 200; var endY = 400;
            var mouseClickEvent = new jQuery.Event();
            mouseClickEvent.pageX = endX;
            mouseClickEvent.pageY = endY;
            mouseClickEvent.type = 'click';
            drawingDiv.trigger(mouseClickEvent);

            // The new element is a path with the expected attributes
            var expected = ['M', startX, ',', startY, 'L', endX, ',', endY].join('');
            expect(lineValues(pageElements(paper)[0])).to.equal(expected);
        });

        function pageElements(page) {
            var elements = [];
            paper.forEach(function(element) {
                elements.push(element);
            });
            return elements;
        }

        function lineValues(element) {
            var bbox = element.getBBox();
            return 'M' + bbox.x + ',' + bbox.y + 'L' + bbox.x2 + ',' + bbox.y2;
        }
    });
}());
