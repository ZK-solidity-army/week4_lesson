import {TokenName} from "./TokenName";
import {TokenBalance} from "./TokenBalance";

export function TokenInfo(params: { address: `0x${string}` }) {
    return (
        <div className="card w-96 bg-primary text-primary-content mt-4">
            <div className="card-body">
                <h2 className="card-title">Testing useContractRead wagmi hook</h2>
                <TokenName></TokenName>
                <TokenBalance address={params.address}></TokenBalance>
            </div>
        </div>
    );
}