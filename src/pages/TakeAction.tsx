import { Link } from "react-router-dom";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TakeAction() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-background">
      {/* Simple Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm">
        <div className="container-wide py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("takeAction.backToSite")}
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-primary hidden sm:block">
              {t("footer.brand")}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="heading-1 text-foreground mb-4">
              {t("takeAction.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("takeAction.desc")}
            </p>
          </div>

          <div className="max-w-lg mx-auto animate-slide-up">
            <DonationWizard variant="full" />
          </div>

          {/* Trust Signals */}
          <div className="mt-10 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>
                {t("takeAction.privacyNote")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {t("takeAction.disclaimer")}
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t py-6">
        <div className="container-wide text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {t("footer.brand")} {t("footer.brandSub")}{" "}
            {t("takeAction.footer")}
          </p>
        </div>
      </footer>
    </div>
  );
}
