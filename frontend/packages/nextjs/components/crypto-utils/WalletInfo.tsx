// @formatter:off
"use client"
// @formatter:on

import {useAccount, useNetwork} from "wagmi";
import {Votes} from "./Votes";
import {WalletBalance} from "./WalletBalance";
import {TokenInfo} from "./TokenInfo";
import {Mint} from "~~/components/crypto-utils/Mint";
import {Delegate} from "~~/components/crypto-utils/Delegate";

export function WalletInfo() {
    const {address, isConnecting, isDisconnected} = useAccount();
    const {chain} = useNetwork();
    if (address)
        return (
            <div>
                <p>Your account address is {address}</p>
                <p>Connected to the network {chain?.name}</p>
                <Mint></Mint>
                <Votes></Votes>
                <Delegate></Delegate>
                <WalletBalance address={address as `0x${string}`}></WalletBalance>
                <TokenInfo address={address as `0x${string}`}></TokenInfo>
            </div>
        );
    if (isConnecting)
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    if (isDisconnected)
        return (
            <div>
                <p>Wallet disconnected. Connect wallet to continue</p>
            </div>
        );
    return (
        <div>
            <p>Connect wallet to continue</p>
        </div>
    );
}