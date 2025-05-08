import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPESECRETKEY);

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

const endpointSecret = process.env.NEXT_PUBLIC_STRIPEENDPOINTSERCET;

export async function POST(req: NextRequest) {
  const body = await req.text(); // Read raw body as string
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle Stripe event types
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("💰 Payment succeeded:", paymentIntent.id);
      // Save order to DB here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
