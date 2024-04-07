import { useEffect, useState } from "react";

import * as API from "~~/api/MyToken";
import Delegate from "~~/components/crypto-utils/Delegate";
import { Propositions } from "~~/components/crypto-utils/Propositions";

export default function TokenizedBallot({ address }: { address: `0x${string}` }) {
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

  if (!myTokenAddress) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/*
      <div className="grid w-1/3 card-body bg-base-300 rounded-box place-items-start">
        <span className="block text-2xl font-bold">Minted tokens</span>
        {tokenOwners.map(owner => (
          <TokenOwnerLine key={owner.wallet} owner={owner} currentUserWallet={address} />
        ))}
      </div>
      */}
      <div className="md:flex md:flex-row justify-between">
        <div className="my-3 sm:my-none sm:mr-3">
          <Delegate address={address as `0x${string}`} myTokenAddress={myTokenAddress} />
        </div>

        <div className="my-3 sm:my-none">
          <Propositions address={address as `0x${string}`} />
        </div>
      </div>
    </>
  );
}
