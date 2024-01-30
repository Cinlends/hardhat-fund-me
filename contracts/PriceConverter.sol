// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// 库函数必须是internal的
library PriceConverter {
	// 使用chainlink和链外交互获取当前eth对usd的汇率
	function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
		// chainlink 获取外部数据的合约节点 sepoliaETH->USD 0x694AA1769357215DE4FAC081bf1f309aDC325306
		// AggregatorV3Interface priceFeed = AggregatorV3Interface(
		//     0x694AA1769357215DE4FAC081bf1f309aDC325306
		// );
		(, int256 answer, , , ) = priceFeed.latestRoundData();
		// answer是现在的价格，但是是8位小数的，需要添加到18位小数和msg.value对齐
		return uint256(answer * 1e10);
	}

	/**
	 * @dev 获取转换率
	 * @param ethAmount 以太币数量
	 * @param priceFeed 价格预言机接口
	 * @return 以太币对应的美元数量
	 */
	function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
		uint256 price = getPrice(priceFeed);
		uint256 ethAmountInUsd = (ethAmount * price) / 1e18;
		return ethAmountInUsd;
	}
}
