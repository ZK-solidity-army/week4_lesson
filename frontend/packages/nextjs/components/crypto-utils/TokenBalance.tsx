import {useContractRead} from "wagmi";

export function TokenBalance(params: { address: `0x${string}` }) {
    const {data, isError, isLoading} = useContractRead({
        address: "0x37dBD10E7994AAcF6132cac7d33bcA899bd2C660",
        abi: [
            {
                constant: true,
                inputs: [
                    {
                        name: "_owner",
                        type: "address",
                    },
                ],
                name: "balanceOf",
                outputs: [
                    {
                        name: "balance",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ],
        functionName: "balanceOf",
        args: [params.address],
    });
    const balance = typeof data === "number" ? data : 0;
    if (isLoading) return <div>Fetching balance…</div>;
    if (isError) return <div>Error fetching balance</div>;

    return <div>Balance: {balance}</div>;
}