import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { parseEther } from 'viem';

import { MyTokenService } from '../services/myToken';
import { MintTokenDto } from '../dtos/mintToken.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MyToken')
@Controller('my-token')
export class MyTokenController {
  constructor(private readonly service: MyTokenService) {}

  @Get('contract-address')
  getContractAddress() {
    return { result: this.service.getContractAddress() };
  }

  @Get('token-name')
  async getTokenName() {
    return { result: await this.service.getTokenName() };
  }

  @Get('total-supply')
  async getTotalSupply() {
    return { result: await this.service.getTotalSupply() };
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return { result: await this.service.getTokenBalance(address) };
  }

  @Get('check-minter-role')
  checkMinterRole() {
    return { result: this.service.checkMinterRole() };
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return {
      result: this.service.mintTokens(
        body.address,
        parseEther(`${body.amountToMint}`),
      ),
    };
  }
}
