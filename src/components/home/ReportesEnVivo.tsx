import { AlertTriangle, Zap, Megaphone, Siren, Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ReportesEnVivo() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  const categories = [
    {
      icon: AlertTriangle,
      label: isSpanish ? "Incidentes" : "Incidents",
    },
    {
      icon: Zap,
      label: isSpanish ? "Falta de servicios" : "Service outages",
    },
    {
      icon: Megaphone,
      label: isSpanish ? "Protestas" : "Protests",
    },
    {
      icon: Siren,
      label: isSpanish ? "Emergencias" : "Emergencies",
    },
  ];

  return (
    <section className="section-padding bg-section-light">
      <div className="container-wide">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            <Radio className="w-3.5 h-3.5" />
            {isSpanish ? "En colaboración con Neo Mambí" : "In collaboration with Neo Mambí"}
          </span>
          <h2 className="heading-2 text-foreground mb-3">
            {isSpanish ? "Reportes desde Cuba" : "Reports from Cuba"}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            {isSpanish
              ? "Iniciativa conjunta entre Defenders of the CAA and Freedom, Inc. y Neo Mambí: un espacio donde cualquier persona dentro de la isla puede reportar lo que sucede en su comunidad, sin filtros y en tiempo real."
              : "A joint initiative by Defenders of the CAA and Freedom, Inc. and Neo Mambí: a space where anyone on the island can report what is happening in their community, with no filters and in real time."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-6 flex flex-wrap justify-center gap-2">
          {categories.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full text-sm text-foreground"
            >
              <Icon className="w-3.5 h-3.5 text-primary" />
              {label}
            </span>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-8">
          {isSpanish
            ? "Sin filtros · Sin censura · En tiempo real — tu voz es importante."
            : "No filters · No censorship · Real time — your voice matters."}
        </p>

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
