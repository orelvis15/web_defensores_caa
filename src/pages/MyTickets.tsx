import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Printer, CalendarDays, MapPin, XCircle, Clock, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getOrder, qrUrl, money, fmtWhen } from "@/config/tickets";

/** The buyer's tickets (link in the confirmation e-mail and Stripe's return URL). */
export default function MyTickets() {
  const { code = "" } = useParams();
  const [params] = useSearchParams();
  const token = params.get("t") || "";
  const { language } = useLanguage();
  const es = language === "ES";
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
                      <p className="text-2xl font-bold">{t.holder_name}</p>
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
                </div>
              ))}
              {ev.contact_email && <p className="text-center text-sm text-muted-foreground print:hidden">{es ? "¿Preguntas?" : "Questions?"} <a className="text-primary" href={`mailto:${ev.contact_email}`}>{ev.contact_email}</a></p>}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
