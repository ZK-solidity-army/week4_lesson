import { useBalance } from "wagmi";

export function WalletBalance({ address }: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({ address });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Wallet Balance</h2>
        <p>
          {data?.formatted} {data?.symbol}
        </p>
      </div>
    </div>
  );
}
