import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Lock, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type DonationType = "one-time" | "monthly";

interface DonationWizardProps {
  variant?: "compact" | "full";
}

const oneTimeAmounts = [10, 20, 50, 100];
const monthlyAmounts = [10, 20, 30];

export function DonationWizard({ variant = "compact" }: DonationWizardProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    acceptTerms: false,
  });

  const countries = [
    t("country.us"),
    t("country.canada"),
    t("country.mexico"),
    t("country.cuba"),
    t("country.spain"),
    t("country.other"),
  ];

  const amounts = donationType === "one-time" ? oneTimeAmounts : monthlyAmounts;
  const currentAmount = selectedAmount || Number(customAmount) || 0;

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

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-donation-checkout", {
        body: {
          donationType,
          amount: currentAmount,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });

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
      {/* Step Indicator */}
      <div className="bg-muted/50 px-6 py-4 border-b">
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
          {step === 1 && t("donation.step1Title")}
          {step === 2 && t("donation.step2TitleSimple")}
        </h3>
      </div>

      <div className="p-6">
        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Donation Type Toggle */}
            <div className="flex rounded-lg border p-1 bg-muted/30">
              <button
                onClick={() => setDonationType("one-time")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                  donationType === "one-time"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("donation.oneTime")}
              </button>
              <button
                onClick={() => setDonationType("monthly")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                  donationType === "monthly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("donation.monthly")}
              </button>
            </div>

            {/* Amount Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                {t("donation.selectAmount")}
              </Label>
              <div className="grid grid-cols-3 gap-2 mb-3">
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
                      placeholder={t("donation.enterAmount")}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="cta"
              className="w-full"
              size="lg"
              onClick={() => setStep(2)}
              disabled={currentAmount <= 0}
            >
              {t("donation.continue")}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              {t("donation.secureNote")}
            </p>
          </div>
        )}

        {/* Step 2: Donor Information */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t("donation.firstName")}</Label>
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
                <Label htmlFor="lastName">{t("donation.lastName")}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
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
              <Label htmlFor="country">{t("donation.country")}</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t("donation.selectCountry")} />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="acceptTerms" className="text-sm cursor-pointer leading-tight">
                {t("donation.acceptTermsPrefix")}{" "}
                <Link to="/terms" className="text-primary underline hover:text-primary/80" target="_blank">
                  {t("donation.termsLink")}
                </Link>{" "}
                {t("donation.acceptTermsAnd")}{" "}
                <Link to="/privacy" className="text-primary underline hover:text-primary/80" target="_blank">
                  {t("donation.privacyLink")}
                </Link>
              </Label>
            </div>

            {/* Summary */}
            <div className="bg-muted/30 rounded-lg p-4 border-t mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {donationType === "one-time" ? t("donation.oneTime") : t("donation.monthly")}
                </span>
                <span className="font-semibold text-cta text-lg">${currentAmount}</span>
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
                disabled={isLoading || !formData.email}
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
