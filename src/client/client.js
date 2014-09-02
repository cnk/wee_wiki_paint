// Spike client code
/*global dump, Raphael, $, console, wwp:true */

wwp = {};

(function () {
    "use strict";

    var paper;

    wwp.initializeDrawingArea = function(drawingAreaId) {
        paper = new Raphael(drawingAreaId);
        wwp.drawLineFollowingMouse(drawingAreaId);
        return paper;
    };

    wwp.drawLine = function(startX, startY, endX, endY) {
        paper.path("M"+startX+","+startY+"L"+endX+","+endY);
    };

    wwp.drawLineFollowingMouse = function(drawingAreaId) {
        var drawingArea = $('#'+drawingAreaId);
        var isDragging = false;
        var start = null;

        drawingArea.mousedown( function(event) {
            isDragging = true;
            start = relativePosition(drawingArea, event.pageX, event.pageY);
        });

        drawingArea.mouseup( function(event) {
            isDragging = false;
        });

        drawingArea.mousemove( function(event) {
            var end = relativePosition(drawingArea, event.pageX, event.pageY);
            if (isDragging) {
                wwp.drawLine(start.x, start.y, end.x, end.y);
                start = end;
            }
        });
    };

    function relativePosition(element, absoluteX, absoluteY) {
        var offset = element.offset().left;
        return {
            x: absoluteX - element.offset().left,
            y: absoluteY - element.offset().top,
        };
    }

}());
