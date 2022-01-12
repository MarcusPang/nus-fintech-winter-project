//SPDX-License-Identifier: MIT

//Deploy Wallet Factory instead of Wallet following the factory design pattern

pragma solidity ^0.8.0;

import "./MultiSigWallet.sol";

contract MultiSigWalletFactory {
    mapping(address => MultiSigWallet[]) public wallets;
    mapping(address => bool) alreadyHasWallet;

    function getWallets(address _owner)
        public
        returns (MultiSigWallet[] memory)
    {
        return wallets[_owner];
    }

    // msg.sender is automatically added on frontend into _owners
    function createWallet(
        address[] memory _owners,
        uint256 _percentConfirmationsRequired
    ) public {
        MultiSigWallet wallet = new MultiSigWallet(
            _owners,
            _percentConfirmationsRequired
        );
        if (alreadyHasWallet[msg.sender]) {
            wallets[msg.sender].push(wallet);
        } else {
            alreadyHasWallet[msg.sender] = true;
            wallets[msg.sender] = [wallet];
        }
    }

    //Expose wallet interfaces
    //Should take in wallet address instead of wallet?
    function addOwner(MultiSigWallet wallet, address newOwner) public {
        wallet.addOwner(newOwner);
    }

    function removeOwner(MultiSigWallet wallet, address existingOwner) public {
        wallet.removeOwner(existingOwner);
    }

    function submitTransaction(
        MultiSigWallet wallet,
        address _from,
        address _to,
        uint256 _value,
        bytes memory _data
    ) public {
        wallet.submitTransaction(_from, _to, _value, _data);
    }

    function confirmTransaction(MultiSigWallet wallet, uint256 _txIndex)
        public
    {
        wallet.confirmTransaction(_txIndex);
    }

    function executeTransaction(MultiSigWallet wallet, uint256 _txIndex)
        public
    {
        wallet.executeTransaction(_txIndex);
    }

    function revokeConfirmation(MultiSigWallet wallet, uint256 _txIndex)
        public
    {
        wallet.revokeConfirmation(_txIndex);
    }

    function getOwners(MultiSigWallet wallet)
        public
        view
        returns (address[] memory)
    {
        return wallet.getOwners();
    }

    function getTransactionCount(MultiSigWallet wallet)
        public
        view
        returns (uint256)
    {
        return wallet.getTransactionCount();
    }

    function getTransaction(MultiSigWallet wallet, uint256 _txIndex)
        public
        view
        returns (
            address from,
            address to,
            uint256 value,
            bytes memory data,
            bool executed,
            uint256 numConfirmations
        )
    {
        return wallet.getTransaction(_txIndex);
    }
}
