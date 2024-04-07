import React, { useState } from 'react';
import { useSignMessage } from 'wagmi';
import { ProposeButton } from '~~/components/api/ProposeButton';

export function Propositions(params: { address: `0x${string}` }) {
  const [selectedProposal, setSelectedProposal] = useState('');
  const [amount, setAmount] = useState('');
  const { data, isError, isSuccess } = useSignMessage();

  const proposals = ['BTC', 'SOL', 'ETH', 'TON']; //TODO: propositions fetch from oracle? from backend?

  const handleProposalChange = (e: any) => {
    setSelectedProposal(e.target.value);
  };

  return (
    <div className="card w-96 bg-primary text-primary-content mt-2">
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
            {proposals.map((proposal, index) => (
              <option key={index} value={proposal}>{proposal}</option>
            ))}
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
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <ProposeButton
          address={params.address}
          proposal={selectedProposal}
          amount={amount}
        />

        {isSuccess && <div>Signature: {data}</div>}
        {isError && <div>Error signing message</div>}
      </div>
    </div>
  );
}