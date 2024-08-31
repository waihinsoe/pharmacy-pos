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

export const checkStock = async () => {
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
    <div class="stock-item ${item.quantity <= 10 ? "low-stock" : ""}">
        <h2>${item.name}</h2>
        <p>Quantity: ${item.quantity}</p>
        <p>Minimum Required Quantity: ${10}</p>
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
            .stock-item { margin: 10px 0; padding: 10px; background-color: #f9f9f9; border-left: 5px solid #007BFF; }
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

  // let message = "Stock check reprot: \n";

  // if (lowStockItems.length > 0) {
  //   lowStockItems.forEach((item) => {
  //     message += `Item: ${item.name}, Quantity: ${
  //       item.quantity
  //     }, Min Required: ${10}\n`;
  //   });
  // } else {
  //   message += "All items are in sufficient quantity.";
  // }

  return emailHtml;
};

export const sendLowStockEmail = (message: string) => {
  console.log(config.emailUser, config.emailPass);
  const mailOptions = {
    from: config.emailUser,
    to: "waihinwork@gmail.com",
    subject: `Daily Stock Check Report`,
    html: message,
  };
  sendEmail(mailOptions);
};
