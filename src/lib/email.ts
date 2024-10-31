import nodemailer from "nodemailer";

const domain = process.env.NEXTAUTH_URL;

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0911c49541ff5f",
    pass: "2205fe419474ff",
  },
});

export const sendEmail = async ({
  to,
  token,
}: {
  to: string;
  token: string;
}) => {
  const confirmLink = `${domain}/auth/email-verifield?token=${token}`;

  await transport.sendMail({
    from: "mail@asharib.xyz",
    to,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
