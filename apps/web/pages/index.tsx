import { ethers } from "ethers";
import { useState } from "react";
// make sure to deploy the contracts before running the frontend
import Greeter from "../../contracts/artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "../../contracts/artifacts/contracts/WTPToken.sol/WTPToken.json";
import Wallet from "../../contracts/artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json";

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

// address of where the contracts are deployed to
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const walletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Homepage = () => {
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState(0);

  const requestAccount = async () => {
    // request from metamask the user account
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  // const fetchGreeting = async () => {
  //   // check if metamask is available
  //   if (window.ethereum) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     console.log({ provider });
  //     const contract = new ethers.Contract(
  //       greeterAddress,
  //       Greeter.abi,
  //       provider
  //     );
  //     try {
  //       const data = await contract.greet();
  //       console.log("data: ", data);
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   }
  // };

  // async function getBalance() {
  //   if (typeof window.ethereum !== "undefined") {
  //     const [account] = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
  //     const balance = await contract.balanceOf(account);
  //     console.log("Balance: ", balance.toString());
  //   }
  // }

  const sendAmount = async () => {
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
      // await transaction.wait();
      // console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  };

  // const setGreetingValue = async () => {
  //   if (!greeting) return;
  //   if (window.ethereum) {
  //     await requestAccount();
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     console.log({ provider });
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
  //     const transaction = await contract.setGreeting(greeting);
  //     setGreeting("");
  //     await transaction.wait();
  //     fetchGreeting();
  //   }
  // };

  const getOwners = async () => {
    if (window.ethereum) {
      // const [account] = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);
      console.log(await contract.getOwners());
    }
  };

  const getTransactions = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);
      const transactionCount = await contract.getTransactionCount();
      for (let i = 0; i < transactionCount; i++) {
        console.log(await contract.getTransaction(i));
      }
    }
  };

  return (
    <div>
      <h1>Web</h1>
      {/* <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreetingValue}>Set Greeting</button>
      <input
        onChange={(e) => setGreeting(e.target.value)}
        placeholder="set greeting"
        value={greeting}
      /> */}

      <br />
      <button onClick={getOwners}>get owners</button>
      <button onClick={getTransactions}>get transactions</button>
      <button onClick={sendAmount}>send amount</button>
      <input
        onChange={(e) => setUserAccount(e.target.value)}
        placeholder="user account"
      />
      <input
        onChange={(e) => setAmount(+e.target.value)}
        placeholder="amount"
      />
    </div>
  );
};

export default Homepage;
