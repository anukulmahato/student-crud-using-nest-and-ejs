import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, MailService],
})
export class StudentModule {}
