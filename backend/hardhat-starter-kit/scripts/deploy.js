// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const UserContract = await hre.ethers.getContractFactory("UserContract");
  const userContract = await UserContract.deploy();
  await userContract.deployed();

  const EnergyToken = await hre.ethers.getContractFactory("EnergyToken");
  const energyToken = await EnergyToken.deploy();
  await energyToken.deployed();

  const TradingContract = await hre.ethers.getContractFactory("TradingContract");
  const tradingContract = await TradingContract.deploy(userContract.address, energyToken.address);
  await tradingContract.deployed();

  console.log("UserContract deployed to:", userContract.address);
  console.log("EnergyToken deployed to:", energyToken.address);
  console.log("TradingContract deployed to:", tradingContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
