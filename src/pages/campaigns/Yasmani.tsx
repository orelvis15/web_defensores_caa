import { Link } from "react-router-dom";
import { ArrowLeft, Lock, PlayCircle, Scale, Shield } from "lucide-react";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { CampaignRaisedCounter } from "@/components/campaign/CampaignRaisedCounter";
import { ShareButton } from "@/components/share/ShareButton";
import { TikTokEmbed } from "@/components/media/TikTokEmbed";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  YASMANI_CAMPAIGN_ID,
  YASMANI_CAMPAIGN_PATH,
  YASMANI_SHARE,
  YASMANI_VIDEOS,
} from "@/data/yasmaniCampaign";
import yasmaniFoto from "@/assets/campaign3/yasmani.png";

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

              <p className="text-muted-foreground text-base leading-relaxed mb-10">
                {isSpanish
                  ? "Tu donación entra directamente a esta campaña y se destina a los gastos médicos y del hogar de su familia."
                  : "Your donation goes directly to this campaign and covers his family's medical and household costs."}
              </p>

              {/* Resumen del caso */}
              <div>
                <h2 className="heading-3 text-foreground mb-4">
                  {isSpanish ? "Su historia" : "His story"}
                </h2>

                <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                  <p>
                    {isSpanish
                      ? "Yasmani vive con un lipoma intracraneal que, por su tamaño, no se puede extirpar. Ha pasado por varias cirugías y hoy lleva un catéter que va desde su cabeza hasta el abdomen para drenar el líquido que su cuerpo debe reabsorber."
                      : "Yasmani lives with an intracranial lipoma that, because of its size, cannot be removed. He has been through several surgeries and now carries a shunt running from his head to his abdomen to drain the fluid his body has to reabsorb."}
                  </p>
                  <p>
                    {isSpanish
                      ? "Esa condición lo dejó sin poder trabajar. Al estar bajo un I-220A no puede solicitar disability ni los programas de asistencia pensados justamente para quien ya no puede sostener un empleo, así que las cuentas y la comida siguen corriendo sin ninguna red que las amortigüe."
                      : "That condition left him unable to work. Because he is under an I-220A, he cannot apply for disability or the assistance programs meant for people who can no longer hold a job, so the bills and the groceries keep coming with no safety net underneath."}
                  </p>
                  <p>
                    {isSpanish
                      ? "Todo el sostén económico recae sobre su esposa. La familia ya devolvió un carro al banco y todavía debe el único que le queda, que es precisamente el que usan para llevarlo a sus citas médicas."
                      : "The entire financial weight falls on his wife. The family already returned one car to the bank and still owes money on the only one left — the very car they use to get him to his medical appointments."}
                  </p>
                  <p>
                    {isSpanish
                      ? "A todo esto se suma su proceso en corte de inmigración, que enfrenta sin fondos para pagar un abogado. Por eso la comunidad cubana se organizó para pedir ayuda: donaciones que alivien la carga de la familia y visibilidad para su caso."
                      : "On top of all this is his immigration court process, which he faces with no funds for a lawyer. That is why the Cuban community organized to ask for help: donations that ease the family's burden, and visibility for his case."}
                  </p>
                </div>

                <div className="mt-6 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <Scale className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isSpanish
                      ? "¿Eres abogado de inmigración? Otra forma de ayudar es ofrecer asesoría a la familia en su proceso migratorio y judicial. Escríbenos y te ponemos en contacto."
                      : "Are you an immigration attorney? Another way to help is to offer the family guidance in their immigration and court process. Write to us and we'll put you in touch."}
                  </p>
                </div>
              </div>
            </div>

            {/* DERECHA — Contador y formulario de donación */}
            <div className="animate-slide-up lg:sticky lg:top-20">
              <CampaignRaisedCounter
                campaignId={YASMANI_CAMPAIGN_ID}
                className="mb-6"
              />

              <DonationWizard variant="full" campaignId={YASMANI_CAMPAIGN_ID} />

              <div className="mt-6 rounded-xl border bg-card p-5 text-center">
                <p className="font-semibold text-foreground mb-1">
                  {isSpanish
                    ? "¿No puedes donar ahora?"
                    : "Can't donate right now?"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {isSpanish
                    ? "Compartir su historia también ayuda: mientras más personas la conozcan, más cerca está Yasmani de recibir apoyo."
                    : "Sharing his story helps too: the more people who know about it, the closer Yasmani is to getting support."}
                </p>
                <ShareButton
                  url={YASMANI_CAMPAIGN_PATH}
                  title={isSpanish ? YASMANI_SHARE.title.es : YASMANI_SHARE.title.en}
                  text={isSpanish ? YASMANI_SHARE.text.es : YASMANI_SHARE.text.en}
                  label={isSpanish ? "Compartir campaña" : "Share campaign"}
                  className="w-full sm:w-auto"
                />
              </div>

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

        {/* Videos con el contexto del caso */}
        <div className="container-wide mt-16 md:mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                <PlayCircle className="w-4 h-4" />
                {isSpanish ? "Su historia en video" : "His story on video"}
              </span>
              <h2 className="heading-3 text-foreground mb-3">
                {isSpanish
                  ? "Conoce el caso de Yasmani"
                  : "Get to know Yasmani's case"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isSpanish
                  ? "Estos videos de la comunidad cuentan el caso con más detalle. Pulsa play para reproducirlos."
                  : "These community videos tell the case in more detail. Press play to watch them."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {YASMANI_VIDEOS.map((video) => (
                <TikTokEmbed
                  key={video.videoId}
                  videoId={video.videoId}
                  username={video.username}
                  caption={isSpanish ? video.caption.es : video.caption.en}
                  lang={isSpanish ? "es" : "en"}
                />
              ))}
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
