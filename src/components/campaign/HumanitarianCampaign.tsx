import { useState, useEffect } from "react";
import { Heart, Home, Scale, Baby, HandHeart, DollarSign, Utensils } from "lucide-react";
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

import aylin1 from "@/assets/campaign2/aylin-1.jpg";
import aylin2 from "@/assets/campaign2/aylin-2.jpg";
import aylin3 from "@/assets/campaign2/aylin-3.jpg";
import aylin4 from "@/assets/campaign2/aylin-4.jpg";
import aylin5 from "@/assets/campaign2/aylin-5.jpg";
import aylin6 from "@/assets/campaign2/aylin-6.jpg";

const images = [aylin1, aylin4, aylin3, aylin5, aylin6, aylin2];

const CAMPAIGN_ID = "rivera-ruiz-2026";

const donationUses = [
  { icon: Home, text: "Vivienda y renta" },
  { icon: Utensils, text: "Alimentación y necesidades esenciales" },
  { icon: Baby, text: "Cuidado de su bebé de 8 meses" },
  { icon: Heart, text: "Estabilización mientras encuentra empleo" },
];

const suggestedAmounts = [25, 50, 100, 250];

export function HumanitarianCampaign() {
  const [totalRaised, setTotalRaised] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [customAmount, setCustomAmount] = useState<string>("50");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCampaignTotal();
  }, []);

  const fetchCampaignTotal = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        `${supabaseUrl}/functions/v1/get-campaign-total?campaignId=${CAMPAIGN_ID}`,
        { headers: { 'apikey': supabaseKey } }
      );
      const data = await res.json();
      if (data) {
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
          Apoyo humanitario urgente para Aylin y su bebé
        </h2>

        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          La Fundación Defensores del CAA presenta este caso humanitario para solicitar apoyo solidario
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left - Counter + Image Carousel */}
          <div className="space-y-6">
            {/* Counter Card */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-5 md:p-6 text-white shadow-2xl">
              <p className="text-xs md:text-sm uppercase tracking-wide opacity-90 mb-1">
                Total Recaudado
              </p>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-8 h-8 md:w-10 md:h-10" />
                <span className="text-4xl md:text-5xl font-bold tracking-tight">
                  {formatCurrency(totalRaised).replace('$', '')}
                </span>
              </div>
              <p className="text-xs opacity-80">
                de {donorCount} {donorCount === 1 ? 'donante' : 'donantes'} generosos
              </p>
            </div>

            {/* Image Carousel */}
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={image}
                        alt={`Aylin y su familia - Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <p className="text-center text-sm text-muted-foreground italic">
              Aylin, Marlon y su bebé — una familia que necesita nuestra ayuda
            </p>

            {/* Story below carousel on mobile */}
            <div className="lg:hidden space-y-4">
              <div className="prose prose-gray dark:prose-invert max-w-none text-sm">
              <p className="text-foreground leading-relaxed">
                  Aylin es una mujer migrante que atraviesa una situación de extrema vulnerabilidad 
                  tras la detención y deportación de su esposo a Cuba. Fue detenido durante una cita 
                  de rutina con ICE, a pesar de no tener antecedentes penales.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Quedó sola al cuidado de su bebé de apenas 8 meses, completamente dependiente de ella. 
                  Necesita apoyo urgente para cubrir sus necesidades básicas más esenciales.
                </p>
              </div>
            </div>

            {/* Verification Badge */}
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              ✓ <strong>Caso verificado y documentado</strong> por la fundación.
              Toda ayuda será administrada con responsabilidad y transparencia.
            </p>

            {/* Emotional closing */}
            <p className="text-center text-sm text-muted-foreground">
              🙏 <em>Tu apoyo puede marcar una diferencia real en la vida de una madre y su hija.</em>
            </p>
          </div>

          {/* Right - Donation Form + Details */}
          <div className="space-y-6">
            {/* Story - only on lg */}
            <div className="hidden lg:block prose prose-gray dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed">
                Aylin es una mujer migrante que atraviesa una situación de extrema vulnerabilidad 
                tras la detención y deportación de su esposo a Cuba. Su esposo fue detenido durante 
                una cita de rutina con ICE, a pesar de no tener antecedentes penales, y posteriormente 
                deportado, dejando a Aylin sola y sin apoyo familiar en los Estados Unidos.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Aylin llegó al país mediante el programa CBP One, por lo que actualmente no cuenta 
                con estatus migratorio, lo que dificulta aún más su acceso inmediato a empleo y recursos. 
                Como resultado de esta situación, quedó sola al cuidado de su bebé, una niña de apenas 
                8 meses de nacida, completamente dependiente de ella.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                En este momento, Aylin necesita apoyo urgente para poder cubrir sus necesidades básicas 
                más esenciales, como techo y alimentación, mientras logra estabilizarse y encontrar un 
                trabajo que le permita sustentar dignamente a su hija.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                La Fundación hace un llamado solidario a la comunidad para apoyar a Aylin en este 
                momento crítico. Cada contribución ayudará a garantizar un entorno seguro y digno 
                para ella y su bebé durante esta etapa de transición y necesidad.
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
          </div>
        </div>
      </div>
    </section>
  );
}
