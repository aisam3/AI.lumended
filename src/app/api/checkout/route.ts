import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { addLeadToNotion } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });

    // Derive base URL from the incoming request so it works in dev + production
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
      `${request.nextUrl.protocol}//${request.headers.get("host")}`;

    // Parse form data and save to Notion
    const formData = await request.formData();
    const data = {
      companyName: formData.get('companyName') as string,
      contactName: formData.get('contactName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      primaryColor: formData.get('primaryColor') as string,
      secondaryColor: formData.get('secondaryColor') as string,
      builderType: formData.get('builderType') as string,
      tone: formData.get('tone') as string,
      specialInstructions: formData.get('specialInstructions') as string,
      coverageCategories: formData.get('coverageCategories') as string,
      integration: formData.get('integration') as string,
      platforms: formData.get('platforms') as string,
      propertyCount: formData.get('propertyCount') as string,
    };

    console.log("--> Starting Notion API call in checkout route");
    console.log("--> Collected Form Data:", JSON.stringify(data, null, 2));
    
    // Save lead to Notion in the background (we don't await this so it doesn't block checkout)
    addLeadToNotion(data).then(() => {
      console.log("--> addLeadToNotion completed without throwing an unhandled error.");
    }).catch((err) => {
      console.error("--> FATAL ERROR calling addLeadToNotion:", err);
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "AI for Homebuilder – Chatbot Setup Service",
            },
            unit_amount: 5000, // $50.00
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/onboarding/success`,
      cancel_url: `${baseUrl}/onboarding/canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
