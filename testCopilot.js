// 从hardhat中导入ethers
const { ethers } = require("hardhat");

function addNumbers(num1, num2) {
  return num1 + num2;
}
// 生成一个函数让两个数相除，取整数
function divideNumbers(num1, num2) {
  return Math.floor(num1 / num2);
}

let res = addNumbers(1, 2);
console.log(res);

// 创建一个数组变量显示彩虹的颜色
let rainbowColors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
];
console.log(rainbowColors);
// 创建一个数组变量显示1-10
let number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(number);
// 创建一个对象，键值对为上面的两个数组元素属性，再生成一个数组包含这些对象
let rainbow = [
  {
    color: "Red",
    number: 1,
  },
  {
    color: "Orange",
    number: 2,
  },
  {
    color: "Yellow",
    number: 3,
  },
  {
    color: "Green",
    number: 4,
  },
  {
    color: "Blue",
    number: 5,
  },
  {
    color: "Indigo",
    number: 6,
  },
  {
    color: "Violet",
    number: 7,
  },
];
console.log(rainbow);
// 创建一个函数，批量插入上述对象到数组
function addRainbow(color, number) {
  rainbow.push({
    color: color,
    number: number,
  });
}
