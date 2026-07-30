import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { programs } from "@/config/programs";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProgramasPrincipales() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <section id="programas" className="section-padding bg-section-light scroll-mt-24">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {isSpanish ? "Nuestros programas" : "Our programs"}
          </span>
          <h2 className="heading-2 text-foreground mb-3">
            {isSpanish
              ? "Tres programas, una misma comunidad"
              : "Three programs, one community"}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {isSpanish
              ? "Todo nuestro trabajo se organiza en tres frentes. Entra en el que te interese para ver las campañas, jornadas y formas de participar."
              : "All of our work is organized around three fronts. Open the one you care about to see campaigns, events, and ways to take part."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, i) => {
            const Icon = program.icon;
            const title = isSpanish ? program.title : program.titleEn;
            const tagline = isSpanish ? program.tagline : program.taglineEn;
            const description = isSpanish
              ? program.description
              : program.descriptionEn;
            const highlights = isSpanish
              ? program.highlights
              : program.highlightsEn;

            return (
              <Link
                key={program.slug}
                to={program.path}
                className="group flex flex-col bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {title}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">{tagline}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {description}
                </p>

                <ul className="flex flex-wrap gap-1.5 mb-5">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {isSpanish ? "Ver el programa" : "View program"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
