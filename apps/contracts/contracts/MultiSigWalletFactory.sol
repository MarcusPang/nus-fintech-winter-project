//SPDX-License-Identifier: MIT

//Deploy Wallet Factory instead of Wallet following the factory design pattern

pragma solidity ^0.8.0;

import "./MultiSigWallet.sol";

contract MultiSigWalletFactory {
  MultiSigWallet[] public wallets;
  address[] public walletCreators;

  function getWallets() public view returns (MultiSigWallet[] memory) {
    return wallets;
  }

  function getWalletCreators() public view returns (address[] memory) {
    return walletCreators;
  }

  // msg.sender is automatically added on frontend into _owners
  function createWallet(
    address[] calldata _owners,
    uint256 _percentConfirmationsRequired
  ) external returns (MultiSigWallet) {
    MultiSigWallet wallet = new MultiSigWallet(
      _owners,
      _percentConfirmationsRequired
    );
    // index of wallets will match walletCreators
    wallets.push(wallet);
    walletCreators.push(_owners[0]);
    return wallet;
  }

  //Expose wallet interfaces
  function addOwner(MultiSigWallet wallet, address newOwner) external {
    wallet.addOwner(newOwner, msg.sender);
  }

  function removeOwner(MultiSigWallet wallet, address existingOwner) external {
    wallet.removeOwner(existingOwner, msg.sender);
  }

  function submitTransaction(
    MultiSigWallet wallet,
    address _from,
    address _to,
    uint256 _value,
    bytes calldata _data
  ) external {
    wallet.submitTransaction(_from, _to, _value, _data);
  }

  function confirmTransaction(MultiSigWallet wallet, uint256 _txIndex)
    external
  {
    wallet.confirmTransaction(_txIndex, msg.sender);
  }

  function executeTransaction(MultiSigWallet wallet, uint256 _txIndex)
    external
  {
    wallet.executeTransaction(_txIndex, msg.sender);
  }

  function revokeConfirmation(MultiSigWallet wallet, uint256 _txIndex)
    external
  {
    wallet.revokeConfirmation(_txIndex, msg.sender);
  }

  function setPercentConfirmationRequired(
    MultiSigWallet wallet,
    uint256 _percentConfirmationRequired
  ) external {
    wallet.setPercentConfirmationRequired(
      _percentConfirmationRequired,
      msg.sender
    );
  }

  function isOwner(MultiSigWallet wallet, address _owner)
    public
    view
    returns (bool)
  {
    return wallet.isOwner(_owner);
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

  function getPercentConfirmationRequired(MultiSigWallet wallet)
    public
    view
    returns (uint256)
  {
    return wallet.percentConfirmationRequired();
  }
}
