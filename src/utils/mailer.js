const nodemailer = require("nodemailer");

const mailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const welcomeEmail = async (recipients) => {
  const transporter = nodemailer.createTransport(mailConfig);

  const message = {
    from: process.env.EMAIL_USERNAME,
    to: recipients.toString(),
    subject: "Welcome to Task Manager!",
    html: "<b>Glad to have you onboarded on the Task Manager App. Hope you enjoy using the app!</b>",
  };

  const sentMail = await transporter.sendMail(message);

  return sentMail;
};

const deletionEmail = async (recipients) => {
  const transporter = nodemailer.createTransport(mailConfig);

  const message = {
    from: process.env.EMAIL_USERNAME,
    to: recipients.toString(),
    subject: "Your Task Manager account has been deleted!",
    html: "<b>We're sorry to see you go. Hope you will come back soon!</b>",
  };

  const sentMail = await transporter.sendMail(message);

  return sentMail;
};

module.exports = {
  welcomeEmail,
  deletionEmail,
};
