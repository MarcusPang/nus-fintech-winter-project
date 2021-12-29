import { ethers } from "ethers";
// make sure to deploy the contracts before running the frontend
import Greeter from "../../contracts/artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "../../contracts/artifacts/contracts/WTPToken.sol/WTPToken.json";
import Wallet from "../../contracts/artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";

export const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const walletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const requestAccount = async () => {
  // request from metamask the user account
  await window.ethereum.request({ method: "eth_requestAccounts" });
};

export const submitTransaction = async (
  userAccount: string,
  amount: number
) => {
  if (window.ethereum) {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletAddress, Wallet.abi, signer);
    const transaction = await contract.submitTransaction(
      userAccount,
      amount,
      "0x00"
    );
    console.log(transaction);
  }
};

export const getOwners = async () => {
  if (window.ethereum) {
    // const [account] = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);
    console.log(await contract.getOwners());
  }
};

export const getTransactions = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);
    const transactionCount = await contract.getTransactionCount();
    for (let i = 0; i < transactionCount; i++) {
      console.log(await contract.getTransaction(i));
    }
  }
};

export const confirmTransaction = async (transactionIndex: number) => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletAddress, Wallet.abi, signer);
    try {
      const transaction = await contract.confirmTransaction(transactionIndex);
      console.log(transaction);
    } catch (e) {
      console.log("[error]: ", e);
    }
  }
};
