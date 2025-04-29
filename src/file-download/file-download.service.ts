// src/file-download/file-download.service.ts
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { access, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { pipeline } from 'stream/promises';
import { firstValueFrom } from 'rxjs';
import * as puppeteer from 'puppeteer';

@Injectable()
export class FileDownloadService {
  private readonly logger = new Logger(FileDownloadService.name);
  constructor(private readonly httpService: HttpService) {}

  async downloadAndSaveChart(): Promise<string> {
    const url =
      'https://mooreapps.com.ve/MooreAppBackEnd/VisualizeData/ColumnChart';
    const assetsPath = join(process.cwd(), 'assets');
    //const filename = `chart-${uuidv4()}.png`;
    const filename = `chart.png`;
    const filePath = join(assetsPath, filename);

    try {
      // Verificar o crear directorio assets
      await this.ensureDirectoryExists(assetsPath);

      // Descargar la imagen
      /*const response = await this.httpService.axiosRef({
        url,
        method: 'GET',
        responseType: 'stream',
      });*/

      // Guardar el archivo

      await this.convertUrlToPng(url, filePath);

      return filename;
    } catch (error) {
      throw new HttpException(
        `Error al descargar la imagen: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async convertUrlToPng(url: string, filePath: string): Promise<void> {
    try {
      this.logger.log(`Iniciando la conversión de la URL: ${url} a PNG`);

      // 1. Lanzar el navegador
      this.logger.log(`1. Lanzanco el navegador`);
      const browser = await puppeteer.launch();

      // 2. Crear una página
      this.logger.log(`2. Creando la pagina`);
      const page = await browser.newPage();

      // 3. Navegar a una URL
      this.logger.log(`3. navegar a la url ${url}`);
      await page.goto(url);
      // 5. Tomar screenshot y guardar
      this.logger.log(`4. Tomando captura de pantalla`);

      await page.screenshot({
        path: filePath,
        fullPage: true,
        type: 'png',
      });

      this.logger.log(`Captura de pantalla tomada exitosamente.`);
      // 5. Cerrar el navegador
      await browser.close();
      this.logger.log(`Navegador cerrado.`);
    } catch (error) {
      this.logger.error(`Error al convertir la URL ${url} a PNG:`, error);
    }
  }

  private async ensureDirectoryExists(path: string): Promise<void> {
    try {
      await access(path);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(path, { recursive: true });
        return;
      }
      throw error;
    }
  }
}
