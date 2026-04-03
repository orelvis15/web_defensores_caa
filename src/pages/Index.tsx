import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { UrgentHero } from "@/components/home/UrgentHero";
import { CaravanaLibertad } from "@/components/home/CaravanaLibertad";
import { PaquetesAyuda } from "@/components/home/PaquetesAyuda";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Users,
  BookOpen,
  ArrowRight,
  FileText,
  Download,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Index() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Original Hero Section with Donation */}
      <section className="bg-gradient-to-b from-section-light to-background pt-12 pb-8 md:pt-12 md:pb-12">
        <div className="container-wide">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left - Text Content */}
            <div className="animate-slide-up order-1 lg:order-1">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {t("hero.badge")}
              </span>

              <h1 className="heading-1 text-foreground mb-4">
                {t("hero.title")}
              </h1>

              <p 
                className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("hero.description") }}
              />
            </div>

            {/* Right - Donation Widget */}
            <div className="animate-slide-in-right lg:sticky lg:top-20 order-2 lg:order-2 lg:row-span-2">
              <DonationWizard />
            </div>

            {/* Bullet Points - Below form on mobile */}
            <div className="order-3 lg:order-3">
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-cta" />
                  </div>
                  <span className="text-foreground text-sm md:text-base">
                    {t("hero.bullet1")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-3.5 h-3.5 text-cta" />
                  </div>
                  <span className="text-foreground text-sm md:text-base">
                    {t("hero.bullet2")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-cta" />
                  </div>
                  <span className="text-foreground text-sm md:text-base">
                    {t("hero.bullet3")}
                  </span>
                </li>
              </ul>

              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  {t("hero.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inscription / Join Section */}
      <section className="py-10 bg-section-alt border-y">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center sm:text-left">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {t("join.title")}
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl">
                {t("join.description")}
              </p>
            </div>
            <a
              href="https://inscription.defensorescaa.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button size="lg" className="whitespace-nowrap">
                {t("join.button")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Urgent Hero Section */}
      <UrgentHero />

      {/* Caravana por la Libertad - Tampa */}
      <CaravanaLibertad />

      {/* Paquetes de ayuda humanitaria */}
      <PaquetesAyuda />

      {/* Public Documents */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="heading-2 text-foreground mb-3">
              {t("docs.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("docs.description")}
            </p>
          </div>

          <div className="max-w-sm mx-auto">
            {/* 2025 Annual Report */}
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded w-fit mb-3">
                {t("docs.report2025.tag")}
              </span>
              <h3 className="font-semibold text-foreground mb-2">
                {t("docs.report2025.title")}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                {t("docs.report2025.desc")}
              </p>
              <a
                href="/documents/informe_anual_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  {t("docs.download")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-wide text-center">
          <h2 className="heading-2 mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/take-action">{t("cta.takeAction")}</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/get-involved">{t("cta.becomeMember")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
