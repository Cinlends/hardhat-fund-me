const { assert, expect } = require("chai");
const { ethers, deployments, getNamedAccounts } = require("hardhat");
describe("FundMe", async () => {
	// 先把合约进行部署
	let fundMe;
	let deployer;
	let MockV3Aggregator;
	const sendValue = ethers.parseEther("1.0");
	beforeEach(async () => {
		// 我们想通过hardhat deploy把fundme合约部署到本地网络上

		// 原始ethers的获取部署者账户的方法
		// const accounts = await ethers.getSigners();
		// const deployer = accounts[0];

		// hardhat的获取部署者账户的方法，更加方便
		// const namedAccounts = await getNamedAccounts();
		// deployer = namedAccounts.deployer;
		deployer = (await getNamedAccounts()).deployer;

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
		it("Should set the arggregator address corrently", async () => {
			const response = await fundMe.priceFeed();
			const MAddress = await MockV3Aggregator.getAddress();
			assert.equal(response, MAddress, "arggregator address is not correct");
		});
	});
	// const namedAccounts = await getNamedAccounts();
	// console.log(namedAccounts);

	describe("fund", async () => {
		// 测试fund方法-不发送ether
		it("Fails if you don't send enough ether", async () => {
			await expect(fundMe.fund()).to.be.revertedWith("didn't send enough");
		});

		// 测试fund方法-发送1个eth
		it("Should be able to fund", async () => {
			// 现在ethers版本是6.10.0，虽然是导入的hardhat，
			// 但hardhat的 node_modules 文件夹中没有找到 ethers，
			// 所以在上一级目录中找到了直接依赖的 ethers，版本是 6.10.0
			// console.log(`ethers version: ${ethers.version}`);
			await fundMe.fund({ value: sendValue });
			// const fundmeAddress = await fundMe.getAddress();
			const response = await fundMe.addressToAmountFunded(deployer);
			// const fundMeBalance = await ethers.provider.getBalance(fundmeAddress);
			// assert.equal(fundMeBalance.toString(), sendValue, "fund failed");

			assert.equal(response.toString(), sendValue.toString(), "fund failed");
		});
		// 测试fund方法-添加funder到数组
		it("Adds funder to array", async () => {
			await fundMe.fund({ value: sendValue });
			const response = await fundMe.funders(0);
			assert.equal(response, deployer, "funder was not added to array");
		});
	});

	// 测试取钱
	describe("withdraw", async () => {
		// 做测试准备，这个测试的所有测试项的合约里都有余额
		beforeEach(async () => {
			await fundMe.fund({ value: sendValue });
		});
		// 测试取钱-单个funder
		it("Withdraw eth from a single funder", async () => {
			// Arrange 准备
			const startingDeployerBalance = await ethers.provider.getBalance(
				deployer
			);
			const startingFundMeBalance = await ethers.provider.getBalance(fundMe);
			// Act 执行
			const txResponse = await fundMe.withdraw();
			// 等待一个区块的确认,得到交易收据
			const txReceipt = await txResponse.wait(1);
			const { gasUsed, gasPrice } = txReceipt;
			const txCost = gasUsed * gasPrice;

			const endingDeployerBalance = await ethers.provider.getBalance(deployer);
			const endingFundMeBalance = await ethers.provider.getBalance(fundMe);
			// Assert 断言
			assert.equal(endingFundMeBalance, 0, "fundMe balance is not correct");
			assert.equal(
				(startingDeployerBalance + startingFundMeBalance).toString(),
				(endingDeployerBalance + txCost).toString(),
				"deployer balance is not correct"
			);
		});
		// 测试取钱-多个funder
		it("Withdraw eth from multi funders", async () => {
			// Arrange 准备
			const accounts = await ethers.getSigners();
			for (let i = 1; i < 4; i++) {
				await fundMe.connect(accounts[i]).fund({ value: sendValue });
			}
			const startingDeployerBalance = await ethers.provider.getBalance(
				deployer
			);
			const startingFundMeBalance = await ethers.provider.getBalance(fundMe);
			// Act 执行
			const txResponse = await fundMe.withdraw();
			// 等待一个区块的确认,得到交易收据
			const txReceipt = await txResponse.wait(1);
			const { gasUsed, gasPrice } = txReceipt;
			const txCost = gasUsed * gasPrice;

			const endingDeployerBalance = await ethers.provider.getBalance(deployer);
			const endingFundMeBalance = await ethers.provider.getBalance(fundMe);
			// Assert 断言
			assert.equal(endingFundMeBalance, 0, "fundMe balance is not correct");
			assert.equal(
				(startingDeployerBalance + startingFundMeBalance).toString(),
				(endingDeployerBalance + txCost).toString(),
				"deployer balance is not correct"
			);

			await expect(fundMe.funders(0)).to.be.revertedWith;
			for (let i = 0; i < 4; i++) {
				assert.equal(
					await fundMe.addressToAmountFunded(accounts[i].address),
					0,
					"fundMe addressToAmountFunded is not correct"
				);
			}
		});
		it("Only owner can withdraw", async () => {
			// Arrange 准备
			console.log(`deployer: ${deployer}`);
			const accounts = await ethers.getSigners();
			const notOwner = accounts[1];
			const attackContract = await fundMe.connect(notOwner);
			// Act 执行
			await expect(attackContract.withdraw()).to.be.reverted;
		});
	});
});
