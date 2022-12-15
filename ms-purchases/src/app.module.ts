import { Module } from '@nestjs/common';
import { HttpModule } from './providers/http/http.module';
import { DatabaseModule } from './providers/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
