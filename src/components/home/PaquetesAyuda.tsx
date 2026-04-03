import { useState } from "react";
import { ChevronLeft, ChevronRight, Package, Heart, Users, ZoomIn, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import pkg1 from "@/assets/package/package_01.jpeg";
import pkg2 from "@/assets/package/package_02.jpeg";
import pkg3 from "@/assets/package/package_03.jpeg";
import pkg4 from "@/assets/package/package_04.jpeg";
import pkg5 from "@/assets/package/package_05.jpeg";
import pkg6 from "@/assets/package/package_06.jpeg";
import pkg7 from "@/assets/package/package_07.jpeg";

const slides = [pkg1, pkg2, pkg3, pkg4, pkg5, pkg6, pkg7];

export function PaquetesAyuda() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const total = slides.length;
  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <>
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — Carousel */}
            <div className="flex flex-col gap-4 order-2 lg:order-1">
              <div
                className="relative rounded-xl overflow-hidden shadow-lg bg-black cursor-zoom-in group"
                style={{ height: "420px" }}
                onClick={() => setLightbox(true)}
              >
                {slides.map((src, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={src}
                      alt={
                        isSpanish
                          ? `Módulo de ayuda - imagen ${i + 1}`
                          : `Aid module - image ${i + 1}`
                      }
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                ))}

                {/* Zoom hint */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>

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

              {/* Dots */}
              <div className="flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`transition-all rounded-full ${
                      i === current
                        ? "w-5 h-5 bg-primary shadow"
                        : "w-2.5 h-2.5 bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                {isSpanish
                  ? `Foto ${current + 1} de ${total}`
                  : `Photo ${current + 1} of ${total}`}
              </p>
            </div>

            {/* RIGHT — Text content */}
            <div className="order-1 lg:order-2">
              <h2 className="heading-2 text-foreground mb-4">
                {isSpanish
                  ? "Cuando la familia está detenida, nosotros estamos aquí"
                  : "When family is detained, we are here"}
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                {isSpanish
                  ? "Cada módulo que entregamos representa a una familia que no está sola. Mientras el proveedor está detenido por ICE, Defensores del CAA lleva alimentos, artículos de primera necesidad y un mensaje claro: la comunidad los respalda."
                  : "Every module we deliver represents a family that is not alone. While their provider is detained by ICE, Defensores del CAA brings food, essential goods, and a clear message: the community stands with them."}
              </p>

              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {isSpanish
                  ? "Estas familias cumplen la ley y merecen dignidad. Con tu apoyo, seguimos llegando a quienes más lo necesitan: niños, madres, ancianos y personas vulnerables que enfrentan una situación que no eligieron."
                  : "These families follow the law and deserve dignity. With your support, we keep reaching those who need it most: children, mothers, elderly, and vulnerable people facing a situation they never chose."}
              </p>

              {/* Key facts */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isSpanish ? "Módulos de primera necesidad" : "Essential supply modules"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish
                        ? "Alimentos, productos de higiene y artículos del hogar entregados directamente a las familias afectadas."
                        : "Food, hygiene products, and household items delivered directly to affected families."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isSpanish ? "Casos acompañados de cerca" : "Cases followed closely"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish
                        ? "Cada familia recibe seguimiento personalizado: evaluamos su situación y coordinamos la ayuda según sus necesidades reales."
                        : "Each family receives personalized follow-up: we assess their situation and coordinate aid based on their actual needs."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isSpanish ? "Impulsado por la comunidad" : "Community-driven"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isSpanish
                        ? "Cada donación se convierte en ayuda concreta para familias reales. Tu solidaridad se ve, se siente y marca la diferencia."
                        : "Every donation turns into concrete help for real families. Your solidarity is visible, felt, and makes a difference."}
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild variant="cta" size="lg">
                <Link to="/take-action">
                  <Heart className="w-4 h-4 mr-2" />
                  {isSpanish ? "Quiero ayudar" : "I want to help"}
                </Link>
              </Button>
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
              src={slides[current]}
              alt={isSpanish ? "Módulo de ayuda" : "Aid module"}
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
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
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
