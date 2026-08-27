import { ArrowRight, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import yasmaniFoto from "@/assets/campaign3/yasmani.png";

// Campaña destacada en la portada, encima de los tres programas.
const TIKTOK_URL =
  "https://www.tiktok.com/@karel_gonzalez/video/7677644828024376606";

// Cuando la familia comparta el enlace del GoFundMe, se pega aquí
// y el botón de donar aparece automáticamente.
const GOFUNDME_URL = "";

export function CampanaYasmani() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <section
      id="campana-yasmani"
      className="section-padding bg-white scroll-mt-24"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IZQUIERDA — Foto */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div
              className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-slate-100"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src={yasmaniFoto}
                alt={
                  isSpanish
                    ? "Yasmani durante su recuperación en el hospital"
                    : "Yasmani recovering at the hospital"
                }
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* DERECHA — Texto */}
          <div className="order-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cta/10 text-cta text-sm font-medium rounded-full mb-5">
              <HeartHandshake className="w-3.5 h-3.5" />
              {isSpanish ? "Campaña abierta" : "Open campaign"}
            </span>

            <h2 className="heading-2 text-foreground mb-5">
              {isSpanish ? "Apoyemos a Yasmani" : "Let's support Yasmani"}
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              {isSpanish
                ? "Yasmani es un cubano con I-220A que enfrenta una condición neurológica grave que lo dejó sin poder trabajar. Su estatus migratorio lo deja fuera de los programas de asistencia, y hoy toda la carga recae sobre su familia."
                : "Yasmani is a Cuban with an I-220A facing a serious neurological condition that left him unable to work. His immigration status keeps him out of assistance programs, and today the entire burden falls on his family."}
            </p>

            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              {isSpanish
                ? "Su familia abrió un GoFundMe para sostener los gastos médicos y del hogar. Cualquier aporte suma, y compartir su historia también ayuda."
                : "His family opened a GoFundMe to cover medical and household costs. Every contribution counts, and sharing his story helps too."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {GOFUNDME_URL && (
                <Button asChild size="lg">
                  <a
                    href={GOFUNDME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isSpanish ? "Donar a Yasmani" : "Donate to Yasmani"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}

              <Button asChild variant="outline" size="lg">
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
                  {isSpanish ? "Conoce su historia" : "See his story"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
