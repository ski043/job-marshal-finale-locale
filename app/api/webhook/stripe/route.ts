import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customerId = session.customer as string;
    const jobId = session.metadata?.jobId;

    if (!jobId) {
      console.error("No job ID found in session metadata");
      return new Response("No job ID found", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) throw new Error("User not found...");

    // Update the job post status to PUBLISHED
    await prisma.jobPost.update({
      where: {
        id: jobId,
        userId: user.id, // Ensure the job belongs to the user
      },
      data: {
        status: "ACTIVE",
      },
    });
  }

  return new Response(null, { status: 200 });
}
