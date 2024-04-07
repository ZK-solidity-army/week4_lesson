import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TokenizedBallotService } from 'src/services/tokenizedBallot';

@ApiTags('tokenizedBallot')
@Controller('tokenized-ballot')
export class TokenizedBallotController {
  constructor(private readonly service: TokenizedBallotService) {}

  @Get('contract-address')
  getContractAddress() {
    return { result: this.service.getContractAddress() };
  }
}
