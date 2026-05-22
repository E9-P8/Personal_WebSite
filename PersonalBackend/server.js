const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, surname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: "elisa.puorto98@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"Website" "PersonalWebsite" email',
    to: "elisa.puorto98@gmail.com",
    replyTo: email,
    subject: `Nuovo messaggio da ${name} ${surname}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error });
  }
});

app.listen(3000, () => console.log("Server avviato su http://localhost:3000"));
