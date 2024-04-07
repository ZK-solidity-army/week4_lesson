import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicClient, createWalletClient, http } from 'viem';
import * as chains from 'viem/chains';

@Injectable()
export class TokenizedBallotService {
  publicClient: any;
  walletClient: any;
  contractAddress: `0x${string}`;

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
    this.contractAddress = `0x${this.configService.get<string>(
      'TOKENIZED_BALLOT_ADDRESS',
    )}`;
  }

  getContractAddress(): `0x${string}` {
    return this.contractAddress;
  }
}
