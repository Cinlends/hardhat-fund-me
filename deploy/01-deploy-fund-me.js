// 引入 hardhat 包，这是一个以太坊开发环境，提供了一系列工具和功能，如编译、测试、部署智能合约等
const { ethers } = require("hardhat");

// // 导出一个异步函数，这个函数将被执行以部署智能合约
// module.exports = async function () {
// 	// 使用 ethers.getSigners 方法获取所有的签名者（账户），并取第一个作为部署者
// 	const [deployer] = await ethers.getSigners();

// 	// 打印部署者的地址
// 	console.log("Deploying contracts with the account:", deployer.address);

// 	// 使用 ethers.getContractFactory 方法获取 "FundMe" 智能合约的工厂
// 	// 这个工厂可以用来部署新的 "FundMe" 智能合约实例
// 	const FundMe = await ethers.getContractFactory("FundMe");

// 	// 使用工厂的 deploy 方法部署新的 "FundMe" 智能合约实例
// 	const fundMe = await FundMe.deploy();

// 	// 打印新部署的 "FundMe" 智能合约的地址
// 	console.log("FundMe deployed to:", fundMe.address);
// };

// 这里的 module.exports = async function () {} 是一个异步函数，这个函数将被执行以部署智能合约
module.exports = async function () {
	// 使用 ethers.getSigners 方法获取所有的签名者（账户），并取第一个作为部署者
	const [deployer] = await ethers.getSigners();
	// 打印部署者的地址
	console.log("Deploying contracts with the account:", deployer.address);
	// 使用 ethers.getContractFactory 方法获取 "FundMe" 智能合约的工厂
	// 这个工厂可以用来部署新的 "FundMe" 智能合约实例
	const FundMe = await ethers.getContractFactory("FundMe");
	// 使用工厂的 deploy 方法部署新的 "FundMe" 智能合约实例
	const fundMe = await FundMe.deploy();
	// 打印新部署的 "FundMe" 智能合约的地址
	console.log("FundMe deployed to:", fundMe.address);
};
