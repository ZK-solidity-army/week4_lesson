import { abi } from "../../hardhat/artifacts/contracts/MyToken.sol/MyToken.json";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://sepolia.drpc.org"),
});

export const isWalletMinter = async (address: string | undefined): Promise<boolean> => {
  const data = await publicClient.readContract({
    address: address as string,
    abi: abi,
    functionName: "MINTER_ROLE",
  });

  console.log("-------------- data: ", data);
  //FIXME: when data is correctly retrieved, check if the address has the MINTER ROLE
  return true || address === "da minter!";
};

export const getTokenOwners = (): { wallet: string; nbTokens: number }[] => {
  return [];
};
