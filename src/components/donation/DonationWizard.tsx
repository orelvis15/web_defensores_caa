import { useState } from "react";
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
import { Check, CreditCard, Building2, Lock, ChevronLeft } from "lucide-react";

type DonationType = "one-time" | "monthly";
type PaymentMethod = "card" | "bank";

interface DonationWizardProps {
  variant?: "compact" | "full";
}

const oneTimeAmounts = [10, 20, 50, 100];
const monthlyAmounts = [10, 20, 30];

const countries = [
  "United States",
  "Canada",
  "Mexico",
  "Cuba",
  "Spain",
  "Other",
];

export function DonationWizard({ variant = "compact" }: DonationWizardProps) {
  const [step, setStep] = useState(1);
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    isCuban: false,
    cardNumber: "",
    expiry: "",
    cvv: "",
    zip: "",
    accountName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "checking",
  });
  const [receiptOptIn, setReceiptOptIn] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

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

  const handleSubmit = () => {
    // Simulate submission
    setIsComplete(true);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isComplete) {
    return (
      <div
        className={cn(
          "bg-card rounded-xl shadow-lg border p-6 md:p-8",
          variant === "full" && "max-w-lg mx-auto"
        )}
      >
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h3 className="heading-3 text-foreground mb-2">
            Thank you for your donation!
          </h3>
          <p className="text-muted-foreground mb-6">
            Your ${currentAmount} {donationType} donation helps us defend the
            rights of Cuban migrants and fight against fraud and abuse.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            Share this page
          </Button>
        </div>
      </div>
    );
  }

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
            Step {step} of 3
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
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
          {step === 1 && "Choose your donation"}
          {step === 2 && "Your information"}
          {step === 3 && "Confirm your donation"}
        </h3>
      </div>

      <div className="p-6">
        {/* Step 1: Amount & Payment Method */}
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
                One-time
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
                Monthly
              </button>
            </div>

            {/* Amount Selection */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Select amount
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
                Other amount
              </button>
              {selectedAmount === null && (
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Payment method
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all",
                    paymentMethod === "card"
                      ? "border-cta bg-cta/5 text-cta"
                      : "border-border hover:border-cta/50"
                  )}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="font-medium">Credit card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all",
                    paymentMethod === "bank"
                      ? "border-cta bg-cta/5 text-cta"
                      : "border-border hover:border-cta/50"
                  )}
                >
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">Bank account</span>
                </button>
              </div>
            </div>

            <Button
              variant="cta"
              className="w-full"
              size="lg"
              onClick={() => setStep(2)}
              disabled={currentAmount <= 0}
            >
              Continue
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Secure and encrypted processing. You can change or cancel a
              monthly donation at any time.
            </p>
          </div>
        )}

        {/* Step 2: Donor & Payment Details */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
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
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select country" />
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

            <div className="flex items-center gap-2">
              <Checkbox
                id="isCuban"
                checked={formData.isCuban}
                onCheckedChange={(checked) =>
                  handleInputChange("isCuban", checked as boolean)
                }
              />
              <Label htmlFor="isCuban" className="text-sm cursor-pointer">
                I am a Cuban national or of Cuban origin
              </Label>
            </div>

            {/* Payment Details */}
            <div className="border-t pt-5">
              <h4 className="font-medium mb-4">
                {paymentMethod === "card" ? "Card details" : "Bank details"}
              </h4>

              {paymentMethod === "card" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) =>
                          handleInputChange("expiry", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP</Label>
                      <Input
                        id="zip"
                        placeholder="12345"
                        value={formData.zip}
                        onChange={(e) =>
                          handleInputChange("zip", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountName">Account holder name</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) =>
                        handleInputChange("accountName", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="routingNumber">Routing number</Label>
                      <Input
                        id="routingNumber"
                        value={formData.routingNumber}
                        onChange={(e) =>
                          handleInputChange("routingNumber", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account number</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) =>
                          handleInputChange("accountNumber", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Account type</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="checking"
                          checked={formData.accountType === "checking"}
                          onChange={(e) =>
                            handleInputChange("accountType", e.target.value)
                          }
                          className="w-4 h-4 text-cta"
                        />
                        <span className="text-sm">Checking</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="savings"
                          checked={formData.accountType === "savings"}
                          onChange={(e) =>
                            handleInputChange("accountType", e.target.value)
                          }
                          className="w-4 h-4 text-cta"
                        />
                        <span className="text-sm">Savings</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={goBack} className="flex-1">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                variant="cta"
                onClick={() => setStep(3)}
                className="flex-1"
              >
                Review donation
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Donation type</span>
                <span className="font-medium capitalize">{donationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-lg">${currentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment method</span>
                <span className="font-medium">
                  {paymentMethod === "card"
                    ? `Card ending ${formData.cardNumber.slice(-4) || "****"}`
                    : `Bank account ending ${formData.accountNumber.slice(-4) || "****"}`}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-muted-foreground">Donor</span>
                <span className="font-medium">
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="receiptOptIn"
                checked={receiptOptIn}
                onCheckedChange={(checked) =>
                  setReceiptOptIn(checked as boolean)
                }
                className="mt-0.5"
              />
              <Label htmlFor="receiptOptIn" className="text-sm cursor-pointer">
                Email me a receipt and updates about our work.
              </Label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={goBack} className="flex-1">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                variant="cta"
                onClick={handleSubmit}
                className="flex-1"
                size="lg"
              >
                Confirm and donate
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Defenders of the CAA and Freedom, Inc. is a non-partisan,
              community-based non-profit. Donations support information,
              education, community outreach, and monitoring against abuses. This
              website does not provide legal advice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
