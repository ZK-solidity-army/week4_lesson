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
    <div className="card bg-primary text-primary-content mt-2">
      <div className="flex flex-row items-center ">
        <div>

          <label className="label">
            <span className="label-text">Enter amount of tokens:</span>
          </label>
        </div>
        <div className="w-48 my-1 ml-4 mr-4">
          <input
            type="text"
            placeholder="123456..."
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <MintButton address={params.address} amount={amount} />
        {isSuccess && <div className="ml-2">Signature: {data}</div>}
        {isError && <div className="ml-2">Error signing message</div>}
      </div>
    </div>
  );
}