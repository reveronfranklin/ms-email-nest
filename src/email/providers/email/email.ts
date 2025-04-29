import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();

const assetsPath = join(process.cwd(), 'assets');
const filename = `chart.png`;
const filePath = join(assetsPath, filename);
const imageCid = 'chart';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL = process.env.EMAIL;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
@Injectable()
export class Email {
  constructor() {}
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendEmail(subjectEmail, sendTo, html, bcc, cc) {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        connectionTimeout: 60000, // 60 segundos
        greetingTimeout: 30000,
        socketTimeout: 60000,
      },
    });
    try {
      const info = await transport.sendMail({
        from: '"HelpDesk Venezuela" <helpdesk.venezuela@moore.com.ve>', // sender address
        to: sendTo, // list of receivers
        bcc: bcc,
        cc: cc,
        subject: subjectEmail, // Subject line
        html: html, // html body
      });
      console.log(info);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async sendEmailWithAtach(subjectEmail, sendTo, html, bcc, cc) {
    console.log({ filePath });
    html = `<img src="cid:${imageCid}" alt="chart">`;
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
        connectionTimeout: 60000, // 60 segundos
        greetingTimeout: 30000,
        socketTimeout: 60000,
      },
    });
    try {
      const info = await transport.sendMail({
        from: '"HelpDesk Venezuela" <helpdesk.venezuela@moore.com.ve>', // sender address
        to: sendTo, // list of receivers
        bcc: bcc,
        cc: cc,
        subject: subjectEmail, // Subject line
        html: html, // html body

        attachments: [
          {
            filename: 'imagen-adjunta.png',
            path: filePath,
            cid: imageCid, // Usar el mismo CID en el HTML
            contentType: 'image/png',
          },
        ],
      });
      console.log(info);
    } catch (error) {
      console.log('error en provider sendEmailWithAtach:', error);
      throw error;
    }
  }

  async testEmail() {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    try {
      const info = await transport.sendMail({
        from: '"Help Desk Venezuela 👻" <helpdesk.venezuela@moore.com.ve>', // sender address
        to: 'reveronfranklin@gmail.com, willman.herrera@moore.com', // list of receivers
        subject: 'Email de prueba', // Subject line
        html: '<b>Test Email</b>', // html body
      });
    } catch (error) {
      throw error;
    }
  }
}
