
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
    "1//046RWt7KXWTG8CgYIARAAGAQSNwF-L9Irr_chrL1wTnCQ-ifzf1UeWN49DcRvO72-a5Z_oUlTQJkHFWqtEEmQ7AK0xmd8ATajMiw",
});
const accessToken = oauth2Client.getAccessToken();

function sendNodemailer(emailTo, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "medikumail@gmail.com",
      clientId:
        "759003206057-o0vldljc99vunh1di9iernh76jeigok9.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//046RWt7KXWTG8CgYIARAAGAQSNwF-L9Irr_chrL1wTnCQ-ifzf1UeWN49DcRvO72-a5Z_oUlTQJkHFWqtEEmQ7AK0xmd8ATajMiw",
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: "Mediku",
    to: `${emailTo}`,
    subject: `${subject}`,
    text: `${text}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = sendNodemailer;
