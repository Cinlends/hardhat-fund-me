require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const SEPOLIA_RPC_URL =
	process.env.SEPOLIA_RPC_URL ||
	"https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "private key";

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
		},
	},
	namedAccounts: {
		deployer: {
			// 默认使用第一个账户
			default: 0,
			// 这个意味着chainId为4的网络上，deployer的地址是accounts[1]
			// 4:1,
		},
	},
};
