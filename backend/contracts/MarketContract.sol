// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./UserContract.sol";
import "./EnergyDataContract.sol";

contract MarketContract {
    struct Listing {
        address seller;
        uint256 units;
        uint256 pricePerUnit;
        bool active;
    }

    struct Transaction {
        address buyer;
        address seller;
        uint256 units;
        uint256 totalCost;
    }

    UserContract public userContract;
    EnergyDataContract public energyDataContract;

    Transaction[] public transactions;
    Listing[] public listings;

    // Define an Event
    event PurchaseEvent(uint256 indexed listingId, address indexed buyer, address indexed seller, uint256 units, uint256 totalCost);

    constructor(address _userContract, address _energyDataContract) {
        userContract = UserContract(_userContract);
        energyDataContract = EnergyDataContract(_energyDataContract);
    }

    function addListing(uint256 units, uint256 pricePerUnit) public {
        UserContract.Role role = userContract.getUserRole(msg.sender);
        require(role == UserContract.Role.Seller, "Only sellers can add listings");   
        listings.push(Listing(msg.sender, units, pricePerUnit, true));
    }

    function purchase(uint256 listingId) public payable {
        Listing storage listing = listings[listingId];
        UserContract.Role role = userContract.getUserRole(msg.sender);

        require(listing.active, "Listing is not active");
        require(role == UserContract.Role.Buyer, "Only buyers can purchase");
        
        uint256 totalCost = listing.pricePerUnit * listing.units;
        require(msg.value == totalCost, "The sent ether amount must equal (price per unit * units)");

        listing.active = false;
        transactions.push(Transaction(msg.sender, listing.seller, listing.units, totalCost));

        payable(listing.seller).transfer(totalCost);

        // Emit the PurchaseEvent
        emit PurchaseEvent(listingId, msg.sender, listing.seller, listing.units, totalCost);
    }

    function getListingCount() public view returns (uint) {
        return listings.length;
    }
}
