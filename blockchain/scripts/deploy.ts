// scripts/deploy.ts
import { ethers, upgrades } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy EcoCredit
  console.log("Deploying EcoCredit...");
  const EcoCredit = await ethers.getContractFactory("EcoCredit");
  const ecoCredit = await upgrades.deployProxy(
    EcoCredit,
    [deployer.address],
    { initializer: "initialize" }
  );
  await ecoCredit.deployed();
  console.log("EcoCredit deployed to:", ecoCredit.address);

  // Deploy AttestationRegistry
  console.log("Deploying AttestationRegistry...");
  const AttestationRegistry = await ethers.getContractFactory("AttestationRegistry");
  const attestationRegistry = await upgrades.deployProxy(
    AttestationRegistry,
    [deployer.address],
    { initializer: "initialize" }
  );
  await attestationRegistry.deployed();
  console.log("AttestationRegistry deployed to:", attestationRegistry.address);

  // Grant roles
  console.log("Setting up roles...");
  const RELAYER_ROLE = await ecoCredit.RELAYER_ROLE();
  const FACILITY_ROLE = await ecoCredit.FACILITY_ROLE();

  if (process.env.RELAYER_ADDRESS) {
    await ecoCredit.grantRole(RELAYER_ROLE, process.env.RELAYER_ADDRESS);
    await attestationRegistry.grantRole(RELAYER_ROLE, process.env.RELAYER_ADDRESS);
    console.log("Granted RELAYER_ROLE to:", process.env.RELAYER_ADDRESS);
  }

  // Save deployment info
  const deploymentInfo = {
    network: await deployer.provider.getNetwork(),
    ecoCredit: ecoCredit.address,
    attestationRegistry: attestationRegistry.address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  writeFileSync(
    `deployment-${deploymentInfo.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment completed!");
  console.log("EcoCredit:", ecoCredit.address);
  console.log("AttestationRegistry:", attestationRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
