import Wallet from "../../contracts/artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";
// make sure to deploy the contracts before running the frontend
import WalletFactory from "../../contracts/artifacts/contracts/MultiSigWalletFactory.sol/MultiSigWalletFactory.json";
export const walletFactoryAddress = process.env.NEXT_PUBLIC_WALLET_FACTORY_ADDRESS;

// export const requestAccount = async () => {
//   // request from metamask the user account
//   await window.ethereum.request({ method: "eth_requestAccounts" });
// };

// export const submitTransaction = async (
//   userAccount: string,
//   amount: number
// ) => {
//   if (window.ethereum) {
//     await requestAccount();
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       walletFactoryAddress,
//       WalletFactory.abi,
//       signer
//     );
//     const transaction = await contract.submitTransaction(
//       userAccount,
//       amount,
//       "0x00"
//     );
//     console.log(transaction);
//   }
// };

// export const getOwners = async () => {
//   if (window.ethereum) {
//     // const [account] = await window.ethereum.request({
//     //   method: "eth_requestAccounts",
//     // });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const contract = new ethers.Contract(
//       walletFactoryAddress,
//       WalletFactory.abi,
//       provider
//     );
//     console.log(await contract.getOwners());
//   }
// };

// export const getTransactions = async () => {
//   if (window.ethereum) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const contract = new ethers.Contract(
//       walletFactoryAddress,
//       WalletFactory.abi,
//       provider
//     );
//     const transactionCount = await contract.getTransactionCount();
//     for (let i = 0; i < transactionCount; i++) {
//       console.log(await contract.getTransaction(i));
//     }
//   }
// };

// export const confirmTransaction = async (transactionIndex: number) => {
//   if (window.ethereum) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       walletFactoryAddress,
//       WalletFactory.abi,
//       signer
//     );
//     try {
//       const transaction = await contract.confirmTransaction(transactionIndex);
//       console.log(transaction);
//     } catch (e) {
//       console.log("[error]: ", e);
//     }
//   }
// };

// export const createWallet = async (
//   userAccounts: string[],
//   percentage: number
// ) => {
//   let walletAddress = "";
//   if (window.ethereum) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       walletFactoryAddress,
//       WalletFactory.abi,
//       signer
//     );
//     try {
//       walletAddress = await contract.createWallet(userAccounts, percentage);
//     } catch (e) {
//       console.error("[error]: ", e);
//     }
//   }
//   return walletAddress;
// };

// export const getWallets = async (index: number) => {
//   if (window.ethereum) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const contract = new ethers.Contract(
//       walletFactoryAddress,
//       WalletFactory.abi,
//       provider
//     );
//     console.log(await contract.wallets(index));
//   }
// };

//Wallet Factory Interfaces

export const createWalletFactoryOptions = (
  functionName: string,
  args: Record<string, any>
) => {
  return {
    abi: WalletFactory.abi,
    contractAddress: walletFactoryAddress,
    functionName: functionName,
    params: args,
  };
};

//Wallet Interfaces (Should not be exposed)

export const createWalletOptions = (
  walletAddress: string,
  functionName: string,
  args: Record<string, any>
) => {
  return {
    abi: Wallet.abi,
    contractAddress: walletAddress,
    functionName: functionName,
    params: args,
  };
};
