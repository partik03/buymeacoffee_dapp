// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

 

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract buymeacoffee {
  event NewMemo(
    address indexed owner,
    uint timestamp,
    string name,
    string message
  );
  struct Memo {
    address owner;
    uint timestamp;
    string name;
    string message;
  }

  Memo[] memos;

  address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buycoffee(string memory _name,string memory _message) public payable{
        require(msg.value >0,"Saleya paise bina coffee kitho milu");

       memos.push(Memo(msg.sender,block.timestamp,_name,_message));

         emit NewMemo(msg.sender,block.timestamp,_name,_message);
    }
    function withdrawTips()  public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        owner.transfer(balance);
        // return true;
    }
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
  
}