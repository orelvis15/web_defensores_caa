import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Ticket, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { listEvents, money, fmtWhen } from "@/config/tickets";

export default function Events() {
  const { language } = useLanguage();
  const es = language === "ES";
  const { data, isLoading, isError } = useQuery({ queryKey: ["tk-public-events"], queryFn: listEvents });
  const items = data?.items || [];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container-wide max-w-5xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Ticket className="h-4 w-4" /> {es ? "Eventos" : "Events"}
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Galas y eventos" : "Galas & events"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {es
              ? "Compra tus entradas en línea. Cada persona recibe su propia entrada con un código QR."
              : "Buy your tickets online. Each person gets their own ticket with a QR code."}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide max-w-5xl">
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar los eventos. Inténtalo más tarde." : "We could not load the events. Please try later."}</p>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No hay eventos a la venta en este momento." : "There are no events on sale right now."}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((ev) => (
                <Link key={ev.slug} to={`/eventos/${ev.slug}`} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
                  {ev.image_url ? (
                    <img src={ev.image_url} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5"><Ticket className="h-12 w-12 text-primary/60" /></div>
                  )}
                  <div className="space-y-2 p-5">
                    {ev.chapter_name && <p className="text-xs font-semibold uppercase tracking-wide text-primary">{ev.chapter_name}</p>}
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary">{ev.name}</h2>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{fmtWhen(ev.starts_at, es)}</p>
                    {ev.venue_name && <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{ev.venue_name}</p>}
                    {ev.summary && <p className="text-sm text-foreground/80">{ev.summary}</p>}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-semibold">
                        {ev.min_price_cents === 0 ? (es ? "Gratis" : "Free") : `${es ? "Desde" : "From"} ${money(ev.min_price_cents)}`}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ev.on_sale ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {ev.on_sale ? (es ? "Comprar entradas" : "Get tickets") : ev.sold_out ? (es ? "Agotado" : "Sold out") : (es ? "Venta cerrada" : "Sales closed")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
