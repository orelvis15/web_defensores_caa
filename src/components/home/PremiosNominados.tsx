import { Link } from "react-router-dom";
import { ArrowRight, Award, CalendarDays, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  categorias,
  portadaNominados,
  totalNominados,
  FECHA_GALA,
} from "@/components/premios/nominados";

// Un nominado de cada categoría para el abanico de la portada.
const destacados = categorias.slice(0, 6).map((c) => c.nominados[0]);

export function PremiosNominados() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <section className="relative overflow-hidden bg-[#071739] text-white py-14 md:py-20">
      {/* Brillos de fondo */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-red-600/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Portada */}
          <Link
            to="/premios-2026"
            className="group relative mx-auto w-full max-w-md order-2 lg:order-1"
            aria-label={isSpanish ? "Ver todos los nominados" : "See all nominees"}
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
            <img
              src={portadaNominados}
              alt={
                isSpanish
                  ? "Premio Defensores de la Libertad 2026 — Conoce a los nominados"
                  : "Defenders of Freedom Award 2026 — Meet the nominees"
              }
              className="relative w-full rounded-2xl shadow-2xl ring-1 ring-amber-300/60 transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </Link>

          {/* Texto */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-200 text-xs md:text-sm font-semibold uppercase tracking-wider mb-5">
              <Award className="w-4 h-4" />
              {isSpanish ? "1.er aniversario" : "1st anniversary"}
            </span>

            <h2 className="font-serif font-bold leading-tight mb-5">
              <span className="block text-lg md:text-xl tracking-[0.2em] uppercase text-amber-200/90">
                {isSpanish ? "Premio" : "Award"}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent drop-shadow">
                {isSpanish ? "Defensores de la Libertad" : "Defenders of Freedom"}
              </span>
              <span className="block text-3xl md:text-4xl mt-1 bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
                2026
              </span>
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 text-amber-300">
              <span className="h-px w-12 bg-amber-300/60" />
              <Star className="w-4 h-4 fill-current" />
              <span className="h-px w-12 bg-amber-300/60" />
            </div>

            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              {isSpanish
                ? `Reconocemos a ${totalNominados} personas y organizaciones que defienden la libertad, los derechos humanos y a nuestra comunidad. Conoce a los nominados en ${categorias.length} categorías.`
                : `We honor ${totalNominados} people and organizations who defend freedom, human rights and our community. Meet the nominees across ${categorias.length} categories.`}
            </p>

            <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-700 to-red-600 px-4 py-2 text-sm md:text-base font-semibold shadow-lg ring-1 ring-amber-300/50 mb-8">
              <CalendarDays className="w-4 h-4 text-amber-200" />
              {isSpanish ? `Gala: ${FECHA_GALA.es}` : `Gala: ${FECHA_GALA.en}`}
            </div>

            {/* Abanico de nominados */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="flex -space-x-4">
                {destacados.map((n) => (
                  // Acerca el recuadro de la foto dentro del cartel del nominado.
                  <span
                    key={n.name}
                    role="img"
                    aria-label={n.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-2 ring-amber-300 shadow-md bg-white bg-no-repeat"
                    style={{
                      backgroundImage: `url(${n.image})`,
                      backgroundSize: "200% auto",
                      backgroundPosition: "50% 56%",
                    }}
                  />
                ))}
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-2 ring-amber-300 bg-amber-400 text-[#071739] text-sm font-bold flex items-center justify-center shadow-md">
                  +{totalNominados - destacados.length}
                </span>
              </div>
            </div>

            <Link
              to="/premios-2026"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-7 py-3 text-base font-bold text-[#071739] shadow-lg shadow-amber-500/30 transition-all hover:shadow-amber-400/50 hover:brightness-110"
            >
              {isSpanish ? "Conoce a los nominados" : "Meet the nominees"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
