// Spike client code
/*global dump, Raphael, $, console, wwp:true */

wwp = {};

(function () {
    "use strict";

    var paper;

    wwp.initializeDrawingArea = function(drawingAreaId) {
        paper = new Raphael(drawingAreaId);
        wwp.clickToDrawLine(drawingAreaId);
        return paper;
    };

    wwp.drawLine = function(startX, startY, endX, endY) {
        paper.path("M"+startX+","+startY+"L"+endX+","+endY);
    };

    wwp.clickToDrawLine = function(drawingAreaId) {
        var drawingArea = $('#'+drawingAreaId);
        var divX = drawingArea.offset().left;
        var divY = drawingArea.offset().top;
        var startX = null;
        var startY = null;

        drawingArea.click( function(event) {
            var endX = event.pageX - divX;
            var endY = event.pageY - divY;
            if (startX !== null) wwp.drawLine(startX, startY, endX, endY);
            startX = endX;
            startY = endY;
        });
    };


    wwp.spike = function(drawingAreaId) {
        wwp.initializeDrawingArea(drawingAreaId);
        // spike 8/30/14
        var drawingArea = $('#'+drawingAreaId);

        var previousX = null;
        var previousY = null;
        var isDragging = false;

        $(document).mousedown(function(event) { isDragging = true;});
        $(document).mouseup(function(event) { isDragging = false;});
        drawingArea.mouseleave(function(event) { isDragging = false;});

        var divX = drawingArea.offset().left;
        var divY = drawingArea.offset().top;

        drawingArea.mousemove(function(event) {
            var relativeX = event.pageX - divX;
            var relativeY = event.pageY - divY;
            if (previousX !== null && isDragging) wwp.drawLine(previousX, previousY, relativeX, relativeY);
            previousX = relativeX;
            previousY = relativeY;
        });
        // end spike
    };
}());
