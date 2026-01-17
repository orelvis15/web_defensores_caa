import { useState, useEffect } from "react";
import { Heart, Home, Scale, Baby, HandHeart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import family1 from "@/assets/campaign/family-1.jpg";
import family2 from "@/assets/campaign/family-2.jpg";
import family3 from "@/assets/campaign/family-3.jpg";
import family4 from "@/assets/campaign/family-4.jpg";
import family5 from "@/assets/campaign/family-5.jpg";

const images = [family1, family2, family3, family4, family5];

const CAMPAIGN_ID = "vazquez-corrales-2025";

const donationUses = [
  { icon: Scale, text: "Honorarios legales y defensa migratoria" },
  { icon: Home, text: "Vivienda, renta y servicios básicos" },
  { icon: Heart, text: "Alimentación y necesidades esenciales" },
  { icon: Baby, text: "Cuidado infantil para que Beatriz pueda trabajar" },
];

const suggestedAmounts = [25, 50, 100, 250];

export function HumanitarianCampaign() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [customAmount, setCustomAmount] = useState<string>("50");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch campaign total on mount
  useEffect(() => {
    fetchCampaignTotal();
  }, []);

  const fetchCampaignTotal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-campaign-total', {
        method: 'GET',
      });
      
      if (!error && data) {
        setTotalRaised(data.total || 0);
        setDonorCount(data.count || 0);
      }
    } catch (err) {
      console.error("Error fetching campaign total:", err);
    }
  };

  const handleDonate = async () => {
    const amount = parseFloat(customAmount);
    
    if (isNaN(amount) || amount < 1) {
      toast({
        title: "Cantidad inválida",
        description: "Por favor ingresa una cantidad válida (mínimo $1)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-campaign-donation', {
        body: {
          amount,
          campaignId: CAMPAIGN_ID,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error("Donation error:", err);
      toast({
        title: "Error",
        description: "No se pudo procesar la donación. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-red-50 via-red-50/50 to-background dark:from-red-950/30 dark:via-red-950/10 dark:to-background">
      <div className="container-wide">
        {/* Urgent Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full animate-pulse">
            <HandHeart className="w-4 h-4" />
            CASO HUMANITARIO URGENTE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-3 max-w-4xl mx-auto">
          Apoyo humanitario urgente para familia cubana con padre detenido
        </h2>

        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          La Fundación Defensores del CAA presenta este caso humanitario para solicitar apoyo solidario
        </p>

        {/* Big Counter */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 md:p-8 text-white text-center mb-10 max-w-2xl mx-auto shadow-2xl">
          <p className="text-sm md:text-base uppercase tracking-wide opacity-90 mb-2">
            Total Recaudado
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <DollarSign className="w-10 h-10 md:w-14 md:h-14" />
            <span className="text-5xl md:text-7xl font-bold tracking-tight">
              {formatCurrency(totalRaised).replace('$', '')}
            </span>
          </div>
          <p className="text-sm opacity-80">
            de {donorCount} {donorCount === 1 ? 'donante' : 'donantes'} generosos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
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
            
            <p className="text-center text-sm text-muted-foreground mt-4 italic">
              Beatriz, Emanuel y sus dos hijos — una familia que necesita nuestra ayuda
            </p>

            {/* Story below carousel on mobile, hidden on lg */}
            <div className="mt-8 lg:hidden space-y-4">
              <div className="prose prose-gray dark:prose-invert max-w-none text-sm">
                <p className="text-foreground leading-relaxed">
                  <strong>Beatriz Mercedes Corrales Rivero</strong>, madre cubana residente en Dallas, Texas, 
                  y sus dos hijos menores de 1 y 3 años, atraviesan una situación extremadamente difícil 
                  tras la detención migratoria de su esposo <strong>Emanuel Vázquez Vasallo</strong>, 
                  ocurrida el 13 de noviembre de 2025.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Emanuel era el único sostén económico del hogar. Su detención dejó a la familia 
                  sin ingresos suficientes para cubrir necesidades básicas.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Donation Form + Details */}
          <div className="space-y-6">
            {/* Story - only on lg */}
            <div className="hidden lg:block prose prose-gray dark:prose-invert max-w-none">
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
            </div>

            {/* Donation Form */}
            <div className="bg-card border-2 border-red-200 dark:border-red-900 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Haz tu donación
              </h3>

              {/* Suggested Amounts */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCustomAmount(amount.toString())}
                    className={`py-3 px-2 rounded-lg font-semibold transition-all ${
                      customAmount === amount.toString()
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-4">
                <Label htmlFor="amount" className="text-sm text-muted-foreground mb-1 block">
                  O ingresa otra cantidad
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    max="100000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-7 text-lg font-semibold"
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Donate Button */}
              <Button 
                onClick={handleDonate}
                disabled={isLoading}
                size="lg" 
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
              >
                {isLoading ? (
                  "Procesando..."
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Donar {customAmount ? `$${customAmount}` : "Ahora"}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3">
                Pago seguro procesado por Stripe
              </p>
            </div>

            {/* Donation Uses */}
            <div className="bg-card border rounded-xl p-5">
              <h4 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wide">
                Destino de las donaciones
              </h4>
              <ul className="space-y-2">
                {donationUses.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-red-600" />
                    </div>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Badge */}
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              ✓ <strong>Caso verificado y documentado</strong> por la fundación. 
              Toda ayuda será administrada con responsabilidad y transparencia.
            </p>

            {/* Emotional closing */}
            <p className="text-center text-sm text-muted-foreground">
              🙏 <em>Cada donación representa un paso más hacia la estabilidad, 
              la dignidad y la reunificación familiar.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
