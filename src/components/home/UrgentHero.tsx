import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/campaign/hero-campaign.gif";

export function UrgentHero() {
  const { language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <section className="bg-gradient-to-b from-destructive/5 via-background to-background py-10 md:py-16">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Billboard Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt={isSpanish 
                  ? "Campaña: Alto a las detenciones y deportaciones injustas" 
                  : "Campaign: Stop detentions and unjust deportations"}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">
                  {isSpanish 
                    ? "📍 Nuestra campaña en las calles de Miami"
                    : "📍 Our campaign on Miami streets"}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="order-1 lg:order-2">
            {/* Hot Topic Badge */}
            <Badge 
              variant="destructive" 
              className="mb-4 px-4 py-1.5 text-sm font-bold animate-pulse"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {isSpanish ? "🔥 TEMA URGENTE" : "🔥 HOT TOPIC"}
            </Badge>

            {/* Main Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {isSpanish 
                ? "No somos criminales. Somos familias buscando libertad."
                : "We are not criminals. We are families seeking freedom."}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              {isSpanish 
                ? "Miles de cubanos con I-220A están siendo detenidos y amenazados con deportaciones injustas, a pesar de cumplir la ley y de estar protegidos por la Ley de Ajuste Cubano."
                : "Thousands of Cubans under I-220A are facing unjust detention and deportation threats, despite following the law and being protected under the Cuban Adjustment Act."}
            </p>

            {/* Demands List */}
            <div className="bg-card border rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-primary mb-3">
                {isSpanish 
                  ? "En Defensores del CAA, alzamos la voz para exigir:"
                  : "At Defensores del CAA, we stand to demand:"}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">✓</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {isSpanish 
                      ? "El cese de detenciones arbitrarias"
                      : "An end to arbitrary detentions"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">✓</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {isSpanish 
                      ? "El respeto al debido proceso"
                      : "Respect for due process"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">✓</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {isSpanish 
                      ? "El cumplimiento de la Ley de Ajuste Cubano"
                      : "Full enforcement of the Cuban Adjustment Act"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Tagline */}
            <p className="text-base font-semibold text-primary mb-6">
              👉 {isSpanish 
                ? "Defender la ley es defender a las familias."
                : "Defending the law means defending families."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="cta" size="lg">
                <Link to="/take-action">
                  <Heart className="w-5 h-5 mr-2" />
                  {isSpanish ? "Apoya la causa" : "Support the cause"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/get-involved">
                  <Users className="w-5 h-5 mr-2" />
                  {isSpanish ? "Únete al movimiento" : "Join the movement"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
