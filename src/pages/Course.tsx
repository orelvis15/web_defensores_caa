import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  BookOpen,
  Scale,
  Shield,
  Users,
  CheckCircle,
  Heart,
  Loader2,
} from "lucide-react";

export default function Course() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });

  const isSpanish = t("lang") === "es";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast({
        title: isSpanish ? "Campos requeridos" : "Required fields",
        description: isSpanish
          ? "Por favor completa nombre, apellido y email."
          : "Please fill in first name, last name and email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-course-checkout", {
        body: {
          email: formData.email.trim(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim() || null,
          city: formData.city.trim() || null,
          state: formData.state.trim() || null,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast({
        title: "Error",
        description: isSpanish
          ? "No se pudo iniciar el pago. Inténtalo de nuevo."
          : "Could not start payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = isSpanish
    ? [
        "Aprende directamente de un abogado experto en inmigración",
        "Entiende el proceso de Habeas Corpus paso a paso",
        "Material práctico y aplicable a tu caso o el de un ser querido",
        "Certificado de participación al completar el curso",
        "100% de los fondos apoyan la misión de la organización",
      ]
    : [
        "Learn directly from an expert immigration attorney",
        "Understand the Habeas Corpus process step by step",
        "Practical material applicable to your case or a loved one's",
        "Certificate of participation upon completion",
        "100% of proceeds support the organization's mission",
      ];

  const topics = isSpanish
    ? [
        "Fundamentos legales del Habeas Corpus",
        "Cuándo y cómo presentar una petición Pro Se",
        "Documentación necesaria y cómo prepararla",
        "Estrategias para casos de detención migratoria",
        "Derechos del detenido y recursos disponibles",
        "Casos prácticos y ejemplos reales",
      ]
    : [
        "Legal foundations of Habeas Corpus",
        "When and how to file a Pro Se petition",
        "Required documentation and how to prepare it",
        "Strategies for immigration detention cases",
        "Detainee rights and available resources",
        "Practical cases and real examples",
      ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                {isSpanish ? "NUEVO CURSO" : "NEW COURSE"}
              </span>
            </div>
            <h1 className="heading-1 text-foreground mb-4">
              Herramientas de Libertad
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Habeas Corpus Pro Se en Detención Migratoria
            </p>
            <div className="mt-6 inline-block bg-cta text-cta-foreground px-6 py-3 rounded-xl text-2xl font-bold">
              $50 USD
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-2 text-foreground mb-6">
                {isSpanish ? "¿Qué aprenderás?" : "What will you learn?"}
              </h2>
              <div className="space-y-4">
                {topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-2 text-foreground mb-6">
                {isSpanish ? "Beneficios" : "Benefits"}
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Scale className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {isSpanish ? "Impartido por abogado" : "Taught by attorney"}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {isSpanish ? "Material práctico" : "Practical material"}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {isSpanish ? "Apoyo comunitario" : "Community support"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section-padding bg-section-light" id="registro">
        <div className="container-wide">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="heading-2 text-foreground mb-3">
                {isSpanish ? "Inscríbete ahora" : "Register now"}
              </h2>
              <p className="text-muted-foreground">
                {isSpanish
                  ? "Completa tus datos y serás redirigido al pago seguro de $50."
                  : "Fill in your details and you'll be redirected to the secure $50 payment."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{isSpanish ? "Nombre *" : "First Name *"}</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder={isSpanish ? "Tu nombre" : "Your first name"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{isSpanish ? "Apellido *" : "Last Name *"}</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder={isSpanish ? "Tu apellido" : "Your last name"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{isSpanish ? "Teléfono" : "Phone"}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{isSpanish ? "Ciudad" : "City"}</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder={isSpanish ? "Tu ciudad" : "Your city"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{isSpanish ? "Estado" : "State"}</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    maxLength={50}
                    placeholder={isSpanish ? "Ej: Florida" : "E.g.: Florida"}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full mt-4" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isSpanish ? "Procesando..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {isSpanish ? "Inscribirme por $50" : "Register for $50"}
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mt-3">
                <Heart className="w-3 h-3 text-cta" />
                <span>
                  {isSpanish
                    ? "100% de los fondos apoyan nuestra misión"
                    : "100% of proceeds support our mission"}
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
