import { ethers } from "hardhat";

async function main() {
  // const Greeter = await ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  const WalletFactory = await ethers.getContractFactory(
    "MultiSigWalletFactory"
  );
  const walletFactory = await WalletFactory.deploy();

  // await greeter.deployed();
  await walletFactory.deployed();

  // console.log("Greeter deployed to:", greeter.address);
  console.log("WalletFactory deployed to:", walletFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
