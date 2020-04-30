import { fib_rek } from "./fib";
import { expect } from "chai";
import "mocha";

describe("Fibonacci 1", () => {
    it("should equal 0 for call with 0", () => {
        expect(fib_rek(0)).to.equal(0);
    });
});

describe("Fibonacci 2", () => {
    it("should equal 5 for call with 5", () => {
        expect(fib_rek(5)).to.equal(5);
    });
});

describe("Fibonacci 3", () => {
    it("should equal 55 for call with 10", () => {
        expect(fib_rek(10)).to.equal(55);
    });
});

describe("Fibonacci 4", () => {
    it("should equal 4181 for call with 19", () => {
        expect(fib_rek(19)).to.equal(4181);
    });
});