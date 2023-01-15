import { expect } from 'chai'
import { Contract } from 'ethers'
import { ethers } from 'hardhat'

interface IAccount {
  id: number
  siteName: string
  login: string
  password: string
}

describe('Password manager', function () {
  let passwordManager: Contract
  let owner
  beforeEach(async () => {
    ;[owner] = await ethers.getSigners()

    const PasswordManagerContract = await ethers.getContractFactory(
      'PasswordManager'
    )
    passwordManager = await PasswordManagerContract.deploy()
    await passwordManager.deployed()
  })

  it('Should create new account password', async function () {
    await passwordManager.addNewAccount('test', 'login', 'password')
    const accounts = await passwordManager.allAccounts()

    expect(accounts[0].siteName).to.equal('test')
    expect(accounts[0].login).to.equal('login')
    expect(accounts[0].password).to.equal('password')
  })

  it('Should update account password', async function () {
    await passwordManager.addNewAccount('test', 'login', 'password')
    const accounts = await passwordManager.allAccounts()

    await passwordManager.updateAccount(
      accounts[0].id,
      'test2',
      'login',
      'password'
    )

    const updatedAccount = await passwordManager.getAccountByID(accounts[0].id)
    expect(updatedAccount.siteName).to.equal('test2')
  })

  it('Should return all accounts', async function () {
    await passwordManager.addNewAccount('test2', 'login', 'password')
    await passwordManager.addNewAccount('test3', 'login', 'password')
    await passwordManager.addNewAccount('test4', 'login', 'password')
    const accounts = await passwordManager.allAccounts()

    expect(accounts.length).to.equal(3)
  })

  it('Should delete account', async function () {
    let accounts
    await passwordManager.addNewAccount('test', 'login', 'password')
    accounts = await passwordManager.allAccounts()
    await passwordManager.deleteAccount(accounts[0].id)

    accounts = await passwordManager.allAccounts()
    expect(accounts.length).to.equal(0)
  })
})
