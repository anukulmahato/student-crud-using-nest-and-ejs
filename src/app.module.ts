import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'developeranukul@gmail.com',
          pass: 'myqm folj sebh tcgu',
        },
      },
      defaults: {},
    }),
    StudentModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
