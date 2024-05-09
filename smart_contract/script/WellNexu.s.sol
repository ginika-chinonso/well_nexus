// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/WellNexus.sol";
import "../src/Usdt.sol";

contract MyScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Usdt usdt = new Usdt();
        WellNexus con = new WellNexus(address(usdt));

        vm.stopBroadcast();
    }
}


// forge verify-contract <CONTRACT ADDRESS> ./src/NFT.sol:NFT --chain 84532 --watch --etherscan-api-key <ETHERSCAN API KEY>
// forge script script/WellNexus.s.sol:MyScript --rpc-url $BASE_RPC_URL --broadcast --verify -vvvv