const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "759003206057-o0vldljc99vunh1di9iernh76jeigok9.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04o3i_HSmbZaoCgYIARAAGAQSNwF-L9IrgErG5ebw6uciFFhsTz1VN85C-8QtrFPmNiI_CKG-EXJO6MkyQIXVVFpJ4QRFynaf68I",
});
const accessToken = oauth2Client.getAccessToken();

function sendNodemailer(emailTo, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "jonathansentosa80@gmail.com",
      clientId:
        "759003206057-o0vldljc99vunh1di9iernh76jeigok9.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04pczHblCAM2sCgYIARAAGAQSNwF-L9IrltYFLZnDpx16wBykAUEyppHsAQ0ZXrBg-lPNrKGTxlwLvfU2SjUnFp5H2q2wzvjCSZ4",
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: "Mediku",
    to: `${emailTo}`,
    subject: `${subject}`,
    html: `${text}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = sendNodemailer;
