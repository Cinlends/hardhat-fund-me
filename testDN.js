const assert = require("assert");

const divideNumbers = require("./testCopilot");

describe("divideNumbers", function () {
	it("should return 2 when num1 is 5 and num2 is 2", function () {
		assert.equal(divideNumbers(5, 2), 2);
	});

	it("should return 0 when num1 is 0 and num2 is 5", function () {
		assert.equal(divideNumbers(0, 5), 0);
	});

	it("should return -2 when num1 is -5 and num2 is 2", function () {
		assert.equal(divideNumbers(-5, 2), -3);
	});

	it("should throw an error when num2 is 0", function () {
		assert.throws(() => divideNumbers(5, 0), Error);
	});
});
