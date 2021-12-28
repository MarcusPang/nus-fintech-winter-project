import { ethers } from "hardhat";

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  // const Token = await ethers.getContractFactory("WTPToken");
  // const token = await Token.deploy();
  const Wallet = await ethers.getContractFactory("MultiSigWallet");
  const wallet = await Wallet.deploy(
    [
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
      "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    ],
    1
  );

  await greeter.deployed();
  await wallet.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("Wallet deployed to:", wallet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});