// Basic client test
/*global describe, it, expect, assert */

(function () {
    "use strict";

    describe('addition', function() {

        it("should add 1 and 1", function() {
            // dump("in my client test");
            assert.equal(1+1, 2);
            expect(1+3).to.equal(4);
        });

    });
}());
