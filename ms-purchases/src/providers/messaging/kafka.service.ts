import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

import { KafkaTopics } from './kafka-topics';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    super({
      client: {
        clientId: configService.get('KAFKA_CLIENT_ID'),
        brokers: [configService.get('KAFKA_BROKERS')],
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    });
  }

  public topics = KafkaTopics;

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
