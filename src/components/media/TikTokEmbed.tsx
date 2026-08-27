import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const EMBED_SCRIPT_SRC = "https://www.tiktok.com/embed.js";

interface TikTokEmbedProps {
  /** Identificador numérico del video, el último tramo de la URL de TikTok. */
  videoId: string;
  /** Cuenta que publicó el video, sin la arroba. */
  username: string;
  /** Texto alternativo/descripción que se muestra bajo el video. */
  caption?: string;
  className?: string;
}

/**
 * Incrusta un video de TikTok con el reproductor oficial.
 *
 * El <blockquote> se inserta fuera del árbol de React (dangerouslySetInnerHTML)
 * porque embed.js lo reemplaza por un iframe; así React no intenta gestionar
 * unos nodos que ya no le pertenecen. Si el script no llega a cargar —por un
 * bloqueador o por la red del usuario— el blockquote queda como enlace al
 * video, de modo que siempre se puede llegar a él.
 */
export function TikTokEmbed({
  videoId,
  username,
  caption,
  className,
}: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const videoUrl = `https://www.tiktok.com/@${username}/video/${videoId}`;

  // embed.js solo procesa los blockquotes en el momento en que se ejecuta, y
  // en una SPA el script puede haberse cargado antes de que este componente
  // exista. Añadimos una etiqueta propia para forzar una nueva ejecución.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${EMBED_SCRIPT_SRC}?embed=${videoId}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [videoId]);

  // Cuando embed.js termina, el blockquote pasa a ser un iframe: ese es el
  // momento de retirar el esqueleto de carga.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.querySelector("iframe")) {
      setIsPlayerReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) {
        setIsPlayerReady(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <figure className={cn("flex flex-col items-center", className)}>
      <div className="relative w-full max-w-[325px]">
        {!isPlayerReady && (
          <div
            className="absolute inset-0 rounded-2xl bg-muted animate-pulse"
            aria-hidden="true"
          />
        )}

        <div
          ref={containerRef}
          className={cn(
            "min-h-[575px] transition-opacity duration-500",
            isPlayerReady ? "opacity-100" : "opacity-0"
          )}
          // El contenido lo genera embed.js; React solo es dueño del contenedor.
          dangerouslySetInnerHTML={{
            __html: `<blockquote class="tiktok-embed" cite="${videoUrl}" data-video-id="${videoId}" style="max-width:325px;min-width:280px;margin:0"><section><a target="_blank" rel="noopener noreferrer" href="${videoUrl}">@${username}</a></section></blockquote>`,
          }}
        />
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
