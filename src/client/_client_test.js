// Basic client test
/*global describe, it, expect, assert, dump, console */

(function () {
    "use strict";

    describe('addition', function() {
        it("should add 1 and 1", function() {
            assert.equal(1+1, 2);
            expect(1+3).to.equal(4);
        });
    });

    describe('should be able to manipulate the dom', function() {
        it("should append a div to the body", function() {
            var extractedDiv = document.getElementById("test-div");
            expect(extractedDiv.getAttribute("foo")).to.equal("bar");
        });
    });
}());
