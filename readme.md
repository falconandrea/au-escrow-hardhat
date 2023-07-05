<a href="https://trackgit.com">
<img src="https://us-central1-trackgit-analytics.cloudfunctions.net/token/ping/ljptv85ckadr3gmo1glj" alt="trackgit-views" />
</a>

# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

Steps:

1. Buyer User creates a New Contract with an Arbiter User and a Beneficiary User and deposits some ETH.
2. Beneficiary User sends the product bought from the Buyer user.
3. Arbiter User confirms and approves the Contract. Only the Arbiter User can do it.
4. Dapp finally sends ETH to the Beneficiary User.

Each user logged in can see his contracts and/or the contracts to approve.

[Here](https://goerli.etherscan.io/address/0x372f23359dBBD48afF731A50eCc4C1AcF0C06745) you can see and example of transactions on the contract.

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
