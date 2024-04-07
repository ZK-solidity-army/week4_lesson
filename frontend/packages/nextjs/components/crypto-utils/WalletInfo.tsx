// @formatter:off
"use client";

// @formatter:on
import { useAccount } from 'wagmi';
import { Delegate } from '~~/components/crypto-utils/Delegate';
import { Propositions } from '~~/components/crypto-utils/Propositions';

export function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (address)
    return (
      <div className="flex flex-col">
        {/* Wallet Information */}
        <div className="w-full md:w-full lg:w-1/3 mb-4">
          {/*<WalletBalance address={address as `0x${string}`} />*/}
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="mb-4 md:mb-0 md:mr-4">
            <Delegate address={address as `0x${string}`} />
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
