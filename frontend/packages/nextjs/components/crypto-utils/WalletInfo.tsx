// @formatter:off
"use client";

// @formatter:on
import { WalletBalance } from './WalletBalance';
import { useAccount, useNetwork } from 'wagmi';
import { Delegate } from '~~/components/crypto-utils/Delegate';
import { Mint } from '~~/components/crypto-utils/Mint';
import { Propositions } from '~~/components/crypto-utils/Propositions';

{/*TODO: if we need to show Winning propositions f.e.}
        <TokenInfo address={address as `0x${string}`}></TokenInfo>*/
}

export function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  if (address)
    return (
      <div className="flex flex-col">
        {/* Wallet Information */}
        <div className="w-full md:w-full lg:w-1/3 mb-4">
          <p>Your wallet: {address}</p>
          <p>Chain: {chain?.name}</p>
          <WalletBalance address={address as `0x${string}`} />
        </div>
        {/* Delegation, Minting, and Propositions */}
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="mb-4 md:mb-0 md:mr-4">
            <Delegate address={address as `0x${string}`} />
          </div>
          <div className="mb-4 md:mb-0 md:mr-4">
            <Mint address={address as `0x${string}`} />
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
