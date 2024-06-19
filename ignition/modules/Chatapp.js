const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChatAppModule", (m) => {
  // Define the contract deployment
  const chatApp = m.contract("ChatApp");

  // Return the deployed contract
  return { chatApp };
});
