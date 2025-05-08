import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPESECRETKEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { totalAmount } = body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Convert to paisa
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({message:"message from the payment intent"}),{status:200})
}