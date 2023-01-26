import { useState } from 'react'

export default function Escrow ({
  address,
  arbiter,
  beneficiary,
  amount,
  isApproved,
  approveFunction
}) {
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  return (
    <div className='bg-gray-200 p-4 mb-4'>
      <p><strong>Arbiter: </strong>{arbiter}</p>
      <p><strong>Beneficiary: </strong>{beneficiary}</p>
      <p><strong>Value: </strong>{amount} ETH</p>
      {!isApproved
        ? (
          <button
            className='px-4 py-2 uppercase bg-black text-white border border-black inline-block mt-4 cursor-pointer'
            onClick={async (e) => {
              e.preventDefault()

              const result = await approveFunction()
              if (result && result.message) setMessage(result.message)
              if (result && result.type) setMessageType(result.type)
            }}
          >
            Approve
          </button>
          )
        : (
          <p className='px-4 py-2 mt-4 font-bold rounded-sm text-white bg-green-800 inline-block'>✓ Approved</p>
          )}
      {message !== '' && (<p className={`px-4 py-2 mt-4 font-bold rounded-sm text-white ${messageType === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>{message}</p>)}
    </div>
  )
}
