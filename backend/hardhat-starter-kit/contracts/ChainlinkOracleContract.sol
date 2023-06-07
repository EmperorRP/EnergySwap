// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

// contract ChainlinkOracleContract is ChainlinkClient {
//     // Chainlink oracle variables
//     address private oracle;
//     bytes32 private jobId;
//     uint256 private fee;

//     // Variable to hold the latest data received from the Chainlink oracle
//     uint256 public data;

//     constructor() {
//         setPublicChainlinkToken();
//         oracle = ORACLE_ADDRESS; // Set this to the correct address
//         jobId = JOB_ID; // Set this to the correct job ID
//         fee = 0.1 * 10 ** 18; // 0.1 LINK
//     }

//     // Request data from the Chainlink oracle
//     function requestData() public returns (bytes32 requestId) {
//         Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillData.selector);
//         request.add("get", "http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London");
//         request.add("path", "current.temp_c");
//         return sendChainlinkRequestTo(oracle, request, fee);
//     }

//     // Fulfill the data request
//     function fulfillData(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId) {
//         data = _data;
//         // Add logic here to make state changes based on the data received
//     }
// }
