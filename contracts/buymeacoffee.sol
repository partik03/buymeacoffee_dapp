// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


//Deployed on Goerli 0xA3ee5a57c5bC16E95C9c1CAd5042265Ff1420997 

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