import { Calendar, Clock, MapPin, Scale, FileText, Users, Heart, Folder, Mic, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ClinicaMigratoria() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

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
            {isSpanish ? "Nuevo programa insignia" : "New flagship program"}
          </span>

          <h2 className="heading-2 text-foreground mb-4">
            {isSpanish ? (
              <>
                Clínica Migratoria{" "}
                <span className="text-primary">Comunitaria</span>
              </>
            ) : (
              <>
                Community Migration{" "}
                <span className="text-primary">Clinic</span>
              </>
            )}
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            {isSpanish
              ? "Nuestro programa mensual insignia para brindar orientación migratoria de calidad, apoyo documental y acompañamiento comunitario a las familias que más lo necesitan."
              : "Our flagship monthly program providing quality immigration guidance, document support, and community accompaniment to the families who need it most."}
          </p>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            Brandon, Florida · {isSpanish ? "Mayo 2026" : "May 2026"}
          </span>
        </div>

        {/* Two-column: Video + Event details */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* LEFT — Video */}
          <div className="flex flex-col gap-3">
            <div
              className="relative rounded-xl overflow-hidden shadow-lg bg-black"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src="https://www.youtube.com/embed/RbefNOyLhaU"
                title={isSpanish ? "Clínica Migratoria Comunitaria" : "Community Migration Clinic"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {isSpanish
                ? "Conoce el programa CMC — Clínica Migratoria Comunitaria"
                : "Learn about the CMC — Community Migration Clinic program"}
            </p>
          </div>

          {/* RIGHT — Event details */}
          <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-xl">
            <span className="inline-block px-2.5 py-0.5 bg-cta/10 text-cta text-xs font-semibold rounded-full mb-3 uppercase tracking-wide">
              {isSpanish ? "Primera edición oficial" : "First official edition"}
            </span>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              {isSpanish
                ? "Nace en Brandon la primera jornada CMC"
                : "First CMC clinic launches in Brandon"}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {isSpanish
                ? "Una iniciativa permanente, mensual y diseñada para crecer. Basada en el talento local y sostenida por la red de embajadores de la Fundación."
                : "A permanent, monthly initiative designed to grow. Built on local talent and sustained by the Foundation's ambassador network."}
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isSpanish ? "Sábado 30 de mayo de 2026" : "Saturday, May 30, 2026"}
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
                    8:00 AM – 4:00 PM
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
                    Brandon Chapel
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2906 John Moore Rd, Brandon, FL 33511
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg md:text-xl font-semibold text-foreground text-center mb-6">
            {isSpanish ? "Lo que ofrece cada jornada" : "What every clinic offers"}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Conferencia inaugural" : "Opening conference"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "A cargo de la Lic. Lissette Tocado, Premio AILA Pro Bono — Florida Central."
                  : "Led by Attorney Lissette Tocado, AILA Pro Bono Award — Central Florida."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Orientación legal" : "Legal guidance"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Con las abogadas Diana Castro y María Liliana Obradovich, licenciadas en Florida."
                  : "With attorneys Diana Castro and María Liliana Obradovich, licensed in Florida."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Preparación documental" : "Document preparation"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Residencias, permisos de trabajo, peticiones familiares, FOIA y traducciones certificadas."
                  : "Residencies, work permits, family petitions, FOIA requests, and certified translations."}
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
                  ? "Herramienta práctica para organizar documentos esenciales y definir un plan de acción familiar."
                  : "A practical tool to organize essential documents and define a family action plan."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Red de embajadores" : "Ambassador network"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Identificamos las necesidades de cada familia y las orientamos hacia los recursos disponibles."
                  : "We identify each family's needs and connect them with available community resources."}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {isSpanish ? "Actividades comunitarias" : "Community activities"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isSpanish
                  ? "Tienda solidaria, rifa benéfica y recursos educativos gratuitos para toda la familia."
                  : "Community store, charity raffle, and free educational resources for the whole family."}
              </p>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="mt-10 max-w-3xl mx-auto text-center border-l-4 border-primary/40 bg-card/60 backdrop-blur-sm rounded-r-lg px-6 py-5">
            <p className="text-base md:text-lg italic text-foreground leading-relaxed">
              {isSpanish
                ? "“Cuando una familia sabe qué hacer, cuáles son sus derechos y a quién llamar, ya no es vulnerable. Esa seguridad es lo que la Clínica Migratoria Comunitaria construye, jornada a jornada, familia a familia.”"
                : "“When a family knows what to do, what their rights are, and whom to call, they are no longer vulnerable. That security is what the Community Migration Clinic builds, clinic by clinic, family by family.”"}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
