"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Delegate } from "~~/components/crypto-utils/Delegate";
import { Propositions } from "~~/components/crypto-utils/Propositions";

import * as API from "~~/api/MyToken";
import TokenBalance from "./TokenBalance";
import { WalletBalance } from "./WalletBalance";

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
      <div>
        <div className="w-full mb-4">
          <WalletBalance address={address as `0x${string}`} />
          <TokenBalance address={address as `0x${string}`} myTokenAddress={myTokenAddress} />
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="mb-4 md:mb-0 md:mr-4">
            <Delegate address={address as `0x${string}`} myTokenAddress={myTokenAddress} />
          </div>

          <div className="mb-4 md:mb-0">
            <Propositions address={address as `0x${string}`} />
          </div>
        </div>
      </div>
    );

  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}
