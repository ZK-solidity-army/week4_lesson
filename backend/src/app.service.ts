import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
} from 'viem';
import * as chains from 'viem/chains';

import * as tokenJson from '../assets/MyToken.json';

@Injectable()
export class AppService {
  publicClient: any;
  walletClient: any;

  constructor(private readonly configService: ConfigService) {
    this.configService = configService;

    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });
    this.walletClient = createWalletClient({
      key: this.configService.get<string>('DEPLOYER_PRIVATE_KEY'),
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
      chain: chains.sepolia,
    });
  }

  checkMinterRole(address: string) {
    throw new Error(`${address} Method not implemented.`);
  }

  getContractAddress(): string {
    return this.configService.get<string>('MY_TOKEN_ADDRESS');
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

  mintTokens(address: any) {
    return `Minting tokens for ${address}`;
  }

  async getServerWalletAddress() {
    return this.walletClient.account ? this.walletClient.account.address : '';
  }

  async getTokenName() {
    return await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: 'name',
    });
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

  async getTotalSupply() {
    const totalSupply = await this.publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson.abi,
      functionName: 'totalSupply',
    });
    return formatEther(totalSupply as bigint);
  }
}
