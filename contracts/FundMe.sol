// 代码风格 solidity
// SPDX-License-Identifier: MIT

// Pragma 编辑器版本声明
pragma solidity ^0.8.7;

// Import 导入
// 这只是一个库函数，不需要部署到链上
import "./PriceConverter.sol";

// Error 自定义报错
/**
 * @dev 抛出一个 `NotOwner` 错误。
 */
error FundMe__NotOwner();

/**
 * @title 整体说明
 * @author 作者
 * @notice 提示信息
 * @dev 针对开发者的提示
 */

// Interface 接口
// Libraries 库
// Contract 合约

contract FundMe {
    // Type Declarations 类型声明，比如结构体什么的

    using PriceConverter for uint256;
    // 首先定义好合约想要实现的功能函数

    // constant immutable 都可以节省gas
    // State Variables 状态变量，普通变量驼峰命名，常量全大写
    // 最少发送 50 USD
    uint256 public constant MINIMUM_USD = 50 * 1e18; // constant 关键字是在编译时确定了变量的值
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner; // immutable 是运行时被定义一次后就无法再更改

    // 创建一个AggregatorV3Interface变量，外部可见，
    AggregatorV3Interface public priceFeed;

    // Events 事件

    // Modifiers 修饰器
    modifier onlyOwner() {
        // 改进报错，节省gas可以用自定义error，两种都要会
        // require(msg.sender==i_owner,"not owner");
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    // Functions
    // 函数放置顺序
    // constructor
    // receive
    // fallback
    // external
    // public
    // interval
    // private
    // view / pure

    /**
     * @dev 构造函数，用于初始化合约实例。
     * @param priceFeedAddress 价格预言机合约地址,现在可以根据所处的网络来切换喂价合约地址了
     */
    constructor(AggregatorV3Interface priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = priceFeedAddress;
    }

    /**
     * @dev 接收以太币的函数，用于接收合约的付款。
     * 当合约接收到以太币时，会调用 `fund` 函数。
     */
    receive() external payable {
        fund();
    }

    /**
     * @dev 回退函数，用于接收以太币的函数。
     * 当合约接收到以太币时，会调用 `fund` 函数。
     */
    fallback() external payable {
        fund();
    }

    /**
     * @dev 接收以太币的函数，用于资助项目。
     * @notice 转账金额必须大于等于最小金额。
     * @notice 转账金额将被记录在资助者的地址和转账金额的映射中。
     */
    function fund() public payable {
        // 希望转账金额大于1ether，1e18=1*10^18=1000000000000000000wei
        // require(msg.value>=1e18,"didn't send enough");

        require(
            msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
            "didn't send enough"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    /**
     * @dev 允许合约的所有者从合约中提取所有资金。
     * 它将每个资助者资助的金额设置为0，并删除资助者列表。
     * 然后，将合约的余额转移到所有者。
     * @notice 只有所有者可以调用此函数。
     * @notice 如果转账失败，此函数将回滚。
     */
    function withdraw() public onlyOwner {
        for (uint i = 0; i < funders.length; i++) {
            addressToAmountFunded[funders[i]] = 0;
        }
        delete funders;
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "withdraw failed");
    }
}
