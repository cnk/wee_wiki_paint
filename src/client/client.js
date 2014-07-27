// Spike client code
/*global dump, $, wwp:true */

wwp = {};

(function () {
    "use strict";

    wwp.createElement = function() {
        $('<div id="mydiv" foo="bar">blank</div>').appendTo("body");
        dump("Window loaded and div appended");
    };
}());
