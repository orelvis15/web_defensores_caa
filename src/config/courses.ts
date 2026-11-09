import { membersApi, membersPost } from "@/config/members";

// Cursos y Conferencias: the members backend serves the public catalog and
// the enrollment checkout (Stripe, same account; payments are education
// program income, never donations). Enrolling never creates a member.

export type CourseTeacher = { name: string; bio?: string };
export type CourseSession = {
  number: number; title: string; topics?: string; date: string; start_time: string; end_time: string;
  hours: number; teacher?: string; cancelled?: boolean;
};

export type PublicCourse = {
  slug: string; code: string; title: string; kind: string; kind_label: string; modality: string; modality_label: string;
  language: string; summary?: string; description?: string; objectives?: string; audience?: string; requirements?: string;
  start_date: string; end_date: string; schedule: string; total_hours: number; location?: string; image_url?: string;
  price_cents: number; free: boolean; capacity: number; remaining: number; full: boolean; waitlist: boolean;
  enroll_open: boolean; closed_reason?: string; status: string; teachers: CourseTeacher[]; sessions?: CourseSession[];
  refund_policy: string; member_discount_percent: number; allow_discount_stack: boolean; has_coupons: boolean;
  certificate: string; min_attendance_pct: number; contact_email?: string;
};

export type PriceLine = { kind: string; label: string; cents: number };
export type Pricing = {
  base_cents: number; member_discount_cents: number; coupon_discount_cents: number; scholarship_cents: number;
  total_cents: number; applied: string[]; lines: PriceLine[]; note?: string;
};

export type Enrollment = {
  code: string; name: string; email: string; status: string; is_member: boolean; pricing: Pricing; paid_cents: number;
  payment_method: string; expires_at?: string; paid_at?: string; created_at: string; waitlist_position?: number;
  refund_due_cents: number; refund_requested_at?: string; refund_cents?: number; classroom_url?: string; course: PublicCourse;
};

export const listCourses = (archive = false) =>
  membersApi<{ items: PublicCourse[] }>(`/api/courses/public/${archive ? "?archive=1" : ""}`);
export const getCourse = (slug: string) => membersApi<PublicCourse>(`/api/courses/public/${encodeURIComponent(slug)}`);
export const quoteCourse = (slug: string, coupon: string) =>
  membersPost<Pricing>(`/api/courses/public/${encodeURIComponent(slug)}/quote`, { coupon });

export type EnrollBody = {
  course: string; name: string; email: string; phone?: string; lang: string; coupon?: string;
  accept_terms: boolean; accept_refund_policy: boolean; website?: string;
};
export const startEnrollment = (body: EnrollBody) =>
  membersPost<{ url: string; code: string; token: string; status: string; already?: boolean }>("/api/courses/public/checkout", {
    ...body,
    origin: window.location.origin,
  });

const enr = (code: string, token: string, action = "") =>
  `/api/courses/public/enrollments/${encodeURIComponent(code)}${action}?t=${encodeURIComponent(token)}`;
export const getEnrollment = (code: string, token: string) => membersApi<Enrollment>(enr(code, token));
export const payEnrollment = (code: string, token: string) =>
  membersPost<{ url: string }>(enr(code, token, "/pay"), { origin: window.location.origin });
export const cancelEnrollment = (code: string, token: string, reason: string) =>
  membersPost<Enrollment>(enr(code, token, "/cancel"), { reason });

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0 });

/** "martes, 3 de marzo de 2027" from YYYY-MM-DD (calendar date, no shift). */
export function fmtDay(d: string, es: boolean) {
  if (!d) return "";
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString(es ? "es-US" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export const fmtPeriod = (c: Pick<PublicCourse, "start_date" | "end_date">, es: boolean) =>
  c.end_date && c.end_date !== c.start_date ? `${fmtDay(c.start_date, es)} – ${fmtDay(c.end_date, es)}` : fmtDay(c.start_date, es);

export const fmtHours = (h: number) => `${Number(h || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })} h`;
