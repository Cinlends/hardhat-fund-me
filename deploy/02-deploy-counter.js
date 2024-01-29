const { ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");
const { networkConfig } = require("../helper-hardhat-config");

const VERSION = "v0.1";

// 在sepolia ETH测试链上部署成功并且成功验证代码
// bash: yarn hardhat deploy --tags counter --network sepolia
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const { chainId } = network.config;

  const counter = await deploy("Counter", {
    from: deployer,
    // 开启日志功能，控制台输出
    log: true,
    args: [VERSION],
    waitConfirmations: 1,
  });
  //   如果是真实链,并且有etherscan的api key,我们就去验证合约
  if (chainId != 31337 && chainId != 1337 && process.env.ETHER_SCAN_API_KEY) {
    await verify(counter.address, [VERSION]);
  }
  console.log("Counter deployed to:", counter.address);
  console.log("-------------------------------------");
};
module.exports.tags = ["counter"];
