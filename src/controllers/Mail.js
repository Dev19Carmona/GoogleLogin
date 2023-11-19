const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const Mail_send = async (req, res) => {
  try {
    const GOOGLE_CLIENT_ID =
      "750323481465-050vtn16ococeps9ef7j8b7ejjk319m2.apps.googleusercontent.com";
    const GOOGLE_CLIENT_SECRET = "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";
    const GOOGLE_REFRESH_TOKEN =
      "1//049UKUlYkGp9zCgYIARAAGAQSNwF-L9IrTVdGpFM9kss_EL-Ad_imdYxSBPiOLvTrPxntvkZxq9XJK-VZ5kEgy9cPtfoagBkl49w";
    const GOOGLE_REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const contentHTML = `
        <h1>User information</h1>
        <ul>
          <li>Camilo Carmona</li>
          <li>Prueba</li>
          <li>Email</li>
        </ul>
        
        `;
    const mailOptions = {
      from: "Camilo Carmona Prueba",
      to: "camilocr1294@gmail.com",
      subject: "PRUEBA!!! PAPIIIIII",
      html: contentHTML,
    };
    const oAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: GOOGLE_REFRESH_TOKEN,
    });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "camilocr1294@gmail.com",
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sending");
      }
    });
    res.status(200).json({ message: "TRANSACTION_SUCCESS" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = { Mail_send };
