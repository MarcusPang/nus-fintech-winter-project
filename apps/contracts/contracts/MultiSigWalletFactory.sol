//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MultiSigWallet.sol";

contract MultiSigWalletFactory {
    MultiSigWallet[] public wallets;

    function createWallet(
        address[] memory _owners,
        uint256 _percentConfirmationsRequired
    ) public {
        MultiSigWallet wallet = new MultiSigWallet(
            _owners,
            _percentConfirmationsRequired
        );
        wallets.push(wallet);
    }
}
