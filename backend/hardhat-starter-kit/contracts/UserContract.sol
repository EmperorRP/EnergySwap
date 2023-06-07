// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserContract {
    // User status
    enum Status { Consumer, Producer }

    // Structure to store user information
    struct User {
        string name;
        address userAddress;
        Status status;
    }

    // Mapping to store users' information
    mapping(address => User) private users;

    // Event to emit when a new user is registered
    event UserRegistered(string name, address userAddress, Status status);

    // Event to emit when a user's details are updated
    event UserDetailsUpdated(string name, address userAddress, Status status);

    // Register a new user
    function register(string memory _name, Status _status) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");

        users[msg.sender] = User({
            name: _name,
            userAddress: msg.sender,
            status: _status
        });

        emit UserRegistered(_name, msg.sender, _status);
    }

    // Get details of a user
    function getDetails(address _userAddress) public view returns (string memory name, address userAddress, Status status) {
        require(bytes(users[_userAddress].name).length != 0, "User does not exist");

        User memory user = users[_userAddress];
        return (user.name, user.userAddress, user.status);
    }

    // Update details of a user
    function updateDetails(string memory _name, Status _status) public {
        require(bytes(users[msg.sender].name).length != 0, "User does not exist");

        users[msg.sender].name = _name;
        users[msg.sender].status = _status;

        emit UserDetailsUpdated(_name, msg.sender, _status);
    }
}
