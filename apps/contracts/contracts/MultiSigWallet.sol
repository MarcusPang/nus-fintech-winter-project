//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MultiSigWallet {
  // Events
  event Deposit(address indexed sender, uint256 amount, uint256 balance);
  event SubmitTransaction(
    address indexed owner,
    uint256 indexed txIndex,
    address indexed to,
    uint256 value,
    bytes data
  );
  event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
  event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
  event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);
  event AddOwner(address indexed owner, uint256 indexed owIndex);
  event RemoveOwner(address indexed owner);

  struct Transaction {
    address from;
    address to;
    uint256 value;
    bytes data;
    bool executed;
    uint256 numConfirmations;
  }

  // Variables & Mappings
  address[] public owners;
  mapping(address => bool) public isOwner;
  uint256 public percentConfirmationRequired;
  uint256 public validOwnersLength;
  Transaction[] public transactions;
  // mapping from tx index => owner => bool
  mapping(uint256 => mapping(address => bool)) public isConfirmed;

  // Modifiers
  modifier onlyOwner(address _owner) {
    require(isOwner[_owner], "not owner");
    _;
  }

  modifier txExists(uint256 _txIndex) {
    require(_txIndex < transactions.length, "tx does not exist");
    _;
  }

  modifier notExecuted(uint256 _txIndex) {
    require(!transactions[_txIndex].executed, "tx already executed");
    _;
  }

  modifier notConfirmed(uint256 _txIndex, address origin) {
    require(!isConfirmed[_txIndex][origin], "tx already confirmed");
    _;
  }

  // Constructor
  // Percentage (from 0 to 100) of confirmations required
  constructor(address[] memory _owners, uint256 _percentConfirmationRequired) {
    require(_owners.length > 0, "owners required");
    require(
      _percentConfirmationRequired > 0 && _percentConfirmationRequired <= 100,
      "invalid percentage of required confirmations"
    );

    for (uint256 i = 0; i < _owners.length; i++) {
      address owner = _owners[i];

      require(owner != address(0), "invalid owner");
      require(!isOwner[owner], "owner not unique");

      isOwner[owner] = true;
      owners.push(owner);
    }
    validOwnersLength = owners.length;

    percentConfirmationRequired = _percentConfirmationRequired;
  }

  // Owner Functions
  function addOwner(address newOwner, address origin) public onlyOwner(origin) {
    uint256 owIndex = owners.length;
    isOwner[newOwner] = true;
    owners.push(newOwner);
    validOwnersLength++;
    emit AddOwner(newOwner, owIndex);
  }

  function removeOwner(address existingOwner, address origin)
    public
    onlyOwner(origin)
  {
    isOwner[existingOwner] = false;
    validOwnersLength--;
    emit RemoveOwner(existingOwner);
  }

  // Transaction Functions
  receive() external payable {
    emit Deposit(msg.sender, msg.value, address(this).balance);
  }

  function submitTransaction(
    address _from,
    address _to,
    uint256 _value,
    bytes calldata _data
  ) external onlyOwner(_from) {
    uint256 txIndex = transactions.length;

    transactions.push(
      Transaction({
        from: _from,
        to: _to,
        value: _value,
        data: _data,
        executed: false,
        numConfirmations: 0
      })
    );

    emit SubmitTransaction(_from, txIndex, _to, _value, _data);
  }

  function confirmTransaction(uint256 _txIndex, address origin)
    external
    onlyOwner(origin)
    txExists(_txIndex)
    notExecuted(_txIndex)
    notConfirmed(_txIndex, origin)
  {
    Transaction storage transaction = transactions[_txIndex];
    transaction.numConfirmations += 1;
    isConfirmed[_txIndex][origin] = true;

    emit ConfirmTransaction(origin, _txIndex);
  }

  function executeTransaction(uint256 _txIndex, address origin)
    external
    onlyOwner(origin)
    txExists(_txIndex)
    notExecuted(_txIndex)
  {
    Transaction storage transaction = transactions[_txIndex];

    // Check that number of confirmations for a transaction is greater than required number of confirmations
    require(
      transaction.numConfirmations >=
        (percentConfirmationRequired / 100) * validOwnersLength,
      "cannot execute tx"
    );

    transaction.executed = true;

    (bool success, ) = transaction.to.call{ value: transaction.value }(
      transaction.data
    );
    require(success, "tx failed");

    emit ExecuteTransaction(origin, _txIndex);
  }

  function revokeConfirmation(uint256 _txIndex, address origin)
    external
    onlyOwner(origin)
    txExists(_txIndex)
    notExecuted(_txIndex)
  {
    Transaction storage transaction = transactions[_txIndex];

    require(isConfirmed[_txIndex][origin], "tx not confirmed");

    transaction.numConfirmations -= 1;
    isConfirmed[_txIndex][origin] = false;

    emit RevokeConfirmation(origin, _txIndex);
  }

  function setPercentConfirmationRequired(
    uint256 _percentConfirmationRequired,
    address origin
  ) external onlyOwner(origin) {
    percentConfirmationRequired = _percentConfirmationRequired;
  }

  // Getters
  function getOwners() public view returns (address[] memory) {
    return owners;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactions.length;
  }

  function getTransaction(uint256 _txIndex)
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
    Transaction storage transaction = transactions[_txIndex];

    return (
      transaction.from,
      transaction.to,
      transaction.value,
      transaction.data,
      transaction.executed,
      transaction.numConfirmations
    );
  }
}
