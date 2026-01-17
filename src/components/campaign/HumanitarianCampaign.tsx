import { Heart, Home, Scale, Baby, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import family1 from "@/assets/campaign/family-1.jpg";
import family2 from "@/assets/campaign/family-2.jpg";
import family3 from "@/assets/campaign/family-3.jpg";
import family4 from "@/assets/campaign/family-4.jpg";
import family5 from "@/assets/campaign/family-5.jpg";

const images = [family1, family2, family3, family4, family5];

const donationUses = [
  {
    icon: Scale,
    text: "Honorarios legales y defensa migratoria",
  },
  {
    icon: Home,
    text: "Vivienda, renta y servicios básicos",
  },
  {
    icon: Heart,
    text: "Alimentación y necesidades esenciales",
  },
  {
    icon: Baby,
    text: "Cuidado infantil para que Beatriz pueda trabajar",
  },
];

export function HumanitarianCampaign() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-red-50 to-background dark:from-red-950/20 dark:to-background">
      <div className="container-wide">
        {/* Urgent Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full animate-pulse">
            <HandHeart className="w-4 h-4" />
            CASO HUMANITARIO URGENTE
          </span>
        </div>

        {/* Title */}
        <h2 className="heading-2 text-center text-foreground mb-4 max-w-4xl mx-auto">
          Apoyo humanitario urgente para familia cubana con padre detenido
        </h2>

        <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
          La Fundación Defensores del CAA presenta este caso humanitario para solicitar apoyo solidario
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image Carousel */}
          <div className="relative">
            <Carousel className="w-full max-w-lg mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={image}
                        alt={`Familia Vázquez Corrales - Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            {/* Caption */}
            <p className="text-center text-sm text-muted-foreground mt-4 italic">
              Beatriz, Emanuel y sus dos hijos — una familia que necesita nuestra ayuda
            </p>
          </div>

          {/* Right - Story */}
          <div className="space-y-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                <strong>Beatriz Mercedes Corrales Rivero</strong>, madre cubana residente en Dallas, Texas, 
                y sus dos hijos menores de 1 y 3 años, atraviesan una situación extremadamente difícil 
                tras la detención migratoria de su esposo <strong>Emanuel Vázquez Vasallo</strong>, 
                ocurrida el 13 de noviembre de 2025.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Emanuel era el único sostén económico del hogar. Su detención dejó a la familia 
                sin ingresos suficientes para cubrir necesidades básicas como vivienda, alimentación, 
                servicios esenciales y gastos legales. No posee historial criminal y su caso se 
                encuentra bajo defensa activa del Ajuste Cubano.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Beatriz cuenta con permiso de trabajo pero la falta de recursos para pagar 
                una guardería le impide incorporarse al mercado laboral, agravando la situación.
              </p>
            </div>

            {/* Donation Uses */}
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Destino de las donaciones
              </h3>
              <ul className="space-y-3">
                {donationUses.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Badge */}
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              ✓ Este es un <strong>caso verificado y documentado</strong> por la fundación. 
              Toda ayuda será administrada con responsabilidad y transparencia.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white flex-1">
                <Link to="/take-action">
                  <Heart className="w-5 h-5 mr-2" />
                  Donar Ahora
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/contact">
                  Más Información
                </Link>
              </Button>
            </div>

            {/* Emotional closing */}
            <p className="text-center text-sm text-muted-foreground pt-4 border-t">
              🙏 <em>Cada donación representa un paso más hacia la estabilidad, 
              la dignidad y la reunificación familiar.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
