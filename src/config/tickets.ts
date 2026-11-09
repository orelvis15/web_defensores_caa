import { MEMBERS_URL, MembersApiError, membersApi, membersPost } from "@/config/members";

// Ticket sales ("Galas y entradas"): the members backend serves the public
// API on the organization's single Stripe account; the admin manages events.

export type TicketType = {
  id: string;
  name: string;
  description?: string;
  price_cents: number;
  remaining: number | null; // units (a full table = 1)
  sold_out: boolean;
  // Gala tickets (absent on older servers).
  kind?: "individual" | "couple" | "table" | "other";
  seats?: number; // people admitted per unit
  fair_value_cents?: number; // value of what the attendee receives (dinner…) per unit
  deductible_cents?: number; // price − fair value, per unit
  disclosure_required?: boolean; // > $75 with something received: IRS quid-pro-quo notice
};

/** People admitted by one unit of a ticket type. */
export const seatsOf = (t: Pick<TicketType, "seats" | "kind">) =>
  t.seats && t.seats > 0 ? t.seats : t.kind === "table" ? 8 : t.kind === "couple" ? 2 : 1;

export const kindLabel = (t: TicketType, es: boolean) => {
  const n = seatsOf(t);
  if (t.kind === "table") return es ? `Mesa completa · ${n} personas` : `Full table · ${n} people`;
  if (t.kind === "couple" || n === 2) return es ? "Pareja · 2 personas" : "Couple · 2 people";
  return n > 1 ? (es ? `${n} personas` : `${n} people`) : "";
};

/** IRS quid-pro-quo wording (shown when a payment over $75 buys goods/services). */
export const quidProQuoNotice = (es: boolean) =>
  es
    ? "Aviso fiscal: la parte de tu pago deducible del impuesto federal sobre la renta se limita al exceso de lo pagado sobre el valor de los bienes y servicios que la organización te proporciona (cena, etc.)."
    : "Tax notice: the amount of your payment that is deductible for federal income tax purposes is limited to the excess of the amount paid over the value of the goods and services provided by the organization (dinner, etc.).";

export type PublicEvent = {
  slug: string;
  name: string;
  summary?: string;
  description?: string;
  starts_at: string;
  ends_at?: string;
  doors_open?: string;
  venue_name?: string;
  venue_address?: string;
  image_url?: string;
  dress_code?: string;
  chapter_name?: string;
  contact_email?: string;
  status: string;
  on_sale: boolean;
  sold_out: boolean;
  max_per_order: number;
  collect_names: boolean;
  ticket_types: TicketType[];
  min_price_cents: number;
  is_gala?: boolean;
};

export type OrderTicket = {
  code: string;
  type_name: string;
  holder_name: string;
  status: string;
  checked_in_at?: string;
  table_label?: string;
  seat?: number;
  diet?: string;
  accessibility?: string;
  guest_placeholder?: boolean;
  unit_index?: number;
};

export type Receipt = {
  total_cents: number;
  fair_value_cents: number;
  deductible_cents: number;
  disclosure_required: boolean;
  statement: string;
  lines: { name: string; quantity: number; unit_cents: number; fair_value_cents: number; deductible_cents: number }[];
};

export type PublicOrder = {
  code: string;
  status: "pending" | "paid" | "expired" | "cancelled";
  buyer_name: string;
  buyer_email: string;
  items: { type_id: string; name: string; quantity: number; unit_cents: number }[];
  quantity: number;
  total_cents: number;
  payment_method: string;
  paid_at?: string;
  email_sent_at?: string;
  event: PublicEvent;
  tickets: OrderTicket[];
  receipt?: Receipt;
  can_edit_guests?: boolean;
};

export const listEvents = () => membersApi<{ items: PublicEvent[] }>("/api/tickets/public/events");
export const getEvent = (slug: string) => membersApi<PublicEvent>(`/api/tickets/public/events/${encodeURIComponent(slug)}`);
export const getOrder = (code: string, token: string) =>
  membersApi<PublicOrder>(`/api/tickets/public/orders/${encodeURIComponent(code)}?t=${encodeURIComponent(token)}`);
/** The buyer names a guest and records food/accessibility preferences. */
export async function updateGuest(code: string, token: string, ticket: string, body: { holder_name: string; diet: string; accessibility: string }) {
  const res = await fetch(
    `${MEMBERS_URL}/api/tickets/public/orders/${encodeURIComponent(code)}/tickets/${encodeURIComponent(ticket)}?t=${encodeURIComponent(token)}`,
    { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new MembersApiError(res.status, data?.error || `HTTP ${res.status}`);
  return data as OrderTicket;
}

export const qrUrl = (code: string, token: string, ticket: string) =>
  `${MEMBERS_URL}/api/tickets/public/orders/${encodeURIComponent(code)}/tickets/${encodeURIComponent(ticket)}/qr.png?t=${encodeURIComponent(token)}`;

export type CheckoutBody = {
  event: string;
  items: { type_id: string; quantity: number }[];
  name: string;
  email: string;
  phone?: string;
  attendees?: string[];
  notes?: string;
  accept_terms: boolean;
  website?: string;
};

export const startTicketCheckout = (body: CheckoutBody) =>
  membersPost<{ url: string; order: string; token: string; paid: boolean }>("/api/tickets/public/checkout", {
    ...body,
    origin: window.location.origin,
  });

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0 });

export function fmtWhen(iso: string, es: boolean) {
  return new Date(iso).toLocaleString(es ? "es-US" : "en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit",
    timeZone: "America/New_York",
  });
}

const TZ = "America/New_York";

/** "sábado, 14 de marzo de 2027" */
export function fmtDate(iso: string, es: boolean) {
  return new Date(iso).toLocaleDateString(es ? "es-US" : "en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ,
  });
}

/** "7:00 p. m. – 11:00 p. m. (ET)" */
export function fmtTimeRange(startIso: string, endIso: string | undefined, es: boolean) {
  const t = (iso: string) =>
    new Date(iso).toLocaleTimeString(es ? "es-US" : "en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ });
  return `${t(startIso)}${endIso ? ` – ${t(endIso)}` : ""} (ET)`;
}

/** Google Calendar "add event" link (2 h long when there is no end). */
export function calendarUrl(ev: PublicEvent) {
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = new Date(ev.starts_at);
  const end = ev.ends_at ? new Date(ev.ends_at) : new Date(start.getTime() + 2 * 3600 * 1000);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.name,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `${ev.summary ? `${ev.summary}\n\n` : ""}${window.location.origin}/eventos/${ev.slug}`,
    location: [ev.venue_name, ev.venue_address].filter(Boolean).join(", "),
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export const mapsUrl = (ev: PublicEvent) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([ev.venue_name, ev.venue_address].filter(Boolean).join(" "))}`;
