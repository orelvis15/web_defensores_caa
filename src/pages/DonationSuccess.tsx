import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, ArrowLeft, Heart, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SHARE_URL = "https://defensorescaa.org";

export default function DonationSuccess() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const sessionId = searchParams.get("session_id");
  const campaignId = searchParams.get("campaign");
  const purchaseType = searchParams.get("type");
  const isCampaignDonation = !!campaignId;
  const isCoursePurchase = purchaseType === "course";

  useEffect(() => {
    if (sessionId && isCampaignDonation) {
      verifyCampaignDonation();
    }
    if (sessionId && isCoursePurchase) {
      verifyCoursePurchase();
    }
  }, [sessionId, isCampaignDonation, isCoursePurchase]);

  const verifyCampaignDonation = async () => {
    setVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-campaign-donation', {
        body: { sessionId },
      });
      if (!error && data?.success) setVerified(true);
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setVerifying(false);
    }
  };

  const verifyCoursePurchase = async () => {
    setVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-course-purchase', {
        body: { sessionId },
      });
      if (!error && data?.success) setVerified(true);
    } catch (err) {
      console.error("Course verification error:", err);
    } finally {
      setVerifying(false);
    }
  };

  const shareMessage = isCoursePurchase
    ? `Acabo de inscribirme en el curso Herramientas de Libertad. ¡Aprende sobre Habeas Corpus Pro Se y únete! ${SHARE_URL}`
    : isCampaignDonation
      ? `Acabo de donar para ayudar a una familia cubana en necesidad. Cada aporte cuenta — ¡únete a esta causa humanitaria! ${SHARE_URL}`
      : `Acabo de donar a Defensores CAA. ¡Apoya esta causa junto a mí! ${SHARE_URL}`;

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank");
  };

  const handleMessenger = () => {
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(SHARE_URL)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(SHARE_URL)}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      copied = true;
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = SHARE_URL;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      toast({ title: "¡Enlace copiado!", description: "Pégalo donde quieras compartirlo." });
    } else {
      toast({ title: "No se pudo copiar", description: SHARE_URL });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-xl shadow-lg border p-8 text-center animate-fade-in">
        <div className={`w-20 h-20 ${isCoursePurchase ? 'bg-primary/10' : isCampaignDonation ? 'bg-red-100 dark:bg-red-900/30' : 'bg-success/10'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {isCoursePurchase ? (
            <Check className="w-10 h-10 text-primary" />
          ) : isCampaignDonation ? (
            <Heart className="w-10 h-10 text-red-600" />
          ) : (
            <Check className="w-10 h-10 text-success" />
          )}
        </div>

        <h1 className="heading-2 text-foreground mb-4">
          {isCoursePurchase
            ? "¡Inscripción exitosa!"
            : isCampaignDonation ? "¡Gracias por tu generosidad!" : t("donation.thankYou")}
        </h1>

        <p className="text-muted-foreground mb-6">
          {isCoursePurchase
            ? "Tu inscripción al curso Herramientas de Libertad ha sido confirmada. Recibirás los detalles del curso por email dentro de las próximas 24 horas."
            : isCampaignDonation
              ? "Tu donación para la familia Rivera-Ruiz ha sido recibida exitosamente. Tu apoyo marca una diferencia real en sus vidas."
              : t("donation.successMessage")}
        </p>

        {(isCampaignDonation || isCoursePurchase) && (
          <div className={`${isCoursePurchase ? 'bg-primary/5' : 'bg-red-50 dark:bg-red-900/20'} rounded-lg p-4 mb-6 text-sm text-muted-foreground`}>
            {verifying ? (
              <span>{isCoursePurchase ? "Verificando inscripción..." : "Verificando donación..."}</span>
            ) : verified ? (
              <span className="text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                {isCoursePurchase ? "Inscripción verificada y registrada" : "Donación verificada y registrada"}
              </span>
            ) : (
              <span>{isCoursePurchase ? "Tu inscripción será registrada en breve" : "Tu donación será registrada en breve"}</span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            ¡Invita a otros a sumarse a la causa!
          </p>

          {/* WhatsApp */}
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir por WhatsApp
          </Button>

          {/* Messenger */}
          <Button
            onClick={handleMessenger}
            className="w-full bg-[#0099FF] hover:bg-[#007acc] text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Compartir por Messenger
          </Button>

          {/* Copy link */}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copiar enlace
          </Button>

          <Link to="/">
            <Button variant="ghost" className="w-full text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("takeAction.backToSite")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
