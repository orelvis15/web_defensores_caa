import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, ZoomIn, X, Play, Users, Flag, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import img1 from "@/assets/carabana/carabana_01.jpeg";
import img2 from "@/assets/carabana/carabana_02.jpeg";
import img3 from "@/assets/carabana/carabana_03.jpeg";
import img4 from "@/assets/carabana/carabana_04.jpeg";
import img5 from "@/assets/carabana/carabana_05.jpeg";

type Slide =
  | { type: "video"; videoId: string; label: string; labelEn: string }
  | { type: "image"; src: string };

const slides: Slide[] = [
  { type: "video", videoId: "8P8t0nbr-YE", label: "Caravana por la Libertad — Tampa", labelEn: "Freedom Caravan — Tampa" },
  { type: "video", videoId: "WLGmf_WMF-s", label: "Cobertura especial — Tampa", labelEn: "Special coverage — Tampa" },
  { type: "image", src: img1 },
  { type: "image", src: img2 },
  { type: "image", src: img3 },
  { type: "image", src: img4 },
  { type: "image", src: img5 },
];

const imageSlides = slides.filter((s): s is Extract<Slide, { type: "image" }> => s.type === "image");

export function CaravanaLibertad() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const iframeRefs = useRef<Record<number, HTMLIFrameElement | null>>({});

  const pauseVideo = (index: number) => {
    const iframe = iframeRefs.current[index];
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        "*"
      );
    }
  };

  const total = slides.length;

  const goTo = (next: number) => {
    // pause any video on the current slide before leaving
    if (slides[current].type === "video") pauseVideo(current);
    setCurrent(next);
  };

  const prev = () => goTo(current === 0 ? total - 1 : current - 1);
  const next = () => goTo(current === total - 1 ? 0 : current + 1);

  const currentSlide = slides[current];

  // For lightbox, only show images
  const currentImageIndex = currentSlide.type === "image"
    ? imageSlides.findIndex((s) => s.src === (currentSlide as Extract<Slide, { type: "image" }>).src)
    : -1;

  const handleCarouselClick = () => {
    if (currentSlide.type === "image") setLightbox(true);
  };

  return (
    <>
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Text content */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-5">
                <MapPin className="w-3.5 h-3.5" />
                Tampa, Florida · {isSpanish ? "Marzo 2025" : "March 2025"}
              </span>

              <h2 className="heading-2 text-foreground mb-4">
                {isSpanish ? "Caravana por la Libertad" : "Freedom Caravan"}
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                {isSpanish
                  ? "Defensores del CAA estuvo presente en Tampa, Florida, donde la comunidad cubana se movilizó en una caravana histórica exigiendo libertad para Cuba. Decenas de vehículos recorrieron las calles al grito de \u201cCuba Libre\u201d y \u201cPatria y Vida\u201d."
                  : "Defensores del CAA was present in Tampa, Florida, where the Cuban community mobilized in a historic caravan demanding freedom for Cuba. Dozens of vehicles drove through the streets chanting \u201cFree Cuba\u201d and \u201cPatria y Vida\u201d."}
              </p>

              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {isSpanish
                  ? "Esta movilización forma parte de una ola de protestas del exilio cubano que se extendió durante marzo de 2025 en múltiples ciudades de EE.UU. y Europa, en respaldo a los presos políticos y en rechazo a la crisis que atraviesa la isla."
                  : "This mobilization is part of a wave of Cuban exile protests that spread throughout March 2025 across multiple U.S. and European cities, in support of political prisoners and in rejection of the crisis gripping the island."}
              </p>

              {/* Key facts */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isSpanish ? "Participación masiva" : "Massive turnout"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish
                        ? "Decenas de vehículos y cientos de participantes se unieron al recorrido."
                        : "Dozens of vehicles and hundreds of participants joined the route."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Flag className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isSpanish ? "Un mensaje contundente" : "A clear message"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish
                        ? "Banderas cubanas y estadounidenses, y el lema \u201cCuba Next!\u201d resonaron en las calles de Tampa."
                        : "Cuban and American flags, and the motto \u201cCuba Next!\u201d echoed through Tampa\u2019s streets."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isSpanish ? "Raíces históricas" : "Historic roots"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish
                        ? "Tampa tiene una larga historia de activismo cubano que se remonta al siglo XIX con los tabaqueros de Ybor City."
                        : "Tampa has a long history of Cuban activism dating back to the 19th century with the Ybor City cigar workers."}
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" size="lg">
                <Link to="/our-work">
                  {isSpanish ? "Ver más de nuestro trabajo" : "See more of our work"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            {/* RIGHT — Single carousel: 2 videos + 5 images */}
            <div className="flex flex-col gap-4">
              {/* Carousel container */}
              <div
                className={`relative rounded-xl overflow-hidden shadow-lg bg-black ${currentSlide.type === "image" ? "cursor-zoom-in group" : ""}`}
                style={{ height: "380px" }}
                onClick={handleCarouselClick}
              >
                {slides.map((slide, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  >
                    {slide.type === "video" ? (
                      <iframe
                        ref={(el) => { iframeRefs.current[i] = el; }}
                        src={`https://www.youtube.com/embed/${slide.videoId}?enablejsapi=1`}
                        title={isSpanish ? slide.label : slide.labelEn}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <img
                        src={slide.src}
                        alt={isSpanish ? `Caravana Tampa - imagen` : `Tampa Caravan - image`}
                        className="w-full h-full object-contain"
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

                {/* Prev */}
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next */}
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
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`flex items-center justify-center transition-all rounded-full ${
                      i === current
                        ? "w-7 h-7 bg-primary text-primary-foreground shadow"
                        : "w-6 h-6 bg-muted hover:bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {slide.type === "video"
                      ? <Play className="w-3 h-3" />
                      : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                  </button>
                ))}
              </div>

              {/* Slide label */}
              <p className="text-center text-xs text-muted-foreground">
                {currentSlide.type === "video"
                  ? (isSpanish ? currentSlide.label : currentSlide.labelEn)
                  : (isSpanish
                      ? `Foto ${currentImageIndex + 1} de ${imageSlides.length}`
                      : `Photo ${currentImageIndex + 1} of ${imageSlides.length}`)}
              </p>
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
              alt={isSpanish ? "Caravana Tampa" : "Tampa Caravan"}
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
                  setCurrent(slides.findIndex((s) => s.type === "image" && s.src === imageSlides[i].src));
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
