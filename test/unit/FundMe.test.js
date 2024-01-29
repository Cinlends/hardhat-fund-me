const { assert } = require("chai");
const { ethers, deployments, getNamedAccounts } = require("hardhat");
describe("FundMe", async () => {
  // 先把合约进行部署
  let fundMe;
  let deployer;
  let MockV3Aggregator;
  beforeEach(async () => {
    // 我们想通过hardhat deploy把fundme合约部署到本地网络上
    deployer = await getNamedAccounts().deployer;
    // 部署合约,fixture 相当于yarn hardhat deploy --tags ？，我们使用all部署所有合约
    await deployments.fixture(["all"]);
    // hardhat 封装好的getContract方法，可以通过合约名字直接获取最新合约实例
    // 使用deploer账户可以直接视为这个账户连接到了这个合约
    fundMe = await ethers.getContract("FundMe", deployer);

    // 为了测试mock合约地址是否正确，我们需要获取mock合约实例
    MockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });
  // 按构造器功能分组的测试
  describe("constructor", async () => {
    it("should set the arggregator address corrently", async () => {
      const response = await fundMe.priceFeed();
      const MAddress = await MockV3Aggregator.getAddress();
      assert.equal(response, MAddress, "arggregator address is not correct");
    });
  });

  describe("fund", async () => {
    it("should be able to fund", async () => {
      await fundMe.fund({ value: ethers("1") });
    });
  });
});
