import { membersApi } from "@/config/members";

// "Nuestra Memoria" — photos and videos of the organization's events, fed
// automatically by the Memoria of the Events module (admin). Only what the
// event team marked «Publicar en la web» and Public Relations approved is
// served by the members backend (/api/public/memory, CORS open, ~5 min cache).

export type MemoryEvent = {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  place?: string;
  chapter_id?: string;
  chapter_name?: string;
  type: string;
  type_label: string;
  slug?: string; // event page /evento/:slug when the event is published on the web
};

export type MemoryItem = {
  id: string;
  kind: "photo" | "video" | "link";
  thumb_url?: string; // reduced image for grids
  url?: string; // full photo / uploaded video / external link
  embed_url?: string; // YouTube, Vimeo or Facebook player
  provider?: string;
  alt: string;
  caption?: string;
  author?: string;
  width?: number;
  height?: number;
  featured?: boolean;
  event?: MemoryEvent;
};

export type MemoryAlbum = MemoryEvent & {
  description?: string;
  cover_thumb_url?: string;
  cover_url?: string;
  cover_alt?: string;
  photos: number;
  videos: number;
};

export type AlbumFilters = {
  years: string[];
  types: { key: string; label: string }[];
  chapters: { id: string; name: string }[];
};

export const getFeaturedMemory = (limit = 12) =>
  membersApi<{ items: MemoryItem[] }>(`/api/public/memory/featured?limit=${limit}`);

export const listMemoryAlbums = (params: { year?: string; type?: string; chapter?: string }) => {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => !!v) as [string, string][]).toString();
  return membersApi<{ items: MemoryAlbum[]; filters: AlbumFilters }>(`/api/public/memory/albums${qs ? `?${qs}` : ""}`);
};

export const getMemoryAlbum = (eventId: string) =>
  membersApi<{ album: MemoryAlbum; items: MemoryItem[] }>(`/api/public/memory/albums/${encodeURIComponent(eventId)}`);

export const albumPath = (eventId: string) => `/memoria/${eventId}`;

/** "junio de 2026" / "June 2026". */
export function monthYear(date: string, es: boolean) {
  if (!date) return "";
  const [y, m] = date.split("-").map(Number);
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString(es ? "es-US" : "en-US", { month: "long", year: "numeric" });
}

/** "27 de junio de 2026". */
export function longDate(date: string, es: boolean) {
  if (!date) return "";
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1).toLocaleDateString(es ? "es-US" : "en-US", { day: "numeric", month: "long", year: "numeric" });
}
