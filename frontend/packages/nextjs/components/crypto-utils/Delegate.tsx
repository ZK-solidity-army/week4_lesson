// @formatter:off
"use client"
// @formatter:on
import {useState} from "react";
import {useSignMessage} from "wagmi";

export function Delegate() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [proposalInput, setProposalInput] = useState("");
    const [amountToVote, setAmountToVote] = useState("");
    const {data, isError, isLoading, isSuccess, signMessage} = useSignMessage();
    return (
        <div className="card w-96 bg-primary text-primary-content mt-2">
            <div className="card-body">
                <h2 className="card-title">Delegate</h2>
                <div className="form-control w-full max-w-xs my-1">
                    <label className="label">
                        <span className="label-text">Enter tokenized ballot CA:</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        value={tokenAddress}
                        onChange={e => setTokenAddress(e.target.value)}
                    />
                </div>
                <div className="form-control w-full max-w-xs my-1">
                    <label className="label">
                        <span className="label-text">Enter proposal:</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        value={proposalInput}
                        onChange={e => setProposalInput(e.target.value)}
                    />
                </div>
                <div className="form-control w-full max-w-xs my-1">
                    <label className="label">
                        <span className="label-text">Enter amount of tokens to vote:</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        value={amountToVote}
                        onChange={e => setAmountToVote(e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-active btn-neutral"
                    disabled={isLoading}
                    onClick={() =>
                        signMessage({
                            message: tokenAddress,
                        })
                    }
                >
                    Sign message
                </button>
                {isSuccess && <div>Signature: {data}</div>}
                {isError && <div>Error signing message</div>}
            </div>
        </div>
    );
}