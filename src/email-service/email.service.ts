import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { emailHtmlContent } from 'src/utils/EmailHtmlContent';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async generateEmail(toEmail: string, password: string) {
    try {
      return await this.mailService.sendMail({
        to: toEmail,
        from:'l.yordanov@deafor.com',
        subject: 'About your Registration',
        html: emailHtmlContent(password)
      });
    }
    catch (e) {
      console.log(e);
      
    }
    
}
}