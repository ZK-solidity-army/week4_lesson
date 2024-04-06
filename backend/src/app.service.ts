import { Injectable } from '@nestjs/common';
import { createPublicClient, createWalletClient, formatEther, http } from 'viem';
import * as chains from 'viem/chains';
import * as tokenJson from '../assets/MyToken.json';
import * as process from 'process';

@Injectable()
export class AppService {
  publicClient;
  walletClient;

  constructor() {
    const rpcEndpointUrl = process.env.RPC_ENDPOINT_URL;
    const transport = http(rpcEndpointUrl);

    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: transport,
    });
    this.walletClient = createWalletClient({
      chain: chains.sepolia,
      transport: http(process.env.PRIVATE_KEY),
    });
  }

  async getTokenName(): Promise<any> {
    return await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: 'name',
    });
  }

  getContractAddress(): string {
    return '0x8101b1ccc6829975e4ccf3a3525a689f4c564c72';
  }

  async getTotalSupply() {
    const totalSupply = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: 'totalSupply',
    });
    return formatEther(totalSupply as bigint);
  }

  async getTokenBalance(address: string) {
    const totalSupply = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: 'balanceOf',
      args: [address],
    });
    return formatEther(totalSupply as bigint);
  }

  getTransactionReceipt(hash: string) {
    const transactionReceipt = this.publicClient.getTransactionReceipt({
      hash: hash,
    });
    console.log({ transactionReceipt });
    transactionReceipt.blockNumber = transactionReceipt.blockNumber.toString();
    transactionReceipt.gasUsed = transactionReceipt.gasUsed.toString();
    transactionReceipt.cumulativeGasUsed =
      transactionReceipt.cumulativeGasUsed.toString();
    transactionReceipt.effectiveGasPrice =
      transactionReceipt.effectiveGasPrice.toString();
    return transactionReceipt;
  }

  async getServerWalletAddress() {
    return await this.walletClient.getAddress();
  }

  mintTokens(address: any) {
    return `Minting tokens for ${address}`;
  }

  checkMinterRole(address: string) {
    throw new Error(`${address} Method not implemented.`);
  }
}
