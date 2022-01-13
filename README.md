# Fintech Winter Project: Multisig Contracts

# TODO

- [x] Write contracts
- [x] Connect with frontend
- [x] Test with metamask
- [ ] Finish up frontend

## Timeline

- 13/12 - 19/12: Smart Contract
- 20/12 - 26/12: Smart Contract + Interface With MetaMask
- 27/12 - 02/01: Interface With MetaMask + Frontend
- 03/01 - 10/01: Frontend
- 10/01 - 12/01: Cleanup

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
- [ ] See wallets you own/shared to
- [ ] Send/receive tokens (multi-signature)
- [x] Sign in/sign out (metamask)
- [ ] See past transactions
- [ ] See current value
- [ ] See all users (like a explorer tool)

# Setup

Commands:

- `yarn` to install packages
- `yarn dev` to start local chain and frontend
- `yarn lint` to format contracts and web folders

## Local development

### Connect to new Moralis server

- Create a new "Local Devchain Server", make sure to select the "Eth (LocalDevChain)" chain
- Click "View Details" and make a `.env` file from `.env.sample` in [apps/web](apps/web) to store the Server URL and Application ID for the frontend to connect to Moralis database
- Go to "Devchain Proxy Server" and update [frp/frpc.ini](frp/frpc.ini) with the Hardhat configuration

### Starting local chain and frontend

You can run `yarn dev` in the root directory to spin up the local dev network, built smart contracts, start reverse proxy, and start the frontend in a single terminal.

Alternatively, you can open the instances in separate terminals,

- `yarn dev` or `yarn dev:mac` in [apps/contracts](apps/contracts) to start local dev network, build smart contracts, and start reverse proxy (see [package.json](apps/contracts/package.json) to see the commands being run concurrently)
- `yarn dev` in [apps/web](apps/web) to start frontend

# Frameworks/Libraries

## Contracts

- Smart contracts built with [Hardhat](https://hardhat.org)
- MultiSigWallet contract code adapted from [this example](https://solidity-by-example.org/app/multi-sig-wallet/)
- Smart contracts deployed on Ropsten network with the help of [Alchemy](https://www.alchemy.com/)

## Frontend

- Next.js
- TypeScript
- Bootstrap
- [Moralis](https://moralis.io/) for easy management of authentication with web3 providers
- [react-moralis](https://github.com/MoralisWeb3/react-moralis) for helpful React hooks to deal with user state management, querying on chain data and executing contract functions
