// helper-hardhat-config.js
const networkConfig = {
	31337: {
		// localhost没有chainlink的喂价合约,我们需要模拟
		name: "localhost",
	},
	11155111: {
		name: "sepolia",
		// 这里的priceFeedAddress是我们在sepolia网络上部署的喂价合约的地址
		priceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
	},
};

// 导出配置,networkConfig可以在其他文件中使用
module.exports = {
	networkConfig,
};
