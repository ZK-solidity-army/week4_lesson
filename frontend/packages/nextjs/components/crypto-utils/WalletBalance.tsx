import {useBalance} from "wagmi";

export function WalletBalance(params: { address: `0x${string}` }) {
    const {data, isError, isLoading} = useBalance({
        address: params.address,
    });

    if (isLoading) return <div>Fetching balance…</div>;
    if (isError) return <div>Error fetching balance</div>;
    return (
        <div className="card w-96 bg-primary text-primary-content mt-4">
            <div className="card-body">
                <h2 className="card-title">Testing useBalance wagmi hook</h2>
                Balance: {data?.formatted} {data?.symbol}
            </div>
        </div>
    );
}