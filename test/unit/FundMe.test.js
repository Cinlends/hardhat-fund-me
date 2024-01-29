const { assert, expect } = require("chai");
const { ethers, deployments, getNamedAccounts } = require("hardhat");
describe("FundMe", async () => {
	// 先把合约进行部署
	let fundMe;
	let deployer;
	let MockV3Aggregator;
	beforeEach(async () => {
		// 我们想通过hardhat deploy把fundme合约部署到本地网络上

		// 原始ethers的获取部署者账户的方法
		// const accounts = await ethers.getSigners();
		// const deployer = accounts[0];

		// hardhat的获取部署者账户的方法，更加方便
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
		// 测试fund方法-不发送ether
		it("fails if you don't send enough ether", async () => {
			await expect(fundMe.fund()).to.be.revertedWith("didn't send enough");
		});

		// 测试fund方法-发送1个eth
		it("should be able to fund", async () => {
			// 现在ethers版本是6.10.0，虽然是导入的hardhat，
			// 但hardhat的 node_modules 文件夹中没有找到 ethers，
			// 所以在上一级目录中找到了直接依赖的 ethers，版本是 6.10.0
			console.log(`ethers version: ${ethers.version}`);
			await fundMe.fund({ value: ethers.parseEther("1") });
			const fundmeAddress = await fundMe.getAddress();
			const fundMeBalance = await ethers.provider.getBalance(fundmeAddress);
			assert.equal(
				fundMeBalance.toString(),
				ethers.parseEther("1"),
				"fund failed"
			);
		});
	});
});
