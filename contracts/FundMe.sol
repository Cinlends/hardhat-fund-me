// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./PriceConverter.sol";

error NotOwner();

contract FundMe{
    using PriceConverter for uint256;
    // 首先定义好合约想要实现的功能函数

    // constant immutable 都可以节省gas

    // 最少发送 50 USD
    uint256 public constant MINIMUM_USD=50*1e18;// constant 关键字是在编译时确定了变量的值
    address[] public funders;
    mapping (address=>uint256) public addressToAmountFunded; 

    address public immutable i_owner;// immutable 是运行时被定义一次后就无法再更改

    constructor(){
        i_owner=msg.sender;
    }

    receive() external payable { 
        fund();
    }

    fallback() external payable { 
        fund();
    }

    modifier onlyOwner(){
        // 改进报错，节省gas可以用自定义error，两种都要会
        // require(msg.sender==i_owner,"not owner");
        if(msg.sender!=i_owner)revert NotOwner();
        _;
    }

    function fund()public  payable {
        // 希望转账金额大于1ether，1e18=1*10^18=1000000000000000000wei
        // require(msg.value>=1e18,"didn't send enough");

        require(msg.value.getConversionRate()>=MINIMUM_USD,"didn't send enough");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender]+=msg.value;
    }

    

    function withdraw()public onlyOwner{
        for(uint i=0;i<funders.length;i++){
            addressToAmountFunded[funders[i]]=0;
        }
        delete funders;
        (bool success,)=payable (msg.sender).call{value:address(this).balance}("");
        require(success,"withdraw failed");
    }
}