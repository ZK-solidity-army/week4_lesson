import React, { useCallback, useState } from "react";
import { hexToString, parseEther } from "viem";
import * as chains from "viem/chains";
import { useContractRead, useContractWrite } from "wagmi";
import Transaction from "~~/components/crypto-utils/Transaction";
import deployedContracts from "~~/contracts/deployedContracts";

type TypedError = Error & { shortMessage: string };

export function Propositions({ tokenizedBallotAddress }: { tokenizedBallotAddress: `0x${string}` }) {
  const [selectedProposal, setSelectedProposal] = useState("0");
  const [amount, setAmount] = useState("");
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: deployedContracts[chains.sepolia.id]["TokenizedBallot"].abi,
    functionName: "getAllProposals",
    watch: true,
  });
  // TODO: retrieve decimals from contract
  const decimals = 18n;

  const {
    write: vote,
    data: voteData,
    isLoading: isVoting,
    isSuccess,
    error,
  } = useContractWrite({
    address: tokenizedBallotAddress,
    abi: deployedContracts[chains.sepolia.id]["TokenizedBallot"].abi,
    functionName: "vote",
  });

  const typedError = error as TypedError;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedProposal(e.target.value);
    },
    [setSelectedProposal],
  );

  const onSubmit = useCallback(() => {
    console.log("selectedProposal", selectedProposal);
    if (!amount) return;
    let parsedAmount = 0n;
    try {
      parsedAmount = parseEther(amount);
    } catch (e) {
      return;
    }

    vote({
      args: [BigInt(selectedProposal), parsedAmount],
    });
  }, [amount, selectedProposal, vote]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No proposals found</div>;
  }
  if (isError) {
    return <div>Error loading proposals</div>;
  }

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
            onChange={onChange}
            defaultValue={selectedProposal}
          >
            {data.map((proposal: { name: `0x${string}`; voteCount: bigint }, index) => {
              const name = hexToString(proposal.name, { size: 32 });
              return (
                <option key={index} value={index}>
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

        <button className="btn btn-active btn-neutral" onClick={onSubmit}>
          Vote
        </button>

        <p className="h-5 my-1">{isVoting && <p className="my-auto">🟡 Voting...</p>}</p>
        {typedError && <div>🛑 Error sending transaction: {typedError ? typedError.shortMessage : ""}</div>}
        {isSuccess && voteData && voteData.hash && (
          <p className="mt-5 mb-2">
            <Transaction txHash={voteData.hash as `0x${string}`} />
          </p>
        )}

        <div>
          <h2 className="card-title mt-5">Proposals</h2>
          {[...data]
            .sort((a, b) => {
              if (a > b) return 1;
              return -1;
            })
            .map((proposal: { name: `0x${string}`; voteCount: bigint }, index) => {
              const name = hexToString(proposal.name, { size: 32 });
              const voteCount = Number((proposal.voteCount * 1000n) / 10n ** decimals) / 1000;
              return (
                <div key={index} className="flex flex-row items-center">
                  <div className="w-56 my-1">{name}</div>
                  <div className="ml-4">{voteCount}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
