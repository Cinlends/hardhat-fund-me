/**
 * @fileoverview 包含了对 divideNumbers 函数进行测试的测试套件。
 * @module testDN
 */

const assert = require("assert");

const divideNumbers = require("./testCopilot");

/**
 * 对 divideNumbers 函数进行测试。
 */
describe("divideNumbers", function () {
	/**
	 * 当 num1 为 5，num2 为 2 时，应返回 2。
	 */
	it("should return 2 when num1 is 5 and num2 is 2", function () {
		assert.equal(divideNumbers(5, 2), 2);
	});

	/**
	 * 当 num1 为 0，num2 为 5 时，应返回 0。
	 */
	it("should return 0 when num1 is 0 and num2 is 5", function () {
		assert.equal(divideNumbers(0, 5), 0);
	});

	/**
	 * 当 num1 为 -5，num2 为 2 时，应返回 -3。
	 */
	it("should return -3 when num1 is -5 and num2 is 2", function () {
		assert.equal(divideNumbers(-5, 2), -3);
	});

	/**
	 * 当 num2 为 0 时，应抛出错误。
	 */
	it("should throw an error when num2 is 0", function () {
		assert.throws(() => divideNumbers(5, 0), Error);
	});
});
