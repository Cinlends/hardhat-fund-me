require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

/**
 * Hardhat配置文件
 * @module hardhat.config
 */

/** @type import('hardhat/config').HardhatUserConfig */
// 为什么这里要使用module.exports
// module.exports 是 Node.js 中的一个特殊对象，它可以被导入到其他文件中使用

module.exports = {
	solidity: "0.8.7",
};
