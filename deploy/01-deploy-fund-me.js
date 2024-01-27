const { ethers, network } = require("hardhat");
// 导入helper-hardhat-config.js中的networkConfig
// {}中的networkConfig是解构赋值,相当于const networkConfig = require("../helper-hardhat-config").networkConfig;
const { networkConfig } = require("../helper-hardhat-config");

module.exports = async function ({ getNamedAccounts, deployments }) {
	// 当我们在本地或者hardhat网络上部署时,我们需要使用mock合约来模拟chainlink的AggregatorV3Interface.sol这个合约的功能
	// 我们希望切换网络时可以自动把喂价合约的地址切换到对应的网络上
	// 因此我们需要进行配置检测chainId同时读取喂价合约的地址
	// 参考avve的helper-hardhat-config.js

	// 从deployments中导入deploy和log方法
	const { deploy, log } = deployments;
	// 从getNamedAccounts中获取了deployer的地址,这个地址是在hardhat.config.js中配置的
	const { deployer } = await getNamedAccounts();
	// 从hardhat.config.js中获取了chainId
	const { chainId } = network.config;

	// 在真实链上读取地址已经实现了,但是本地怎么办
	const ethUsdPriceFeedAddress = networkConfig[chainId]["priceFeedAddress"];
	// 对于没有喂价合约的网络(比如本地网络),我们使用mock合约来模拟

	// 之前我们是使用contractFactory来部署合约,现在我们直接使用deploy()方法来部署合约
	const fundMe = await deploy("FundMe", {
		// 这里是部署合约可选的参数
		// 合约部署者
		from: deployer,
		// 合约构造函数需要传入的参数
		args: [],
		// gasLimit: 4000000,
		// gasPrice: ethers.utils.parseUnits("30", "gwei"),
		// nonce: 0,
		// 开启日志
		log: true,
	});
};
