import { Injectable } from '@nestjs/common';
import { createPublicClient, formatEther, http } from 'viem';
import * as chains from 'viem/chains';
import * as tokenJson from '../assets/MyToken.json';
import * as process from 'process';

@Injectable()
export class AppService {
  publicClient;

  constructor() {
    const rpcEndpointUrl = process.env.RPC_ENDPOINT_URL;
    const transport = http(rpcEndpointUrl);

    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: transport,
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
    return transactionReceipt;
  }
}
