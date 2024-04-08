import { API_URL } from "../config";

export const getTokenizedBallotContractAddress = async () => {
  const res = await fetch(`${API_URL}/tokenized-ballot/contract-address`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
