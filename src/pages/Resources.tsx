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
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const resources = [
  {
    icon: FileText,
    title: "Guide: Understanding the Cuban Adjustment Act",
    description:
      "A comprehensive guide explaining the CAA, eligibility requirements, and the application process.",
    type: "PDF",
    link: "#",
  },
  {
    icon: CheckSquare,
    title: "Checklist: Documents to keep for your case",
    description:
      "Essential documents you should gather and maintain for your immigration case.",
    type: "PDF",
    link: "#",
  },
  {
    icon: Building,
    title: "Directory: Legal aid and trusted nonprofit organizations",
    description:
      "A curated list of verified legal aid organizations that serve Cuban migrants.",
    type: "Directory",
    link: "#",
  },
];

const faqs = [
  {
    question: "What is the Cuban Adjustment Act (CAA)?",
    answer:
      "The Cuban Adjustment Act is a 1966 federal law that allows Cuban nationals who have been physically present in the United States for at least one year to apply for permanent resident status (green card). It is a unique pathway that recognizes the special circumstances of Cuban migrants.",
  },
  {
    question: "Who is eligible to apply under the CAA?",
    answer:
      "To be eligible, you must be a native or citizen of Cuba, have been inspected and admitted or paroled into the United States, have been physically present for at least one year, and be admissible as an immigrant. Each case is unique, so we recommend consulting with a licensed attorney.",
  },
  {
    question: "How long does the CAA application process take?",
    answer:
      "Processing times vary depending on USCIS workload and individual case circumstances. Generally, it can take several months to over a year. Check the USCIS website for current processing times and consider consulting an attorney for your specific situation.",
  },
  {
    question: "Can I apply for my family members under the CAA?",
    answer:
      "Spouses and unmarried children under 21 who are also Cuban nationals may be included in your application or file their own applications. Family reunification is one of the humanitarian goals of the CAA.",
  },
  {
    question: "What should I do if I suspect immigration fraud?",
    answer:
      "If you believe you have been a victim of fraud by a notary, lawyer, paralegal, or any person offering immigration services, you can report it to our Ethical and Anti-Fraud Migratory Observatory (OEAM). We document these cases and escalate them to the appropriate authorities.",
  },
  {
    question: "Does your organization provide legal advice?",
    answer:
      "No, Defenders of the CAA and Freedom, Inc. does not provide legal advice or representation. We offer educational information, community support, and resources. For legal advice about your specific situation, please consult a licensed immigration attorney.",
  },
  {
    question: "How can I become a member or volunteer?",
    answer:
      "You can apply to become a member or volunteer through our Get Involved page. We welcome adults who share our mission and want to contribute to protecting the Cuban community.",
  },
  {
    question: "What is Cuba's designation as a State Sponsor of Terrorism?",
    answer:
      "Cuba is currently designated by the United States as a State Sponsor of Terrorism. This designation reflects concerns about human rights and security. Many Cubans are fleeing repression, which is why the CAA remains an important humanitarian pathway.",
  },
];

export default function Resources() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">Resources</h1>
            <p className="text-xl text-muted-foreground">
              Guides, checklists, and frequently asked questions to help you
              understand your rights and navigate the immigration process.
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
              <strong className="text-foreground">Important:</strong> This
              website does not provide legal advice. We offer information and
              community support only. For legal advice about your specific
              situation, please consult a licensed attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="heading-2 text-foreground text-center mb-12">
            Guides & Resources
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
                        Download PDF
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Directory
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
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Common questions about the CAA, our organization, and
                immigration processes.
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
              Have more questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact us or visit our blog for more educational content about
              the Cuban Adjustment Act and immigrant rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/blog">Visit our blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
