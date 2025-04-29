// src/file-download/file-download.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FileDownloadService } from './file-download.service';

@Controller('chart')
export class FileDownloadController {
  constructor(private readonly fileDownloadService: FileDownloadService) {}

  @Get('download')
  async downloadChart() {
    const filename = await this.fileDownloadService.downloadAndSaveChart();
    return {
      message: 'Imagen descargada exitosamente',
      filename,
      path: `/assets/${filename}`,
    };
  }
}
