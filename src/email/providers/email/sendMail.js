const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL = process.env.EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const info = await transport.sendMail({
      from: '"Help Desk Venezuela 👻" <helpdesk.venezuela@moore.com.ve>', // sender address
      to: "willman.herrera@moore.com.ve", // list of receivers
      subject: "Prueba de Envio con OAuth2", // Subject line
      text: "Esto es una prueba de envio desde OAuth2", // plain text body
      html: "<b>Esto es una prueba de envio desde OAuth2</b>", // html body
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

sendMail();
