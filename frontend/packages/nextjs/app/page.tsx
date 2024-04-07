// @formatter:off
"use client";

// @formatter:on
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import * as API from "~~/api/MyToken";
import { Delegate } from "~~/components/crypto-utils/Delegate";
import Mint from "~~/components/crypto-utils/Mint";
import { Propositions } from "~~/components/crypto-utils/Propositions";
import TokenBalance from "~~/components/crypto-utils/TokenBalance";
import { WalletBalance } from "~~/components/crypto-utils/WalletBalance";
import TokenOwnerLine from "~~/components/homework/TokenOwnerLine";
import { getTokenOwners, isWalletMinter } from "~~/utils/votingService";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [isMinter, setIsMinter] = useState(false);
  const tokenOwners: { wallet: string; nbTokens: number }[] = getTokenOwners();
  const [myTokenAddress, setMyTokenAddress] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    const resolveIsMinter = async () => {
      setIsMinter(await isWalletMinter(address));
    };
    resolveIsMinter();
  }, [isConnecting, address]);

  useEffect(() => {
    API.getMyTokenContractAddress()
      .then(res => {
        setMyTokenAddress(res.result);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // const data = publicClient
  //   .readContract({
  //     address: myTokenAddress as string,
  //     abi: abi,
  //     functionName: "MINTER_ROLE",
  //   })
  //   .then(response => response);
  //
  // console.log("-------data:", data);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {isMinter && (
          <>
            <div className="grid w-2/3 card-body bg-base-300 rounded-box place-items-start">
              <Mint address={address as `0x${string}`} />
            </div>
            <div className="divider" />
          </>
        )}

        {tokenOwners && (
          <>
            <div className="grid w-2/3 card-body bg-base-300 rounded-box place-items-start">
              <span className="block text-2xl font-bold">Minted tokens</span>
              {tokenOwners.map(owner => (
                <TokenOwnerLine key={owner.wallet} owner={owner} currentUserWallet={address} />
              ))}
            </div>
            <div className="divider" />
          </>
        )}

        <div className="grid w-2/3 card-body bg-base-300 rounded-box place-items-start">
          <span className="block text-2xl font-bold">Propositions</span>
          {(address && myTokenAddress) ||
            (true && (
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
            ))}

          {isConnecting && (
            <div>
              <p>Loading...</p>
            </div>
          )}
          {isDisconnected && (
            <div>
              <p>Wallet disconnected. Connect wallet to continue</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
