import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Lock, Loader2, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SponsorType = "one-time" | "monthly";

const monthlyAmounts = [50, 100, 250, 500];
const oneTimeAmounts = [100, 250, 500, 1000];
const MIN_AMOUNT = 50;

interface SponsorWizardProps {
  variant?: "compact" | "full";
}

export function SponsorWizard({ variant = "compact" }: SponsorWizardProps) {
  const { t, language } = useLanguage();
  const isSpanish = language === "ES";
  const [step, setStep] = useState(1);
  const [sponsorType, setSponsorType] = useState<SponsorType>("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptTerms: false,
  });

  const amounts = sponsorType === "one-time" ? oneTimeAmounts : monthlyAmounts;
  const currentAmount = selectedAmount ?? Number(customAmount) ?? 0;
  const amountValid = currentAmount >= MIN_AMOUNT;

  const handleAmountSelect = (amount: number | "other") => {
    if (amount === "other") {
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
      setCustomAmount("");
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email) {
      toast.error(t("donation.emailRequired"));
      return;
    }
    if (!formData.companyName) {
      toast.error(
        isSpanish
          ? "El nombre de la empresa es requerido"
          : "Company name is required"
      );
      return;
    }
    if (!amountValid) {
      toast.error(
        isSpanish
          ? `El monto mínimo es $${MIN_AMOUNT}`
          : `Minimum amount is $${MIN_AMOUNT}`
      );
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "create-donation-checkout",
        {
          body: {
            donationType: sponsorType,
            amount: currentAmount,
            email: formData.email,
            firstName: formData.companyName,
            lastName: [formData.firstName, formData.lastName]
              .filter(Boolean)
              .join(" "),
          },
        }
      );

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(t("donation.checkoutError"));
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div
      className={cn(
        "bg-card rounded-xl shadow-lg border overflow-hidden",
        variant === "full" && "max-w-lg mx-auto"
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-cta/10 px-6 py-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            {isSpanish ? "Patrocinio Empresarial" : "Business Sponsorship"}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {t("donation.step")} {step} {t("donation.of")} 2
          </span>
          <div className="flex gap-1">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={cn(
                  "w-8 h-1 rounded-full transition-colors",
                  s <= step ? "bg-cta" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
        <h3 className="font-semibold text-foreground">
          {step === 1
            ? isSpanish
              ? "Elige tu plan de patrocinio"
              : "Choose your sponsorship plan"
            : isSpanish
            ? "Información de tu empresa"
            : "Your company information"}
        </h3>
      </div>

      <div className="p-6">
        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Type Toggle */}
            <div className="flex rounded-lg border p-1 bg-muted/30">
              <button
                onClick={() => {
                  setSponsorType("monthly");
                  setSelectedAmount(50);
                  setCustomAmount("");
                }}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                  sponsorType === "monthly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isSpanish ? "Mensual (recomendado)" : "Monthly (recommended)"}
              </button>
              <button
                onClick={() => {
                  setSponsorType("one-time");
                  setSelectedAmount(100);
                  setCustomAmount("");
                }}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                  sponsorType === "one-time"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("donation.oneTime")}
              </button>
            </div>

            {/* Amount Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                {isSpanish
                  ? `Selecciona un monto (mínimo $${MIN_AMOUNT})`
                  : `Select an amount (minimum $${MIN_AMOUNT})`}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={cn(
                      "py-3 px-4 rounded-lg border text-center font-semibold transition-all",
                      selectedAmount === amount
                        ? "border-cta bg-cta/5 text-cta"
                        : "border-border hover:border-cta/50"
                    )}
                  >
                    ${amount}
                    {sponsorType === "monthly" && (
                      <span className="block text-xs font-normal text-muted-foreground">
                        /mes
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleAmountSelect("other")}
                className={cn(
                  "w-full py-3 px-4 rounded-lg border text-center font-medium transition-all",
                  selectedAmount === null
                    ? "border-cta bg-cta/5 text-cta"
                    : "border-border hover:border-cta/50"
                )}
              >
                {t("donation.otherAmount")}
              </button>
              {selectedAmount === null && (
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      min={MIN_AMOUNT}
                      placeholder={String(MIN_AMOUNT)}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  {customAmount && Number(customAmount) < MIN_AMOUNT && (
                    <p className="text-xs text-destructive mt-1">
                      {isSpanish
                        ? `El monto mínimo es $${MIN_AMOUNT}`
                        : `Minimum amount is $${MIN_AMOUNT}`}
                    </p>
                  )}
                </div>
              )}
            </div>

            <Button
              variant="cta"
              className="w-full"
              size="lg"
              onClick={() => setStep(2)}
              disabled={!amountValid}
            >
              {t("donation.continue")}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              {t("donation.secureNote")}
            </p>
          </div>
        )}

        {/* Step 2: Company Info */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <Label htmlFor="companyName">
                {isSpanish ? "Nombre de la empresa" : "Company name"} *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">
                  {isSpanish ? "Nombre del contacto" : "Contact first name"}
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">
                  {isSpanish ? "Apellido" : "Last name"}
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">{t("donation.email")} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">
                {isSpanish ? "Teléfono (opcional)" : "Phone (optional)"}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("acceptTerms", checked as boolean)
                }
                className="mt-0.5"
              />
              <Label
                htmlFor="acceptTerms"
                className="text-sm cursor-pointer leading-tight"
              >
                {t("donation.acceptTermsPrefix")}{" "}
                <Link
                  to="/terms"
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                >
                  {t("donation.termsLink")}
                </Link>{" "}
                {t("donation.acceptTermsAnd")}{" "}
                <Link
                  to="/privacy"
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                >
                  {t("donation.privacyLink")}
                </Link>
              </Label>
            </div>

            {/* Summary */}
            <div className="bg-muted/30 rounded-lg p-4 border-t mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {sponsorType === "monthly"
                    ? isSpanish
                      ? "Patrocinio mensual"
                      : "Monthly sponsorship"
                    : isSpanish
                    ? "Patrocinio único"
                    : "One-time sponsorship"}
                </span>
                <span className="font-semibold text-cta text-lg">
                  ${currentAmount}
                  {sponsorType === "monthly" && (
                    <span className="text-sm text-muted-foreground font-normal">
                      /mes
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={goBack} className="flex-1">
                {t("donation.back")}
              </Button>
              <Button
                variant="cta"
                onClick={handleSubmit}
                className="flex-1"
                disabled={
                  isLoading ||
                  !formData.email ||
                  !formData.companyName ||
                  !formData.acceptTerms
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("donation.processing")}
                  </>
                ) : (
                  t("donation.proceedToPayment")
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              {t("donation.stripeSecure")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
