import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendEmailDto } from 'src/email/dtos/send-email.dto';
import { EmailEntity } from 'src/email/entities/email.entity';
import { Email } from 'src/email/providers/email/email';
import { EmailMiSocio } from 'src/email/providers/email/emailMisocio';
import { In, Repository } from 'typeorm';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(
    private emailProvider: Email,
    private emilProviderMisocio: EmailMiSocio,
    @InjectRepository(EmailEntity)
    private repository: Repository<EmailEntity>,
  ) {}

  async findAll() {
    const result = await this.repository.find({
      where: { idFile: 'hvenezue.id' },
    });
    return result;
  }

  async limpiaEmailInvalidos() {
    try {
      this.logger.warn('Iniciando limpieza de emails invalidos');
      await this.repository.query('exec [Pa_LimpiaEmailInvalidos]');
      this.logger.warn('Culminado limpieza de emails invalidos');
    } catch (error) {
      this.logger.error(
        'IError en ejecucion de limpieza de emails invalidos',
        error,
      );
    }
  }

  async sendEmails(idFile: string[]) {
    await this.limpiaEmailInvalidos();

    const emailRecords = await this.repository.find({
      where: { idFile: In(idFile) },
      select: ['id', 'texto', 'subject', 'email', 'copiaOculta', 'copia'],
      order: { id: 'ASC' }, // Recomendado para consistencia
    });

    if (emailRecords.length === 0) {
      this.logger.warn('No se encontraron registros para enviar');
      return;
    }
    emailRecords.map(async (email, index) => {
      try {
        const emailBody = this.getEmailBody(email.texto, email.subject);

        const emailDto: SendEmailDto = {
          from: 'helpdesk.venezuela@moore.com.ve',
          subjectEmail: email.subject,
          sendTo: email.email,
          bodyText: emailBody,
          template: 'welcome',
          bcc: email.copiaOculta,
          cc: email.copia,
        };
        const query = `exec [Pa_CopiaEmailToEmailHistorico] ${email.id}`;
        this.logger.warn('DEPURANDO EMAIL CON ID:', query);

        const response = await this.sendEmail(emailDto);
        this.logger.warn('response en envio por lotes>>>', response);
        if (response === true) {
          this.logger.warn('DEPURANDO EMAIL CON ID:', email.id);
          await this.repository.query(
            `exec [Pa_CopiaEmailToEmailHistorico] ${email.id}`,
          );
        }

        this.logger.log(
          `Email ${index + 1}/${emailRecords.length} enviado a ${email.email}`,
        );
      } catch (error) {
        this.logger.error(
          `Error enviando email a ${email.email}: ${error.message}`,
          {
            errorStack: error.stack,
          },
        );
        // Opcional: Implementar reintentos aquí
      }
    });
  }

  async sendEmailsMiSocio(idFile: string[]) {
    await this.limpiaEmailInvalidos();

    const emailRecords = await this.repository.find({
      where: { idFile: In(idFile) },
      select: ['id', 'texto', 'subject', 'email', 'copiaOculta', 'copia'],
      order: { id: 'ASC' }, // Recomendado para consistencia
    });

    if (emailRecords.length === 0) {
      this.logger.warn('No se encontraron registros para enviar');
      return;
    }
    emailRecords.map(async (email, index) => {
      try {
        const emailBody = this.getEmailBody(email.texto, email.subject);

        const emailDto: SendEmailDto = {
          from: 'misocio@moore.com.ve',
          subjectEmail: email.subject,
          sendTo: email.email,
          bodyText: emailBody,
          template: 'welcome',
          bcc: email.copiaOculta,
          cc: email.copia,
        };
        const query = `exec [Pa_CopiaEmailToEmailHistorico] ${email.id}`;
        this.logger.warn('DEPURANDO EMAIL CON ID:', query);

        const response = await this.sendEmailMiSocio(emailDto);
        this.logger.warn('response en envio por lotes>>>', response);
        if (response === true) {
          this.logger.warn('DEPURANDO EMAIL CON ID:', email.id);
          await this.repository.query(
            `exec [Pa_CopiaEmailToEmailHistorico] ${email.id}`,
          );
        }

        this.logger.log(
          `Email ${index + 1}/${emailRecords.length} enviado a ${email.email}`,
        );
      } catch (error) {
        this.logger.error(
          `Error enviando email a ${email.email}: ${error.message}`,
          {
            errorStack: error.stack,
          },
        );
        // Opcional: Implementar reintentos aquí
      }
    });
  }
  private getEmailBody(texto?: string, subject?: string): string {
    // Usamos operadores modernos y validación estricta
    return texto?.trim() || subject?.trim() || 'Sin contenido';
  }

  async sendEmail(body: SendEmailDto) {
    try {
      const { from, subjectEmail, sendTo, bodyText, bcc, cc } = body;
      const html = bodyText; //? bodyText : this.getTemplate(body);
      await this.emailProvider.sendEmail(subjectEmail, sendTo, html, bcc, cc);
      return true;
    } catch (error) {
      throw error;
    }
  }
  async sendEmailMiSocio(body: SendEmailDto) {
    try {
      const { from, subjectEmail, sendTo, bodyText, bcc, cc } = body;
      const html = bodyText; //? bodyText : this.getTemplate(body);
      await this.emilProviderMisocio.sendEmail(
        subjectEmail,
        sendTo,
        html,
        bcc,
        cc,
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
  async sendEmailWithAtach(body: SendEmailDto) {
    try {
      const { from, subjectEmail, sendTo, bodyText, bcc, cc } = body;
      const html = bodyText; //? bodyText : this.getTemplate(body);
      await this.emailProvider.sendEmailWithAtach(
        subjectEmail,
        sendTo,
        html,
        bcc,
        cc,
      );
      return true;
    } catch (error) {
      console.log('error en send-email-atach:', error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      await this.emailProvider.testEmail();
      return {
        statusService: 'UP',
      };
    } catch (error) {
      throw error;
    }
  }

  private getTemplate(body) {
    const template = this.getTemplateFile(body.template);
    const html = template.fillTemplate(body);
    return html;
  }

  private getTemplateFile(template) {
    const path = '../../templates';
    const templateFile = require(`${path}/${template}`);
    return templateFile;
  }
}
