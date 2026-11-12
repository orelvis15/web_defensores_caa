import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, Bell, CalendarDays, CalendarPlus, Check, CheckCircle2, Clock, Download, ExternalLink, Facebook, HeartHandshake,
  Images, Instagram, Link2, Loader2, MapPin, MessageCircle, Share2, Twitter, Users, Video, type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Markdown } from "@/components/Markdown";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { MembersApiError } from "@/config/members";
import {
  attendEvent, eventMapsUrl, eventWhen, followEvent, getCommunityEvent, googleCalendarUrl, icsUrl, type CommunityEvent as Ev,
} from "@/config/communityEvents";

/** /evento/:slug — own page of an event published from the admin (Cambio 5). */
export default function CommunityEvent() {
  const { slug = "" } = useParams();
  const { language } = useLanguage();
  const es = language === "ES";
  const { data: ev, isLoading, isError } = useQuery({ queryKey: ["public-event", slug], queryFn: () => getCommunityEvent(slug) });

  useEffect(() => {
    if (ev) document.title = `${ev.name} | Defensores del CAA`;
  }, [ev]);

  if (isLoading) {
    return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }
  if (isError || !ev) {
    return (
      <Layout>
        <div className="container-wide max-w-xl py-24 text-center">
          <h1 className="text-2xl font-bold">{es ? "Evento no encontrado" : "Event not found"}</h1>
          <Link to="/eventos" className="mt-4 inline-block text-primary hover:underline">{es ? "Ver todos los eventos" : "See all events"}</Link>
        </div>
      </Layout>
    );
  }

  const cancelled = ev.status === "cancelled";
  const past = ev.status === "past";

  return (
    <Layout>
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container-wide max-w-6xl pb-12 pt-8 md:pb-16">
          <Link to={past ? "/eventos/archivo" : "/eventos"} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />{past ? (es ? "Eventos pasados" : "Past events") : (es ? "Todos los eventos" : "All events")}
          </Link>
          <div className={ev.image_url ? "grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center lg:gap-12" : "max-w-3xl"}>
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {cancelled && <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold uppercase tracking-wide text-destructive-foreground">{es ? "Cancelado" : "Cancelled"}</span>}
                {past && <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{es ? "Evento pasado" : "Past event"}</span>}
                {ev.chapter_name && (
                  <span className="rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">{ev.chapter_name}</span>
                )}
              </div>
              <h1 className={`text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl ${cancelled ? "line-through decoration-2" : ""}`}>{ev.name}</h1>
              {ev.summary && <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">{ev.summary}</p>}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /><span className="first-letter:uppercase">{eventWhen(ev, es)}</span></span>
                {ev.address && <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />{ev.address}</span>}
                {!ev.address && ev.online_url && <span className="flex items-center gap-2"><Video className="h-5 w-5 text-primary" />{es ? "En línea" : "Online"}</span>}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {ev.registration_open && (
                  <Button size="lg" onClick={() => document.getElementById("asistire")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <CheckCircle2 className="h-4 w-4" />{es ? "Asistiré" : "I'll attend"}
                  </Button>
                )}
                {!past && !cancelled && <CalendarButtons ev={ev} es={es} />}
                <ShareMenu ev={ev} es={es} />
              </div>
            </div>
            {ev.image_url && (
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
                <img src={ev.image_url} alt={ev.name} className="w-full rounded-2xl object-cover shadow-xl ring-1 ring-black/5" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-wide grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-10">
            {cancelled && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {es ? "Este evento fue cancelado. Lamentamos las molestias." : "This event was cancelled. We apologize for the inconvenience."}
              </p>
            )}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{es ? "Detalles del evento" : "Event details"}</h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                <Detail icon={CalendarDays} label={es ? "Fecha y hora" : "Date & time"}><span className="first-letter:uppercase">{eventWhen(ev, es)}</span></Detail>
                {ev.address && (
                  <Detail icon={MapPin} label={es ? "Lugar" : "Venue"}>
                    <span className="block">{ev.address}</span>
                    <a href={eventMapsUrl(ev.address)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      {es ? "Ver en el mapa" : "View on map"}<ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Detail>
                )}
                {ev.online_url && (
                  <Detail icon={Video} label={es ? "Enlace" : "Link"}>
                    <a href={ev.online_url} target="_blank" rel="noopener noreferrer" className="break-all text-primary hover:underline">{ev.online_url}</a>
                  </Detail>
                )}
                {(ev.organizer || ev.chapter_name) && <Detail icon={Users} label={es ? "Organiza" : "Hosted by"}>{ev.organizer || ev.chapter_name}</Detail>}
                {ev.languages?.length > 0 && <Detail icon={Clock} label={es ? "Idiomas" : "Languages"}>{ev.languages.join(", ")}</Detail>}
              </dl>
            </div>

            {ev.description && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{es ? "Sobre el evento" : "About the event"}</h2>
                <Markdown>{ev.description}</Markdown>
              </div>
            )}

            {ev.sponsors.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{es ? "Patrocinadores" : "Sponsors"}</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {ev.sponsors.map((s) => {
                    const body = (
                      <>
                        {s.logo_url
                          ? <img src={s.logo_url} alt={s.name} className="h-16 w-full object-contain" loading="lazy" />
                          : <span className="flex h-16 items-center justify-center text-center font-semibold text-foreground">{s.name}</span>}
                        {s.logo_url && <span className="mt-2 block truncate text-center text-xs text-muted-foreground">{s.name}</span>}
                      </>
                    );
                    return s.website
                      ? <a key={s.name} href={s.website} target="_blank" rel="noopener noreferrer" className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-md">{body}</a>
                      : <div key={s.name} className="rounded-xl border bg-card p-4">{body}</div>;
                  })}
                </div>
              </div>
            )}

            {past && ev.gallery && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{es ? "Fotos del evento" : "Event photos"}</h2>
                <Link to={`/memoria/${ev.id}`} className="group block overflow-hidden rounded-2xl border bg-card">
                  {ev.gallery.cover_url && <img src={ev.gallery.cover_url} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />}
                  <span className="flex items-center gap-2 p-4 font-medium text-primary group-hover:underline">
                    <Images className="h-4 w-4" />
                    {es ? `Ver la galería (${ev.gallery.photos} fotos${ev.gallery.videos ? `, ${ev.gallery.videos} videos` : ""})` : `See the gallery (${ev.gallery.photos} photos${ev.gallery.videos ? `, ${ev.gallery.videos} videos` : ""})`}
                  </span>
                </Link>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {ev.registration_open && <AttendForm ev={ev} es={es} />}
            {!past && !cancelled && <FollowForm ev={ev} es={es} />}
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function Detail({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border bg-card p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <div className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium text-foreground">{children}</dd>
      </div>
    </div>
  );
}

function CalendarButtons({ ev, es }: { ev: Ev; es: boolean }) {
  return (
    <>
      <Button size="lg" variant="outline" asChild>
        <a href={googleCalendarUrl(ev)} target="_blank" rel="noopener noreferrer"><CalendarPlus className="h-4 w-4" />Google Calendar</a>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <a href={icsUrl(ev.slug)} title={es ? "Apple Calendar, Outlook y otros" : "Apple Calendar, Outlook and others"}>
          <Download className="h-4 w-4" />{es ? "Apple / Outlook" : "Apple / Outlook"}
        </a>
      </Button>
    </>
  );
}

// Share on WhatsApp, Facebook, X and Instagram, or copy the link. The link
// preview (flyer + title) comes from the Open Graph page the members backend
// serves to crawlers (see vercel.json). Instagram has no web share link: on
// phones the system share sheet offers it; elsewhere the link is copied and
// Instagram opens so it can be pasted in a story or bio.
function ShareMenu({ ev, es }: { ev: Ev; es: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/evento/${ev.slug}`;
  const text = es ? `Te invito a «${ev.name}»` : `Join me at "${ev.name}"`;
  const pop = (href: string) => window.open(href, "_blank", "noopener,noreferrer,width=600,height=600");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(es ? "Enlace copiado" : "Link copied");
      return true;
    } catch {
      toast.error(es ? "No se pudo copiar el enlace" : "The link could not be copied");
      return false;
    }
  };
  const instagram = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: ev.name, text, url });
        return;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }
    if (await copy()) {
      toast.info(es ? "Pega el enlace en tu historia o biografía de Instagram." : "Paste the link in your Instagram story or bio.");
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }
  };
  const items: { key: string; label: string; icon: LucideIcon; run: () => void }[] = [
    { key: "wa", label: "WhatsApp", icon: MessageCircle, run: () => pop(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`) },
    { key: "fb", label: "Facebook", icon: Facebook, run: () => pop(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`) },
    { key: "x", label: "X", icon: Twitter, run: () => pop(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`) },
    { key: "ig", label: "Instagram", icon: Instagram, run: instagram },
    { key: "copy", label: es ? "Copiar enlace" : "Copy link", icon: copied ? Check : Link2, run: copy },
  ];
  return (
    <div className="relative">
      <Button size="lg" variant="outline" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Share2 className="h-4 w-4" />{es ? "Compartir" : "Share"}
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute left-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border bg-popover p-1 shadow-lg">
            {items.map(({ key, label, icon: Icon, run }) => (
              <button key={key} type="button" onClick={() => { run(); setOpen(false); }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted">
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const EMPTY = { full_name: "", email: "", phone: "", city: "", companions: 0, consent_comms: false, website: "" };

const FIELD_ERRORS: Record<string, [string, string]> = {
  full_name: ["Escribe tu nombre.", "Enter your name."],
  email: ["Escribe un correo válido.", "Enter a valid email."],
  phone: ["Escribe un teléfono válido.", "Enter a valid phone number."],
  city: ["Escribe tu ciudad.", "Enter your city."],
  companions: ["Entre 0 y 20.", "Between 0 and 20."],
  accepted_disclaimer: ["Debes aceptar el descargo de responsabilidad.", "You must accept the disclaimer."],
  accepted_authorizations: ["Acepta las autorizaciones obligatorias.", "Accept the required authorizations."],
};

// "Asistiré": attendance-only registration (Cambio 6). It never makes the
// person a member; non-members are offered the membership application.
function AttendForm({ ev, es }: { ev: Ev; es: boolean }) {
  const [form, setForm] = useState(EMPTY);
  const [services, setServices] = useState<Record<string, boolean>>({});
  const [auths, setAuths] = useState<Record<string, boolean>>({});
  const [disclaimer, setDisclaimer] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ already?: boolean; membership_url?: string } | null>(null);
  const [error, setError] = useState("");
  const msg = (k: string) => FIELD_ERRORS[k]?.[es ? 0 : 1] || (es ? "Revisa este dato." : "Check this field.");

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: k === "companions" ? Number(e.target.value) : e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.full_name.trim()) e.full_name = msg("full_name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = msg("email");
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = msg("phone");
    if (!form.city.trim()) e.city = msg("city");
    if (form.companions < 0 || form.companions > 20) e.companions = msg("companions");
    if (ev.authorizations.some((a) => a.required && !auths[a.id])) e.accepted_authorizations = msg("accepted_authorizations");
    if (ev.disclaimer && !disclaimer) e.accepted_disclaimer = msg("accepted_disclaimer");
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setError("");
    try {
      const res = await attendEvent(ev.slug, {
        ...form,
        accepted_disclaimer: disclaimer,
        accepted_authorizations: Object.keys(auths).filter((k) => auths[k]),
        selected_services: Object.keys(services).filter((k) => services[k]),
      });
      setDone(res);
    } catch (err) {
      if (err instanceof MembersApiError && err.status === 409) setError(es ? "Las inscripciones están cerradas." : "Registration is closed.");
      else if (err instanceof MembersApiError && err.status === 429) setError(es ? "Demasiados intentos. Espera unos minutos." : "Too many attempts. Please wait a few minutes.");
      else if (err instanceof MembersApiError && err.status === 422) setError(es ? "Revisa los datos del formulario." : "Please check the form.");
      else setError(es ? "No pudimos registrar tu asistencia. Inténtalo de nuevo." : "We could not register you. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div id="asistire" className="scroll-mt-24 rounded-2xl border bg-card p-6 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-3 text-xl font-bold">{es ? "¡Te esperamos!" : "See you there!"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {done.already
            ? (es ? "Ya tenías una inscripción con este correo." : "You were already registered with this email.")
            : (es ? "Registramos tu asistencia." : "Your attendance is registered.")}
        </p>
        <div className="mt-5 rounded-xl bg-muted p-4 text-left text-sm">
          <p className="flex items-center gap-2 font-semibold text-foreground"><HeartHandshake className="h-4 w-4 text-primary" />{es ? "¿Quieres ser miembro?" : "Want to become a member?"}</p>
          <p className="mt-1 text-muted-foreground">
            {es
              ? "Inscribirte a un evento no te hace miembro. Si deseas unirte, llena la solicitud de membresía; sigue el proceso normal de admisión."
              : "Registering for an event does not make you a member. To join, fill in the membership application; it follows the regular admission process."}
          </p>
          {done.membership_url && (
            <Button asChild size="sm" className="mt-3"><a href={done.membership_url}>{es ? "Solicitar membresía" : "Apply for membership"}</a></Button>
          )}
        </div>
      </div>
    );
  }

  const field = (k: "full_name" | "email" | "phone" | "city", label: string, type = "text", auto?: string) => (
    <div className="space-y-1">
      <label htmlFor={`att-${k}`} className="text-sm font-medium">{label}<span className="ml-0.5 text-destructive">*</span></label>
      <Input id={`att-${k}`} type={type} autoComplete={auto} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} />
      {errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <form id="asistire" onSubmit={submit} noValidate className="scroll-mt-24 space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold">{es ? "Asistiré" : "I'll attend"}</h2>
        <p className="text-sm text-muted-foreground">{es ? "No necesitas cuenta. Solo registra tu asistencia." : "No account needed. This only registers your attendance."}</p>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="att-website">Website</label>
        <input id="att-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>
      {error && <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
      {field("full_name", es ? "Nombre completo" : "Full name", "text", "name")}
      {field("email", es ? "Correo electrónico" : "Email", "email", "email")}
      {field("phone", es ? "Teléfono" : "Phone", "tel", "tel")}
      {field("city", es ? "Ciudad" : "City", "text", "address-level2")}
      <div className="space-y-1">
        <label htmlFor="att-companions" className="text-sm font-medium">{es ? "Acompañantes" : "Companions"}</label>
        <Input id="att-companions" type="number" min={0} max={20} value={form.companions} onChange={set("companions")} />
        {errors.companions && <p className="text-xs text-destructive">{errors.companions}</p>}
      </div>
      {ev.services.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">{es ? "Servicios que te interesan" : "Services you are interested in"}</legend>
          {ev.services.map((s) => (
            <label key={s.id} className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" checked={!!services[s.id]} onChange={(e) => setServices((v) => ({ ...v, [s.id]: e.target.checked }))} />
              <span>{s.name}</span>
            </label>
          ))}
        </fieldset>
      )}
      {ev.authorizations.length > 0 && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">{es ? "Autorizaciones" : "Authorizations"}</legend>
          {ev.authorizations.map((a) => (
            <label key={a.id} className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" checked={!!auths[a.id]} onChange={(e) => setAuths((v) => ({ ...v, [a.id]: e.target.checked }))} />
              <span>{a.required && <span className="mr-1 text-destructive">*</span>}{a.text}</span>
            </label>
          ))}
          {errors.accepted_authorizations && <p className="text-xs text-destructive">{errors.accepted_authorizations}</p>}
        </fieldset>
      )}
      {ev.disclaimer && (
        <div className="space-y-1">
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" checked={disclaimer} onChange={(e) => setDisclaimer(e.target.checked)} />
            <span><span className="mr-1 text-destructive">*</span>{ev.disclaimer}</span>
          </label>
          {errors.accepted_disclaimer && <p className="text-xs text-destructive">{errors.accepted_disclaimer}</p>}
        </div>
      )}
      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input type="checkbox" className="mt-1" checked={form.consent_comms} onChange={(e) => setForm((f) => ({ ...f, consent_comms: e.target.checked }))} />
        <span>{es ? "Acepto recibir comunicaciones de Defensores del CAA (opcional)." : "I agree to receive communications from Defensores del CAA (optional)."}</span>
      </label>
      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
        {es ? "Confirmar asistencia" : "Confirm attendance"}
      </Button>
    </form>
  );
}

// "Seguir": change notices and a reminder by email. A phone can be left too,
// but notices are only sent by email for now (no SMS provider).
function FollowForm({ ev, es }: { ev: Ev; es: boolean }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() && !phone.trim()) return setError(es ? "Deja tu correo o tu teléfono." : "Leave your email or phone.");
    if (!consent) return setError(es ? "Debes aceptar recibir los avisos." : "You must agree to receive the notices.");
    setBusy(true);
    try {
      await followEvent(ev.slug, { email: email.trim() || undefined, phone: phone.trim() || undefined, consent, website });
      setDone(true);
    } catch (err) {
      setError(err instanceof MembersApiError && err.status === 422
        ? (es ? "Revisa el correo o el teléfono." : "Check the email or phone.")
        : (es ? "No pudimos guardar tu suscripción." : "We could not save your subscription."));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-sm shadow-sm">
        <p className="flex items-center gap-2 font-semibold"><Bell className="h-4 w-4 text-primary" />{es ? "Ya sigues este evento" : "You follow this event"}</p>
        <p className="mt-1 text-muted-foreground">
          {email.trim()
            ? (es ? "Te avisaremos por correo si cambia algo y te recordaremos el día antes." : "We will email you if anything changes and remind you the day before.")
            : (es ? "Guardamos tu teléfono. Por ahora los avisos se envían solo por correo." : "We saved your phone. For now notices are only sent by email.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border bg-card p-6 shadow-sm">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold"><Bell className="h-5 w-5 text-primary" />{es ? "Seguir este evento" : "Follow this event"}</h2>
        <p className="text-sm text-muted-foreground">{es ? "Recibe avisos de cambios y un recordatorio." : "Get notices of changes and a reminder."}</p>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <Input type="email" placeholder={es ? "Correo electrónico" : "Email"} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <Input type="tel" placeholder={es ? "Teléfono (opcional)" : "Phone (optional)"} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{es ? "Acepto recibir avisos sobre este evento. Puedo darme de baja en cada correo." : "I agree to receive notices about this event. I can unsubscribe in every email."}</span>
      </label>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <Button type="submit" variant="outline" className="w-full" disabled={busy}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}{es ? "Seguir" : "Follow"}
      </Button>
    </form>
  );
}
