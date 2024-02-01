const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer } = await getNamedAccounts();
	const fundMe = await ethers.getContract("FundMe", deployer);
	console.log("fund:0.1eth...");
	const fundTxResponse = await fundMe.fund({ value: ethers.parseEther("0.1") });
	await fundTxResponse.wait(1);
	console.log("over...");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
