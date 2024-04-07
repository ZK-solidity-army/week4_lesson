import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenizedBallotService {
  contractAddress: `0x${string}`;

  constructor(private readonly configService: ConfigService) {
    this.configService = configService;
    this.contractAddress = this.configService.get<`0x${string}`>(
      'TOKENIZED_BALLOT_ADDRESS',
    );
  }

  getContractAddress(): `0x${string}` {
    return this.contractAddress;
  }
}
