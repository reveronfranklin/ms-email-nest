import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './services/email/email.service';
import { Email } from './providers/email/email';
import { FileDownloadService } from 'src/file-download/file-download.service';
import { FileDownloadModule } from 'src/file-download/file-download.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEntity } from './entities/email.entity';
import { EmailMiSocio } from './providers/email/emailMisocio';

@Module({
  controllers: [EmailController],
  providers: [EmailService, Email, EmailMiSocio],
  imports: [FileDownloadModule, TypeOrmModule.forFeature([EmailEntity])],

  exports: [EmailService, Email],
})
export class EmailModule {}
