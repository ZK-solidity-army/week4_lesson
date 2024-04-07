import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const allowedOrigins = configService.get<string[]>('ALLOWED_HOSTS');
  app.enableCors({
    origin: allowedOrigins,
  });

  const config = new DocumentBuilder()
    .setTitle('TokenizedBallot API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('tokenizedBallot')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
