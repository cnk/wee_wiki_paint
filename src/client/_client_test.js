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

        it("should draw a line when our drawLine function is called explicitly", function() {
            wwp.drawLine(20, 200, 200, 400);

            // DrawLine added a single element to the paper
            var elements = pageElements(paper);
            expect(elements.length).to.equal(1);

            // The new element is a path with the expected attributes
            expect(paperPaths(paper)).to.eql([[20, 200, 200, 400]]);
        });

        it("should draw line segments between mouse clicks", function() {
            clickMouse(drawingDiv, 55, 72);
            clickMouse(drawingDiv, 200, 400);
            clickMouse(drawingDiv, 99, 35);

            expect(paperPaths(paper)).to.eql([[55, 72, 200, 400], [200, 400, 99, 35]]);
        });

        ///////////////////// helper functions /////////////////

        function pageElements(page) {
            var elements = [];
            paper.forEach(function(element) {
                elements.push(element);
            });
            return elements;
        }

        function clickMouse(target, canvasX, canvasY) {
            var ev = new jQuery.Event();
            ev.type = 'click';
            ev.pageX = canvasX + target.offset().top;
            ev.pageY = canvasY + target.offset().left;
            target.trigger(ev);
        }

        function pathStringFor(element) {
            return element.node.attributes.d.value;
        }

        function lineCoordinates(element) {
            var coord = pathStringFor(element).match(/M(\d+),(\d+)L(\d+),(\d+)/);
            if (coord !== null) {
                return {
                    x: parseInt(coord[1]),
                    y: parseInt(coord[2]),
                    x2: parseInt(coord[3]),
                    y2: parseInt(coord[4])
                };
            }
            else {
                throw new Error('Could not find line coordinates');
            }

        }

        function paperPaths(paper) {
            var elements = pageElements(paper);

            return elements.map(function(element) {
                var line = lineCoordinates(element);
                return [line.x, line.y, line.x2, line.y2];
            });
        }
    });
}());
