import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, website } = body;

    // Honeypot check - bots fill this hidden field, humans don't
    if (website) {
      // Return 200 so bots think it worked
      return NextResponse.json(
        { message: "Poruka je uspješno poslana" },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Nedostaju obavezna polja" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Email adresa nije ispravna" },
        { status: 400 }
      );
    }

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY is not configured");
      return NextResponse.json(
        { message: "Email servis nije konfiguriran" },
        { status: 500 }
      );
    }

    // Send email
    await sendContactEmail({
      name,
      email,
      company,
      message,
    });

    return NextResponse.json(
      { message: "Poruka je uspješno poslana" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Poruku nije bilo moguće poslati. Pokušajte ponovno kasnije." },
      { status: 500 }
    );
  }
}
