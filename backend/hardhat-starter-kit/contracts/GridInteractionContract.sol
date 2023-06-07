// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

// contract GridInteractionContract is ChainlinkClient {
//     address private oracle;
//     bytes32 private jobId;
//     uint256 private fee;

//     // You might have a mapping here between addresses and energy balances
//     mapping(address => uint256) public energyBalances;

//     constructor() {
//         setPublicChainlinkToken();
//         oracle = ORACLE_ADDRESS; // Set this to the correct address
//         jobId = JOB_ID; // Set this to the correct job ID
//         fee = 0.1 * 10 ** 18; // 0.1 LINK
//     }

//     function sendEnergy(address _consumer, uint256 _amount) public returns (bytes32 requestId) {
//         Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.confirmEnergySend.selector);
        
//         // This would be the API that the IoT device exposes
//         string memory apiUrl = string(abi.encodePacked("http://your-iot-device-api/sendEnergy?consumer=", toString(_consumer), "&amount=", toString(_amount)));
//         request.add("get", apiUrl);
//         return sendChainlinkRequestTo(oracle, request, fee);
//     }

//     function confirmEnergySend(bytes32 _requestId, uint256 _sentAmount) public recordChainlinkFulfillment(_requestId) {
//         // Logic here to confirm that energy has been sent, perhaps updating the balance of the energyBalances mapping
//     }

//     // Helper function to convert address to string, since Solidity doesn't natively support this
//     function toString(address account) public pure returns(string memory) {
//         return toString(abi.encodePacked(account));
//     }
    
//     function toString(uint256 value) public pure returns(string memory) {
//         return toString(abi.encodePacked(value));
//     }
    
//     function toString(bytes memory data) public pure returns(string memory) {
//         bytes memory alphabet = "0123456789abcdef";

//         bytes memory str = new bytes(2 + data.length * 2);
//         str[0] = "0";
//         str[1] = "x";
//         for (uint i = 0; i < data.length; i++) {
//             str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
//             str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
//         }
//         return string(str);
//     }
// }
