require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

module.exports = {
  solidity: '0.8.17',
  paths: {
    artifacts: './app/src/artifacts'
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_NETWORK_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  }
}
