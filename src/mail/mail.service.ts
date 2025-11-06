import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(to, subject, message) {
    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: message,
    });
  }
}
