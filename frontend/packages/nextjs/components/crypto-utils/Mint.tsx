// @formatter:off
"use client"
// @formatter:on
import { useState } from 'react';
import { useSignMessage } from 'wagmi';
import { MintButton } from '~~/components/api/MintButton';

export function Mint(params: { address: `0x${string}` }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [addressToMint, setAddressToMint] = useState('');
  const [amount, setAmount] = useState('');
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-2">
      <div className="card-body">
        <h2 className="card-title">Mint tokens to vote</h2>
        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Enter token address CA:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
          />
        </div>
        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Enter address to mint:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={addressToMint}
            onChange={e => setAddressToMint(e.target.value)}
          />
        </div>
        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Enter amount of tokens:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button
          className="btn btn-active btn-neutral"
          disabled={isLoading}
          onClick={() => signMessage({ message: tokenAddress })
          }
        >
          Sign message
        </button>
        <MintButton address={params.address} />
        {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>}
      </div>
    </div>
  );
}