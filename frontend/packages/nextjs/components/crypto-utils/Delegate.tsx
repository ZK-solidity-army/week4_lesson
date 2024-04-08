"use client";

import Link from "next/link";
import { useState } from "react";
import * as chains from "viem/chains";
import { useContractWrite, useWaitForTransaction } from "wagmi";

import deployedContracts from "~~/contracts/deployedContracts";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

type TypedError = Error & { shortMessage: string };

export default function Delegate({
  address,
  myTokenAddress,
}: {
  address: `0x${string}`;
  myTokenAddress: `0x${string}`;
}) {
  const [tokenAddress, setTokenAddress] = useState("");
  const { data, isError, isSuccess, isLoading, write, error } = useContractWrite({
    address: myTokenAddress,
    abi: deployedContracts[chains.sepolia.id]["MyToken"].abi,
    functionName: "delegate",
  });
  const typedError = error as TypedError;

  const onSubmit = () => {
    if (!tokenAddress) return;
    write({
      args: [tokenAddress],
    });
  };

  return (
    <div className="card bg-primary text-primary-content mt-2 pb-2">
      <div className="card-body">
        <h2 className="card-title">Delegate</h2>
        <div className="form-control w-full my-1">
          <label className="label">
            <span className="label-text">Enter wallet address to delegate votes:</span>
          </label>
          <input
            type="text"
            placeholder="0x12345.....12345"
            className="input input-bordered w-full"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
          />
        </div>
        <button className="btn btn-active btn-neutral" onClick={() => setTokenAddress(address)}>
          Or paste your address
        </button>
        <button className="btn btn-active btn-neutral" onClick={onSubmit}>
          Delegate votes
        </button>
        <p className="h-5 my-1">
          {isLoading && <p className="my-auto">🟡 Delegating voting power...</p>}
          {isError && <div>🛑 Error sending transaction: {typedError ? typedError.shortMessage : ""}</div>}
        </p>
        {isSuccess && data && data.hash && (
          <p className="mt-5 mb-2">
            <Transaction txHash={data.hash as `0x${string}`} />
          </p>
        )}
      </div>
    </div>
  );
}

const Transaction = ({ txHash }: { txHash: `0x${string}` }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useWaitForTransaction({
    chainId: chains.sepolia.id,
    hash: txHash,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  return (
    <Link target="_blank" href={getBlockExplorerTxLink(chains.sepolia.id, txHash)} className="whitespace-nowrap">
      {isSuccess ? "✅ " : "⏳ "} {truncate(txHash, 30)}
    </Link>
  );
};

// TODO: move to utils or use lodash
const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
