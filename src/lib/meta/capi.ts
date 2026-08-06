import { cookies, headers } from "next/headers";

export type MetaEventName =
  | "Lead"
  | "ViewContent"
  | "CompleteRegistration"
  | "Contact";

interface MetaEventOptions {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  eventId?: string;
  eventSourceUrl?: string;
  customData?: Record<string, string | number>;
}

interface MetaServerEvent {
  event_name: MetaEventName;
  event_time: number;
  event_id: string;
  action_source: "website";
  event_source_url: string;
  user_data: Record<string, string>;
  custom_data?: Record<string, string | number>;
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function getEventSourceUrl(requestHeaders: Headers): string {
  return (
    requestHeaders.get("referer") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

export async function sendMetaEvent(
  eventName: MetaEventName,
  options: MetaEventOptions = {},
): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return;

  try {
    const requestHeaders = await headers();
    const requestCookies = await cookies();
    const userData: Record<string, string> = {};

    if (options.email) {
      userData.em = await sha256(options.email);
    }
    if (options.firstName) {
      userData.fn = await sha256(options.firstName);
    }
    if (options.lastName) {
      userData.ln = await sha256(options.lastName);
    }
    if (options.phone) {
      userData.ph = await sha256(options.phone.replace(/\D/g, ""));
    }

    const clientIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
    const userAgent = requestHeaders.get("user-agent");
    const fbp = requestCookies.get("_fbp")?.value;
    const fbc = requestCookies.get("_fbc")?.value;

    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const event: MetaServerEvent = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: options.eventId ?? crypto.randomUUID(),
      action_source: "website",
      event_source_url:
        options.eventSourceUrl ?? getEventSourceUrl(requestHeaders),
      user_data: userData,
      ...(options.customData ? { custom_data: options.customData } : {}),
    };

    const response = await fetch(
      `https://graph.facebook.com/v25.0/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [event],
          access_token: accessToken,
          ...(process.env.META_TEST_EVENT_CODE
            ? { test_event_code: process.env.META_TEST_EVENT_CODE }
            : {}),
        }),
        cache: "no-store",
      },
    );
    

    if (!response.ok) {
      console.error("Meta CAPI event failed:", await response.text());
    }
  } catch (error: unknown) {
    console.error("Meta CAPI request failed:", error);
  }
}
