import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, ArrowLeft, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export default function DonationSuccess() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const sessionId = searchParams.get("session_id");
  const campaignId = searchParams.get("campaign");
  const isCampaignDonation = !!campaignId;

  useEffect(() => {
    // If this is a campaign donation, verify and update the status
    if (sessionId && isCampaignDonation) {
      verifyCampaignDonation();
    }
  }, [sessionId, isCampaignDonation]);

  const verifyCampaignDonation = async () => {
    setVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-campaign-donation', {
        body: { sessionId },
      });
      
      if (!error && data?.success) {
        setVerified(true);
      }
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setVerifying(false);
    }
  };

  const handleShare = () => {
    const shareText = isCampaignDonation 
      ? "Acabo de donar para ayudar a una familia cubana en necesidad. ¡Únete a esta causa humanitaria!"
      : t("donation.shareText");
    
    if (navigator.share) {
      navigator.share({
        title: isCampaignDonation ? "Campaña Humanitaria" : t("footer.brand"),
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-xl shadow-lg border p-8 text-center animate-fade-in">
        <div className={`w-20 h-20 ${isCampaignDonation ? 'bg-red-100 dark:bg-red-900/30' : 'bg-success/10'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {isCampaignDonation ? (
            <Heart className="w-10 h-10 text-red-600" />
          ) : (
            <Check className="w-10 h-10 text-success" />
          )}
        </div>
        
        <h1 className="heading-2 text-foreground mb-4">
          {isCampaignDonation ? "¡Gracias por tu generosidad!" : t("donation.thankYou")}
        </h1>
        
        <p className="text-muted-foreground mb-6">
          {isCampaignDonation 
            ? "Tu donación para la familia Vázquez Corrales ha sido recibida exitosamente. Tu apoyo marca una diferencia real en sus vidas."
            : t("donation.successMessage")}
        </p>

        {isCampaignDonation && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
            {verifying ? (
              <span>Verificando donación...</span>
            ) : verified ? (
              <span className="text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Donación verificada y registrada
              </span>
            ) : (
              <span>Tu donación será registrada en breve</span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={handleShare} className={isCampaignDonation ? "w-full bg-red-600 hover:bg-red-700" : "w-full"}>
            <Share2 className="w-4 h-4 mr-2" />
            {isCampaignDonation ? "Compartir esta causa" : t("donation.share")}
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
