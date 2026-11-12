import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { albumPath, monthYear, type MemoryItem } from "@/config/memory";

type Props = {
  items: MemoryItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  es: boolean;
  /** Show the event of each item with a link to its album (home page). */
  showEvent?: boolean;
};

/** Plays an uploaded video, or embeds a YouTube/Vimeo/Facebook player. */
export function MemoryVideo({ item, className = "" }: { item: MemoryItem; className?: string }) {
  if (item.embed_url) {
    return (
      <div className={`aspect-video w-full overflow-hidden rounded-lg bg-black ${className}`}>
        <iframe
          src={item.embed_url}
          title={item.alt || "Video"}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }
  return <video src={item.url} controls preload="metadata" className={`max-h-[75vh] w-full rounded-lg bg-black ${className}`} />;
}

/**
 * Full-screen gallery viewer: the photo in full size (only loaded when
 * opened), arrows, keyboard (← → Esc) and swipe on phones; videos play
 * inside the page.
 */
export function MemoryLightbox({ items, index, onIndex, onClose, es, showEvent }: Props) {
  const item = items[index];
  const touchX = useRef<number | null>(null);
  const n = items.length;
  const prev = () => onIndex((index - 1 + n) % n);
  const next = () => onIndex((index + 1) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && n > 1) onIndex((index - 1 + n) % n);
      else if (e.key === "ArrowRight" && n > 1) onIndex((index + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, n, onClose, onIndex]);

  if (!item) return null;
  const isPhoto = item.kind === "photo";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={es ? "Galería de fotos" : "Photo gallery"}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null || n < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
        <span className="opacity-70">{index + 1} / {n}</span>
        <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white/10" aria-label={es ? "Cerrar" : "Close"}>
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {isPhoto ? (
          <img
            key={item.id}
            src={item.url || item.thumb_url}
            alt={item.alt}
            className="max-h-full max-w-full select-none rounded object-contain"
            draggable={false}
          />
        ) : (
          <div className="w-full max-w-4xl"><MemoryVideo key={item.id} item={item} /></div>
        )}
        {n > 1 && (
          <>
            <button type="button" onClick={prev} aria-label={es ? "Anterior" : "Previous"}
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 hover:bg-white/20 sm:block">
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button type="button" onClick={next} aria-label={es ? "Siguiente" : "Next"}
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 hover:bg-white/20 sm:block">
              <ChevronRight className="h-7 w-7" />
            </button>
          </>
        )}
      </div>

      <div className="mx-auto w-full max-w-4xl space-y-1 px-4 py-4 text-center text-sm">
        {item.caption && <p className="text-white/90">{item.caption}</p>}
        {item.author && <p className="text-xs text-white/60">{es ? "Foto" : "Photo"}: {item.author}</p>}
        {showEvent && item.event && (
          <Link to={albumPath(item.event.id)} onClick={onClose} className="inline-block font-medium text-white underline-offset-4 hover:underline">
            {item.event.name} – {monthYear(item.event.date, es)}
          </Link>
        )}
        {n > 1 && <p className="text-xs text-white/50 sm:hidden">{es ? "Desliza para ver más" : "Swipe to see more"}</p>}
      </div>
    </div>
  );
}
