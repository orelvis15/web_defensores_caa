import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface TikTokEmbedProps {
  /** Identificador numérico del video, el último tramo de la URL de TikTok. */
  videoId: string;
  /** Cuenta que publicó el video, sin la arroba. */
  username: string;
  /** Descripción propia que se muestra bajo el reproductor. */
  caption?: string;
  /** Idioma de la interfaz del reproductor. */
  lang?: string;
  className?: string;
}

/**
 * Incrusta un video de TikTok con el reproductor oficial, en su versión más
 * despejada: sin autoplay, sin la barra del audio, sin el pie con el texto
 * del post y sin videos relacionados al terminar.
 *
 * Se usa el iframe directo en lugar de embed.js para no cargar el script de
 * seguimiento de TikTok en la página, y solo se monta cuando el bloque entra
 * en pantalla, de modo que nada se descarga hasta que hace falta.
 */
export function TikTokEmbed({
  videoId,
  username,
  caption,
  lang = "es",
  className,
}: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const videoUrl = `https://www.tiktok.com/@${username}/video/${videoId}`;
  const embedUrl = `https://www.tiktok.com/player/v1/${videoId}?${new URLSearchParams(
    {
      lang,
      autoplay: "0",
      music_info: "0",
      description: "0",
      rel: "0",
      native_context_menu: "0",
      closed_caption: "0",
    }
  ).toString()}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Sin IntersectionObserver (navegadores antiguos) cargamos de una vez.
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <figure className={cn("flex flex-col items-center", className)}>
      <div
        ref={containerRef}
        className="relative w-full max-w-[325px] overflow-hidden rounded-2xl bg-slate-900 shadow-xl ring-1 ring-black/5"
        style={{ aspectRatio: "9 / 16" }}
      >
        {/* Marcador mientras el reproductor no está listo, para que el bloque
            nunca se vea vacío ni cambie de alto al cargar. */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-slate-900 transition-opacity duration-500",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
          aria-hidden="true"
        >
          <Play className="w-12 h-12 text-white/40" />
        </div>

        {shouldLoad && (
          <iframe
            src={embedUrl}
            title={
              caption ?? `Video de @${username} sobre la campaña de Yasmani`
            }
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            scrolling="no"
            loading="lazy"
          />
        )}
      </div>

      <figcaption className="mt-3 w-full max-w-[325px] text-center">
        {caption && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {caption}
          </p>
        )}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          @{username}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </figcaption>
    </figure>
  );
}
