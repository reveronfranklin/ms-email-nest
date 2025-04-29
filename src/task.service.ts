import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Email } from './email/providers/email/email';
import { SendEmailDto } from './email/dtos/send-email.dto';
import { FileDownloadService } from './file-download/file-download.service';
import { EmailService } from './email/services/email/email.service';
import { NotificacionEmailService } from './notificacion-email/notificacion-email.service';

const EVERY_MINUTE = '* * * * *';
const EVERY_DAY_AT_3AM = '0 3 * * *';
const EVERY_DAY_AT_MITNIGHT = '0 0 * * *';
const EVERY_AT_3_MINUTES = '*/3 * * * *';
const send_to = 'ld.graficasdiarias@moore.com.ve';
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private emailService: EmailService,
    private readonly fileDownloadService: FileDownloadService,
    private readonly notificacionEmailService: NotificacionEmailService,
  ) {}

  //@Cron(EVERY_AT_3_MINUTES) // ENVIA CORREO CADA 3 MINUTOS
  async handlerCronSendEmails() {
    this.logger.log(`Iniciando envio de Emails por lote`);
    const idFiles = ['hvenezue.id', 'RRHH'];
    await this.emailService.sendEmails(idFiles);
    this.logger.log(`Envio de Emails por lote culminado`);
  }
  @Cron(EVERY_AT_3_MINUTES) // ENVIA CORREO CADA 3 MINUTOS
  async handlerCronSendEmailsMiSocio() {
    this.logger.log(`Iniciando envio de Emails Mi Socio por lote`);
    const idFiles = ['misocio.id'];
    await this.emailService.sendEmailsMiSocio(idFiles);
    this.logger.log(`Envio de Emails Mi Socio por lote culminado`);
  }

  @Cron(EVERY_DAY_AT_MITNIGHT) // Todos Los dias a las 3am
  async handlerCron() {
    const emails =
      await this.notificacionEmailService.obtenerEmailsConcatenados();

    console.log('emails', emails);
    const body: SendEmailDto = {
      from: 'helpdesk.venezuela@moore.com.ve',
      subjectEmail: 'Graficas de Ventas del dia; ' + new Date(),
      sendTo: emails,
      cc: '',
      bcc: '',
      bodyText: 'Graficas de Ventas del dia; ' + new Date(),
      template: 'welcome',
    };
    this.logger.log(`1. Generando Imagen de la Grafica`);
    const filename = await this.fileDownloadService.downloadAndSaveChart();

    this.logger.log(`2.  Imagen Generada con exito`);

    this.logger.log(`3.  Enviando correo con la imagen adjunta`, { body });
    const response = await this.emailService.sendEmailWithAtach(body);
    this.logger.log(`4. Correo Enviado con exito`, response);
  }
}
