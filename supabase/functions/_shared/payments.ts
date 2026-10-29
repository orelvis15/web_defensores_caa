// Payments go through the members backend (miembro.defensorescaa.org), which
// holds the organization's single Stripe key. These functions keep the
// website's own records in Supabase but never talk to Stripe directly.

const PAYMENTS_API_URL = (Deno.env.get("PAYMENTS_API_URL") || "https://miembro.defensorescaa.org").replace(/\/+$/, "");

const DEFAULT_ORIGIN = "https://defensorescaa.org";
const RETURN_ORIGINS = new Set([DEFAULT_ORIGIN, "https://www.defensorescaa.org"]);

// returnOrigin is where Stripe sends the donor back: the calling site when it
// is the public website (the backend only accepts those), else the website.
export const returnOrigin = (req: Request): string => {
  const origin = req.headers.get("origin") || "";
  return RETURN_ORIGINS.has(origin) ? origin : DEFAULT_ORIGIN;
};

export type CheckoutRequest = {
  kind: "donation" | "campaign" | "course";
  recurring?: boolean;
  amount_cents?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  campaign_id?: string;
  origin: string;
};

export type CheckoutResponse = {
  url: string;
  session_id: string;
  customer_id?: string;
  amount_cents: number;
};

export type SessionStatus = {
  payment_status: string;
  type?: string;
  campaign_id?: string;
};

// PaymentsError carries the backend's status and message (validation errors
// are safe to show to the donor).
export class PaymentsError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${PAYMENTS_API_URL}/api/donations/public${path}`, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new PaymentsError(res.status, body?.error || `payments backend returned ${res.status}`);
  }
  return body as T;
}

export const createCheckout = (req: CheckoutRequest) =>
  call<CheckoutResponse>("/checkout", { method: "POST", body: JSON.stringify(req) });

export const getSession = (sessionId: string) =>
  call<SessionStatus>(`/sessions/${encodeURIComponent(sessionId)}`);
