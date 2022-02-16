# Fintech Winter Project: Multi Signature Wallets

## Functionalities

### Contracts

- [x] Add/delete wallet (deployment)
- [x] Assign/remove owners (done by existing owners of wallet)
- [x] Read all owners
- [x] Submit transaction
- [x] Multi-sign
- [x] Execute transaction (after enough signatures)

### Frontend

- [x] Deploy multi-sig wallet onto Ropsten test network
- [x] See wallets you own/shared to
- [x] Send/receive tokens (multi-signature)
- [x] Sign in/sign out (metamask)
- [x] See past transactions

## Setup

Commands:

- `yarn` to install packages
- `yarn compile` to compile smart contracts
- `yarn dev` to start local chain and frontend
- `yarn lint` to format contracts and web folders

## Local development

### Connecting to new Moralis server

- Create a new "Local Devchain Server", make sure to select the "Eth (LocalDevChain)" chain
- Click "View Details" and make a `.env` file from `.env.sample` in [apps/web](apps/web) to store the Server URL and Application ID for the frontend to connect to Moralis database
- Go to "Devchain Proxy Server" and update [frp/frpc.ini](frp/frpc.ini) with the Hardhat configuration

### Starting local chain and frontend

You can run `yarn dev` in the root directory to spin up the local dev network, build smart contracts, start reverse proxy, and start the frontend in a single terminal.

Alternatively, you can open the instances in separate terminals,

- `yarn dev` or `yarn dev:mac` in [apps/contracts](apps/contracts) to start local dev network, build smart contracts, and start reverse proxy (see [package.json](apps/contracts/package.json) to see the commands being run concurrently)
- `yarn dev` in [apps/web](apps/web) to start frontend

## Tech Stack

### Contracts

- Smart contracts built with [Hardhat](https://hardhat.org)
- MultiSigWallet contract code adapted from [this example](https://solidity-by-example.org/app/multi-sig-wallet/)
- Smart contracts deployed on Ropsten network with the help of [Alchemy](https://www.alchemy.com/)

### Frontend

- Next.js
- TypeScript
- React Bootstrap
- [Moralis](https://moralis.io/) for easy management of authentication with web3 providers
- [react-moralis](https://github.com/MoralisWeb3/react-moralis) for helpful React hooks to deal with user state management, querying on chain data and executing contract functions
