import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, MapPin, Video, Users, Loader2, Lock, GraduationCap, Languages, Award, BadgePercent, Mail } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { MembersApiError, inscriptionUrl } from "@/config/members";
import { getCourse, quoteCourse, startEnrollment, money, fmtPeriod, fmtDay, fmtHours, type Pricing } from "@/config/courses";

const LANGS: Record<string, [string, string]> = { es: ["Español", "Spanish"], en: ["Inglés", "English"], bilingue: ["Español e inglés", "Spanish and English"] };

export default function CourseDetail() {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const es = language === "ES";
  const { data: c, isLoading, isError } = useQuery({ queryKey: ["public-course", slug], queryFn: () => getCourse(slug) });
  const [form, setForm] = useState({ name: "", email: "", phone: "", coupon: "", website: "" });
  const [accept, setAccept] = useState(false);
  const [acceptRefund, setAcceptRefund] = useState(false);
  const [quote, setQuote] = useState<Pricing | null>(null);
  const [quoteError, setQuoteError] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (isLoading) return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  if (isError || !c) {
    return (
      <Layout>
        <div className="container-wide max-w-xl py-24 text-center">
          <h1 className="text-2xl font-bold">{es ? "Curso no encontrado" : "Course not found"}</h1>
          <Link to="/cursos" className="mt-4 inline-block text-primary hover:underline">{es ? "Ver todos los cursos" : "See all courses"}</Link>
        </div>
      </Layout>
    );
  }

  const applyCoupon = async () => {
    setQuoteError("");
    setQuote(null);
    if (!form.coupon.trim()) return;
    try {
      setQuote(await quoteCourse(c.slug, form.coupon));
    } catch (err) {
      setQuoteError(err instanceof MembersApiError ? err.message : es ? "No se pudo validar el código." : "Could not check the code.");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!accept || !acceptRefund) {
      setError(es ? "Debes aceptar los términos, la política de privacidad y la política de reembolsos." : "You must accept the terms, privacy policy and refund policy.");
      return;
    }
    setBusy(true);
    try {
      const out = await startEnrollment({ course: c.slug, name: form.name, email: form.email, phone: form.phone, coupon: form.coupon,
        lang: es ? "es" : "en", accept_terms: accept, accept_refund_policy: acceptRefund, website: form.website });
      window.location.href = out.url;
    } catch (err) {
      setError(err instanceof MembersApiError ? err.message : es ? "No se pudo completar la inscripción. Inténtalo de nuevo." : "Could not complete the enrollment. Please try again.");
      setBusy(false);
    }
  };

  const facts = [
    { icon: CalendarDays, text: fmtPeriod(c, es) },
    c.schedule ? { icon: Clock, text: `${c.schedule} · ${fmtHours(c.total_hours)}` } : null,
    { icon: c.modality === "virtual" ? Video : MapPin, text: c.modality === "virtual" ? (es ? "En línea (el enlace llega a tu aula virtual)" : "Online (the link is in your virtual classroom)") : `${c.modality_label} · ${c.location || ""}` },
    { icon: Languages, text: (LANGS[c.language] || LANGS.es)[es ? 0 : 1] },
    c.capacity > 0 ? { icon: Users, text: c.full ? (es ? "Cupo completo" : "Full") : `${c.remaining} ${es ? "lugares disponibles" : "seats left"}` } : null,
    { icon: Award, text: `${c.certificate} · ${es ? "asistencia mínima" : "minimum attendance"} ${c.min_attendance_pct}%` },
  ].filter(Boolean) as { icon: typeof CalendarDays; text: string }[];

  return (
    <Layout>
      <section className="border-b bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container-wide max-w-6xl pb-12 pt-8">
          <Link to="/cursos" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />{es ? "Todos los cursos" : "All courses"}</Link>
          {params.get("cancelado") && <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">{es ? "El pago se canceló. Puedes intentarlo de nuevo." : "The payment was cancelled. You can try again."}</p>}
          <div className={c.image_url ? "grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center" : "max-w-3xl"}>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{c.kind_label} · {c.modality_label}</p>
              <h1 className="text-3xl font-bold text-foreground md:text-5xl">{c.title}</h1>
              {c.summary && <p className="mt-4 text-lg text-muted-foreground">{c.summary}</p>}
              <ul className="mt-6 space-y-2 text-sm">
                {facts.map((f, i) => <li key={i} className="flex items-center gap-2"><f.icon className="h-4 w-4 text-primary" />{f.text}</li>)}
              </ul>
            </div>
            {c.image_url && <img src={c.image_url} alt="" className="aspect-video w-full rounded-2xl object-cover shadow-lg" />}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            {c.description && <div><h2 className="mb-3 text-xl font-bold">{es ? "Descripción" : "Description"}</h2><Markdown>{c.description}</Markdown></div>}
            {c.objectives && <div><h2 className="mb-3 text-xl font-bold">{es ? "Objetivos" : "Objectives"}</h2><p className="whitespace-pre-line text-muted-foreground">{c.objectives}</p></div>}
            {(c.audience || c.requirements) && (
              <div className="grid gap-6 sm:grid-cols-2">
                {c.audience && <div><h3 className="font-semibold">{es ? "Dirigido a" : "Audience"}</h3><p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{c.audience}</p></div>}
                {c.requirements && <div><h3 className="font-semibold">{es ? "Requisitos" : "Requirements"}</h3><p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{c.requirements}</p></div>}
              </div>
            )}
            {(c.sessions || []).length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-bold">{es ? "Programa" : "Program"}</h2>
                <ol className="space-y-3">
                  {c.sessions!.map((s) => (
                    <li key={s.number} className={`rounded-xl border p-4 ${s.cancelled ? "opacity-60" : ""}`}>
                      <p className="font-semibold">{s.number}. {s.title} {s.cancelled && <span className="text-sm text-destructive">({es ? "cancelada" : "cancelled"})</span>}</p>
                      <p className="text-sm text-muted-foreground">{fmtDay(s.date, es)} · {s.start_time}–{s.end_time} · {fmtHours(s.hours)}{s.teacher ? ` · ${s.teacher}` : ""}</p>
                      {s.topics && <p className="mt-1 text-sm">{s.topics}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {c.teachers.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-bold">{es ? "Profesores" : "Instructors"}</h2>
                <ul className="space-y-2">{c.teachers.map((t, i) => <li key={i}><p className="font-semibold">{t.name}</p>{t.bio && <p className="text-sm text-muted-foreground">{t.bio}</p>}</li>)}</ul>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {es ? "Los certificados son de participación o de aprovechamiento; no constituyen un título académico ni una acreditación oficial." : "Certificates attest participation or achievement; they are not an academic degree or official accreditation."}
            </p>
          </div>

          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-3xl font-bold">{c.free ? (es ? "Gratis" : "Free") : money(c.price_cents)}</p>
            {!c.free && c.member_discount_percent > 0 && (
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {es
                  ? `Miembros activos con su membresía al día: ${c.member_discount_percent}% de descuento automático al inscribirse con su correo${c.allow_discount_stack ? "" : " (no se combina con cupones ni becas; se aplica el precio más bajo)"}.`
                  : `Active members with a current membership: ${c.member_discount_percent}% off automatically when enrolling with their e-mail${c.allow_discount_stack ? "" : " (not combined with coupons or scholarships; the lowest price applies)"}.`}
                {" "}<a href={inscriptionUrl} className="text-primary hover:underline">{es ? "Hazte miembro" : "Become a member"}</a>
              </p>
            )}
            {!c.enroll_open ? (
              <p className="mt-6 flex items-center gap-2 rounded-lg bg-muted p-3 text-sm"><Lock className="h-4 w-4" />{c.closed_reason || (es ? "La inscripción está cerrada." : "Enrollment is closed.")}</p>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-3" noValidate>
                {c.waitlist && <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">{es ? "El cupo está completo: te anotaremos en la lista de espera y te avisaremos si se libera un lugar." : "The course is full: you will join the waitlist and we will let you know if a seat opens."}</p>}
                <Input placeholder={es ? "Nombre completo" : "Full name"} value={form.name} onChange={set("name")} required />
                <Input type="email" placeholder={es ? "Correo electrónico" : "E-mail"} value={form.email} onChange={set("email")} required />
                <Input type="tel" placeholder={es ? "Teléfono (opcional)" : "Phone (optional)"} value={form.phone} onChange={set("phone")} />
                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={form.website} onChange={set("website")} aria-hidden="true" />
                {!c.free && c.has_coupons && (
                  <div className="flex gap-2">
                    <Input placeholder={es ? "Cupón o código de beca" : "Coupon or scholarship code"} value={form.coupon} onChange={set("coupon")} onBlur={applyCoupon} />
                    <Button type="button" variant="outline" onClick={applyCoupon}>{es ? "Aplicar" : "Apply"}</Button>
                  </div>
                )}
                {quoteError && <p className="text-sm text-destructive">{quoteError}</p>}
                {quote && (
                  <dl className="space-y-1 rounded-lg bg-muted p-3 text-sm">
                    {quote.lines.map((l, i) => <div key={i} className="flex justify-between"><dt>{l.label}</dt><dd>{money(l.cents)}</dd></div>)}
                    <div className="flex justify-between font-semibold"><dt>Total</dt><dd>{money(quote.total_cents)}</dd></div>
                    <p className="text-xs text-muted-foreground">{es ? "Si eres miembro activo, al pagar se aplicará el precio más bajo." : "If you are an active member, the lowest price applies at checkout."}</p>
                  </dl>
                )}
                <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                  <span>{es ? "Acepto los " : "I accept the "}<Link to="/terms" className="text-primary hover:underline">{es ? "términos" : "terms"}</Link>{es ? " y la " : " and the "}<Link to="/privacy" className="text-primary hover:underline">{es ? "política de privacidad" : "privacy policy"}</Link>.</span>
                </label>
                <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={acceptRefund} onChange={(e) => setAcceptRefund(e.target.checked)} />
                  <span>{es ? "Acepto la política de reembolsos: " : "I accept the refund policy: "}<span className="text-muted-foreground">{c.refund_policy}</span></span>
                </label>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                  {c.waitlist ? (es ? "Anotarme en la lista de espera" : "Join the waitlist") : c.free ? (es ? "Inscribirme" : "Enroll") : es ? "Inscribirme y pagar" : "Enroll and pay"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {es ? "El pago es por un programa educativo (no es una donación). Inscribirte no te hace miembro de la organización." : "The payment is for an educational program (not a donation). Enrolling does not make you a member of the organization."}
                </p>
              </form>
            )}
            {c.contact_email && <a href={`mailto:${c.contact_email}`} className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"><Mail className="h-4 w-4" />{c.contact_email}</a>}
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><GraduationCap className="h-4 w-4" />{c.code}</p>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
