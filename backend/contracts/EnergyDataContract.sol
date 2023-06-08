// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EnergyDataContract is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    address private oracle;
    bytes32 private productionJobId;
    bytes32 private consumptionJobId;
    uint256 private fee;
    AggregatorV3Interface internal ethPriceFeed;

    struct EnergyData {
        uint256 productionTimestamp;
        uint256 unitsProduced;
        uint256 consumptionTimestamp;
        uint256 unitsConsumed;
    }

    struct DataPoint {
        uint256 timestamp;
        uint256 value;
    }

    event RequestFulfilled(
        bytes32 indexed requestId,
        uint256 indexed _unitsProduced
    );

    mapping(address => EnergyData) public energyData;
    DataPoint[] public productionDataPoints;
    DataPoint[] public consumptionDataPoints;

    constructor() {
        // Hardcoding the values
        oracle = 0xec39A0C27b4E7F6c5a02F6AA52F7153Cf8C210f1;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        productionJobId = stringToBytes32("f3d904c3519a43c69b0aba5b6d7a78f6");
        consumptionJobId = stringToBytes32("11e8ab573ede4b978b4dd0619c44d467");        
        ethPriceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    function requestEnergyProductionData() public {
        Chainlink.Request memory req = buildChainlinkRequest(
            productionJobId,
            address(this),
            this.fulfillEnergyProductionData.selector
        );
        sendChainlinkRequestTo(oracle, req, fee);
    }

    function fulfillEnergyProductionData(bytes32 _requestId, uint256 _unitsProduced) public recordChainlinkFulfillment(_requestId) {
        emit RequestFulfilled(_requestId, _unitsProduced);
        energyData[msg.sender].unitsProduced = _unitsProduced;
        energyData[msg.sender].productionTimestamp = block.timestamp;

        productionDataPoints.push(DataPoint(block.timestamp, _unitsProduced));
    }

    function requestEnergyConsumptionData() public {
        Chainlink.Request memory req = buildChainlinkRequest(consumptionJobId, address(this), this.fulfillEnergyConsumptionData.selector);
        sendChainlinkRequestTo(oracle, req, fee);
    }

    function fulfillEnergyConsumptionData(bytes32 _requestId, uint256 _unitsConsumed) public recordChainlinkFulfillment(_requestId) {
        energyData[msg.sender].unitsConsumed = _unitsConsumed;
        energyData[msg.sender].consumptionTimestamp = block.timestamp;

        consumptionDataPoints.push(DataPoint(block.timestamp, _unitsConsumed));
    }

    function getUserEnergyData(address _address) public view returns(uint256, uint256, uint256, uint256) {
        return (energyData[_address].productionTimestamp, energyData[_address].unitsProduced, energyData[_address].consumptionTimestamp, energyData[_address].unitsConsumed);
    }

    function getProductionDataPoints() public view returns (DataPoint[] memory) {
        return productionDataPoints;
    }

    function getConsumptionDataPoints() public view returns (DataPoint[] memory) {
        return consumptionDataPoints;
    }

    function getLatestEthUsdPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = ethPriceFeed.latestRoundData();
        return price;
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}

