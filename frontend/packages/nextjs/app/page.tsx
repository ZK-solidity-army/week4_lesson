// @formatter:off
"use client";

// @formatter:on

import { useEffect, useReducer, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

import Mint from "~~/components/crypto-utils/Mint";
import TokenizedBallot from "~~/components/crypto-utils/TokinizedBallot";
import { WalletInfo } from "~~/components/crypto-utils/WalletInfo";
import { isWalletMinter } from "~~/utils/votingService";

const Home: NextPage = () => {
  const { address, isConnecting } = useAccount();
  const [isMinter, setIsMinter] = useState(false);

  useEffect(() => {
    const resolveIsMinter = async () => {
      setIsMinter(await isWalletMinter(address));
    };
    resolveIsMinter();
  }, [isConnecting, address]);

  // https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
  // workaround to force update component
  // because there is no global state
  // TODO: get rid of this
  const [, forceUpdate] = useReducer(x => x + 1, 0);

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
      <div className="mt-10">
        <div className="sm:w-full lg:w-1/2 mx-auto min-w-56">
          <div className="mx-5">
            <WalletInfo />
          </div>
        </div>

        {/*
        // TODO: @gurobokum
        // temporary making every user as minter for testing purposes
        // so the user has opportunity to mint tokens via backend in playground
        // fill free to remove
        */}
        {!isMinter && address && (
          <div>
            <div className="divider" />
            <div className="sm:w-full lg:w-1/2 mx-auto min-w-56">
              <div className="mx-5 text-center">
                <button className="btn btn-active btn-neutral" onClick={() => setIsMinter(true)}>
                  Become a minter. Magic! ✨
                </button>
              </div>
            </div>
          </div>
        )}

        {isMinter && address && (
          <div>
            <div className="divider" />
            <div className="sm:w-full lg:w-1/2 mx-auto min-w-56">
              <div className="mx-5">
                <Mint address={address as `0x${string}`} forceUpdate={forceUpdate} />
              </div>
            </div>
          </div>
        )}

        {address && (
          <>
            <div className="divider" />
            <div className="sm:w-full lg:w-1/2 mx-auto min-w-56">
              <div className="mx-5">
                <TokenizedBallot address={address as `0x${string}`} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
