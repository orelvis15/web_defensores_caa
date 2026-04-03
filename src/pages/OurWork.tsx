import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  BookOpen,
  Users,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  ArrowRight,
  Scale,
  Eye,
  Download,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OurWork() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">{t("ourWork.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("ourWork.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* OEAM - Observatory */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-cta/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-cta" />
              </div>
              <div>
                <h2 className="heading-2 text-foreground">
                  {t("ourWork.oeam.title")}
                </h2>
                <p className="text-muted-foreground">{t("ourWork.oeam.acronym")}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p dangerouslySetInnerHTML={{ __html: t("ourWork.oeam.intro") }} />
              <ul className="grid sm:grid-cols-2 gap-2 my-6">
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  {t("ourWork.oeam.notaries")}
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  {t("ourWork.oeam.lawyers")}
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  {t("ourWork.oeam.paralegals")}
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  {t("ourWork.oeam.docPrep")}
                </li>
                <li className="flex items-center gap-2 sm:col-span-2">
                  <Scale className="w-4 h-4 text-primary" />
                  {t("ourWork.oeam.anyone")}
                </li>
              </ul>
            </div>

            {/* What we do / don't do */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-success/5 border border-success/20 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  {t("ourWork.oeam.doesTitle")}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does1")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does2")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does3")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does4")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does5")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does6")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    {t("ourWork.oeam.does7")}
                  </li>
                </ul>
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  {t("ourWork.oeam.doesNotTitle")}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    {t("ourWork.oeam.doesNot1")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    {t("ourWork.oeam.doesNot2")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    {t("ourWork.oeam.doesNot3")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    {t("ourWork.oeam.doesNot4")}
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h4 className="font-medium text-foreground mb-3">
                {t("ourWork.oeam.escalate")}
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li>• {t("ourWork.oeam.escalate1")}</li>
                <li>• {t("ourWork.oeam.escalate2")}</li>
                <li>• {t("ourWork.oeam.escalate3")}</li>
                <li>• {t("ourWork.oeam.escalate4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Civic Awareness */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="heading-2 text-foreground">
                {t("ourWork.education.title")}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {t("ourWork.education.desc")}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {t("ourWork.education.rights")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("ourWork.education.rightsDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {t("ourWork.education.caa")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("ourWork.education.caaDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {t("ourWork.education.fraud")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("ourWork.education.fraudDesc")}
                </p>
              </div>
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  {t("ourWork.education.democratic")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("ourWork.education.democraticDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Support & Ambassadors */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="heading-2 text-foreground">
                {t("ourWork.community.title")}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {t("ourWork.community.desc")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("ourWork.community.whatDo")}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    {t("ourWork.community.do1")}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    {t("ourWork.community.do2")}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    {t("ourWork.community.do3")}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    {t("ourWork.community.do4")}
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("ourWork.community.become")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("ourWork.community.becomeDesc")}
                </p>
                <Button asChild>
                  <Link to="/get-involved">
                    {t("ourWork.community.apply")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Reporting */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="heading-2 text-foreground mb-4">
              {t("ourWork.transparency.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("ourWork.transparency.desc")}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border rounded-xl p-4 text-center">
                <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  {t("ourWork.transparency.stats")}
                </p>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  {t("ourWork.transparency.resolved")}
                </p>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  {t("ourWork.transparency.materials")}
                </p>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  {t("ourWork.transparency.financial")}
                </p>
              </div>
            </div>

            {/* Reports */}
            <div className="max-w-sm mx-auto">
              <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col text-left">
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-wide text-center">
          <h2 className="heading-2 mb-4">{t("ourWork.cta.title")}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t("ourWork.cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/take-action">{t("ourWork.cta.donate")}</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/get-involved">{t("ourWork.cta.volunteer")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
