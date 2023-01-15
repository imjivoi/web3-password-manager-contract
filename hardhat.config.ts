import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      url: process.env.GANACHE_URL,
      accounts: [process.env.GANACHE_ACCOUNT as string],
    },
  },
}

export default config
