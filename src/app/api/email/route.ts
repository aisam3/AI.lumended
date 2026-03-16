import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, company, phone, annualClosings, role, painPoint, notes } = data;

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) throw new Error("BREVO_API_KEY is missing from .env");

    async function sendEmail(toEmail: string, toName: string, subject: string, htmlContent: string) {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY as string,
        },
        body: JSON.stringify({
          // IMPORTANT: This email MUST be verified in your Brevo "Senders & IP" dashboard
          sender: { name: "Bitzsol", email: "aisamabbas03@gmail.com" },
          to: [{ email: toEmail, name: toName }],
          subjectContent: subject, // Added this for better API handling
          subject,
          htmlContent,
        }),
      });

      if (!res.ok) {
        const errorDetail = await res.json();
        console.error("❌ BREVO ERROR:", errorDetail); // Check your VS Code Terminal for this!
        throw new Error(`Brevo failed: ${JSON.stringify(errorDetail)}`);
      }
    }

    const BRAND_GOLD = "#D4A03E";
    const SOFT_GOLD = "#E8C87D";
    const DEEP_CHARCOAL = "#2D2A32";
    const WARM_NAVY = "#1E3A5F";
    const WARM_WHITE = "#FAF7F2";
    const WARM_GRAY = "#6B6570";

    // 1️⃣ Admin Email Template
    const adminHtml = `
      <div style="background-color: ${WARM_WHITE}; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(30, 58, 95, 0.3);">
          <div style="padding: 40px; text-align: center; background-color: ${DEEP_CHARCOAL}; background-image: linear-gradient(135deg, ${DEEP_CHARCOAL} 0%, ${WARM_NAVY} 100%); border-bottom: 4px solid ${BRAND_GOLD};">
            <h1 style="color: ${WARM_WHITE}; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Demo Request: ${company}</h1>
          </div>
          <div style="padding: 40px; color: ${DEEP_CHARCOAL};">
            <p style="color: ${WARM_NAVY}; font-size: 13px; margin: 0; font-weight: 700; letter-spacing: 1px;">PROSPECT DETAILS</p>
            <p style="font-size: 22px; font-weight: 600; margin: 8px 0 25px 0;">${name} <br/><span style="font-size: 16px; color: ${WARM_GRAY}; font-weight: 400;">${email}</span></p>
            <div style="background: ${WARM_WHITE}; padding: 25px; border-radius: 16px; border-left: 4px solid ${BRAND_GOLD};">
              <p style="margin: 0 0 12px 0;"><strong>Role:</strong> <span style="color: ${WARM_GRAY};">${role}</span></p>
              <p style="margin: 0 0 12px 0;"><strong>Closings:</strong> <span style="color: ${WARM_GRAY};">${annualClosings}</span></p>
              <p style="margin: 0 0 12px 0;"><strong>Pain Point:</strong> <span style="color: ${BRAND_GOLD}; font-weight: 600;">${painPoint}</span></p>
              <p style="margin: 0;"><strong>Phone:</strong> <span style="color: ${WARM_GRAY};">${phone}</span></p>
            </div>
            <p style="margin-top: 25px; color: ${DEEP_CHARCOAL}; font-weight: 700;">Notes: <br/><span style="font-weight: 400; color: ${WARM_GRAY}; line-height: 1.6;">${notes || 'None'}</span></p>
          </div>
        </div>
      </div>
    `;

    // 🚀 EXECUTION
    // CHANGE "your@email.com" TO YOUR ACTUAL EMAIL
    await sendEmail("aisamabbas03@gmail.com", "Admin", "🚀 New Lead: " + company, adminHtml);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API ROUTE ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}