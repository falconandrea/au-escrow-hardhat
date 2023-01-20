import { ethers } from 'ethers'
import { useState } from 'react'
import deploy from './deploy'
import Escrow from './Escrow'

export async function approve (escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve()
  await approveTxn.wait()
}

function App () {
  const [escrows, setEscrows] = useState([])
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState(0)
  const [signer, setSigner] = useState()

  async function connectWallet () {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])

    const signerAccount = await provider.getSigner()
    setSigner(signerAccount)
    setAccount(await signerAccount.getAddress())
    setBalance(ethers.utils.formatEther(await signerAccount.getBalance()))
  }

  async function newContract () {
    const beneficiary = document.getElementById('beneficiary').value
    const arbiter = document.getElementById('arbiter').value
    const value = ethers.utils.parseEther(document.getElementById('wei').value, 'ether')

    const escrowContract = await deploy(signer, arbiter, beneficiary, value)

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete'
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!"
        })

        await approve(escrowContract, signer)
      }
    }

    setEscrows([...escrows, escrow])
  }

  return (
    <div className='block p-6 rounded-lg shadow-lg bg-white mx-auto my-4 max-w-md'>
      {!account
        ? (
          <button
            className='w-full px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
            id='deploy'
            onClick={connectWallet}
          >
            Connect your wallet
          </button>
          )
        : (
          <div className='contract'>
            <h1 className='text-xl font-bold mb-6'>New Contract</h1>

            <div className='form-control mb-4'>
              <label htmlFor='your_account' className='font-bold'>Your account</label>
              <input
                className='border border-solid border-gray-300 rounded bg-white bg-clip-padding text-base font-normal w-full px-3 py-1' type='text' id='your_account' disabled value={account}
              />
            </div>

            <div className='form-control mb-4'>
              <label htmlFor='your_balance' className='font-bold'>Your balance in ETH</label>
              <input
                className='border border-solid border-gray-300 rounded bg-white bg-clip-padding text-base font-normal w-full px-3 py-1' type='text' id='your_balance' disabled value={balance}
              />
            </div>

            <div className='form-control mb-4'>
              <label htmlFor='arbiter' className='font-bold'>Arbiter account</label>
              <input
                className='border border-solid border-gray-300 rounded bg-white bg-clip-padding text-base font-normal w-full px-3 py-1' type='text' id='arbiter'
              />
            </div>

            <div className='form-control mb-4'>
              <label htmlFor='beneficiary' className='font-bold'>Beneficiary account</label>
              <input
                className='border border-solid border-gray-300 rounded bg-white bg-clip-padding text-base font-normal w-full px-3 py-1' type='text' id='beneficiary'
              />
            </div>

            <div className='form-control mb-4'>
              <label htmlFor='wei' className='font-bold'>Deposit Amount (in ETH)</label>
              <input
                className='border border-solid border-gray-300 rounded bg-white bg-clip-padding text-base font-normal w-full px-3 py-1' type='number' step='0.01' id='wei'
              />
            </div>

            <button
              className='w-full px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
              id='deploy'
              onClick={(e) => {
                e.preventDefault()

                newContract()
              }}
            >
              Deploy
            </button>
          </div>
          )}

      <div className='existing-contracts'>
        <h1> Existing Contracts </h1>

        <div id='container'>
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />
          })}
        </div>
      </div>
    </div>
  )
}

export default App
