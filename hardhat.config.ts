import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ganache'

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
    },
  },
}

export default config
