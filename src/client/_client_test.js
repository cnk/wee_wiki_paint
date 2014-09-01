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
            var expectedPathString = ['M', startX, ',', startY, 'L', endX, ',', endY].join('');
            var actualPathString = pathStringFor(elements[0]);
            expect(actualPathString).to.equal(expectedPathString);
        });

        it("should draw line segments between mouse clicks", function() {
            var startX = 55; var startY = 72; var endX = 200; var endY = 400;
            drawingDiv.trigger(clickMouse(startX, startY));
            drawingDiv.trigger(clickMouse(endX, endY));

            // The new element is a path, get dimensions relative to the canvas borders
            var lineStart = relativePosition(drawingDiv, startX, startY);
            var lineEnd   = relativePosition(drawingDiv, endX, endY);
            var expectedPathString = ['M', lineStart.x, ',', lineStart.y, 'L', lineEnd.x, ',', lineEnd.y].join('');
            var actualPathString = pathStringFor(pageElements(paper)[0]);
            expect(actualPathString).to.equal(expectedPathString);
        });

        ///////////////////// helper functions /////////////////

        function pageElements(page) {
            var elements = [];
            paper.forEach(function(element) {
                elements.push(element);
            });
            return elements;
        }

        function pathStringFor(element) {
            var bbox = element.getBBox();
            return 'M' + bbox.x + ',' + bbox.y + 'L' + bbox.x2 + ',' + bbox.y2;
        }

        function clickMouse(pageX, pageY) {
            var ev = new jQuery.Event();
            ev.type = 'click';
            ev.pageX = pageX;
            ev.pageY = pageY;
            return ev;
        }

        function relativePosition(drawingArea, pageX, pageY) {
            var expectedX = pageX - drawingArea.offset().top;
            var expectedY = pageY - drawingArea.offset().left;
            return {x: expectedX, y: expectedY};
        }
    });
}());
