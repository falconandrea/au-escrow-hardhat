const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('transaction with 0 eth', () => {
  let contract
  let beneficiary
  let arbiter

  before('create a wrong escrow', async () => {
    beneficiary = ethers.provider.getSigner(0)
    arbiter = ethers.provider.getSigner(1)
    const EscrowList = await ethers.getContractFactory('EscrowList')
    contract = await EscrowList.deploy()
    await contract.deployed()
  })
  it('should revert', async function () {
    await expect(contract.newEscrow(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: ethers.utils.parseEther('0')
      }
    )).to.be.reverted
  })
  it('return 0 transaction saved', async function () {
    const txs = await contract.getListEscrows()
    expect(txs.length).eq(0)
  })
})

describe('transaction with 1 eth', () => {
  let contract
  let depositor
  let beneficiary
  let arbiter
  let deposit
  let otherUser
  before('create one escrow', async () => {
    depositor = ethers.provider.getSigner(0)
    beneficiary = ethers.provider.getSigner(1)
    arbiter = ethers.provider.getSigner(2)
    otherUser = ethers.provider.getSigner(3)
    const EscrowList = await ethers.getContractFactory('EscrowList')
    contract = await EscrowList.deploy()
    deposit = ethers.utils.parseEther('1')
    await contract.deployed()

    await contract.newEscrow(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit
      }
    )

    await contract.connect(otherUser).newEscrow(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit
      }
    )
  })
  it('return 1 transaction saved', async function () {
    const txs = await contract.getListEscrows()
    expect(txs.length).eq(1)
  })
  it('check balance contract', async function () {
    const balance = await ethers.provider.getBalance(contract.address)
    expect(parseFloat(balance.toString())).to.eq(parseFloat(deposit.toString() * 2))
  })
  it('should revert when a wrong address try to approval', async () => {
    const firstTransaction = await contract.getEscrow(1)
    await expect(contract.connect(beneficiary).approveEscrow(firstTransaction.id.toString())).to.be.reverted
  })
  it('after approval should transfer balance to beneficiary', async () => {
    const firstTransaction = await contract.getEscrow(1)
    const before = await ethers.provider.getBalance(beneficiary.getAddress())
    const approveTxn = await contract.connect(arbiter).approveEscrow(firstTransaction.id.toString())
    await approveTxn.wait()
    const after = await ethers.provider.getBalance(beneficiary.getAddress())
    expect(after.sub(before)).to.eq(deposit)
  })
  it('check balance contract after approvation', async function () {
    const balance = await ethers.provider.getBalance(contract.address)
    expect(balance.toString()).to.eq(deposit.toString())
  })
})
