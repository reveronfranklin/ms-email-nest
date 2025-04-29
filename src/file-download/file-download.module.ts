// file-download.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FileDownloadService } from './file-download.service';
import { FileDownloadController } from './file-download.controller';

@Module({
  imports: [HttpModule],
  controllers: [FileDownloadController],
  providers: [FileDownloadService],
  exports: [FileDownloadService],
})
export class FileDownloadModule {}
