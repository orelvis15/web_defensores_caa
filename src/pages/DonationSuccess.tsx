import { Link } from "react-router-dom";
import { Check, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DonationSuccess() {
  const { t } = useLanguage();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t("footer.brand"),
        text: t("donation.shareText"),
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-xl shadow-lg border p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-success" />
        </div>
        
        <h1 className="heading-2 text-foreground mb-4">
          {t("donation.thankYou")}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {t("donation.successMessage")}
        </p>

        <div className="flex flex-col gap-3">
          <Button onClick={handleShare} className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            {t("donation.share")}
          </Button>
          
          <Link to="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("takeAction.backToSite")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
