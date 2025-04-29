import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './services/email/email.service';
import { SendEmailDto } from './dtos/send-email.dto';
import { FileDownloadService } from 'src/file-download/file-download.service';

@Controller('api/email')
export class EmailController {
  constructor(
    private emailService: EmailService,
    private readonly fileDownloadService: FileDownloadService,
  ) {}

  @Get('send-emails-helpDesk')
  async sendEmails(@Res() res: Response) {
    try {
      const idFiles = ['hvenezue.id', 'RRHH'];
      const response = await this.emailService.sendEmails(idFiles);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('find-all')
  async findAll(@Res() res: Response) {
    try {
      const response = await this.emailService.findAll();
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Get('health')
  async healthCheck(@Res() res: Response) {
    try {
      const response = await this.emailService.healthCheck();
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('send-email')
  async sendEmail(@Body() body: SendEmailDto, @Res() res: Response) {
    try {
      const response = await this.emailService.sendEmail(body);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }
  @Post('send-email-atach')
  async sendEmailAtach(@Body() body: SendEmailDto, @Res() res: Response) {
    try {
      const filename = await this.fileDownloadService.downloadAndSaveChart();
      const response = await this.emailService.sendEmailWithAtach(body);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.log('error en send-email-atach:', error);
      throw error;
    }
  }
}
