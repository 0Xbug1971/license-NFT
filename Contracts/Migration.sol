// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

    function addGoo(uint256 gooAmount) external {
    
        goo.burnForGobblers(msg.sender, gooAmount);
        updateUserGooBalance(msg.sender, gooAmount, GooBalanceUpdateType.INCREASE);
    } 
    
  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
   function mint(address to, uint256 id, uint256 amount) public onlyOwner {
     _mint(to, id, amount, "");
    }

    function burn(address from, uint256 id, uint256 amount) public {
        require(msg.sender == from);
        _burn(from, id, amount);
    }
  }
}
