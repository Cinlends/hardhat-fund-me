const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

console.log(network.name);
// 只在真实网络上运行
developmentChains.includes(network.name)
	? describe.skip
	: describe("FundMe Staging Tests", async () => {
			let fundMe;
			let deployer;
			const sendValue = ethers.parseEther("0.05");
			beforeEach(async () => {
				deployer = (await getNamedAccounts()).deployer;
				fundMe = await ethers.getContract("FundMe", deployer);
			});

			it("allow people to fund and withdraw", async () => {
				console.log("fund:0.05eth...");
				const fundTxResponse = await fundMe.fund({ value: sendValue });
				await fundTxResponse.wait(1);
				console.log("withdraw...");
				const withdrawTxResponse = await fundMe.withdraw();
				await withdrawTxResponse.wait(1);
				const endingBalance = await ethers.provider.getBalance(fundMe);
				console.log(endingBalance.toString() + " should equal 0, running assert equal...");
				assert(endingBalance.toString(), "0");
			});
		});
