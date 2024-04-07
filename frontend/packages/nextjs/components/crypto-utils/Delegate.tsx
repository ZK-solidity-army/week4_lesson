"use client";

import { useState } from "react";
import { useContractWrite } from "wagmi";

export function Delegate({ address, myTokenAddress }: { address: `0x${string}`; myTokenAddress: `0x${string}` }) {
  const [tokenAddress, setTokenAddress] = useState("");
  // TODO: use import from generated abi
  const { data, isError, isSuccess, isLoading, write } = useContractWrite({
    address: myTokenAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "delegatee",
            type: "address",
          },
        ],
        name: "delegate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "delegate",
    args: [address],
  });

  return (
    <div className="card bg-primary text-primary-content mt-2">
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
        <button className="btn btn-active btn-neutral" onClick={() => setTokenAddress(address)}>
          Or paste your address
        </button>
        <button className="btn btn-active btn-neutral" onClick={() => write()}>
          Delegate votes
        </button>
        <p className="h-5 my-1">
          {isLoading && <p className="my-auto">🟡 Delegating voting power...</p>}
          {isSuccess && <div>Signature: {JSON.stringify(data)}</div>}
          {isError && <div>🛑 Error sending transaction {JSON.stringify(data)}</div>}
        </p>
      </div>
    </div>
  );
}
