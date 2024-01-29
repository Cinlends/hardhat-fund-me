// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

contract Counter {
    string public constant name = "Counter";
    // immutable变量必须是值类型，不能是引用类型
    bytes32 public immutable version;
    uint256 public count = 0;

    constructor(string memory _version) {
        version = stringToBytes32(_version);
    }

    // 用来转换字符串为bytes32进行不可变的值存储
    function stringToBytes32(
        string memory source
    ) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        count -= 1;
    }
}
