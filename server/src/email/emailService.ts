import nodemailer from "nodemailer";
import { config } from "../config";
import { prisma } from "../utils/db";

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

const sendEmail = async ({ from, to, subject, html }: any) => {
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

export const sendLowStockEmail = async () => {
  const lowStockItems = await prisma.products.findMany({
    where: {
      quantity: {
        lte: 10,
      },
    },
  });

  let itemsHtml = lowStockItems
    .map(
      (item) => `
    <div class="stock-item ${item.quantity <= 10 ? "low-stock" : ""}" }>
      <div style="width:100%;">
        <h2>${item.name}</h2>
        <p>Quantity: ${item.quantity}</p>
        <p>Minimum Required Quantity: ${10}</p>
      </div>
        <img src=${item.img_url} width="100" height="100" alt=${item.name}/>
    </div>
`
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: auto; background: white; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1 { color: #333; }
            .stock-item { margin: 10px 0; padding: 10px; background-color: #f9f9f9; border-left: 5px solid #007BFF; display:flex; justify-content:space-between;align-items:center;}
            .low-stock { border-left-color: #FF6347; }
            p { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Daily Stock Check Report</h1>
            <p>Here is the latest stock check report from your pharmacy management system:</p>
            ${itemsHtml}
        </div>
    </body>
    </html>
`;

  sendEmail({
    from: config.emailUser,
    to: ["waihinwork@gmail.com"],
    subject: "Daily Stock Check Report",
    html: emailHtml,
  });
};
