const { verify } = require("./utils/verify");
// 0xad1ED9dB36562257be1901f69DefAc7749C55907

const testVerify = async function (contractAddress) {
	const fundMe = contractAddress;
	await verify(fundMe, []);
};

testVerify("0xad1ED9dB36562257be1901f69DefAc7749C55907");
