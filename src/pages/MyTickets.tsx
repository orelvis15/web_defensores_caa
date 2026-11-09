import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Printer, CalendarDays, MapPin, XCircle, Clock, Mail, Armchair, Pencil, Receipt as ReceiptIcon } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { MembersApiError } from "@/config/members";
import { getOrder, qrUrl, money, fmtWhen, updateGuest, type OrderTicket, type PublicOrder } from "@/config/tickets";

const DIETS = ["Vegetariana", "Vegana", "Sin gluten", "Sin mariscos", "Kosher", "Halal"];

/** Inline editor of a guest's name and preferences (buyer, until the event starts). */
function GuestEditor({ o, token, t, es, onDone }: { o: PublicOrder; token: string; t: OrderTicket; es: boolean; onDone: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState({ holder_name: t.guest_placeholder ? "" : t.holder_name, diet: t.diet || "", accessibility: t.accessibility || "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const save = async () => {
    setBusy(true);
    setError("");
    try {
      const updated = await updateGuest(o.code, token, t.code, f);
      qc.setQueryData<PublicOrder>(["tk-order", o.code, token], (prev) =>
        prev ? { ...prev, tickets: prev.tickets.map((x) => (x.code === t.code ? { ...x, ...updated } : x)) } : prev,
      );
      onDone();
    } catch (err) {
      setError(err instanceof MembersApiError ? err.message : es ? "No se pudo guardar." : "Could not save.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-2 border-t bg-muted/30 p-4 print:hidden">
      <Input placeholder={es ? "Nombre del invitado" : "Guest name"} value={f.holder_name} onChange={(e) => setF({ ...f, holder_name: e.target.value })} />
      <Input list="tk-diets" placeholder={es ? "Preferencia de comida (opcional)" : "Food preference (optional)"} value={f.diet} onChange={(e) => setF({ ...f, diet: e.target.value })} />
      <datalist id="tk-diets">{DIETS.map((d) => <option key={d} value={d} />)}</datalist>
      <Input placeholder={es ? "Necesidades de accesibilidad (opcional)" : "Accessibility needs (optional)"} value={f.accessibility} onChange={(e) => setF({ ...f, accessibility: e.target.value })} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onDone} disabled={busy}>{es ? "Cancelar" : "Cancel"}</Button>
        <Button size="sm" onClick={save} disabled={busy}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}{es ? "Guardar" : "Save"}</Button>
      </div>
    </div>
  );
}

/** The buyer's tickets (link in the confirmation e-mail and Stripe's return URL). */
export default function MyTickets() {
  const { code = "" } = useParams();
  const [params] = useSearchParams();
  const token = params.get("t") || "";
  const { language } = useLanguage();
  const es = language === "ES";
  const [editing, setEditing] = useState("");
  const { data: o, isLoading, isError } = useQuery({
    queryKey: ["tk-order", code, token],
    queryFn: () => getOrder(code, token),
    enabled: !!token,
    // Right after Checkout the payment may take a few seconds to settle.
    refetchInterval: (q) => (q.state.data?.status === "pending" ? 3000 : false),
  });

  if (!token || isError) {
    return (
      <Layout>
        <div className="container-wide max-w-xl py-24 text-center">
          <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-3 text-2xl font-bold">{es ? "No encontramos este pedido" : "Order not found"}</h1>
          <p className="mt-2 text-muted-foreground">{es ? "Revisa el enlace del correo de confirmación." : "Check the link in your confirmation e-mail."}</p>
        </div>
      </Layout>
    );
  }
  if (isLoading || !o) {
    return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }

  const ev = o.event;
  return (
    <Layout>
      <section className="py-10 print:py-0">
        <div className="container-wide max-w-3xl">
          {o.status === "paid" && (
            <div className="mb-8 text-center print:hidden">
              <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
              <h1 className="mt-3 text-3xl font-bold">{es ? "¡Listo! Tus entradas" : "All set! Your tickets"}</h1>
              <p className="mt-2 text-muted-foreground">
                {es ? "Pedido" : "Order"} <span className="font-mono font-semibold">{o.code}</span> · {o.quantity} {o.quantity === 1 ? (es ? "entrada" : "ticket") : (es ? "entradas" : "tickets")}
                {o.total_cents > 0 && ` · ${money(o.total_cents)}`}
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {o.email_sent_at
                  ? (es ? `Te las enviamos también a ${o.buyer_email}.` : `We also e-mailed them to ${o.buyer_email}.`)
                  : (es ? "Guarda esta página (o imprímela): es tu comprobante. Cada persona presenta su código QR en la entrada." : "Save or print this page: it is your receipt. Each person shows their QR code at the door.")}
              </p>
              <Button variant="outline" className="mt-4" onClick={() => window.print()}><Printer className="h-4 w-4" />{es ? "Imprimir entradas" : "Print tickets"}</Button>
            </div>
          )}
          {o.status === "pending" && (
            <div className="py-16 text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <h1 className="mt-3 text-2xl font-bold">{es ? "Confirmando tu pago…" : "Confirming your payment…"}</h1>
              <p className="mt-2 text-muted-foreground">{es ? "Esto tarda unos segundos. No cierres esta página." : "This takes a few seconds. Do not close this page."}</p>
            </div>
          )}
          {(o.status === "expired" || o.status === "cancelled") && (
            <div className="py-16 text-center">
              {o.status === "expired" ? <Clock className="mx-auto h-12 w-12 text-muted-foreground" /> : <XCircle className="mx-auto h-12 w-12 text-destructive" />}
              <h1 className="mt-3 text-2xl font-bold">{o.status === "expired" ? (es ? "El pago no se completó" : "The payment was not completed") : (es ? "Pedido cancelado" : "Order cancelled")}</h1>
              <Link to={`/eventos/${ev.slug}`} className="mt-4 inline-block text-primary hover:underline">{es ? "Volver al evento" : "Back to the event"}</Link>
            </div>
          )}

          {o.status === "paid" && (
            <div className="space-y-5">
              {o.tickets.map((t) => (
                <div key={t.code} className="break-inside-avoid overflow-hidden rounded-2xl border-2 border-dashed bg-card">
                  <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">{t.type_name}</p>
                      <p className={`text-2xl font-bold ${t.guest_placeholder ? "italic text-muted-foreground" : ""}`}>{t.holder_name}</p>
                      {t.guest_placeholder && <p className="text-xs font-medium text-amber-600 print:hidden">{es ? "Pendiente de nombre" : "Name pending"}</p>}
                      {t.table_label && <p className="flex items-center gap-2 font-semibold text-primary"><Armchair className="h-4 w-4" />{t.table_label}{t.seat ? ` · ${es ? "Silla" : "Seat"} ${t.seat}` : ""}</p>}
                      {(t.diet || t.accessibility) && <p className="text-sm text-muted-foreground">{[t.diet, t.accessibility].filter(Boolean).join(" · ")}</p>}
                      <p className="font-semibold">{ev.name}</p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{fmtWhen(ev.starts_at, es)}{ev.doors_open ? ` · ${es ? "puertas" : "doors"} ${ev.doors_open}` : ""}</p>
                      {(ev.venue_name || ev.venue_address) && <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{[ev.venue_name, ev.venue_address].filter(Boolean).join(" · ")}</p>}
                      <p className="pt-2 text-xs text-muted-foreground">{es ? "Código" : "Code"}</p>
                      <p className="font-mono text-xl font-bold tracking-widest">{t.code}</p>
                      {t.status === "used" && <p className="text-sm font-medium text-green-700">{es ? "Ya se usó para entrar" : "Already used"}</p>}
                      {t.status === "void" && <p className="text-sm font-medium text-destructive">{es ? "Entrada anulada" : "Ticket void"}</p>}
                    </div>
                    <img src={qrUrl(o.code, token, t.code)} alt={`QR ${t.code}`} className="mx-auto h-48 w-48 rounded-lg bg-white p-1" />
                  </div>
                  {o.can_edit_guests && t.status === "valid" && editing !== t.code && (
                    <div className="border-t px-5 py-2 text-right print:hidden">
                      <Button variant="ghost" size="sm" onClick={() => setEditing(t.code)}><Pencil className="h-4 w-4" />{es ? "Nombre y preferencias" : "Name and preferences"}</Button>
                    </div>
                  )}
                  {editing === t.code && <GuestEditor o={o} token={token} t={t} es={es} onDone={() => setEditing("")} />}
                </div>
              ))}
              {o.receipt && o.receipt.statement && (
                <div className="break-inside-avoid rounded-2xl border bg-card p-5">
                  <p className="flex items-center gap-2 font-semibold"><ReceiptIcon className="h-4 w-4" />{es ? "Recibo para impuestos" : "Tax receipt"}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.receipt.statement}</p>
                  {o.receipt.lines.length > 0 && o.receipt.fair_value_cents > 0 && (
                    <table className="mt-3 w-full text-sm">
                      <thead className="text-left text-xs text-muted-foreground">
                        <tr><th className="py-1 font-medium">{es ? "Entrada" : "Ticket"}</th><th className="py-1 text-right font-medium">{es ? "Pagado" : "Paid"}</th><th className="py-1 text-right font-medium">{es ? "Valor recibido" : "Value received"}</th><th className="py-1 text-right font-medium">{es ? "Deducible" : "Deductible"}</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {o.receipt.lines.map((l, i) => (
                          <tr key={i}>
                            <td className="py-1">{l.quantity} × {l.name}</td>
                            <td className="py-1 text-right">{money(l.unit_cents * l.quantity)}</td>
                            <td className="py-1 text-right">{money(l.fair_value_cents)}</td>
                            <td className="py-1 text-right">{money(l.deductible_cents)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">{es ? "Las donaciones puras se registran aparte." : "Pure donations are recorded separately."}</p>
                </div>
              )}
              {ev.contact_email && <p className="text-center text-sm text-muted-foreground print:hidden">{es ? "¿Preguntas?" : "Questions?"} <a className="text-primary" href={`mailto:${ev.contact_email}`}>{ev.contact_email}</a></p>}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
