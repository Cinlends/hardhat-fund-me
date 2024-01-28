// 用来部署mock合约
const { network } = require("hardhat");
const {
  developmentChains,
  DECIMALS,
  INITIAL_PRICE,
} = require("../helper-hardhat-config");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const { chainId } = network.config;
  // 需要判断如果chainid是hardhat或者localhost,我们就要部署mock合约
  if (developmentChains.includes(network.name)) {
    log("在本地或者hardhat网络上,部署mock合约");
    const MockPriceFeed = await deploy("MockV3Aggregator", {
      from: deployer,
      args: [DECIMALS, INITIAL_PRICE],
      log: true,
    });
    log("MockPriceFeed deployed to:", MockPriceFeed.address);
    log("-------------------------------------");
  }
};

// 为部署脚本添加标签,all 就是部署所有的脚本,mocks 就是只部署mock合约
module.exports.tags = ["all", "mocks"];
