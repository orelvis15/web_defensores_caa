import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Shield } from "lucide-react";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { useLanguage } from "@/contexts/LanguageContext";
import yasmaniFoto from "@/assets/campaign3/yasmani.png";

// Identificador con el que quedan etiquetadas estas donaciones,
// tanto en la tabla campaign_donations como en la metadata de Stripe.
export const YASMANI_CAMPAIGN_ID = "yasmani-2026";

export default function CampanaYasmani() {
  const { t, language } = useLanguage();
  const isSpanish = language === "ES";

  return (
    <div className="min-h-screen bg-gradient-to-b from-section-light to-background">
      {/* Encabezado simple, igual al de la página de donación general */}
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

      <main className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* IZQUIERDA — Foto e historia */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cta/10 text-cta text-sm font-medium rounded-full mb-5">
                {isSpanish ? "Campaña abierta" : "Open campaign"}
              </span>

              <h1 className="heading-2 text-foreground mb-6">
                {isSpanish ? "Apoyemos a Yasmani" : "Let's support Yasmani"}
              </h1>

              <div
                className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-slate-100 mb-6"
                style={{ aspectRatio: "4 / 5" }}
              >
                <img
                  src={yasmaniFoto}
                  alt={
                    isSpanish
                      ? "Yasmani durante su recuperación en el hospital"
                      : "Yasmani recovering at the hospital"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                {isSpanish
                  ? "Yasmani es un cubano con I-220A que enfrenta una condición neurológica grave que lo dejó sin poder trabajar. Su estatus migratorio lo deja fuera de los programas de asistencia, y hoy toda la carga recae sobre su familia."
                  : "Yasmani is a Cuban with an I-220A facing a serious neurological condition that left him unable to work. His immigration status keeps him out of assistance programs, and today the entire burden falls on his family."}
              </p>

              <p className="text-muted-foreground text-base leading-relaxed">
                {isSpanish
                  ? "Tu donación entra directamente a esta campaña y se destina a los gastos médicos y del hogar de su familia."
                  : "Your donation goes directly to this campaign and covers his family's medical and household costs."}
              </p>
            </div>

            {/* DERECHA — Formulario de donación */}
            <div className="animate-slide-up lg:sticky lg:top-20">
              <DonationWizard variant="full" campaignId={YASMANI_CAMPAIGN_ID} />

              <div className="mt-6 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>{t("takeAction.privacyNote")}</span>
                </div>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {t("takeAction.disclaimer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
