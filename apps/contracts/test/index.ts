import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  MultiSigWalletFactory,
  // eslint-disable-next-line camelcase
  MultiSigWalletFactory__factory,
  // eslint-disable-next-line node/no-missing-import
} from "../typechain";

describe("WalletFactory", async () => {
  // eslint-disable-next-line camelcase
  let WalletFactory: MultiSigWalletFactory__factory;
  let walletFactory: MultiSigWalletFactory;
  let addresses: SignerWithAddress[];
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  // let addrs: SignerWithAddress[];

  beforeEach(async () => {
    WalletFactory = await ethers.getContractFactory("MultiSigWalletFactory");
    walletFactory = await WalletFactory.deploy();
    await walletFactory.deployed();
    addresses = await ethers.getSigners();
    [owner, addr1, addr2] = addresses;
  });

  describe("wallet creation", async () => {
    it("should be able to create a wallet with correct owner", async () => {
      const percetageConfirmation = 100;
      await walletFactory.createWallet([owner.address], percetageConfirmation);

      const walletAddress = (await walletFactory.getWallets())[0];

      expect((await walletFactory.getOwners(walletAddress))[0]).to.equal(
        owner.address
      );
      expect(
        await walletFactory.getPercentConfirmationRequired(walletAddress)
      ).to.equal(percetageConfirmation);
      expect(await walletFactory.getTransactionCount(walletAddress)).to.equal(
        0
      );
    });

    it("should be able to create multiple wallets with correct owners", async () => {
      const percentageConfirmation = 80;
      await walletFactory.createWallet([owner.address], percentageConfirmation);
      await walletFactory.createWallet([addr1.address], percentageConfirmation);
      await walletFactory.createWallet([addr2.address], percentageConfirmation);
      const walletAddresses = await walletFactory.getWallets();

      walletAddresses.forEach(async (walletAddress, index) => {
        expect((await walletFactory.getOwners(walletAddress))[0]).to.equal(
          addresses[index].address
        );
        expect(
          await walletFactory.getPercentConfirmationRequired(walletAddress)
        ).to.equal(percentageConfirmation);
        expect(await walletFactory.getTransactionCount(walletAddress)).to.equal(
          0
        );
      });
    });

    it("should be able to create a wallet with multiple correct owners", async () => {
      await walletFactory.createWallet(
        addresses.map((add) => add.address),
        100
      );
      const walletAddress = (await walletFactory.getWallets())[0];
      const walletOwners = await walletFactory.getOwners(walletAddress);

      expect(walletOwners).to.eql(addresses.map((add) => add.address));
    });
  });

  describe("wallet owners", async () => {
    it("should be able to add owners", async () => {
      const percentageConfirmation = 54;
      await walletFactory.createWallet([owner.address], percentageConfirmation);

      const walletAddress = (await walletFactory.getWallets())[0];
      await walletFactory.addOwner(walletAddress, addr1.address);

      expect(await walletFactory.getOwners(walletAddress)).to.eql([
        owner.address,
        addr1.address,
      ]);
      expect(
        await walletFactory.getPercentConfirmationRequired(walletAddress)
      ).to.equal(percentageConfirmation);
      expect(await walletFactory.getTransactionCount(walletAddress)).to.equal(
        0
      );
    });

    it("should be able to remove owners", async () => {
      const percentageConfirmation = 78;
      await walletFactory.createWallet(
        [owner.address, addr1.address],
        percentageConfirmation
      );

      const walletAddress = (await walletFactory.getWallets())[0];
      await walletFactory.removeOwner(walletAddress, addr1.address);

      const walletOwners = await walletFactory.getOwners(walletAddress);

      walletOwners.forEach(async (ownerAddress) => {
        if (await walletFactory.isOwner(walletAddress, ownerAddress)) {
          expect(ownerAddress).to.eql([owner.address]);
        }
      });
    });
  });
});
