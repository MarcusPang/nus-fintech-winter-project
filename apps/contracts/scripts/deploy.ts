import { ethers } from "hardhat";

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  const Token = await ethers.getContractFactory("WTPToken");
  const token = await Token.deploy();

  await greeter.deployed();
  await token.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("WTPToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
