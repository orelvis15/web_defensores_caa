import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Scale,
  FileText,
  Users,
  Heart,
  Folder,
  Stethoscope,
  HelpCircle,
  Smartphone,
  Radio,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type VideoSlide = {
  src: string;
  label: string;
  labelEn: string;
};

const videoSlides: VideoSlide[] = [
  {
    src: "https://www.youtube.com/embed/z7pa-OjiJ28",
    label: "Clínica Migratoria Comunitaria — Mensaje",
    labelEn: "Community Migration Clinic — Message",
  },
  {
    src: "https://www.youtube.com/embed/RbefNOyLhaU",
    label: "Conoce el programa CMC — Clínica Migratoria Comunitaria",
    labelEn: "Learn about the CMC — Community Migration Clinic program",
  },
];

export function ClinicaMigratoria() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [current, setCurrent] = useState(0);

  const total = videoSlides.length;
  const currentSlide = videoSlides[current];
  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <section className="relative section-padding overflow-hidden bg-gradient-to-b from-primary/5 via-background to-primary/5">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-cta/10 blur-3xl" />

      <div className="relative container-wide">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cta/10 text-cta text-xs md:text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            {isSpanish ? "Próxima jornada" : "Upcoming clinic"}
          </span>

          <h2 className="heading-2 text-foreground mb-4">
            {isSpanish ? (
              <>
                Clínica Migratoria{" "}
                <span className="text-primary">Comunitaria</span> Miami 2026
              </>
            ) : (
              <>
                Community Migration{" "}
                <span className="text-primary">Clinic</span> Miami 2026
              </>
            )}
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            {isSpanish
              ? "Un espacio de orientación, información y apoyo para nuestra comunidad inmigrante. Una jornada diseñada para brindar acceso a recursos, consultas con abogadas de inmigración y servicios esenciales para las familias."
              : "A space of guidance, information, and support for our immigrant community. A day designed to provide access to resources, consultations with immigration attorneys, and essential services for families."}
          </p>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            Miami, Florida · {isSpanish ? "Junio 2026" : "June 2026"}
          </span>
        </div>

        {/* Two-column: Video + Event details */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* LEFT — Video carousel */}
          <div className="flex flex-col gap-3">
            <div
              className="relative rounded-xl overflow-hidden shadow-lg bg-black"
              style={{ aspectRatio: "16/9" }}
            >
              {videoSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <iframe
                    src={slide.src}
                    title={isSpanish ? slide.label : slide.labelEn}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ))}

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2">
              {videoSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`flex items-center justify-center transition-all rounded-full ${
                    i === current
                      ? "w-7 h-7 bg-primary text-primary-foreground shadow"
                      : "w-6 h-6 bg-muted hover:bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  <Play className="w-3 h-3" />
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              {isSpanish ? currentSlide.label : currentSlide.labelEn}
            </p>
          </div>

          {/* RIGHT — Event details */}
          <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-xl">
            <span className="inline-block px-2.5 py-0.5 bg-cta/10 text-cta text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
              {isSpanish ? "Edición Miami 2026" : "Miami 2026 edition"}
            </span>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              {isSpanish
                ? "La Clínica Migratoria Comunitaria llega a Miami"
                : "The Community Migration Clinic comes to Miami"}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {isSpanish
                ? "Organizada por la Fundación Defensores del CAA y la Libertad, Inc., en colaboración con abogados de inmigración, preparadores de documentos y organizaciones comunitarias."
                : "Organized by Fundación Defensores del CAA y la Libertad, Inc., in collaboration with immigration attorneys, document preparers, and community organizations."}
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isSpanish ? "Sábado 27 de junio de 2026" : "Saturday, June 27, 2026"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isSpanish
                      ? "Conferencia inaugural a las 9:00 AM"
                      : "Opening conference at 9:00 AM"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isSpanish ? "9:00 AM – 4:00 PM" : "9:00 AM – 4:00 PM"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isSpanish ? "Entrada gratuita — abierta a toda la comunidad" : "Free admission — open to the entire community"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    730 NW 107th Ave
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Miami, FL 33172
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-foreground text-center mb-6">
            {isSpanish ? "Servicios y actividades disponibles" : "Available services and activities"}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Consultas con abogadas de inmigración" : "Consultations with immigration attorneys"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Orientación sobre procesos migratorios e información sobre trámites ante USCIS y EOIR."
                  : "Guidance on immigration processes and information about USCIS and EOIR proceedings."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Preparación de documentos" : "Document preparation"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Preparación y organización de documentos migratorios, traducciones y notarizaciones."
                  : "Preparation and organization of immigration documents, translations, and notarizations."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Folder className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Carpeta de Emergencia Migratoria" : "Migration Emergency Folder"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Presentación de la herramienta para la protección familiar y un plan de acción ante emergencias."
                  : "Presentation of the tool for family protection and an emergency action plan."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Stethoscope className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Exámenes médicos migratorios" : "Immigration medical exams"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Orientación sobre el examen médico migratorio (Formulario I-693)."
                  : "Guidance on the immigration medical exam (Form I-693)."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Encuentro comunitario" : "Community gathering"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Con líderes y representantes del exilio histórico cubano, y conferencias educativas de actualidad."
                  : "With leaders and representatives of the historic Cuban exile, plus timely educational conferences."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Preguntas y respuestas" : "Questions & answers"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Espacios abiertos de preguntas y respuestas, recursos y programas comunitarios."
                  : "Open Q&A spaces, community resources, and programs."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Actividades familiares" : "Family activities"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Rifas, actividades familiares y artículos promocionales para toda la comunidad."
                  : "Raffles, family activities, and promotional items for the whole community."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Tienda solidaria" : "Community store"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Productos de apoyo comunitario para sostener la misión de la Fundación."
                  : "Community-support products that sustain the Foundation's mission."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Recursos y programas" : "Resources & programs"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Acceso a recursos confiables y programas comunitarios para avanzar en cada caso."
                  : "Access to reliable resources and community programs to move each case forward."}
              </p>
            </div>
          </div>

          {/* Tech tools — Neo Mambí */}
          <div className="mt-10">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cta/10 text-cta text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
                <Smartphone className="w-3.5 h-3.5" />
                {isSpanish ? "Herramientas tecnológicas" : "Technology tools"}
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {isSpanish
                  ? "Dos innovaciones para fortalecer a nuestra comunidad"
                  : "Two innovations to strengthen our community"}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card border-2 border-cta/20 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center">
                    <Radio className="w-5 h-5 text-cta" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Neo Mambí Reporte</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isSpanish
                    ? "Plataforma que permite visualizar en tiempo real reportes ciudadanos sobre apagones, escasez, transporte, salud e incidentes en Cuba, contribuyendo a una Cuba más libre e informada."
                    : "A platform to view real-time citizen reports on blackouts, shortages, transportation, health, and incidents in Cuba — contributing to a freer, better-informed Cuba."}
                </p>
              </div>

              <div className="bg-card border-2 border-cta/20 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-cta" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Neo Mambí Chat</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isSpanish
                    ? "Herramienta de comunicación comunitaria diseñada para mantener conectados a los cubanos incluso en situaciones de interrupción de internet o restricciones de comunicación."
                    : "A community communication tool designed to keep Cubans connected even during internet outages or communication restrictions."}
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="mt-10 max-w-3xl mx-auto text-center border-l-4 border-primary/40 bg-card/60 backdrop-blur-sm rounded-r-lg px-6 py-5">
            <p className="text-base md:text-lg italic text-foreground leading-relaxed">
              {isSpanish
                ? "“Honramos el pasado, construimos el futuro. Los esperamos para compartir, aprender y fortalecer juntos nuestra comunidad.”"
                : "“We honor the past and build the future. We look forward to sharing, learning, and strengthening our community together.”"}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
