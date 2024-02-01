const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer } = await getNamedAccounts();
	const fundMe = await ethers.getContract("FundMe", deployer);
	console.log("withdraw...");
	const fundTxResponse = await fundMe.withdraw();
	await fundTxResponse.wait(1);
	console.log("over...");
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
