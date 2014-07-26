// Spike client code
/*global dump, $ */

(function () {
    "use strict";

    $(function() {
        $('<div id="mydiv" foo="bar">blank</div>').appendTo("body");
        dump("Window loaded and div appended");
    });
}());
