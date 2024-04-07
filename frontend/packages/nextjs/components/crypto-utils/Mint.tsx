// @formatter:off
"use client"
// @formatter:on
import { useState } from 'react';
import { useSignMessage } from 'wagmi';
import { MintButton } from '~~/components/api/MintButton';

export function Mint(params: { address: `0x${string}` }) {
  const [amount, setAmount] = useState('');
  const { data, isError, isSuccess } = useSignMessage();

  return (
    <div className="card w-96 bg-primary text-primary-content mt-2">
      <div className="card-body">
        <h2 className="card-title">Mint tokens to vote</h2>
        <label className="label">
          <span className="label-text">Enter amount of tokens:</span>
        </label>
        <div className="flex flex-row items-center">
          <div className="w-48 my-1">
            <input
              type="text"
              placeholder="123456..."
              className="input input-bordered w-full max-w-xs"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <MintButton address={params.address} amount={amount} />
            {isSuccess && <div className="ml-2">Signature: {data}</div>}
            {isError && <div className="ml-2">Error signing message</div>}
          </div>
        </div>
      </div>
    </div>
  );
}