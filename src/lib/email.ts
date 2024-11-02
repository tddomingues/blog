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
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <header style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #171717;">TGBLOG</h1>
      </header>
      <main>
        <p style="font-size: 16px; color: #171717;">Obrigado pelo cadastro no site TGBLOG! Por favor, confirme seu e-mail para ter acesso ao site.</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${confirmLink}" 
             style="background-color: #16a34a; color: #fafafa; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Ir para a página de confirmação
          </a>
        </div>
      </main>
      <footer style="margin-top: 20px; text-align: center; color: #171717; font-size: 12px;">
        <p>Se você não criou a conta, você pode ignorar esse e-mail.</p>
      </footer>
    </div>`,
  });
};
