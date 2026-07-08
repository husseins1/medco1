import { Client, Receiver } from "@upstash/qstash";

function getQstashToken() {
  const token = process.env.QSTASH_TOKEN;
  if (!token) {
    throw new Error("QSTASH_TOKEN is not set");
  }
  return token;
}

let _client: Client | null = null;

export function getQstashClient(): Client {
  if (!_client) {
    _client = new Client({ token: getQstashToken() });
  }
  return _client;
}

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  const siteUrl = process.env.VERCEL_URL;
  if (siteUrl) {
    return siteUrl;
  }
  throw new Error(
    "Neither VERCEL_URL nor NEXT_PUBLIC_SITE_URL is set. Cannot determine base URL for QStash callback.",
  );
}

export async function verifyQstashSignature(
  signature: string,
  body: string,
): Promise<boolean> {
  const currentSigningKey = process.env.QSTASH_CURRENT_SIGNING_KEY;
  const nextSigningKey = process.env.QSTASH_NEXT_SIGNING_KEY;

  if (!currentSigningKey || !nextSigningKey) {
    throw new Error(
      "QSTASH_CURRENT_SIGNING_KEY and QSTASH_NEXT_SIGNING_KEY are required for signature verification",
    );
  }

  const receiver = new Receiver({
    currentSigningKey,
    nextSigningKey,
  });

  return receiver.verify({ signature, body });
}
