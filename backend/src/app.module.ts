import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './services/app';
import { MyTokenService } from './services/myToken';
import { TokenizedBallotService } from './services/tokenizedBallot';

import { AppController } from './controllers/app';
import { MyTokenController } from './controllers/myToken';
import { TokenizedBallotController } from './controllers/tokenizedBallot';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MyTokenController, TokenizedBallotController],
  providers: [AppService, MyTokenService, TokenizedBallotService],
})
export class AppModule {}
