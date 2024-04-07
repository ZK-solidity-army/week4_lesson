import { useBalance } from "wagmi";

export default function WalletBalance({ address }: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({ address });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div className="card min-w-42 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Wallet Balance</h2>
        <p className="h-5 my-1">
          {data?.formatted} <span className="font-bold">{data?.symbol}</span>
        </p>
      </div>
    </div>
  );
}
