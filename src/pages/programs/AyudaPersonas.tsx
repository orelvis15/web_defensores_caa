import { ProgramaPage } from "@/components/programs/ProgramaPage";
import { PaquetesAyuda } from "@/components/programs/PaquetesAyuda";
import { getProgram } from "@/config/programs";
import { aidRequestUrl } from "@/config/members";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, LifeBuoy } from "lucide-react";

function SolicitarAyuda() {
  const { language } = useLanguage();
  const es = language === "ES";
  return (
    <section className="py-12">
      <div className="container-wide max-w-4xl">
        <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center shadow-sm sm:flex-row sm:text-left">
          <LifeBuoy className="h-12 w-12 shrink-0 text-primary" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{es ? "¿Necesitas ayuda?" : "Do you need help?"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {es
                ? "Ayuda en especie, económica o social para familias cubanas en el exterior. Llena la solicitud y el capítulo de tu ciudad se pondrá en contacto contigo."
                : "In-kind, financial or social aid for Cuban families abroad. Fill in the request and your city's chapter will contact you."}
            </p>
          </div>
          <a href={aidRequestUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg">{es ? "Solicitar ayuda" : "Request help"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function AyudaPersonas() {
  return (
    <ProgramaPage program={getProgram("ayuda")}>
      <SolicitarAyuda />
      <PaquetesAyuda />
    </ProgramaPage>
  );
}
