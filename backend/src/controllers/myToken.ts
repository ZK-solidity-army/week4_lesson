import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { isAddress, parseEther } from 'viem';

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
    // TODO: move to ValidationPipe
    if (!isAddress(body.address)) {
      throw new BadRequestException(`Invalid address ${body.address}`);
    }

    let amount: bigint;
    try {
      amount = parseEther(`${body.amount}`);
    } catch (e) {
      throw new BadRequestException(`Invalid amount ${body.amount}`);
    }

    return {
      result: await this.service.mintTokens(body.address, amount),
    };
  }
}
