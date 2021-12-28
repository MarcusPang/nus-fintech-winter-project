# Fintech Winter Project: Multisig Contracts

# TODO

- [ ] Write contracts
- [ ] Connect with frontend
- [ ] Test with metamask
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

- [ ] Setup multi-sig wallet deployment (backend)
- [ ] Send/receive tokens (multi-signature)
- [ ] Sign in/sign out (metamask) 
- [ ] See past transactions 
- [ ] See current value 
- [ ] See all users (like a explorer tool)

# Setup

Commands:

- `yarn` to install packages
- `yarn lint` to format contracts and web folders

### Setup to test with MetaMask on localhost

- `yarn dev` in the root directory will setup the localhost node and deploy the smart contracts to the localhost at [localhost:8545](localhost:8545), along with starting the Next.js frontend at [localhost:3000](localhost:3000)

See the respective `yarn dev` commands in the respective `apps/**/package.json` to see what is being run

Make sure the `Greeter` and `WTPToken` address are the same as the values at [index.tsx](apps/web/pages/index.tsx)

If the `yarn dev` command is taking up too much CPU (I think it's a bug), go to each `apps` directory and run `yarn dev` in separate terminals

## Set up express backend
- `npm install` in root directory and `npm install` in apps/backend directory to install dependencies
- in apps/backend directory, `set PORT=3001` to change the port that the express backend is running on to 3001 (since 3000 is being used by frontned)
- in apps/backend directory, `npm start`
- access backend at `http://localhost:3001/`



## Contracts

Built using Hardhat (similar to truffle), see [getting started](https://hardhat.org/getting-started/). For reference, see [gnosis safe-contracts](https://github.com/gnosis/safe-contracts).

MultiSigWallet contract code adapted from [this example](https://solidity-by-example.org/app/multi-sig-wallet/).