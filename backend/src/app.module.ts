import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './services/app';
import { TokenizedBallotService } from './services/tokenizedBallot';

import { AppController } from './controllers/app';
import { TokenizedBallotController } from './controllers/tokenizedBallot';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TokenizedBallotController],
  providers: [AppService, TokenizedBallotService],
})
export class AppModule {}
