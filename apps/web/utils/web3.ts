// import Wallet from "../../contracts/artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";
// make sure to deploy the contracts before running the frontend
import WalletFactory from "../contracts/contracts/MultiSigWalletFactory.sol/MultiSigWalletFactory.json";
export const walletFactoryAddress = process.env.WALLET_FACTORY_ADDRESS;

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
