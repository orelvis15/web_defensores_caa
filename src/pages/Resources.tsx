import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckSquare,
  Building,
  HelpCircle,
  Download,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Resources() {
  const { t } = useLanguage();

  const resources = [
    {
      icon: FileText,
      title: t("resources.guide1.title"),
      description: t("resources.guide1.desc"),
      type: "PDF",
      link: "#",
    },
    {
      icon: CheckSquare,
      title: t("resources.guide2.title"),
      description: t("resources.guide2.desc"),
      type: "PDF",
      link: "#",
    },
    {
      icon: Building,
      title: t("resources.guide3.title"),
      description: t("resources.guide3.desc"),
      type: "Directory",
      link: "#",
    },
  ];

  const faqs = [
    { question: t("resources.faq.q1"), answer: t("resources.faq.a1") },
    { question: t("resources.faq.q2"), answer: t("resources.faq.a2") },
    { question: t("resources.faq.q3"), answer: t("resources.faq.a3") },
    { question: t("resources.faq.q4"), answer: t("resources.faq.a4") },
    { question: t("resources.faq.q5"), answer: t("resources.faq.a5") },
    { question: t("resources.faq.q6"), answer: t("resources.faq.a6") },
    { question: t("resources.faq.q7"), answer: t("resources.faq.a7") },
    { question: t("resources.faq.q8"), answer: t("resources.faq.a8") },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">{t("resources.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("resources.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-cta/5 border-y border-cta/20">
        <div className="container-wide">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-cta shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Important:</strong> {t("resources.disclaimer")}
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="heading-2 text-foreground text-center mb-12">
            {t("resources.guidesTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">
                    {resource.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {resource.description}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href={resource.link}>
                    {resource.type === "PDF" ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        {t("resources.downloadPdf")}
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("resources.viewDirectory")}
                      </>
                    )}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-primary" />
              </div>
              <h2 className="heading-2 text-foreground mb-4">
                {t("resources.faq.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("resources.faq.desc")}
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-3 text-foreground mb-4">
              {t("resources.moreQuestions")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("resources.moreQuestionsDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">{t("resources.contactUs")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/blog">{t("resources.visitBlog")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
