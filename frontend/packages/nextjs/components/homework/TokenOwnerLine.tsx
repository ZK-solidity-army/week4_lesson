import { useState } from "react";
import { backend_base_uri } from "~~/components/api/utils/variables";

export default function TokenOwnerLine(props: {
  owner: { wallet: string; nbTokens: number };
  currentUserWallet: string | undefined;
}) {
  return (
    <div>
      {props.owner.wallet} - {props.owner.nbTokens}{" "}
      {props.owner.wallet === props.currentUserWallet ? (
        <DelegateButton address={props.owner.wallet} nbTokens={props.owner.nbTokens} />
      ) : null}
    </div>
  );
}

function DelegateButton(params: { address: string; nbTokens: number }) {
  const [data, setData] = useState<{ result: boolean }>();
  const [isLoading, setLoading] = useState(false);
  const body = { address: params.address, nbTokens: params.nbTokens };

  if (isLoading) return <p>Delegating</p>;
  if (!data)
    return (
      <button
        className="btn btn-active btn-neutral"
        onClick={() => {
          setLoading(true);
          fetch(`${backend_base_uri}/delegate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
            .then(res => res.json())
            .then(data => {
              setData(data);
              setLoading(false);
            });
        }}
      >
        Self delegate
      </button>
    );

  return (
    <div>
      <p>Result from API: {data.result ? "✅ delegated" : "🛑 failed"}</p>
    </div>
  );
}
