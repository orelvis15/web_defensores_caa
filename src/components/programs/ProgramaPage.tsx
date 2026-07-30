import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { programs, type Program } from "@/config/programs";
import { useLanguage } from "@/contexts/LanguageContext";

type ProgramaPageProps = {
  program: Program;
  children: ReactNode;
};

// Envoltura común de las páginas de programa: encabezado, contenido
// y enlaces a los otros dos programas al final.
export function ProgramaPage({ program, children }: ProgramaPageProps) {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const Icon = program.icon;
  const others = programs.filter((p) => p.slug !== program.slug);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/5 to-background pt-12 pb-10 md:pt-16 md:pb-12">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              {isSpanish ? program.tagline : program.taglineEn}
            </span>
            <h1 className="heading-1 text-foreground mb-4">
              {isSpanish ? program.title : program.titleEn}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isSpanish ? program.description : program.descriptionEn}
            </p>
          </div>
        </div>
      </section>

      {children}

      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
            {isSpanish ? "Otros programas" : "Other programs"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {others.map((other) => {
              const OtherIcon = other.icon;
              return (
                <Link
                  key={other.slug}
                  to={other.path}
                  className="group flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <OtherIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">
                      {isSpanish ? other.title : other.titleEn}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {isSpanish ? other.tagline : other.taglineEn}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary ml-auto shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/take-action">
                {isSpanish ? "Apoya la causa" : "Support the cause"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                {isSpanish ? "Contáctanos" : "Contact us"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
