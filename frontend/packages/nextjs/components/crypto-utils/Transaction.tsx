import { useState } from "react";
import Link from "next/link";
import * as chains from "viem/chains";
import { useWaitForTransaction } from "wagmi";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

export default function Transaction({ txHash }: { txHash: `0x${string}` }) {
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
}

const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
