//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// for console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WTPToken is ERC20 {
    constructor() ERC20("Winter Project Token", "WTP") {
        _mint(msg.sender, 100000 * (10**18));
    }
}
