import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { membersApi } from "@/config/members";
import { ArrowLeft, Camera, Film, Images, Loader2, X } from "lucide-react";

type GallerySummary = {
  event_id: string;
  name: string;
  date: string;
  chapter_name?: string;
  activity_type?: string;
  cover_url?: string;
  photos: number;
  videos: number;
};

type MediaItem = {
  id: string;
  kind: string; // photo | video | link
  url?: string;
  embed_url?: string;
  thumb_url?: string;
  description?: string;
};

type GalleryDetail = {
  event: { id: string; name: string; date: string; description?: string; address?: string };
  items: MediaItem[];
};

const fmtDate = (d: string, es: boolean) => {
  if (!d) return "";
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString(es ? "es-US" : "en-US", { day: "numeric", month: "long", year: "numeric" });
};

function GalleryList({ es }: { es: boolean }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-galleries"],
    queryFn: () => membersApi<GallerySummary[]>("/api/public/galleries"),
    staleTime: 5 * 60_000,
  });
  if (isLoading) return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (isError) return <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar la galería." : "We could not load the gallery."}</p>;
  if (!data?.length) return <p className="py-16 text-center text-muted-foreground">{es ? "Aún no hay galerías publicadas." : "No galleries published yet."}</p>;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((g) => (
        <Link key={g.event_id} to={`/galeria/${g.event_id}`} className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
          <div className="aspect-video bg-muted">
            {g.cover_url ? <img src={g.cover_url} alt={g.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]" />
              : <div className="flex h-full items-center justify-center"><Images className="h-10 w-10 text-muted-foreground" /></div>}
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-foreground">{g.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{fmtDate(g.date, es)}{g.chapter_name ? ` · ${g.chapter_name}` : ""}</p>
            <p className="mt-2 flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Camera className="h-3.5 w-3.5" />{g.photos}</span>
              <span className="flex items-center gap-1"><Film className="h-3.5 w-3.5" />{g.videos}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function GalleryEvent({ id, es }: { id: string; es: boolean }) {
  const [open, setOpen] = useState<MediaItem | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-gallery", id],
    queryFn: () => membersApi<GalleryDetail>(`/api/public/galleries/${id}`),
  });
  if (isLoading) return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (isError || !data) return <p className="py-16 text-center text-muted-foreground">{es ? "Galería no disponible." : "Gallery not available."}</p>;
  return (
    <>
      <Link to="/galeria" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft className="h-4 w-4" />{es ? "Todas las galerías" : "All galleries"}</Link>
      <h2 className="text-2xl font-bold text-foreground">{data.event.name}</h2>
      <p className="mt-1 text-muted-foreground">{fmtDate(data.event.date, es)}{data.event.address ? ` · ${data.event.address}` : ""}</p>
      {data.event.description && <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{data.event.description}</p>}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {data.items.map((m) => m.kind === "photo" ? (
          <button key={m.id} type="button" onClick={() => setOpen(m)} className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img src={m.thumb_url || m.url} alt={m.description || data.event.name} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ) : (
          <div key={m.id} className="col-span-2 aspect-video overflow-hidden rounded-lg bg-black">
            {m.embed_url ? <iframe src={m.embed_url} title={m.description || "video"} className="h-full w-full" allowFullScreen />
              : <video src={m.url} controls className="h-full w-full" />}
          </div>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setOpen(null)} role="dialog">
          <button type="button" className="absolute right-4 top-4 text-white" aria-label={es ? "Cerrar" : "Close"}><X className="h-7 w-7" /></button>
          <figure className="max-h-full max-w-5xl">
            <img src={open.url} alt={open.description || ""} className="max-h-[85vh] rounded-lg object-contain" />
            {open.description && <figcaption className="mt-2 text-center text-sm text-white/80">{open.description}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}

export default function Gallery() {
  const { id } = useParams();
  const { language } = useLanguage();
  const es = language === "ES";
  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="container-wide max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Memoria de la Fundación" : "Foundation memories"}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">{es ? "Fotos y videos de nuestros eventos y actividades." : "Photos and videos from our events and activities."}</p>
        </div>
      </section>
      <section className="py-10"><div className="container-wide max-w-6xl">{id ? <GalleryEvent id={id} es={es} /> : <GalleryList es={es} />}</div></section>
    </Layout>
  );
}
