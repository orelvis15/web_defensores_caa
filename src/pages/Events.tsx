import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Ticket, Loader2, History, Video, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { listEvents, money, fmtWhen } from "@/config/tickets";
import { eventWhen, listCommunityEvents } from "@/config/communityEvents";

export default function Events() {
  const { language } = useLanguage();
  const es = language === "ES";
  // Galas with ticket sales (tickets module) and the organization's events
  // published from the admin (events module) are listed side by side.
  const tickets = useQuery({ queryKey: ["tk-public-events"], queryFn: listEvents });
  const community = useQuery({ queryKey: ["public-events"], queryFn: listCommunityEvents });
  const items = tickets.data?.items || [];
  const events = community.data?.items || [];
  const loading = tickets.isLoading || community.isLoading;
  const failed = tickets.isError && community.isError;

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container-wide max-w-5xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <CalendarDays className="h-4 w-4" /> {es ? "Eventos" : "Events"}
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Eventos" : "Events"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {es
              ? "Talleres, ferias y encuentros de la comunidad, y nuestras galas con entradas en línea."
              : "Community workshops, fairs and gatherings, and our galas with online tickets."}
          </p>
          <Link to="/eventos/archivo" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <History className="h-4 w-4" />{es ? "Ver eventos pasados" : "See past events"}
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide max-w-5xl space-y-14">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : failed ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar los eventos. Inténtalo más tarde." : "We could not load the events. Please try later."}</p>
          ) : events.length === 0 && items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No hay eventos próximos en este momento." : "There are no upcoming events right now."}</p>
          ) : (
            <>
              {events.length > 0 && (
                <div>
                  <h2 className="mb-5 text-2xl font-bold text-foreground">{es ? "Próximos eventos" : "Upcoming events"}</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {events.map((ev) => (
                      <Link key={ev.slug} to={`/evento/${ev.slug}`} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
                        {ev.image_url ? (
                          <img src={ev.image_url} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                        ) : (
                          <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5"><CalendarDays className="h-12 w-12 text-primary/60" /></div>
                        )}
                        <div className="space-y-2 p-5">
                          {ev.chapter_name && <p className="text-xs font-semibold uppercase tracking-wide text-primary">{ev.chapter_name}</p>}
                          <h3 className={`text-xl font-bold text-foreground group-hover:text-primary ${ev.status === "cancelled" ? "line-through" : ""}`}>{ev.name}</h3>
                          <p className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" /><span className="first-letter:uppercase">{eventWhen(ev, es)}</span></p>
                          {ev.address
                            ? <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{ev.address}</p>
                            : ev.online_url && <p className="flex items-center gap-2 text-sm text-muted-foreground"><Video className="h-4 w-4" />{es ? "En línea" : "Online"}</p>}
                          {ev.summary && <p className="text-sm text-foreground/80">{ev.summary}</p>}
                          <div className="flex justify-end pt-2">
                            {ev.status === "cancelled" ? (
                              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">{es ? "Cancelado" : "Cancelled"}</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                <CheckCircle2 className="h-3.5 w-3.5" />{es ? "Asistiré" : "I'll attend"}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {items.length > 0 && (
                <div>
                  <h2 className="mb-1 text-2xl font-bold text-foreground">{es ? "Galas y entradas" : "Galas & tickets"}</h2>
                  <p className="mb-5 text-sm text-muted-foreground">
                    {es
                      ? "Compra tus entradas en línea. Cada persona recibe su propia entrada con un código QR."
                      : "Buy your tickets online. Each person gets their own ticket with a QR code."}
                  </p>
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
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary">{ev.name}</h3>
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
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
