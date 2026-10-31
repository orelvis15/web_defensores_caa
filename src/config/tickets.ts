import { MEMBERS_URL, membersApi, membersPost } from "@/config/members";

// Ticket sales ("Galas y entradas"): the members backend serves the public
// API on the organization's single Stripe account; the admin manages events.

export type TicketType = {
  id: string;
  name: string;
  description?: string;
  price_cents: number;
  remaining: number | null;
  sold_out: boolean;
};

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
};

export type OrderTicket = {
  code: string;
  type_name: string;
  holder_name: string;
  status: string;
  checked_in_at?: string;
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
};

export const listEvents = () => membersApi<{ items: PublicEvent[] }>("/api/tickets/public/events");
export const getEvent = (slug: string) => membersApi<PublicEvent>(`/api/tickets/public/events/${encodeURIComponent(slug)}`);
export const getOrder = (code: string, token: string) =>
  membersApi<PublicOrder>(`/api/tickets/public/orders/${encodeURIComponent(code)}?t=${encodeURIComponent(token)}`);
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
