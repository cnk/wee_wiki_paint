// Spike client code
/*global dump, Raphael, $, console, wwp:true */

wwp = {};

(function () {
    "use strict";

    var paper;

    wwp.initializeDrawingArea = function(drawingAreaId) {
        paper = new Raphael(drawingAreaId);
        // spike 8/30/14
        var drawingArea = $('#'+drawingAreaId);
        drawingArea.click(function(event) {
            var divX = drawingArea.offset().left;
            var divY = drawingArea.offset().top;

            var relativeX = event.pageX - divX;
            var relativeY = event.pageY - divY;
            paper.circle(relativeX, relativeY, 2).attr("fill", "red");
        });
        // end spike

        return paper;
    };

    wwp.drawLine = function(startX, startY, endX, endY) {
        paper.path("M"+startX+","+startY+"L"+endX+","+endY);
    };
}());
