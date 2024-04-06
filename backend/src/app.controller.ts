import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contract-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  @Get('token-name')
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }

  @Get('total-supply')
  async getTotalSupply() {
    return { result: await this.appService.getTotalSupply() };
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return { result: await this.appService.getTokenBalance(address) };
  }

  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return { result: this.appService.getTransactionReceipt(hash) };
  }

  // MINT TOKENS
  // @Get('server-wallet-address')
  // getServerWalletAddress() {
  //   return { result: this.appService.getServerWalletAddress() };
  // }
  //
  // @Get('check-minter-role')
  // checkMinterRole(@Query('address') address: string) {
  //   return { result: await this.appService.checkMinterRole(address) };
  // }
  //
  // @Post('mint-tokens')
  // async mintTokens(@Body() body: any) {
  //   return { result: await this.appService.mintTokens(body.address) };
  // }
}
