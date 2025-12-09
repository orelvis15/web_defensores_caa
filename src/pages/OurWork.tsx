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
} from "lucide-react";

export default function OurWork() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground">
              Through education, monitoring, and community support, we protect
              Cuban migrants and defend the humanitarian principles of the Cuban
              Adjustment Act.
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
                  Ethical and Anti-Fraud Migratory Observatory
                </h2>
                <p className="text-muted-foreground">(OEAM)</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                The OEAM is a permanent program to <strong className="text-foreground">receive, document, analyze,
                and channel complaints</strong> about fraudulent, abusive, or deceptive
                practices by:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 my-6">
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Notaries
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Lawyers
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Paralegals
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Document preparers
                </li>
                <li className="flex items-center gap-2 sm:col-span-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Any person offering legal or migration services
                </li>
              </ul>
            </div>

            {/* What we do / don't do */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-success/5 border border-success/20 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  What the OEAM does
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Receives complaints from community members
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Verifies credibility and basic evidence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Opens internal case files with codes (e.g., OEAM-FL-2025-001)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Detects patterns when multiple complaints target the same
                    professional
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Submits formal institutional complaints to authorities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Issues public alerts and educational campaigns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                    Protects confidentiality of complainants
                  </li>
                </ul>
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  What the OEAM does NOT do
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    Provide individual legal representation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    Replace attorneys or legal counsel
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    Litigate cases on behalf of individuals
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                    Give legal advice for specific situations
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h4 className="font-medium text-foreground mb-3">
                Where we escalate verified cases:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li>• State Bar associations</li>
                <li>• State departments regulating notaries</li>
                <li>• Consumer protection departments</li>
                <li>• State Attorneys General</li>
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
                Education & Civic Awareness
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              We provide workshops, online materials, and guides that help our
              community understand their rights and responsibilities.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  Rights & Responsibilities
                </h3>
                <p className="text-sm text-muted-foreground">
                  Understanding immigrant rights and duties under U.S. law.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  CAA Basics
                </h3>
                <p className="text-sm text-muted-foreground">
                  The fundamentals of the Cuban Adjustment Act and related
                  processes.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  Fraud Prevention
                </h3>
                <p className="text-sm text-muted-foreground">
                  How to identify and avoid scams and misinformation.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  Democratic Values
                </h3>
                <p className="text-sm text-muted-foreground">
                  Human rights, civic participation, and the history of Cuban
                  exile.
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
                Community Support & Ambassadors Program
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              Our network of community ambassadors across the United States
              serves as trusted voices for Cuban families.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  What ambassadors do
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    Share verified information with their local communities
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    Help families understand trustworthy resources
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    Collect non-confidential data on local problems
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                    Support events, forums, and outreach campaigns
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Become an Ambassador
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Are you passionate about helping Cuban migrants in your city?
                  Join our network of community ambassadors.
                </p>
                <Button asChild>
                  <Link to="/get-involved">
                    Apply to become an ambassador
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
              Transparency & Reporting
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We publish regular reports to maintain full accountability with
              our community and donors.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border rounded-xl p-4 text-center">
                <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Complaint Statistics
                </p>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Resolved Cases
                </p>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Educational Materials
                </p>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  Financial Reports
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/resources">View our reports and resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-wide text-center">
          <h2 className="heading-2 mb-4">Support our work</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Your donation helps us protect Cuban migrants, fight fraud, and
            defend the Cuban Adjustment Act.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/take-action">Donate now</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/get-involved">Join as a volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
