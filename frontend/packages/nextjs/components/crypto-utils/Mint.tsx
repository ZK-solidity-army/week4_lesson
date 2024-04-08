"use client";

import { useState } from "react";
import Link from "next/link";
import * as chains from "viem/chains";
import { useSignMessage, useWaitForTransaction } from "wagmi";

import * as API from "~~/api/MyToken";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

export default function Mint({ address }: { address: `0x${string}` }) {
  const [amount, setAmount] = useState<string>("");
  const [txHashes, setTxHashes] = useState<`0x${string}`[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { data, isError, isSuccess } = useSignMessage();
  const [requestError, setRequestError] = useState<string | null>(null);

  const onClick = async () => {
    if (!amount) return;

    setLoading(true);
    setRequestError(null);
    const res = await API.mintTokens({ address, amount });
    if (res.result) {
      setTxHashes([...txHashes, res.result]);
    }
    if (res.error && res.message) {
      setRequestError(res.message);
    }
    setLoading(false);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError(null);
    setAmount(e.target.value);
  };

  return (
    <div className="card bg-primary text-primary-content mt-2">
      <div className="card-body">
        <h2 className="card-title">Mint tokens</h2>
        <label className="label">
          <span className="label-text">Enter amount of tokens:</span>
        </label>
        <div className="flex flex-row items-center">
          <div className="w-56 my-1">
            <input
              type="text"
              placeholder="123456..."
              className="input input-bordered w-full max-w-xs"
              value={amount}
              onChange={onChange}
            />
          </div>
          <div className="ml-4">
            <button className="btn btn-active btn-neutral" onClick={onClick}>
              Mint Tokens
            </button>
          </div>
        </div>
        <div>
          {isSuccess && <div className="ml-2">Signature: {data}</div>}
          {isError && <div className="ml-2">Error signing message</div>}
          <p className="h-5 my-1">
            {isLoading && <p className="my-auto">🟡 Requesting tokens from API...</p>}
            {requestError && <p className="my-auto">🛑 {requestError}</p>}
          </p>
          {txHashes.length ? (
            <div>
              <ul className="mt-5 mb-2">
                {txHashes.map((txHash: string) => (
                  <li key={txHash}>
                    <Transaction txHash={txHash as `0x${string}`} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
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
    <Link target="_blank" href={getBlockExplorerTxLink(chains.sepolia.id, txHash)}>
      {isSuccess ? "✅ " : "⏳ "} {truncate(txHash, 30)}
    </Link>
  );
};

const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
