// Spike client code
/*global dump */

(function () {
    "use strict";

    window.onload = function() {
        var div = document.createElement("div");
        div.setAttribute("id", "test-div");
        div.setAttribute("foo", "bar");
        document.body.appendChild(div);

        dump("Window loaded and div appended");
    };
}());
