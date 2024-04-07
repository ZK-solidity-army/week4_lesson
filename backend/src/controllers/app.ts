import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from '../services/app';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return { result: await this.appService.getTransactionReceipt(hash) };
  }

  @Get('server-wallet-address')
  getServerWalletAddress() {
    return { result: this.appService.getServerWalletAddress() };
  }
}
