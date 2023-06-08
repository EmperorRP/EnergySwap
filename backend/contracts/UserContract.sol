// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
    enum Role { Buyer, Seller }

    mapping(address => Role) public users;

    function becomeSeller() public {
        users[msg.sender] = Role.Seller;
    }

    function getUserRole(address _address) public view returns(Role) {
        if(users[_address] == Role.Seller) {
            return Role.Seller;
        } else {
            return Role.Buyer;
        }
    }
}





