// @formatter:off
"use client"
// @formatter:on
import { useState } from 'react';
import { useSignMessage } from 'wagmi';
import { DelegateButton } from '~~/components/api/DelegateButton';

export function Delegate(params: { address: `0x${string}` }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amountToVote, setAmountToVote] = useState('');
  const { data, isError, isSuccess } = useSignMessage();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-2">
      <div className="card-body">
        <h2 className="card-title">Delegate</h2>
        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Enter wallet address to delegate votes:</span>
          </label>
          <input
            type="text"
            placeholder="0x12345.....12345"
            className="input input-bordered w-full max-w-xs"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
          />
        </div>
        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Enter amount of tokens to vote:</span>
          </label>
          <input
            type="text"
            placeholder="123456..."
            className="input input-bordered w-full max-w-xs"
            value={amountToVote}
            onChange={e => setAmountToVote(e.target.value)}
          />
        </div>

        <DelegateButton address={params.address}></DelegateButton>
        {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>}
      </div>
    </div>
  )
    ;
}