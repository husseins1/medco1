import { NextResponse } from "next/server";
import { z } from "zod";
import { sendTemplateMessage } from "@/lib/whatsapp/send-template";
import { verifyQstashSignature } from "@/lib/qstash";

export const runtime = "nodejs";

const bodySchema = z.object({
  appointmentId: z.string().uuid(),
  type: z.literal("REMINDER"),
  tenantId: z.string(),
});

export async function POST(request: Request) {
  const signature = request.headers.get("upstash-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing upstash-signature header" },
      { status: 401 },
    );
  }

  const body = await request.text();

  let verified: boolean;
  try {
    verified = await verifyQstashSignature(signature, body);
  } catch (error) {
    console.error("[QStash:send-reminder] Signature verification error:", error);
    return NextResponse.json(
      { error: "Signature verification failed" },
      { status: 401 },
    );
  }

  if (!verified) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 401 },
    );
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(JSON.parse(body));
  } catch {
    return NextResponse.json(
      { error: "Invalid body. Expected { appointmentId, type: 'REMINDER', tenantId }" },
      { status: 400 },
    );
  }

  const result = await sendTemplateMessage({
    appointmentId: parsed.appointmentId,
    type: parsed.type,
    tenantId: parsed.tenantId,
  });

  if (!result.success) {
    console.error(
      `[QStash:send-reminder] Failed for appointment ${parsed.appointmentId}: ${result.error}`,
    );
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
