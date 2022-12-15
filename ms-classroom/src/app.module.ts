import { Module } from '@nestjs/common';
import { HttpModule } from './providers/http/http.module';
import { DatabaseModule } from './providers/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MessagingModule } from './providers/messaging/messaging.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
