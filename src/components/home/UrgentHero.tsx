import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function UrgentHero() {
  const { t } = useLanguage();
  const isSpanish = t("lang") === "es";

  return (
    <section className="bg-gradient-to-b from-destructive/5 via-background to-background py-12 md:py-16">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hot Topic Badge */}
          <Badge 
            variant="destructive" 
            className="mb-6 px-4 py-1.5 text-sm font-bold animate-pulse"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            {isSpanish ? "🔥 TEMA URGENTE" : "🔥 HOT TOPIC"}
          </Badge>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {isSpanish 
              ? "No somos criminales. Somos familias buscando libertad."
              : "We are not criminals. We are families seeking freedom."}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            {isSpanish 
              ? "Miles de cubanos con I-220A están siendo detenidos y amenazados con deportaciones injustas, a pesar de cumplir la ley y de estar protegidos por la Ley de Ajuste Cubano."
              : "Thousands of Cubans under I-220A are facing unjust detention and deportation threats, despite following the law and being protected under the Cuban Adjustment Act."}
          </p>

          {/* Demands List */}
          <div className="bg-card border rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary mb-4">
              {isSpanish 
                ? "En Defensores del CAA, alzamos la voz para exigir:"
                : "At Defensores del CAA, we stand to demand:"}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✓</span>
                </div>
                <span className="text-foreground">
                  {isSpanish 
                    ? "El cese de detenciones arbitrarias"
                    : "An end to arbitrary detentions"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✓</span>
                </div>
                <span className="text-foreground">
                  {isSpanish 
                    ? "El respeto al debido proceso"
                    : "Respect for due process"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✓</span>
                </div>
                <span className="text-foreground">
                  {isSpanish 
                    ? "El cumplimiento de la Ley de Ajuste Cubano"
                    : "Full enforcement of the Cuban Adjustment Act"}
                </span>
              </li>
            </ul>
          </div>

          {/* Community Message */}
          <p className="text-sm text-muted-foreground italic mb-8 max-w-2xl mx-auto">
            {isSpanish 
              ? "Este mensaje hoy está en las calles gracias al apoyo de miembros y donantes anónimos que creen en la justicia, la dignidad y el derecho a un futuro en libertad."
              : "This message is now visible across our city thanks to the support of members and anonymous donors who believe in justice, dignity, and the right to freedom."}
          </p>

          {/* Tagline */}
          <p className="text-lg font-semibold text-primary mb-8">
            👉 {isSpanish 
              ? "Defender la ley es defender a las familias."
              : "Defending the law means defending families."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </section>
  );
}
