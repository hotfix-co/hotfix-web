import sgMail from "@sendgrid/mail";

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactEmailData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, company, message } = data;

  const emailContent = {
    to: process.env.CONTACT_EMAIL || "ops@hotfix-doo.com",
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@hotfix-doo.com",
    replyTo: email,
    subject: `Novi upit s HOTFIX web stranice - ${name}`,
    text: `
Ime: ${name}
Email: ${email}
${company ? `Tvrtka: ${company}` : ""}

Poruka:
${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f97316; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Novi upit s web stranice</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #111827; margin-top: 0;">Podaci za kontakt</h2>
            
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Ime:</strong><br/>
              <span style="color: #6b7280;">${name}</span>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Email:</strong><br/>
              <a href="mailto:${email}" style="color: #f97316;">${email}</a>
            </p>
            
            ${
              company
                ? `
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Tvrtka:</strong><br/>
              <span style="color: #6b7280;">${company}</span>
            </p>
            `
                : ""
            }
            
            <p style="margin: 20px 0 10px 0;">
              <strong style="color: #374151;">Poruka:</strong>
            </p>
            <div style="background: #f6f9fc; padding: 15px; border-radius: 6px; border-left: 4px solid #f97316;">
              <p style="color: #374151; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Ova poruka poslana je putem HOTFIX kontakt forme.</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(emailContent);
    return { success: true };
  } catch (error: unknown) {
    console.error("SendGrid Error:", error);
    if (typeof error === "object" && error !== null && "response" in error) {
      const sendGridError = error as { response?: { body?: unknown } };
      console.error("Error response:", sendGridError.response?.body);
    }
    throw new Error("Failed to send email");
  }
}
