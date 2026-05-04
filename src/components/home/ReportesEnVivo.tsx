import { useLanguage } from "@/contexts/LanguageContext";

export function ReportesEnVivo() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <section className="section-padding bg-section-light">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h2 className="heading-2 text-foreground mb-3">
            {isSpanish ? "Reportes desde Cuba" : "Reports from Cuba"}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {isSpanish
              ? "Voces en tiempo real desde la isla, sin filtros y sin censura."
              : "Real-time voices from the island, with no filters and no censorship."}
          </p>
        </div>

        <iframe
          src="https://neomambi.com/embed/reports"
          title={isSpanish ? "Reportes desde Cuba — Neo Mambí" : "Reports from Cuba — Neo Mambí"}
          className="w-full rounded-2xl border-0 shadow-lg"
          style={{ height: "600px" }}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
    </section>
  );
}
