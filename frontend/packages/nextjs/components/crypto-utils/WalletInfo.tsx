// @formatter:off
"use client";

// @formatter:on
import { TokenInfo } from './TokenInfo';
import { WalletBalance } from './WalletBalance';
import { useAccount, useNetwork } from 'wagmi';
import { Delegate } from '~~/components/crypto-utils/Delegate';
import { Mint } from '~~/components/crypto-utils/Mint';
import { Votes } from '~~/components/crypto-utils/Votes';

export function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  if (address)
    return (
      <div>
        <p>Your wallet: {address}</p>
        <p>Chain: {chain?.name}</p>
        <WalletBalance address={address as `0x${string}`}></WalletBalance>
        <Mint address={address as `0x${string}`}></Mint>
        <Votes address={address as `0x${string}`}></Votes>
        <Delegate address={address as `0x${string}`}></Delegate>
        <TokenInfo address={address as `0x${string}`}></TokenInfo>

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
