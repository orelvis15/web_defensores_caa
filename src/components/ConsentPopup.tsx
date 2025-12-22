import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

export function ConsentPopup() {
  const { t } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("terms-consent");
    if (consent !== "accepted") {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("terms-consent", "accepted");
    setShowPopup(false);
    setDeclined(false);
  };

  const handleDecline = () => {
    setDeclined(true);
  };

  const handleReconsider = () => {
    setDeclined(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      {/* Popup */}
      <div className="relative z-10 bg-card border shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Defenders of the CAA" className="h-16 w-auto" />
        </div>

        {!declined ? (
          <>
            {/* Main content */}
            <h2 className="text-xl font-bold text-foreground text-center mb-4">
              {t("consent.title")}
            </h2>
            
            <p className="text-muted-foreground text-center mb-6 text-sm leading-relaxed">
              {t("consent.description")}{" "}
              <Link to="/terms" className="text-primary underline hover:text-primary/80" target="_blank">
                {t("consent.termsLink")}
              </Link>{" "}
              {t("consent.and")}{" "}
              <Link to="/privacy" className="text-primary underline hover:text-primary/80" target="_blank">
                {t("consent.privacyLink")}
              </Link>.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDecline}
              >
                {t("consent.decline")}
              </Button>
              <Button
                variant="cta"
                className="flex-1"
                onClick={handleAccept}
              >
                {t("consent.accept")}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Declined state */}
            <h2 className="text-xl font-bold text-foreground text-center mb-4">
              {t("consent.declinedTitle")}
            </h2>
            
            <p className="text-muted-foreground text-center mb-6 text-sm leading-relaxed">
              {t("consent.declinedDescription")}
            </p>

            {/* Reconsider button */}
            <Button
              variant="cta"
              className="w-full"
              onClick={handleReconsider}
            >
              {t("consent.reconsider")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
