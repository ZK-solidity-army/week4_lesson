import * as chains from "viem/chains";
import { createPublicClient, http } from "viem";

import deployedContracts from "~~/contracts/deployedContracts";

export const publicClient = createPublicClient({
  chain: chains.sepolia,
  transport: http("https://sepolia.drpc.org"),
});

export const isWalletMinter = async (address: string | undefined): Promise<boolean> => {
  // TODO:
  // needs to pass MyToken address, not deployer address
  // deployer address is not a smart ERC20 contract with AccessControl interface
  // so it leads to the error on frontend side
  // Fill free to remove this line
  // @gurobokum
  return false;
  const data = await publicClient.readContract({
    address: address as string,
    abi: deployedContracts[chains.sepolia.id]["MyToken"].abi,
    functionName: "MINTER_ROLE",
  });

  console.log("-------------- data: ", data);
  //FIXME: when data is correctly retrieved, check if the address has the MINTER ROLE
  return true || address === "da minter!";
};

export const getTokenOwners = (): { wallet: string; nbTokens: number }[] => {
  return [];
};
