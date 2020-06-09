"use strict";
exports.__esModule = true;
var fib_1 = require("./fib");
var chai_1 = require("chai");
require("mocha");
describe("Fibonacci 1", function () {
    it("should equal 0 for call with 0", function () {
        chai_1.expect(fib_1.fib_rek(0)).to.equal(0);
    });
});
describe("Fibonacci 2", function () {
    it("should equal 5 for call with 5", function () {
        chai_1.expect(fib_1.fib_rek(5)).to.equal(5);
    });
});
describe("Fibonacci 3", function () {
    it("should equal 55 for call with 10", function () {
        chai_1.expect(fib_1.fib_rek(10)).to.equal(55);
    });
});
describe("Fibonacci 4", function () {
    it("should equal 4181 for call with 19", function () {
        chai_1.expect(fib_1.fib_rek(19)).to.equal(4181);
    });
});
