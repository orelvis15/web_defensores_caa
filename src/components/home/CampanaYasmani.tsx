import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  HeartHandshake,
  Megaphone,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Campaña urgente destacada en la portada, encima de los tres programas.
// El video se trae directamente del embed público de TikTok.
const TIKTOK_VIDEO_ID = "7677644828024376606";
const TIKTOK_URL =
  "https://www.tiktok.com/@karel_gonzalez/video/7677644828024376606";

// Cuando la familia comparta el enlace del GoFundMe, se pega aquí
// y el botón de donar aparece automáticamente.
const GOFUNDME_URL = "";

export function CampanaYasmani() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  const ways = [
    {
      icon: HeartHandshake,
      title: isSpanish ? "Dona lo que puedas" : "Donate what you can",
      text: isSpanish
        ? "No importa si es un dólar, veinte o cincuenta. La familia creó un GoFundMe y cada aporte marca la diferencia."
        : "It doesn't matter if it's one dollar, twenty, or fifty. The family created a GoFundMe and every contribution makes a difference.",
    },
    {
      icon: Megaphone,
      title: isSpanish ? "Comparte y etiqueta" : "Share and tag",
      text: isSpanish
        ? "Comparte el video y etiqueta a los congresistas Mario Díaz-Balart y María Elvira Salazar para pedir un parole 212 excepcional para su caso."
        : "Share the video and tag Representatives Mario Díaz-Balart and María Elvira Salazar to request an exceptional 212 parole for his case.",
    },
    {
      icon: Scale,
      title: isSpanish ? "Si eres abogado" : "If you're an attorney",
      text: isSpanish
        ? "Yasmani está en corte y no tiene fondos para pagar un abogado. Escríbenos si puedes brindarle asesoría en su proceso migratorio."
        : "Yasmani is in immigration court with no funds for a lawyer. Write to us if you can offer guidance in his case.",
    },
  ];

  return (
    <section
      id="campana-yasmani"
      className="section-padding bg-white scroll-mt-24"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IZQUIERDA — Video de TikTok */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div
              className="w-full max-w-[360px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-slate-100"
              style={{ aspectRatio: "9 / 16" }}
            >
              <iframe
                src={`https://www.tiktok.com/embed/v2/${TIKTOK_VIDEO_ID}`}
                title={
                  isSpanish
                    ? "Video de la campaña por Yasmani"
                    : "Campaign video for Yasmani"
                }
                className="w-full h-full border-0"
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* DERECHA — Texto */}
          <div className="order-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cta/10 text-cta text-sm font-medium rounded-full mb-5">
              <AlertCircle className="w-3.5 h-3.5" />
              {isSpanish ? "Campaña urgente" : "Urgent campaign"}
            </span>

            <h2 className="heading-2 text-foreground mb-5">
              {isSpanish
                ? "Ayuda a Yasmani, cubano con I-220A"
                : "Help Yasmani, a Cuban with an I-220A"}
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              {isSpanish
                ? "Yasmani vive con un lipoma intracraneal que, por su tamaño, no puede removerse. Tras varias cirugías quedó con un catéter que va desde su cabeza hasta el abdomen para drenar el fluido, y hoy está incapacitado para trabajar."
                : "Yasmani lives with an intracranial lipoma that, because of its size, cannot be removed. After several surgeries he was left with a catheter running from his head to his abdomen to drain the fluid, and today he is unable to work."}
            </p>

            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              {isSpanish
                ? "Al tener un I-220A no puede aplicar a disability ni a ninguno de los programas de asistencia pensados justamente para quien ya no puede trabajar por razones de salud. Todo el peso económico recae sobre su esposa: ya devolvieron un carro al banco y deben dinero por el único que les queda, el mismo que usan para sus citas médicas."
                : "Because he holds an I-220A, he cannot apply for disability or any of the assistance programs designed precisely for someone who can no longer work for health reasons. The entire financial burden falls on his wife: they already returned one car to the bank and still owe money on the only one left, the same one they use to get to his medical appointments."}
            </p>

            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {isSpanish
                ? "A petición de cientos de personas, la familia creó un GoFundMe. Este es el momento de acompañarlos."
                : "At the request of hundreds of people, the family created a GoFundMe. This is the moment to stand with them."}
            </p>

            {/* Formas de ayudar */}
            <ul className="space-y-4 mb-8">
              {ways.map((way) => {
                const Icon = way.icon;
                return (
                  <li key={way.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm md:text-base">
                        {way.title}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {way.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

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
                  {isSpanish ? "Ver y compartir el video" : "Watch and share the video"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <Button asChild variant="ghost" size="lg">
                <Link to="/contact">
                  {isSpanish ? "Ofrecer asesoría legal" : "Offer legal guidance"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
