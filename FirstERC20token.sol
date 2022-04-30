// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FirstERC20token is ERC20 {
    constructor() ERC20("My First ERC20 token", "FET") {
        _mint(msg.sender, 1000 *(10 **decimals()));
    }
}