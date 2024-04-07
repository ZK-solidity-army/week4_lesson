// @formatter:off
"use client";

// @formatter:on

import { WalletInfo } from '../components/crypto-utils/WalletInfo';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import TokenOwnerLine from '~~/components/homework/TokenOwnerLine';
import { getTokenOwners, isWalletMinter } from '~~/utils/votingService';
import { Mint } from '~~/components/crypto-utils/Mint';

const Home: NextPage = () => {
  const { address, isConnecting } = useAccount();
  const [isMinter, setIsMinter] = useState(false);
  const tokenOwners: { wallet: string; nbTokens: number }[] = getTokenOwners();

  useEffect(() => {
    setIsMinter(isWalletMinter(address));
  }, [isConnecting, address]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {isMinter && (
          <div className="grid w-1/3 card-body bg-base-300 rounded-box place-items-start">
            <span className="block text-2xl font-bold">Mint new tokens</span>
            <Mint address={address as `0x${string}`} />
          </div>
        )}
        {isMinter && <div className="divider" />}
        <div className="grid w-1/3 card-body bg-base-300 rounded-box place-items-start">
          <span className="block text-2xl font-bold">Minted tokens</span>
          {tokenOwners.map(owner => (
            <TokenOwnerLine key={owner.wallet} owner={owner} currentUserWallet={address} />
          ))}
        </div>
        <div className="divider" />
        <div className="grid w-2/3 card-body bg-base-300 rounded-box place-items-start">
          <span className="block text-2xl font-bold">Propositions</span>
          {/*  TODO: list the propositions and add voting button*/}
          <WalletInfo />
        </div>
      </div>
    </>
  );
};

export default Home;
