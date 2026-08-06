import { NextResponse } from "next/server";
import { z } from "zod";

import { sendMetaEvent } from "@/lib/meta/capi";

const eventSchema = z.object({
  eventName: z.enum(["ViewContent", "Contact"]),
  eventId: z.string().uuid(),
});

export async function POST(request: Request): Promise<NextResponse> {
  const parsed = eventSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  await sendMetaEvent(parsed.data.eventName, { eventId: parsed.data.eventId });
  return NextResponse.json({ ok: true });
}
