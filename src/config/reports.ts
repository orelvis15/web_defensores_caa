// Informes y Transparencia (art. 8.4 de los Estatutos): reports approved by
// the Board and published from the admin's Informes module. The members
// backend serves only the public version (aggregated figures, no client,
// detainee or family data; finances at the level the Board decided).
import { MEMBERS_URL, membersApi } from "@/config/members";

export type ReportFigure = { key: string; label: string; value: number; text?: string; format: string };
export type ReportPoint = { label: string; value: number };
export type ReportChart = { key: string; title: string; kind: "bar" | "line" | "pie"; format: string; series: { name: string; points: ReportPoint[] }[] };
export type ReportTable = { title: string; columns: string[]; rows: string[][] };
export type ReportSection = { key: string; title: string; narrative: string; figures: ReportFigure[]; charts: ReportChart[]; tables: ReportTable[] };

export type PublicReport = {
  slug: string;
  title: string;
  kind: "monthly" | "quarterly" | "semiannual" | "annual";
  kind_label: string;
  period: { kind: string; year: number; index: number; label: string; from: string; to: string };
  scope_label: string;
  version: number;
  sections?: ReportSection[];
  photos?: { url: string; caption: string; author?: string }[];
  financials?: string;
  approved_at?: string;
  approved_by?: string;
  published_at: string;
  pdf_url?: string;
  docx_url?: string;
};

export const listReports = () => membersApi<{ items: PublicReport[] }>("/api/public/reports");
export const getReport = (slug: string) => membersApi<PublicReport>(`/api/public/reports/${encodeURIComponent(slug)}`);

/** Absolute URL of a members-backend path (files and photos). */
export const reportAsset = (path?: string) => (path ? `${MEMBERS_URL}${path}` : "");

export function formatFigure(f: ReportFigure, es: boolean): string {
  const locale = es ? "es-US" : "en-US";
  switch (f.format) {
    case "text":
      return es ? f.text || "—" : (f.text || "—").replace("menos de", "fewer than");
    case "money":
      return (f.value / 100).toLocaleString(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    case "pct":
      return `${f.value.toFixed(1)} %`;
    case "score":
      return f.value ? `${f.value.toFixed(1)} / 5` : "—";
    case "hours":
      return `${f.value.toLocaleString(locale, { maximumFractionDigits: 1 })} h`;
    default:
      return Math.round(f.value).toLocaleString(locale);
  }
}
