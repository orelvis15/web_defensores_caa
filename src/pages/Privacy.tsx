import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-wide max-w-4xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("takeAction.backToSite")}
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("privacy.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("privacy.lastUpdated")}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            {/* Intro */}
            <p className="text-muted-foreground leading-relaxed">
              {t("privacy.intro")}
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. {t("privacy.section1.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("privacy.section1.content")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{t("privacy.section1.item1")}</li>
                <li>{t("privacy.section1.item2")}</li>
                <li>{t("privacy.section1.item3")}</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. {t("privacy.section2.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("privacy.section2.content")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{t("privacy.section2.item1")}</li>
                <li>{t("privacy.section2.item2")}</li>
                <li>{t("privacy.section2.item3")}</li>
                <li>{t("privacy.section2.item4")}</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. {t("privacy.section3.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("privacy.section3.content")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{t("privacy.section3.item1")}</li>
                <li>{t("privacy.section3.item2")}</li>
                <li>{t("privacy.section3.item3")}</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. {t("privacy.section4.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.section4.content")}
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. {t("privacy.section5.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.section5.content")}
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. {t("privacy.section6.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("privacy.section6.content")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>{t("privacy.section6.item1")}</li>
                <li>{t("privacy.section6.item2")}</li>
                <li>{t("privacy.section6.item3")}</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. {t("privacy.section7.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.section7.content")}
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. {t("privacy.section8.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.section8.content")}
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. {t("privacy.section9.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.section9.content")}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
