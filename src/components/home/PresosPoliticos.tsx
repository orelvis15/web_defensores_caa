import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X, HandHeart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Carga automáticamente todas las imágenes dentro de src/assets/presos_politicos.
// Cualquier imagen que se agregue a esa carpeta aparecerá en el carrusel sin tocar el código.
const imageModules = import.meta.glob<string>(
  "@/assets/presos_politicos/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}",
  { eager: true, import: "default" }
);

const images: string[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src);

const AUTOPLAY_MS = 3000;

export function PresosPoliticos() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const total = images.length;

  const next = useCallback(
    () => setCurrent((c) => (c === total - 1 ? 0 : c + 1)),
    [total]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? total - 1 : c - 1)),
    [total]
  );

  // Auto-rotación cada 3 segundos (se pausa cuando el lightbox está abierto).
  useEffect(() => {
    if (total <= 1 || lightbox) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [total, lightbox, next, current]);

  if (total === 0) return null;

  return (
    <>
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          {/* Encabezado */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-5">
              <HandHeart className="w-3.5 h-3.5" />
              {isSpanish ? "Presos políticos" : "Political prisoners"}
            </span>

            <h2 className="heading-2 text-foreground mb-4">
              {isSpanish
                ? "Ayuda a los presos políticos"
                : "Support for political prisoners"}
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed">
              {isSpanish
                ? "Como organización, brindamos apoyo a presos políticos cubanos y a sus familias. Estas son algunas de las personas a las que estamos acompañando en su lucha por la libertad y la dignidad."
                : "As an organization, we provide support to Cuban political prisoners and their families. These are some of the people we are standing beside in their fight for freedom and dignity."}
            </p>
          </div>

          {/* Carrusel */}
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <div
              className="relative rounded-xl overflow-hidden shadow-lg bg-black cursor-zoom-in group"
              style={{ height: "440px" }}
              onClick={() => setLightbox(true)}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={
                      isSpanish
                        ? `Preso político - imagen ${i + 1}`
                        : `Political prisoner - image ${i + 1}`
                    }
                    className="w-full h-full object-contain"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}

              {/* Indicador de zoom */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>

              {total > 1 && (
                <>
                  {/* Anterior */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
                    aria-label={isSpanish ? "Anterior" : "Previous"}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Siguiente */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
                    aria-label={isSpanish ? "Siguiente" : "Next"}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Puntos */}
            {total > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`${isSpanish ? "Imagen" : "Image"} ${i + 1}`}
                    className={`rounded-full transition-all ${
                      i === current
                        ? "w-3 h-3 bg-primary shadow"
                        : "w-2.5 h-2.5 bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Contador */}
            <p className="text-center text-xs text-muted-foreground">
              {isSpanish
                ? `Foto ${current + 1} de ${total}`
                : `Photo ${current + 1} of ${total}`}
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[current]}
              alt={isSpanish ? "Preso político" : "Political prisoner"}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label={isSpanish ? "Cerrar" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label={isSpanish ? "Anterior" : "Previous"}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label={isSpanish ? "Siguiente" : "Next"}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          {total > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 flex-wrap justify-center max-w-[90vw]">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`${isSpanish ? "Imagen" : "Image"} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
