require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
//给验证合约设置代理
const LOCAL_HTTP_PROXY = process.env.LOCAL_HTTP_PROXY || "http://127.0.0.1:10809";
const { setGlobalDispatcher, ProxyAgent } = require("undici");
const proxyAgent = new ProxyAgent(LOCAL_HTTP_PROXY);
setGlobalDispatcher(proxyAgent);

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "private key";
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY || "ether scan api key";
module.exports = {
	solidity: {
		compilers: [
			{
				version: "0.7.0",
			},
			{
				version: "0.8.7",
			},
		],
	},
	defaultnetwork: "hardhat",
	networks: {
		localhost: {
			url: "http://localhost:8545",
			chainId: 31337,
		},
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
			blockConfirmation: 6, // 6个区块确认
		},
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: ETHER_SCAN_API_KEY,
	},
	namedAccounts: {
		deployer: {
			// 默认使用第一个账户
			default: 0,
			// 这个意味着chainId为4的网络上，deployer的地址是accounts[1]
			// 4:1,
		},
	},
	gasReporter: {
		enabled: true,
	},
};
