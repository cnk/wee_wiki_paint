// Spike client code
/*global dump, Raphael, $, wwp:true */

wwp = {};

(function () {
    "use strict";

    var paper;

    wwp.initializeDrawingArea = function(drawingAreaId) {
        paper = new Raphael(drawingAreaId);
        return paper;
    };

    wwp.drawLine = function(startX, startY, endX, endY) {
        paper.path(startX, startY, endX, endY);
    };
}());
