import { useEffect, useState } from "react";
import * as API from "~~/api/TokenizedBallot";

export const useTokenizedBallot = () => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  useEffect(() => {
    API.getTokenizedBallotContractAddress()
      .then(res => {
        setContractAddress(res.result);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    contractAddress,
    isLoading,
    isError,
  };
};
