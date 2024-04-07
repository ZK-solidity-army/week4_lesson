import { API_URL } from "../config";

export const mintTokens = async ({ address, amount }: { address: `0x${string}`; amount: string }) => {
  const res = await fetch(`${API_URL}/my-token/mint-tokens`, {
    method: "POST",
    body: JSON.stringify({ address, amount }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
