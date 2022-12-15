import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get('KAFKA_CLIENT_ID'),
        brokers: [configService.get('KAFKA_BROKERS')],
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log('[CONSUMER] Microservice is listening...');
  });

  app.listen(3334).then(() => {
    console.log('[HTTP] Server is listening...');
  });
}
bootstrap();
