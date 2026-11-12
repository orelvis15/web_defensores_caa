import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Camera, ExternalLink, Film, Images, Loader2, MapPin, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ShareButton } from "@/components/share/ShareButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { albumPath, getMemoryAlbum, listMemoryAlbums, longDate, type MemoryAlbum } from "@/config/memory";
import { MemoryLightbox, MemoryVideo } from "@/components/memory/MemoryLightbox";
import { MemoryTile } from "@/components/memory/MemoryTile";

const selectCls =
  "h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Spinner() {
  return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
}

function AlbumMeta({ a, es }: { a: MemoryAlbum; es: boolean }) {
  return (
    <div className="space-y-1 text-sm text-muted-foreground">
      <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0" />{longDate(a.date, es)}</p>
      {a.place && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" />{a.place}</p>}
      {a.chapter_name && <p className="flex items-center gap-2"><Users className="h-4 w-4 shrink-0" />{es ? "Capítulo" : "Chapter"} {a.chapter_name}</p>}
    </div>
  );
}

/** /memoria — one album per event, newest first, with filters. */
function AlbumList({ es }: { es: boolean }) {
  const [sp, setSp] = useSearchParams();
  const year = sp.get("anio") || "";
  const type = sp.get("tipo") || "";
  const chapter = sp.get("capitulo") || "";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["memory-albums", year, type, chapter],
    queryFn: () => listMemoryAlbums({ year, type, chapter }),
    staleTime: 5 * 60_000,
  });
  const setFilter = (k: string, v: string) => {
    const next = new URLSearchParams(sp);
    if (v) next.set(k, v);
    else next.delete(k);
    setSp(next, { replace: true });
  };
  const f = data?.filters;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select aria-label={es ? "Año" : "Year"} className={selectCls} value={year} onChange={(e) => setFilter("anio", e.target.value)}>
          <option value="">{es ? "Todos los años" : "All years"}</option>
          {(f?.years || []).map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select aria-label={es ? "Tipo de evento" : "Event type"} className={selectCls} value={type} onChange={(e) => setFilter("tipo", e.target.value)}>
          <option value="">{es ? "Todo tipo de evento" : "All event types"}</option>
          {(f?.types || []).map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
        </select>
        <select aria-label={es ? "Capítulo" : "Chapter"} className={selectCls} value={chapter} onChange={(e) => setFilter("capitulo", e.target.value)}>
          <option value="">{es ? "Todos los capítulos" : "All chapters"}</option>
          {(f?.chapters || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      {isLoading ? <Spinner /> : isError ? (
        <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar la Memoria. Inténtalo más tarde." : "We could not load the memories. Please try later."}</p>
      ) : !data?.items.length ? (
        <p className="py-16 text-center text-muted-foreground">
          {year || type || chapter ? (es ? "No hay álbumes con estos filtros." : "No albums match these filters.") : es ? "Aún no hay álbumes publicados." : "No albums published yet."}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((a) => (
            <article key={a.id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md">
              <Link to={albumPath(a.id)} className="block">
                <div className="aspect-[4/3] bg-muted">
                  {a.cover_thumb_url ? (
                    <img src={a.cover_thumb_url} alt={a.cover_alt || a.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5"><Images className="h-10 w-10 text-primary/60" /></div>
                  )}
                </div>
              </Link>
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{a.type_label}</p>
                <h2 className="text-lg font-bold leading-snug text-foreground"><Link to={albumPath(a.id)} className="hover:text-primary">{a.name}</Link></h2>
                <AlbumMeta a={a} es={es} />
                {a.description && <p className="line-clamp-3 text-sm text-muted-foreground">{a.description}</p>}
                <p className="flex gap-4 pt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Camera className="h-3.5 w-3.5" />{a.photos} {es ? "fotos" : "photos"}</span>
                  {a.videos > 0 && <span className="flex items-center gap-1"><Film className="h-3.5 w-3.5" />{a.videos} {es ? "videos" : "videos"}</span>}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

/** /memoria/:eventId — every published photo and video of one event. */
function Album({ id, es }: { id: string; es: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const { data, isLoading, isError } = useQuery({ queryKey: ["memory-album", id], queryFn: () => getMemoryAlbum(id), staleTime: 5 * 60_000 });
  if (isLoading) return <Spinner />;
  if (isError || !data) return <p className="py-16 text-center text-muted-foreground">{es ? "Este álbum no está disponible." : "This album is not available."}</p>;
  const { album: a, items } = data;
  const photos = items.filter((m) => m.kind === "photo");
  const videos = items.filter((m) => m.kind !== "photo");

  return (
    <>
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{a.type_label}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{a.name}</h2>
          <AlbumMeta a={a} es={es} />
          {a.description && <p className="max-w-3xl whitespace-pre-line text-muted-foreground">{a.description}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          {a.slug && (
            <Link to={`/evento/${a.slug}`} className="inline-flex h-11 items-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-accent">
              {es ? "Página del evento" : "Event page"}<ExternalLink className="h-4 w-4" />
            </Link>
          )}
          <ShareButton
            url={albumPath(a.id)}
            title={a.name}
            text={es ? `Fotos y videos: ${a.name}` : `Photos and videos: ${a.name}`}
            label={es ? "Compartir álbum" : "Share album"}
          />
        </div>
      </div>

      {videos.length > 0 && (
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {videos.map((v) => (
            <figure key={v.id}>
              <MemoryVideo item={v} />
              {v.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{v.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((m, i) => (
          <li key={m.id}>
            <MemoryTile item={m} es={es} onOpen={() => setOpen(i)} className="aspect-square" />
            {m.caption && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.caption}</p>}
          </li>
        ))}
      </ul>
      {open != null && <MemoryLightbox items={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} es={es} />}
    </>
  );
}

export default function Memory() {
  const { eventId } = useParams();
  const { language } = useLanguage();
  const es = language === "ES";
  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container-wide max-w-6xl">
          {eventId ? (
            <Link to="/memoria" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />{es ? "Toda la Memoria" : "All memories"}
            </Link>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Nuestra Memoria" : "Our Memories"}</h1>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
                {es ? "Fotos y videos de nuestros eventos, un álbum por evento." : "Photos and videos of our events, one album per event."}
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="pb-16 pt-4">
        <div className="container-wide max-w-6xl">{eventId ? <Album id={eventId} es={es} /> : <AlbumList es={es} />}</div>
      </section>
    </Layout>
  );
}
