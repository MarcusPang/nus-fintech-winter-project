import { ethers } from "hardhat";

async function main() {
  const WalletFactory = await ethers.getContractFactory(
    "MultiSigWalletFactory"
  );
  const walletFactory = await WalletFactory.deploy();

  await walletFactory.deployed();

  console.log("WalletFactory deployed to:", walletFactory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
