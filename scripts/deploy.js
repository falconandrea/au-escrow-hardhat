async function main () {
  const EscrowList = await hre.ethers.getContractFactory('EscrowList')
  const escrowList = await EscrowList.deploy()

  await escrowList.deployed()

  console.log(
    `EscrowFactory deployed to ${escrowList.address}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
