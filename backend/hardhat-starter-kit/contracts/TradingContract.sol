// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./UserContract.sol";

contract TradingContract {
    UserContract public userContract;
    IERC20 public energyToken;

    // Structure to store offer information
    struct Offer {
        address seller;
        uint256 amount;
        uint256 price;
        bool isAvailable;
    }

    // Array of all offers
    Offer[] public offers;

    // Event to emit when a new offer is listed
    event EnergyListed(uint256 offerId, address seller, uint256 amount, uint256 price);

    // Event to emit when an offer is bought
    event EnergyBought(uint256 offerId, address seller, address buyer, uint256 amount, uint256 price);

    // Event to emit when an offer is canceled
    event OfferCanceled(uint256 offerId, address seller);

    constructor(UserContract _userContract, IERC20 _energyToken) {
        userContract = _userContract;
        energyToken = _energyToken;
    }

    // List energy for sale
    function listEnergy(uint256 _amount, uint256 _price) public {
        (, , UserContract.Status status) = userContract.getDetails(msg.sender);
        require(status == UserContract.Status.Producer, "Only producers can list energy");

        energyToken.transferFrom(msg.sender, address(this), _amount);

        offers.push(Offer({
            seller: msg.sender,
            amount: _amount,
            price: _price,
            isAvailable: true
        }));

        emit EnergyListed(offers.length - 1, msg.sender, _amount, _price);
    }

    // Buy energy from a listing
    function buyEnergy(uint256 _offerId) public payable {
        Offer storage offer = offers[_offerId];

        require(offer.isAvailable, "Offer is not available");
        require(msg.value == offer.price, "Sent value must equal the offer price");

        offer.isAvailable = false;
        payable(offer.seller).transfer(offer.price);
        energyToken.transfer(msg.sender, offer.amount);

        emit EnergyBought(_offerId, offer.seller, msg.sender, offer.amount, offer.price);
    }


    // Cancel a trade
    function cancelTrade(uint256 _offerId) public {
        Offer storage offer = offers[_offerId];

        require(offer.seller == msg.sender, "Only the seller can cancel this trade");
        require(offer.isAvailable, "Offer is not available");

        offer.isAvailable = false;
        energyToken.transfer(offer.seller, offer.amount);

        emit OfferCanceled(_offerId, msg.sender);
    }

    // Get all offers
    function getAllOffers() public view returns(Offer[] memory) {
        return offers;
    }

    // Get specific offer details
    function getOffer(uint256 _offerId) public view returns (address seller, uint256 amount, uint256 price, bool isAvailable) {
        Offer memory offer = offers[_offerId];
        return (offer.seller, offer.amount, offer.price, offer.isAvailable);
    }
}
