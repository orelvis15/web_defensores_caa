import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, CalendarDays, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  categorias,
  portadaNominados,
  totalNominados,
  FECHA_ANIVERSARIO,
  FECHA_GALA,
  type Nominado,
} from "@/components/premios/nominados";

const todos: (Nominado & { categoria: string; categoriaEn: string })[] = categorias.flatMap((c) =>
  c.nominados.map((n) => ({ ...n, categoria: c.title, categoriaEn: c.titleEn }))
);

export default function Premios2026() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [selected, setSelected] = useState<number | null>(null);

  const total = todos.length;
  const next = useCallback(
    () => setSelected((i) => (i === null ? i : (i + 1) % total)),
    [total]
  );
  const prev = useCallback(
    () => setSelected((i) => (i === null ? i : (i - 1 + total) % total)),
    [total]
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, next, prev]);

  const current = selected === null ? null : todos[selected];

  return (
    <Layout>
      {/* Encabezado */}
      <section className="relative overflow-hidden bg-[#071739] text-white pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-red-600/25 blur-3xl" />

        <div className="container-wide relative">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {isSpanish ? "Volver al inicio" : "Back to home"}
          </Link>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-200 text-xs md:text-sm font-semibold uppercase tracking-wider mb-5">
                <Award className="w-4 h-4" />
                {isSpanish
                  ? `1.er aniversario · ${FECHA_ANIVERSARIO.es}`
                  : `1st anniversary · ${FECHA_ANIVERSARIO.en}`}
              </span>
              <h1 className="font-serif font-bold leading-tight mb-5">
                <span className="block text-lg md:text-xl tracking-[0.2em] uppercase text-amber-200/90">
                  {isSpanish ? "Premio" : "Award"}
                </span>
                <span className="block text-4xl md:text-6xl bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent">
                  {isSpanish ? "Defensores de la Libertad 2026" : "Defenders of Freedom 2026"}
                </span>
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                {isSpanish
                  ? `La Fundación Defensores del CAA y la Libertad celebra su primer aniversario reconociendo a quienes defienden la libertad, los derechos humanos y a nuestra comunidad. Estos son los ${totalNominados} nominados en ${categorias.length} categorías.`
                  : `The Defensores del CAA y la Libertad Foundation celebrates its first anniversary by honoring those who defend freedom, human rights and our community. These are the ${totalNominados} nominees across ${categorias.length} categories.`}
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-700 to-red-600 px-4 py-2 font-semibold shadow-lg ring-1 ring-amber-300/50">
                <CalendarDays className="w-4 h-4 text-amber-200" />
                {isSpanish ? `Gala: ${FECHA_GALA.es}` : `Gala: ${FECHA_GALA.en}`}
              </div>

              {/* Índice de categorías */}
              <nav className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start">
                {categorias.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="rounded-full border border-amber-300/30 px-3 py-1 text-xs md:text-sm text-amber-100 hover:bg-amber-300/15 transition-colors"
                  >
                    {isSpanish ? c.title : c.titleEn}
                  </a>
                ))}
              </nav>
            </div>

            <img
              src={portadaNominados}
              alt={
                isSpanish
                  ? "Premio Defensores de la Libertad 2026 — Conoce a los nominados"
                  : "Defenders of Freedom Award 2026 — Meet the nominees"
              }
              className="mx-auto w-full max-w-xs md:max-w-sm rounded-2xl shadow-2xl ring-2 ring-amber-300/60"
            />
          </div>
        </div>
      </section>

      {/* Categorías */}
      <div className="bg-gradient-to-b from-[#0b1f4a] to-[#071739] text-white">
        {categorias.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-20 py-12 md:py-16 border-t border-amber-300/10">
            <div className="container-wide">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="font-serif text-2xl md:text-4xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
                  {isSpanish ? c.title : c.titleEn}
                </h2>
                <div className="mt-3 flex items-center justify-center gap-3 text-amber-300">
                  <span className="h-px w-12 bg-amber-300/60" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="h-px w-12 bg-amber-300/60" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {c.nominados.map((n) => {
                  const index = todos.findIndex((t) => t.image === n.image);
                  return (
                    <button
                      key={n.name}
                      onClick={() => setSelected(index)}
                      className="group text-left rounded-2xl overflow-hidden bg-white/5 ring-1 ring-amber-300/20 hover:ring-amber-300/70 shadow-xl transition-all hover:-translate-y-1"
                    >
                      <img
                        src={n.image}
                        alt={`${n.name} — ${isSpanish ? c.title : c.titleEn}`}
                        className="w-full aspect-[1122/1402] object-cover"
                        loading="lazy"
                      />
                      <div className="px-4 py-3 flex items-center justify-between gap-3">
                        <span className="font-semibold text-amber-100">{n.name}</span>
                        <Award className="w-4 h-4 shrink-0 text-amber-300 opacity-60 group-hover:opacity-100" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Visor */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={current.name}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <p className="mt-3 text-center text-white">
              <span className="font-semibold">{current.name}</span>
              <span className="block text-sm text-white/60">
                {isSpanish ? current.categoria : current.categoriaEn}
              </span>
            </p>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 right-0 sm:-right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label={isSpanish ? "Cerrar" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={prev}
              className="absolute left-1 sm:-left-14 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label={isSpanish ? "Anterior" : "Previous"}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-1 sm:-right-14 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label={isSpanish ? "Siguiente" : "Next"}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
