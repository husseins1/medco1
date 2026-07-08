import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getQstashClient, getBaseUrl } from "@/lib/qstash";

const CRON_INTERVAL_MINUTES = 30;

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.QSTASH_TOKEN) {
    return NextResponse.json(
      { error: "QSTASH_TOKEN is not configured" },
      { status: 500 },
    );
  }

  try {
    const activeReminders = await prisma.reminder.findMany({
      where: { type: "REMINDER", isActive: true },
    });

    if (activeReminders.length === 0) {
      return NextResponse.json({ message: "No active REMINDER configs" });
    }

    const now = new Date();
    const qstash = getQstashClient();
    const baseUrl = getBaseUrl();
    const targetUrl = `${baseUrl}/api/qstash/send-reminder`;

    let queued = 0;
    const errors: { appointmentId: string; error: string }[] = [];

    for (const reminder of activeReminders) {
      const minutesBefore = reminder.triggerBeforeMinutes ?? 1440;

      const windowStart = new Date(
        now.getTime() + (minutesBefore - CRON_INTERVAL_MINUTES) * 60_000,
      );
      const windowEnd = new Date(
        now.getTime() + (minutesBefore + CRON_INTERVAL_MINUTES) * 60_000,
      );

      console.log(
        `[Cron:Reminders] Window: ${windowStart.toISOString()} — ${windowEnd.toISOString()} (${minutesBefore}m before)`,
      );

      const appointments = await prisma.appointment.findMany({
        where: {
          tenantId: reminder.tenantId,
          startTime: { gte: windowStart, lte: windowEnd },
          status: { in: ["SCHEDULED", "CONFIRMED"] },
          messageLogs: { none: { type: "REMINDER" } },
        },
        select: { id: true },
      });
      console.log(appointments);
      for (const appt of appointments) {
        try {
          await qstash.publishJSON({
            url: targetUrl,
            body: {
              appointmentId: appt.id,
              type: "REMINDER" as const,
              tenantId: reminder.tenantId,
            },
            contentBasedDeduplication: true,
            retries: 3,
          });
          queued++;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error(
            `[Cron:Reminders] Failed to queue appt ${appt.id}: ${message}`,
          );
          errors.push({ appointmentId: appt.id, error: message });
        }
      }
    }

    console.log(
      `[Cron:Reminders] Queued ${queued} reminders${errors.length > 0 ? `, ${errors.length} failed to queue` : ""}`,
    );

    return NextResponse.json({
      queued,
      queueErrors: errors.length,
      ...(errors.length > 0 && { errors }),
    });
  } catch (error) {
    console.error("[Cron:Reminders] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}
