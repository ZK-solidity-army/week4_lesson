import { useState } from 'react';
import { backend_base_uri } from '~~/components/api/utils/variables';

export function MintButton(params: { address: `0x${string}`; amount: string; }) {
  const [data, setData] = useState<{ result: boolean }>();
  const [isLoading, setLoading] = useState(false);
  const { address, amount } = params;
  const body = {
    address: address,
    amount: amount,
  };

  if (isLoading) return <p>Requesting tokens from API...</p>;
  if (!data)
    return (
      <button
        className="btn btn-active btn-neutral"
        onClick={() => {
          setLoading(true);
          fetch(`${backend_base_uri}/mint-tokens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((responseData) => {
              setData(responseData);
              setLoading(false);
            });
        }}
      >
        Mint Tokens
      </button>
    );

  return (
    <div>
      <p>Result from API: {data.result
        ? '✅ success'
        : '🛑 failed'}</p>
    </div>
  );
}
