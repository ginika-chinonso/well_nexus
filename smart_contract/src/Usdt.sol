// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
// import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";



contract Usdt is ERC20("Tether USD", "Usdt") {

    address public admin;

    // modifier onlyOwner() {
    //     require(msg.sender == admin, "Only admin can call this function");
    //     _;
    // }

    constructor () {
        admin = msg.sender;
    }

    function mint(address _to_address, uint256 amount) public {
        _mint(_to_address, amount);
    }
}