import {useContractRead} from "wagmi";

const myTokenAddress = "0x8101b1ccc6829975e4ccf3a3525a689f4c564c72"

export function TokenName() {
    const {data, isError, isLoading} = useContractRead({
        address:`${myTokenAddress}`,
        abi: [
            {
                constant: true,
                inputs: [],
                name: "name",
                outputs: [
                    {
                        name: "",
                        type: "string",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ],
        functionName: "name",
    });

    const name = typeof data === "string" ? data : 0;

    if (isLoading) return <div>Fetching name…</div>;
    if (isError) return <div>Error fetching name</div>;
    return <div>Token name: {name}</div>;
}