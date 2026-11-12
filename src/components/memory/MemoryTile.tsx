import { Film, PlayCircle } from "lucide-react";
import type { MemoryItem } from "@/config/memory";

/** Grid tile: the reduced image (lazy), with a play badge for videos. */
export function MemoryTile({ item, onOpen, es, className = "" }: { item: MemoryItem; onOpen: () => void; es: boolean; className?: string }) {
  const img = item.thumb_url;
  const video = item.kind !== "photo";
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      aria-label={`${video ? (es ? "Ver video" : "Play video") : es ? "Ampliar foto" : "Enlarge photo"}: ${item.alt}`}
    >
      {img ? (
        <img src={img} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
          <Film className="h-10 w-10 text-primary/70" />
        </div>
      )}
      {video && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/20">
          <PlayCircle className="h-12 w-12 text-white drop-shadow" />
        </span>
      )}
    </button>
  );
}
