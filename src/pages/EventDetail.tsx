import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CalendarPlus, Clock, ExternalLink, Mail, MapPin, DoorOpen, Shirt, Minus, Plus, Loader2, Lock, ArrowLeft, Ticket, Users, type LucideIcon } from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { MembersApiError } from "@/config/members";
import { getEvent, startTicketCheckout, money, fmtDate, fmtTimeRange, calendarUrl, mapsUrl, type PublicEvent } from "@/config/tickets";

export default function EventDetail() {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const es = language === "ES";
  const { data: ev, isLoading, isError } = useQuery({ queryKey: ["tk-public-event", slug], queryFn: () => getEvent(slug) });

  const [qty, setQty] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "", website: "" });
  const [names, setNames] = useState<string[]>([]);
  const [accept, setAccept] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = useMemo(
    () => (ev?.ticket_types || []).reduce((s, t) => s + t.price_cents * (qty[t.id] || 0), 0),
    [ev, qty],
  );
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const change = (id: string, delta: number, remaining: number | null) => {
    setQty((q) => {
      const cur = q[id] || 0;
      let next = Math.max(0, cur + delta);
      if (remaining !== null) next = Math.min(next, remaining);
      if (ev && delta > 0 && count >= ev.max_per_order) next = cur;
      return { ...q, [id]: next };
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ev) return;
    setError("");
    if (!accept) {
      setError(es ? "Debes aceptar los términos y la política de privacidad." : "You must accept the terms and privacy policy.");
      return;
    }
    setBusy(true);
    try {
      const out = await startTicketCheckout({
        event: ev.slug,
        items: Object.entries(qty).filter(([, n]) => n > 0).map(([type_id, quantity]) => ({ type_id, quantity })),
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        attendees: ev.collect_names ? [form.name, ...names.slice(1)] : undefined,
        accept_terms: accept,
        website: form.website,
      });
      window.location.href = out.url;
    } catch (err) {
      setError(err instanceof MembersApiError ? err.message : es ? "No se pudo iniciar la compra. Inténtalo de nuevo." : "Could not start the purchase. Please try again.");
      setBusy(false);
    }
  };

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

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container-wide max-w-6xl pb-12 pt-8 md:pb-16">
          <Link to="/eventos" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />{es ? "Todos los eventos" : "All events"}
          </Link>
          <div className={ev.image_url ? "grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center lg:gap-12" : "max-w-3xl"}>
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <StatusBadge ev={ev} es={es} />
                {ev.chapter_name && (
                  <span className="rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">{ev.chapter_name}</span>
                )}
              </div>
              <h1 className="text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl">{ev.name}</h1>
              {ev.summary && <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">{ev.summary}</p>}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /><span className="first-letter:uppercase">{fmtDate(ev.starts_at, es)}</span></span>
                {ev.venue_name && <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />{ev.venue_name}</span>}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {ev.on_sale && (
                  <Button size="lg" onClick={() => document.getElementById("entradas")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <Ticket className="h-4 w-4" />
                    {es ? "Comprar entradas" : "Get tickets"}
                    {ev.min_price_cents > 0 && <span className="opacity-80">· {es ? "desde" : "from"} {money(ev.min_price_cents)}</span>}
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild>
                  <a href={calendarUrl(ev)} target="_blank" rel="noopener noreferrer"><CalendarPlus className="h-4 w-4" />{es ? "Añadir al calendario" : "Add to calendar"}</a>
                </Button>
              </div>
            </div>
            {ev.image_url && (
              <div className="relative">
                <div className="absolute -inset-3 -z-10 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
                <img src={ev.image_url} alt={ev.name} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-black/5" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-wide grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0 space-y-10">
            {/* Key details */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{es ? "Detalles del evento" : "Event details"}</h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                <Detail icon={CalendarDays} label={es ? "Fecha" : "Date"}>
                  <span className="first-letter:uppercase">{fmtDate(ev.starts_at, es)}</span>
                </Detail>
                <Detail icon={Clock} label={es ? "Horario" : "Time"}>{fmtTimeRange(ev.starts_at, ev.ends_at, es)}</Detail>
                {ev.doors_open && <Detail icon={DoorOpen} label={es ? "Apertura de puertas" : "Doors open"}>{ev.doors_open}</Detail>}
                {ev.dress_code && <Detail icon={Shirt} label={es ? "Vestimenta" : "Dress code"}>{ev.dress_code}</Detail>}
                {(ev.venue_name || ev.venue_address) && (
                  <Detail icon={MapPin} label={es ? "Lugar" : "Venue"} wide>
                    {ev.venue_name && <span className="block">{ev.venue_name}</span>}
                    {ev.venue_address && <span className="block font-normal text-muted-foreground">{ev.venue_address}</span>}
                    <a href={mapsUrl(ev)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      {es ? "Ver en el mapa" : "View on map"}<ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Detail>
                )}
                {ev.chapter_name && <Detail icon={Users} label={es ? "Organiza" : "Hosted by"}>{ev.chapter_name}</Detail>}
                {ev.contact_email && (
                  <Detail icon={Mail} label={es ? "Contacto" : "Contact"}>
                    <a href={`mailto:${ev.contact_email}`} className="break-all text-primary hover:underline">{ev.contact_email}</a>
                  </Detail>
                )}
              </dl>
            </div>

            {ev.description && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">{es ? "Sobre el evento" : "About the event"}</h2>
                <Markdown>{ev.description}</Markdown>
              </div>
            )}
          </div>

          <div id="entradas" className="h-fit scroll-mt-24 rounded-2xl border bg-card p-6 shadow-lg lg:sticky lg:top-24">
            {params.get("cancelado") && (
              <p className="mb-4 rounded-lg bg-muted p-3 text-sm">{es ? "No se completó el pago. Puedes intentarlo de nuevo." : "The payment was not completed. You can try again."}</p>
            )}
            {!ev.on_sale ? (
              <div className="text-center">
                <Ticket className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 font-semibold">
                  {ev.status === "cancelled" ? (es ? "Evento cancelado" : "Event cancelled") : ev.sold_out ? (es ? "Entradas agotadas" : "Sold out") : (es ? "La venta de entradas está cerrada" : "Ticket sales are closed")}
                </p>
                {ev.contact_email && <p className="mt-2 text-sm text-muted-foreground">{es ? "Consultas" : "Questions"}: <a className="text-primary" href={`mailto:${ev.contact_email}`}>{ev.contact_email}</a></p>}
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <h2 className="text-lg font-semibold">{es ? "Entradas" : "Tickets"}</h2>
                <div className="divide-y rounded-lg border">
                  {ev.ticket_types.map((t) => (
                    <div key={t.id} className="flex items-center justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="font-medium">{t.name}</p>
                        {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
                        <p className="text-sm">{t.price_cents === 0 ? (es ? "Gratis" : "Free") : money(t.price_cents)}
                          {t.remaining !== null && !t.sold_out && t.remaining <= 20 && <span className="ml-2 text-xs text-amber-600">{es ? `Quedan ${t.remaining}` : `${t.remaining} left`}</span>}
                        </p>
                      </div>
                      {t.sold_out ? (
                        <span className="text-sm font-medium text-muted-foreground">{es ? "Agotado" : "Sold out"}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => change(t.id, -1, t.remaining)} aria-label="-"><Minus className="h-4 w-4" /></Button>
                          <span className="w-6 text-center font-semibold">{qty[t.id] || 0}</span>
                          <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => change(t.id, 1, t.remaining)} aria-label="+"><Plus className="h-4 w-4" /></Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{es ? `Máximo ${ev.max_per_order} entradas por compra.` : `Up to ${ev.max_per_order} tickets per order.`}</p>

                {count > 0 && (
                  <>
                    <div className="space-y-3">
                      <Input required placeholder={es ? "Nombre completo" : "Full name"} value={form.name} onChange={set("name")} autoComplete="name" />
                      <Input required type="email" placeholder={es ? "Correo electrónico" : "Email"} value={form.email} onChange={set("email")} autoComplete="email" />
                      <Input type="tel" placeholder={es ? "Teléfono" : "Phone"} value={form.phone} onChange={set("phone")} autoComplete="tel" />
                      <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />
                    </div>
                    {ev.collect_names && count > 1 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{es ? "Nombre de cada asistente" : "Each attendee's name"}</p>
                        <p className="text-xs text-muted-foreground">{es ? "Cada persona recibe su propia entrada con QR." : "Each person gets their own QR ticket."}</p>
                        {Array.from({ length: count - 1 }).map((_, i) => (
                          <Input key={i} placeholder={`${es ? "Acompañante" : "Guest"} ${i + 1}`} value={names[i + 1] || ""}
                            onChange={(e) => setNames((n) => { const c = [...n]; c[i + 1] = e.target.value; return c; })} />
                        ))}
                      </div>
                    )}
                    <Textarea rows={2} placeholder={es ? "Notas (restricciones alimentarias, accesibilidad…)" : "Notes (dietary needs, accessibility…)"} value={form.notes} onChange={set("notes")} />
                    <label className="flex items-start gap-2 text-sm">
                      <input type="checkbox" className="mt-1" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                      <span>
                        {es ? "Acepto los " : "I accept the "}
                        <Link to="/terms" className="text-primary hover:underline" target="_blank">{es ? "términos" : "terms"}</Link>
                        {es ? " y la " : " and the "}
                        <Link to="/privacy" className="text-primary hover:underline" target="_blank">{es ? "política de privacidad" : "privacy policy"}</Link>.
                      </span>
                    </label>
                    <div className="flex items-center justify-between border-t pt-4">
                      <span className="text-sm text-muted-foreground">{count} {count === 1 ? (es ? "entrada" : "ticket") : (es ? "entradas" : "tickets")}</span>
                      <span className="text-2xl font-bold">{total === 0 ? (es ? "Gratis" : "Free") : money(total)}</span>
                    </div>
                  </>
                )}
                {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
                <Button type="submit" size="lg" className="w-full" disabled={count === 0 || busy}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : total > 0 ? <Lock className="h-4 w-4" /> : <Ticket className="h-4 w-4" />}
                  {total > 0 ? (es ? "Pagar con tarjeta" : "Pay by card") : (es ? "Reservar entradas" : "Get tickets")}
                </Button>
                {total > 0 && <p className="text-center text-xs text-muted-foreground">{es ? "Pago seguro con Stripe." : "Secure payment with Stripe."}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Detail({ icon: Icon, label, wide, children }: { icon: LucideIcon; label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex gap-4 rounded-xl border bg-card p-4 shadow-sm ${wide ? "sm:col-span-2" : ""}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 font-medium text-foreground">{children}</dd>
      </div>
    </div>
  );
}

function StatusBadge({ ev, es }: { ev: PublicEvent; es: boolean }) {
  const [label, cls] =
    ev.status === "cancelled" ? [es ? "Cancelado" : "Cancelled", "bg-destructive/10 text-destructive"]
    : ev.status === "finished" ? [es ? "Finalizado" : "Ended", "bg-muted text-muted-foreground"]
    : ev.sold_out ? [es ? "Agotado" : "Sold out", "bg-amber-500/15 text-amber-700"]
    : ev.on_sale ? [es ? "Entradas a la venta" : "Tickets on sale", "bg-emerald-500/15 text-emerald-700"]
    : [es ? "Venta cerrada" : "Sales closed", "bg-muted text-muted-foreground"];
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{label}</span>;
}
