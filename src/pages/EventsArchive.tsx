import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, History, Images, Loader2, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { eventWhen, listEventsArchive } from "@/config/communityEvents";

/** /eventos/archivo — past events with their photos (Memoria de la ONG). */
export default function EventsArchive() {
  const { language } = useLanguage();
  const es = language === "ES";
  const { data, isLoading, isError } = useQuery({ queryKey: ["public-events-archive"], queryFn: listEventsArchive });
  const items = data?.items || [];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container-wide max-w-5xl text-center">
          <Link to="/eventos" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />{es ? "Próximos eventos" : "Upcoming events"}
          </Link>
          <p className="mb-3 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <History className="h-4 w-4" />{es ? "Archivo" : "Archive"}
            </span>
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Eventos pasados" : "Past events"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {es ? "Lo que hemos hecho juntos, con sus fotos." : "What we have done together, with photos."}
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-wide max-w-5xl">
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar el archivo. Inténtalo más tarde." : "We could not load the archive. Please try later."}</p>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "Todavía no hay eventos pasados publicados." : "There are no published past events yet."}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((ev) => {
                const cover = ev.gallery?.cover_url || ev.image_url;
                return (
                  <article key={ev.slug} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <Link to={`/evento/${ev.slug}`} className="block">
                      {cover
                        ? <img src={cover} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                        : <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5"><CalendarDays className="h-10 w-10 text-primary/60" /></div>}
                    </Link>
                    <div className="space-y-2 p-5">
                      {ev.chapter_name && <p className="text-xs font-semibold uppercase tracking-wide text-primary">{ev.chapter_name}</p>}
                      <h2 className="text-lg font-bold text-foreground"><Link to={`/evento/${ev.slug}`} className="hover:text-primary">{ev.name}</Link></h2>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" /><span className="first-letter:uppercase">{eventWhen(ev, es)}</span></p>
                      {ev.address && <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{ev.address}</p>}
                      {ev.gallery && (
                        <Link to={`/galeria/${ev.id}`} className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary hover:underline">
                          <Images className="h-4 w-4" />{es ? `${ev.gallery.photos} fotos` : `${ev.gallery.photos} photos`}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
