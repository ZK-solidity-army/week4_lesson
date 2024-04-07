"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import * as API from "~~/api/MyToken";
import TokenBalance from "~~/components/crypto-utils/TokenBalance";
import WalletBalance from "~~/components/crypto-utils/WalletBalance";

export function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [myTokenAddress, setMyTokenAddress] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    API.getMyTokenContractAddress()
      .then(res => {
        setMyTokenAddress(res.result);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (address && myTokenAddress)
    return (
      <div className="sm:flex sm:flex-row justify-between">
        <div className="my-3 sm:my-none">
          <WalletBalance address={address as `0x${string}`} />
        </div>
        <div className="my-3 sm:my-none">
          <TokenBalance address={address as `0x${string}`} myTokenAddress={myTokenAddress} />
        </div>
      </div>
    );

  if (isConnecting)
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div className="text-center">
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div className="text-center">
      <p>Connect wallet to continue</p>
    </div>
  );
}
