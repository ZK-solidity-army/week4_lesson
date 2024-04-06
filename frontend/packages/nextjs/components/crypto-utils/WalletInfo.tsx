// @formatter:off
"use client"
// @formatter:on

import {useAccount, useNetwork} from "wagmi";
import {WalletBalance} from "./WalletBalance";
import {TokenInfo} from "./TokenInfo";
import {ApiData} from "~~/components/api/ApiData";
import {Mint} from "~~/components/crypto-utils/Mint";
import {Votes} from "~~/components/crypto-utils/Votes";
import {Delegate} from "~~/components/crypto-utils/Delegate";

export function WalletInfo() {
    const {address, isConnecting, isDisconnected} = useAccount();
    const {chain} = useNetwork();
    if (address)
        return (
            <div>
                <p>Your wallet: {address}</p>
                <p>Chain: {chain?.name}</p>
                <WalletBalance address={address as `0x${string}`}></WalletBalance>
                <Mint></Mint>
                <Votes></Votes>
                <Delegate></Delegate>
                <TokenInfo address={address as `0x${string}`}></TokenInfo>
                <ApiData address={address as `0x${string}`}></ApiData>
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