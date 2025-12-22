import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
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
            {t("terms.title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("terms.lastUpdated")}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. {t("terms.section1.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section1.content")}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. {t("terms.section2.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section2.content")}
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. {t("terms.section3.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section3.content")}
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. {t("terms.section4.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section4.content")}
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. {t("terms.section5.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section5.content")}
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. {t("terms.section6.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section6.content")}
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. {t("terms.section7.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section7.content")}
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. {t("terms.section8.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section8.content")}
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. {t("terms.section9.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section9.content")}
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. {t("terms.section10.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.section10.content")}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
