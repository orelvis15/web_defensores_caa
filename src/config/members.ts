// Portal de miembros (miembro.defensorescaa.org): membresía paga, inscripción,
// solicitudes de ayuda y las APIs públicas (directorio de embajadores,
// galerías, formulario de contacto y pagos con Stripe).
export const MEMBERS_URL = (import.meta.env.VITE_MEMBERS_URL as string | undefined)?.replace(/\/$/, "") || "https://miembro.defensorescaa.org";

export const membershipUrl = (dollars?: number) =>
  `${MEMBERS_URL}/membresia${dollars ? `?amount=${dollars}` : ""}`;

export const aidRequestUrl = `${MEMBERS_URL}/solicitar-ayuda`;

export const inscriptionUrl = `${MEMBERS_URL}/inscripcion`;

export async function membersApi<T>(path: string): Promise<T> {
  const res = await fetch(`${MEMBERS_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// MembersApiError carries the API's status and message (validation messages
// are safe to show).
export class MembersApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function membersPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${MEMBERS_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new MembersApiError(res.status, data?.error || `HTTP ${res.status}`);
  return data as T;
}

export type CheckoutRequest = {
  kind: "donation" | "campaign" | "sponsorship";
  recurring?: boolean; // donation/sponsorship: monthly
  campaign_id?: string;
  company_name?: string; // sponsorship
  amount_cents: number;
  email?: string;
  first_name?: string;
  last_name?: string;
};

// startCheckout creates a Stripe Checkout Session through the members backend
// (the organization's single Stripe account) and returns its URL.
export async function startCheckout(req: CheckoutRequest): Promise<string> {
  const { url } = await membersPost<{ url: string }>("/api/donations/public/checkout", {
    ...req,
    origin: window.location.origin,
  });
  return url;
}
