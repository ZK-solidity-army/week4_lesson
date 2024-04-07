export const isWalletMinter = (address: string | undefined): boolean => {
  // TODO: from the token contract read add accounts that have MINTER_ROLE and check if the passed address is in the list
  return true || address === "da minter!";
};

export const getTokenOwners = (): { wallet: string; nbTokens: number }[] => {
  return [];
};
