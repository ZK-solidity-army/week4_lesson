import React, { useEffect, useState } from "react";
import { hexToString } from "viem";
import * as chains from "viem/chains";
import { useContractRead } from "wagmi";
import { ProposeButton } from "~~/components/api/ProposeButton";
import deployedContracts from "~~/contracts/deployedContracts";

export function Propositions({
  address,
  tokenizedBallotAddress,
}: {
  address: `0x${string}`;
  tokenizedBallotAddress: `0x${string}`;
}) {
  const [selectedProposal, setSelectedProposal] = useState("");
  const [amount, setAmount] = useState("");
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: deployedContracts[chains.sepolia.id]["TokenizedBallot"].abi,
    functionName: "getAllProposals",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No proposals found</div>;
  }

  const handleProposalChange = (e: any) => {
    setSelectedProposal(e.target.value);
  };

  return (
    <div className="card bg-primary text-primary-content mt-2">
      <div className="card-body">
        <h2 className="card-title">Choose proposition to vote</h2>
        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Select proposal:</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedProposal}
            onChange={handleProposalChange}
          >
            <option value="">Select a proposal</option>
            {data.map((proposal: { name: `0x${string}`; voteCount: bigint }, index) => {
              const name = hexToString(proposal.name, { size: 32 });
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-control w-full max-w-xs my-1">
          <label className="label">
            <span className="label-text">Enter amount of tokens to vote:</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <ProposeButton address={address} proposal={selectedProposal} amount={amount} />

        {isError && <div>Error signing message</div>}
      </div>
    </div>
  );
}
