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
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ""}

Message:
${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #DC2626 0%, #F97316 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #111827; margin-top: 0;">Contact Details</h2>
            
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Name:</strong><br/>
              <span style="color: #6b7280;">${name}</span>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Email:</strong><br/>
              <a href="mailto:${email}" style="color: #DC2626;">${email}</a>
            </p>
            
            ${
              company
                ? `
            <p style="margin: 10px 0;">
              <strong style="color: #374151;">Company:</strong><br/>
              <span style="color: #6b7280;">${company}</span>
            </p>
            `
                : ""
            }
            
            <p style="margin: 20px 0 10px 0;">
              <strong style="color: #374151;">Message:</strong>
            </p>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #DC2626;">
              <p style="color: #374151; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>This email was sent from the HOTFIX contact form</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(emailContent);
    return { success: true };
  } catch (error: any) {
    console.error("SendGrid Error:", error);
    if (error.response) {
      console.error("Error response:", error.response.body);
    }
    throw new Error("Failed to send email");
  }
}

