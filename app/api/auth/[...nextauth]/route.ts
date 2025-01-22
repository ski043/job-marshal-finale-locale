import arcjet, { detectBot, fixedWindow, slidingWindow } from "@arcjet/next";
import GitHub from "next-auth/providers/github";
import { NextRequest, NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";
import { handlers } from "@/app/utils/auth";

export const config = {
  providers: [GitHub],
} satisfies NextAuthConfig;

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    fixedWindow({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      window: "60s", // 60 second fixed window
      max: 10,
    }),
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      allow: [], // "allow none" will block all detected bots
    }),
  ],
});

// Protect the sensitive actions e.g. login, signup, etc with Arcjet
const ajProtectedPOST = async (req: NextRequest) => {
  const decision = await aj.protect(req);
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return handlers.POST(req);
};

// You could also protect the GET handler, but these tend to be less sensitive
// so it's not always necessary
const GET = async (req: NextRequest) => {
  return handlers.GET(req);
};

export { GET, ajProtectedPOST as POST };
