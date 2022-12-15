import { Module } from '@nestjs/common';
import { CoursesService } from 'src/services/course.service';
import { EnrollmentsService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { DatabaseModule } from '../database/database.module';
import { PurchaseController } from './controllers/purchase.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentService, EnrollmentsService, CoursesService],
})
export class MessagingModule {}
