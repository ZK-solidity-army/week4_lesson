import * as chains from "viem/chains";
import { useContractRead } from "wagmi";

import deployedContracts from "~~/contracts/deployedContracts";

export default function TokenBalance({
  address,
  myTokenAddress,
}: {
  address: `0x${string}`;
  myTokenAddress: `0x${string}`;
}) {
  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Token Balance</h2>
        <p className="h-5 my-1">
          <BalanceNode address={address} myTokenAddress={myTokenAddress} />
        </p>
      </div>
    </div>
  );
}

const BalanceNode = ({ address, myTokenAddress }: { address: `0x${string}`; myTokenAddress: `0x${string}` }) => {
  const { balance, symbol, decimals, isLoading, isError } = useFormatedBalance(myTokenAddress, address);

  if (isLoading) return <p className="my-auto">Fetching balance…</p>;
  if (isError) return <p className="my-auto">🛑 Error fetching balance</p>;

  let balanceFormatted = "0";
  if (balance && decimals) {
    balanceFormatted = (balance / BigInt(10 ** decimals)).toString();
  }

  return (
    <span>
      {balanceFormatted}&nbsp;<span className="font-bold">{symbol}</span>
    </span>
  );
};

const useFormatedBalance = (myTokenAddress: `0x${string}`, address: `0x${string}`) => {
  const {
    data: balance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useTokenBalance(myTokenAddress, address);
  const { data: symbol, isError: isSymbolError, isLoading: isSymbolLoading } = useTokenSymbol(myTokenAddress);
  const { data: decimals, isError: isDecimalsError, isLoading: isDecimalsLoading } = useTokenDecimals(myTokenAddress);

  return {
    balance,
    symbol,
    decimals,
    isLoading: isBalanceLoading || isSymbolLoading || isDecimalsLoading,
    isError: isBalanceError || isSymbolError || isDecimalsError,
  };
};

const useTokenSymbol = (myTokenAddress: `0x${string}`) => {
  const { data, isError, isLoading } = useContractRead({
    address: myTokenAddress,
    abi: deployedContracts[chains.sepolia.id]["MyToken"].abi,
    functionName: "symbol",
  });

  return { data, isError, isLoading };
};

const useTokenBalance = (myTokenAddress: `0x${string}`, address: `0x${string}`) => {
  const { data, isError, isLoading } = useContractRead({
    address: myTokenAddress,
    abi: deployedContracts[chains.sepolia.id]["MyToken"].abi,
    functionName: "balanceOf",
    args: [address],
  });

  return { data, isError, isLoading };
};

const useTokenDecimals = (myTokenAddress: `0x${string}`) => {
  const { data, isError, isLoading } = useContractRead({
    address: myTokenAddress,
    abi: deployedContracts[chains.sepolia.id]["MyToken"].abi,
    functionName: "decimals",
  });
  return { data, isError, isLoading };
};
