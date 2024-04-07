import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import * as chains from 'viem/chains';

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
    const deployerPrivateKey = this.configService.get<string>(
      'DEPLOYER_PRIVATE_KEY',
    );
    this.walletClient = createWalletClient({
      account: privateKeyToAccount(`0x${deployerPrivateKey}`),
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
      chain: chains.sepolia,
    });
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

  getServerWalletAddress() {
    return this.walletClient.account.address;
  }
}
