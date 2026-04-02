import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ChevronLeft, ChevronRight, ZoomIn, X, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import cartel1 from "@/assets/cartel/cartel_01.jpeg";
import cartel2 from "@/assets/cartel/cartel_02.jpeg";
import cartel3 from "@/assets/cartel/cartel_03.jpeg";

type Slide =
  | { type: "video"; src: string; label: string; labelEn: string }
  | { type: "image"; src: string };

const slides: Slide[] = [
  {
    type: "video",
    src: "https://www.youtube.com/embed/fMbywZ4t8yo",
    label: "Video de la campaña",
    labelEn: "Campaign video",
  },
  { type: "image", src: cartel1 },
  { type: "image", src: cartel2 },
  { type: "image", src: cartel3 },
];

const imageSlides = slides.filter(
  (s): s is Extract<Slide, { type: "image" }> => s.type === "image"
);

export function UrgentHero() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const total = slides.length;
  const currentSlide = slides[current];

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  // Auto-advance only on image slides
  useEffect(() => {
    if (lightbox) return;
    if (slides[current].type === "video") return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [lightbox, current]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const currentImageIndex =
    currentSlide.type === "image"
      ? imageSlides.findIndex(
          (s) => s.src === (currentSlide as Extract<Slide, { type: "image" }>).src
        )
      : -1;

  const handleCarouselClick = () => {
    if (currentSlide.type === "image") setLightbox(true);
  };

  const Carousel = ({ height }: { height: string }) => (
    <div className="flex flex-col gap-3">
      <div
        className={`relative rounded-xl overflow-hidden shadow-2xl bg-black ${
          currentSlide.type === "image" ? "cursor-zoom-in group" : ""
        }`}
        style={{ height }}
        onClick={handleCarouselClick}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "video" ? (
              <iframe
                src={slide.src}
                title={isSpanish ? slide.label : slide.labelEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <img
                src={slide.src}
                alt={
                  isSpanish
                    ? `Cartel campaña - imagen ${i}`
                    : `Campaign poster - image ${i}`
                }
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}
          </div>
        ))}

        {/* Zoom hint — only on images */}
        {currentSlide.type === "image" && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots with type indicator */}
      <div className="flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`flex items-center justify-center transition-all rounded-full ${
              i === current
                ? "w-7 h-7 bg-primary text-primary-foreground shadow"
                : "w-6 h-6 bg-muted hover:bg-muted-foreground/20 text-muted-foreground"
            }`}
          >
            {slide.type === "video" ? (
              <Play className="w-3 h-3" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            )}
          </button>
        ))}
      </div>

      {/* Slide label */}
      <p className="text-center text-xs text-muted-foreground">
        {currentSlide.type === "video"
          ? isSpanish
            ? currentSlide.label
            : currentSlide.labelEn
          : isSpanish
          ? `Foto ${currentImageIndex + 1} de ${imageSlides.length}`
          : `Photo ${currentImageIndex + 1} of ${imageSlides.length}`}
      </p>
    </div>
  );

  return (
    <>
      <section className="bg-gradient-to-b from-destructive/5 via-background to-background py-10 md:py-16">
        <div className="container-wide">
          {/* Mobile Layout: Carousel → Content */}
          <div className="lg:hidden">
            <div className="mb-6">
              <Carousel height="300px" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              {isSpanish
                ? "No somos criminales. Somos familias buscando libertad."
                : "We are not criminals. We are families seeking freedom."}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {isSpanish
                ? "Miles de cubanos con I-220A están siendo detenidos y amenazados con deportaciones injustas, a pesar de cumplir la ley y de estar protegidos por la Ley de Ajuste Cubano."
                : "Thousands of Cubans under I-220A are facing unjust detention and deportation threats, despite following the law and being protected under the Cuban Adjustment Act."}
            </p>

            <div className="bg-card border rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-primary mb-3">
                {isSpanish
                  ? "En Defensores del CAA, alzamos la voz para exigir:"
                  : "At Defensores del CAA, we stand to demand:"}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">✓</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {isSpanish
                      ? "El cese de detenciones arbitrarias"
                      : "An end to arbitrary detentions"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">✓</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {isSpanish
                      ? "El respeto al debido proceso"
                      : "Respect for due process"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">✓</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {isSpanish
                      ? "El cumplimiento de la Ley de Ajuste Cubano"
                      : "Full enforcement of the Cuban Adjustment Act"}
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-base font-semibold text-primary mb-6">
              👉{" "}
              {isSpanish
                ? "Defender la ley es defender a las familias."
                : "Defending the law means defending families."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="cta" size="lg">
                <Link to="/take-action">
                  <Heart className="w-5 h-5 mr-2" />
                  {isSpanish ? "Apoya la causa" : "Support the cause"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/get-involved">
                  <Users className="w-5 h-5 mr-2" />
                  {isSpanish ? "Únete al movimiento" : "Join the movement"}
                </Link>
              </Button>
            </div>
          </div>

          {/* Desktop Layout: Two columns */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Carousel */}
            <Carousel height="420px" />

            {/* Right - Text Content */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                {isSpanish
                  ? "No somos criminales. Somos familias buscando libertad."
                  : "We are not criminals. We are families seeking freedom."}
              </h1>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {isSpanish
                  ? "Miles de cubanos con I-220A están siendo detenidos y amenazados con deportaciones injustas, a pesar de cumplir la ley y de estar protegidos por la Ley de Ajuste Cubano."
                  : "Thousands of Cubans under I-220A are facing unjust detention and deportation threats, despite following the law and being protected under the Cuban Adjustment Act."}
              </p>

              <div className="bg-card border rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-primary mb-3">
                  {isSpanish
                    ? "En Defensores del CAA, alzamos la voz para exigir:"
                    : "At Defensores del CAA, we stand to demand:"}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-xs">✓</span>
                    </div>
                    <span className="text-foreground text-sm">
                      {isSpanish
                        ? "El cese de detenciones arbitrarias"
                        : "An end to arbitrary detentions"}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-xs">✓</span>
                    </div>
                    <span className="text-foreground text-sm">
                      {isSpanish
                        ? "El respeto al debido proceso"
                        : "Respect for due process"}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-xs">✓</span>
                    </div>
                    <span className="text-foreground text-sm">
                      {isSpanish
                        ? "El cumplimiento de la Ley de Ajuste Cubano"
                        : "Full enforcement of the Cuban Adjustment Act"}
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-base font-semibold text-primary mb-6">
                👉{" "}
                {isSpanish
                  ? "Defender la ley es defender a las familias."
                  : "Defending the law means defending families."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="cta" size="lg">
                  <Link to="/take-action">
                    <Heart className="w-5 h-5 mr-2" />
                    {isSpanish ? "Apoya la causa" : "Support the cause"}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/get-involved">
                    <Users className="w-5 h-5 mr-2" />
                    {isSpanish ? "Únete al movimiento" : "Join the movement"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox — images only */}
      {lightbox && currentSlide.type === "image" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={(currentSlide as Extract<Slide, { type: "image" }>).src}
              alt={isSpanish ? `Cartel campaña` : `Campaign poster`}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {imageSlides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(
                    slides.findIndex(
                      (s) => s.type === "image" && s.src === imageSlides[i].src
                    )
                  );
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentImageIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
