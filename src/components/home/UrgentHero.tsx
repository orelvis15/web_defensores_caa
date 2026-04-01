import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import cartel1 from "@/assets/cartel/cartel_01.jpeg";
import cartel2 from "@/assets/cartel/cartel_02.jpeg";
import cartel3 from "@/assets/cartel/cartel_03.jpeg";

const cartelImages = [cartel1, cartel2, cartel3];

export function UrgentHero() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent((c) => (c === 0 ? cartelImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === cartelImages.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (lightbox) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [lightbox]);

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

  return (
    <>
    <section className="bg-gradient-to-b from-destructive/5 via-background to-background py-10 md:py-16">
      <div className="container-wide">
        {/* Mobile Layout: Carousel → Content */}
        <div className="lg:hidden">
          {/* Carousel */}
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl mb-6 bg-black group cursor-zoom-in"
            style={{ height: "300px" }}
            onClick={() => setLightbox(true)}
          >
            {cartelImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={isSpanish ? `Cartel campaña - imagen ${i + 1}` : `Campaign poster - image ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {cartelImages.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* Rest of Content */}
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
            👉 {isSpanish 
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
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl bg-black group cursor-zoom-in"
            style={{ height: "420px" }}
            onClick={() => setLightbox(true)}
          >
            {cartelImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={isSpanish ? `Cartel campaña - imagen ${i + 1}` : `Campaign poster - image ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {cartelImages.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
          </div>

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
              👉 {isSpanish 
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
            src={cartelImages[current]}
            alt={isSpanish ? `Cartel campaña - imagen ${current + 1}` : `Campaign poster - image ${current + 1}`}
            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
          <button onClick={() => setLightbox(false)} className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Previous">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" aria-label="Next">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {cartelImages.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    )}
    </>
  );
}
