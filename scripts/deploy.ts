import { ethers } from 'hardhat'

async function main() {
  const PasswordManagerContract = await ethers.getContractFactory(
    'PasswordManager'
  )
  const passwordManager = await PasswordManagerContract.deploy()

  await passwordManager.deployed()

  console.log('deployed to: ', passwordManager.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
