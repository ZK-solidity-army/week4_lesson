import { useContractRead } from "wagmi";

export default function TokenBalance({
  address,
  myTokenAddress,
}: {
  address: `0x${string}`;
  myTokenAddress: `0x${string}`;
}) {
  const { data, isError, isLoading } = useContractRead({
    address: myTokenAddress,
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
    args: [address],
  });
  const balance = typeof data === "number" ? data : 0;
  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance {JSON.stringify(data)}</div>;

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Token Balance</h2>
        <p>{balance}</p>
      </div>
    </div>
  );
}
