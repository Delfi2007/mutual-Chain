const hre = require("hardhat");

async function main() {
  console.log("Deploying MutualChain Insurance Protocol...");

  // Chainlink Price Feed addresses
  // Arbitrum ETH/USD: 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612
  const priceFeedAddress = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612";

  const MutualChainInsurance = await hre.ethers.getContractFactory("MutualChainInsurance");
  const insurance = await MutualChainInsurance.deploy(priceFeedAddress);

  await insurance.waitForDeployment();

  const address = await insurance.getAddress();
  console.log("MutualChainInsurance deployed to:", address);

  // Wait for block confirmations
  console.log("Waiting for block confirmations...");
  await insurance.deploymentTransaction().wait(6);

  // Verify contract on block explorer
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [priceFeedAddress],
    });
    console.log("Contract verified successfully");
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
