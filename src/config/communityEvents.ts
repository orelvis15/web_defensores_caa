import { MEMBERS_URL, membersApi, membersPost } from "@/config/members";

// Events of the organization published from the admin ("Publicar evento").
// They live in the members backend's /api/public/events; ticketed galas keep
// using config/tickets.ts. Registering ("Asistiré") only records attendance:
// it never makes the person a member.

export type CommunitySponsor = { name: string; logo_url?: string; website?: string };

export type CommunityEvent = {
  id: string;
  slug: string;
  url: string;
  name: string;
  summary: string;
  description?: string;
  date: string;
  time?: string;
  end_time?: string;
  starts_at?: string;
  ends_at?: string;
  all_day: boolean;
  address?: string;
  online_url?: string;
  image_url?: string;
  organizer?: string;
  chapter_name?: string;
  status: "upcoming" | "past" | "cancelled";
  sponsors: CommunitySponsor[];
  languages: string[];
  services: { id: string; name: string }[];
  authorizations: { id: string; text: string; required: boolean }[];
  disclaimer?: string;
  registration_open: boolean;
  membership_url?: string;
  gallery?: { photos: number; videos: number; cover_url?: string };
};

export const listCommunityEvents = () => membersApi<{ items: CommunityEvent[] }>("/api/public/events");
export const listEventsArchive = () => membersApi<{ items: CommunityEvent[] }>("/api/public/events/archive");
export const getCommunityEvent = (slug: string) =>
  membersApi<CommunityEvent>(`/api/public/events/${encodeURIComponent(slug)}`);

export type AttendBody = {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  companions: number;
  consent_comms: boolean;
  accepted_disclaimer: boolean;
  accepted_authorizations: string[];
  selected_services: string[];
  website?: string;
};

export const attendEvent = (slug: string, body: AttendBody) =>
  membersPost<{ status: string; already?: boolean; membership_url?: string }>(
    `/api/public/events/${encodeURIComponent(slug)}/register`,
    { ...body, channel: "web" },
  );

export const followEvent = (slug: string, body: { email?: string; phone?: string; consent: boolean; website?: string }) =>
  membersPost<{ status: string; email_notices?: boolean }>(`/api/public/events/${encodeURIComponent(slug)}/follow`, body);

/** .ics file for Apple Calendar / Outlook. */
export const icsUrl = (slug: string) => `${MEMBERS_URL}/api/public/events/${encodeURIComponent(slug)}/calendar.ics`;

const TZ = "America/New_York";

export function eventWhen(ev: CommunityEvent, es: boolean) {
  const locale = es ? "es-US" : "en-US";
  if (!ev.starts_at) return ev.date;
  const date = new Date(ev.starts_at).toLocaleDateString(locale, {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ,
  });
  if (ev.all_day) return date;
  const t = (iso: string) => new Date(iso).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit", timeZone: TZ });
  return `${date} · ${t(ev.starts_at)}${ev.end_time && ev.ends_at ? ` – ${t(ev.ends_at)}` : ""} (ET)`;
}

/** Google Calendar "add event" link. */
export function googleCalendarUrl(ev: CommunityEvent) {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const day = (iso: string) => iso.slice(0, 10).replace(/-/g, "");
  const dates = ev.all_day || !ev.starts_at || !ev.ends_at
    ? `${day(ev.starts_at || ev.date)}/${day(ev.ends_at || ev.date)}`
    : `${stamp(ev.starts_at)}/${stamp(ev.ends_at)}`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.name,
    dates,
    details: `${ev.summary ? `${ev.summary}\n\n` : ""}${ev.online_url ? `${ev.online_url}\n\n` : ""}${ev.url}`,
    location: ev.address || ev.online_url || "",
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

export const eventMapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
