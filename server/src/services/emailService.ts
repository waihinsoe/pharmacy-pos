import nodemailer from "nodemailer";
import { config } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendEmail = async (options: any) => {
  try {
    await transporter.sendMail(options);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

export const sendStockOutEmail = (item: any) => {
  console.log(config.emailUser, config.emailPass);
  const mailOptions = {
    from: config.emailUser,
    to: "waihinwork@gmail.com",
    subject: `Stock Alert: ${item.name}`,
    text: `The stock for ${item.name} (ID: ${item.id}) is below the minimum threshold. Current stock: ${item.quantity}`,
  };
  sendEmail(mailOptions);
};
