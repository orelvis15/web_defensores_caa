import { Layout } from "@/components/layout/Layout";
import { SponsorWizard } from "@/components/sponsor/SponsorWizard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import empresa1 from "@/assets/empresa_1.png";
import empresa2 from "@/assets/empresa_2.png";
import {
  Handshake,
  Heart,
  Users,
  Shield,
  Megaphone,
  Star,
  Award,
  TrendingUp,
  Building2,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Sponsors() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  const impactItems = isSpanish
    ? [
        "Familias cubanas a obtener apoyo y orientación legal en su proceso migratorio",
        "Personas vulnerables a recibir asistencia humanitaria y emocional",
        "Cubanos exiliados a defender sus derechos humanos",
        "Nuevos comienzos para quienes lo dejaron todo buscando libertad",
      ]
    : [
        "Cuban families to obtain support and legal guidance in their migration process",
        "Vulnerable people to receive humanitarian and emotional assistance",
        "Exiled Cubans to defend their human rights",
        "New beginnings for those who left everything searching for freedom",
      ];

  const stories = isSpanish
    ? [
        "Una madre que no sabe qué pasará mañana",
        "Un padre luchando por reunirse con su familia",
        "Un migrante enfrentando un sistema complejo",
      ]
    : [
        "A mother who doesn't know what tomorrow will bring",
        "A father fighting to reunite with his family",
        "A migrant facing a complex system",
      ];

  const benefits = isSpanish
    ? [
        {
          icon: Star,
          title: "Visibilidad de marca",
          desc: "Presencia destacada en eventos comunitarios y campañas",
        },
        {
          icon: Megaphone,
          title: "Promoción activa",
          desc: "Tu marca promocionada en nuestras redes y campañas",
        },
        {
          icon: Users,
          title: "Comunidad comprometida",
          desc: "Acceso a una red de personas que comparten tus valores",
        },
        {
          icon: Award,
          title: "Reconocimiento social",
          desc: "Reconocimiento como empresa socialmente responsable",
        },
        {
          icon: Shield,
          title: "Confianza y credibilidad",
          desc: "Mayor confianza y credibilidad ante tus clientes",
        },
        {
          icon: Heart,
          title: "Impacto humano real",
          desc: "Asociación con una causa de alto impacto humano",
        },
      ]
    : [
        {
          icon: Star,
          title: "Brand visibility",
          desc: "Featured presence at community events and campaigns",
        },
        {
          icon: Megaphone,
          title: "Active promotion",
          desc: "Your brand promoted across our social media and campaigns",
        },
        {
          icon: Users,
          title: "Engaged community",
          desc: "Access to a network of people who share your values",
        },
        {
          icon: Award,
          title: "Social recognition",
          desc: "Recognition as a socially responsible business",
        },
        {
          icon: Shield,
          title: "Trust and credibility",
          desc: "Greater trust and credibility with your customers",
        },
        {
          icon: Heart,
          title: "Real human impact",
          desc: "Partnership with a high-impact humanitarian cause",
        },
      ];

  return (
    <Layout>
      {/* Hero Section with form */}
      <section className="bg-gradient-to-b from-section-light via-primary/5 to-background pt-10 pb-12 md:pt-12 md:pb-16">
        <div className="container-wide">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Text Content */}
            <div className="animate-slide-up order-1 lg:order-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                <Handshake className="w-4 h-4" />
                {isSpanish
                  ? "Patrocinadores Empresariales"
                  : "Business Sponsors"}
              </span>

              <h1 className="heading-1 text-foreground mb-4">
                {isSpanish
                  ? "Tu negocio puede ser la diferencia"
                  : "Your business can make the difference"}
              </h1>

              <p className="text-lg md:text-xl text-primary font-semibold mb-4 leading-relaxed">
                {isSpanish
                  ? "Entre la desesperación… y la esperanza"
                  : "Between despair… and hope"}
              </p>

              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                {isSpanish
                  ? "En un mundo donde muchas familias luchan por salir adelante, tu empresa puede convertirse en un puente hacia una nueva oportunidad."
                  : "In a world where many families struggle to move forward, your company can become a bridge to a new opportunity."}
              </p>

              <div className="bg-card border rounded-xl p-5 shadow-sm">
                <p className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cta" />
                  {isSpanish
                    ? "Forma parte de una causa real"
                    : "Be part of a real cause"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isSpanish
                    ? "Conviértete en patrocinador mensual desde $50 USD y ayuda a transformar vidas mientras haces crecer tu marca."
                    : "Become a monthly sponsor from $50 USD and help transform lives while growing your brand."}
                </p>
              </div>
            </div>

            {/* Right - Sponsor Widget */}
            <div className="animate-slide-in-right w-full order-2 lg:order-2 lg:sticky lg:top-20">
              <SponsorWizard />
            </div>
          </div>
        </div>
      </section>

      {/* What we achieve together */}
      <section className="py-14 md:py-20 bg-section-alt">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={empresa1}
                  alt={
                    isSpanish
                      ? "Alianza empresarial con Defensores del CAA"
                      : "Business partnership with Defensores del CAA"
                  }
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cta/10 text-cta text-sm font-medium rounded-full mb-4">
                <Globe className="w-4 h-4" />
                {isSpanish ? "Impacto compartido" : "Shared impact"}
              </div>
              <h2 className="heading-2 text-foreground mb-4">
                {isSpanish
                  ? "¿Qué logramos juntos?"
                  : "What do we achieve together?"}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {isSpanish
                  ? "Al convertirte en patrocinador mensual, estás ayudando directamente a:"
                  : "By becoming a monthly sponsor, you are directly helping:"}
              </p>

              <ul className="space-y-3">
                {impactItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-card border rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cta shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real stories */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded-full mb-4">
                <Heart className="w-4 h-4" />
                {isSpanish ? "Historias reales" : "Real stories"}
              </div>
              <h2 className="heading-2 text-foreground mb-4">
                {isSpanish
                  ? "Detrás de cada aporte hay una historia real"
                  : "Behind every contribution there's a real story"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stories.map((story, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-destructive/5 to-primary/5 border rounded-xl p-6 text-center"
                >
                  <Heart className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <p className="text-foreground italic">{story}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-lg font-semibold text-primary">
              {isSpanish
                ? "Tu apoyo llega directamente a quienes más lo necesitan."
                : "Your support goes directly to those who need it most."}
            </p>
          </div>
        </div>
      </section>

      {/* Business benefits */}
      <section className="py-14 md:py-20 bg-section-alt">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto mb-12">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                <TrendingUp className="w-4 h-4" />
                {isSpanish
                  ? "Tu empresa también gana"
                  : "Your business also wins"}
              </div>
              <h2 className="heading-2 text-foreground mb-4">
                {isSpanish
                  ? "Haz crecer tu negocio mientras apoyas una causa"
                  : "Grow your business while supporting a cause"}
              </h2>
              <p className="text-muted-foreground text-lg">
                {isSpanish
                  ? "Hoy los clientes no solo compran productos… apoyan marcas con propósito. Al asociar tu empresa con una causa humanitaria real, construyes lealtad, confianza y crecimiento sostenido."
                  : "Today, customers don't just buy products… they support brands with purpose. By associating your business with a real humanitarian cause, you build loyalty, trust, and sustained growth."}
              </p>
            </div>

            {/* Image */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={empresa2}
                  alt={
                    isSpanish
                      ? "Empresas que crecen mientras apoyan una causa"
                      : "Businesses that grow while supporting a cause"
                  }
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formula section */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-cta/5 to-primary/10 border rounded-2xl p-8 md:p-12">
            <Building2 className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="heading-2 text-foreground mb-4">
              {isSpanish
                ? "Tu marca + una causa real"
                : "Your brand + a real cause"}
            </h2>
            <div className="text-3xl md:text-4xl font-bold text-cta mb-4">
              = {isSpanish ? "Impacto + Crecimiento" : "Impact + Growth"}
            </div>
            <p className="text-lg text-muted-foreground">
              {isSpanish
                ? "Haz que tu negocio no solo genere ingresos… genere cambio."
                : "Make your business not just generate revenue… generate change."}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-4">
              {isSpanish
                ? "Conviértete en patrocinador hoy"
                : "Become a sponsor today"}
            </h2>
            <p className="text-lg opacity-90 mb-8">
              {isSpanish
                ? "Fortalece tu marca, ayuda a quienes lo necesitan y sé parte de algo más grande."
                : "Strengthen your brand, help those in need, and be part of something bigger."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
              <a
                href="mailto:info@defensorescaa.org"
                className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors rounded-xl p-4"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs opacity-70">
                    {isSpanish ? "Correo" : "Email"}
                  </p>
                  <p className="font-medium text-sm truncate">
                    info@defensorescaa.org
                  </p>
                </div>
              </a>
              <a
                href="tel:+18139990195"
                className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors rounded-xl p-4"
              >
                <Phone className="w-5 h-5 shrink-0" />
                <div>
                  <p className="text-xs opacity-70">
                    {isSpanish ? "Teléfono" : "Phone"}
                  </p>
                  <p className="font-medium text-sm">(813) 999-0195</p>
                </div>
              </a>
              <a
                href="https://defensorescaa.org"
                className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors rounded-xl p-4"
              >
                <Globe className="w-5 h-5 shrink-0" />
                <div>
                  <p className="text-xs opacity-70">Web</p>
                  <p className="font-medium text-sm">defensorescaa.org</p>
                </div>
              </a>
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <Handshake className="w-5 h-5 mr-2" />
              {isSpanish
                ? "Quiero ser patrocinador"
                : "I want to become a sponsor"}
            </Button>

            <p className="mt-8 text-sm opacity-80 italic">
              {isSpanish
                ? "Fundación Defensores del CAA y la Libertad, Inc."
                : "Defenders of the CAA and Freedom Foundation, Inc."}
              {" · "}
              <span className="font-semibold">
                {isSpanish
                  ? "Unidad · Libertad · Esperanza"
                  : "Unity · Freedom · Hope"}
              </span>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
