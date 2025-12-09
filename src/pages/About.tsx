import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Heart,
  Scale,
  Users,
  FileText,
  Building,
  MapPin,
  ChevronRight,
} from "lucide-react";

const coreValues = [
  { icon: Heart, title: "Dignity", description: "Every person deserves respect and fair treatment." },
  { icon: Scale, title: "Rule of Law", description: "We uphold legal processes and due rights." },
  { icon: Eye, title: "Transparency", description: "Open governance and accountable operations." },
  { icon: Users, title: "Solidarity", description: "Community support and mutual assistance." },
  { icon: Shield, title: "Non-violence", description: "Peaceful advocacy and education." },
];

const boardPositions = [
  "President",
  "Vice President",
  "Secretary-Treasurer",
  "Director of Public Relations",
  "Board Member (Vocal) 1",
  "Board Member (Vocal) 2",
  "Board Member (Vocal) 3",
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Defenders of the CAA and Freedom, Inc. is a non-partisan,
              community-based organization dedicated to protecting the rights of
              Cuban migrants and upholding the humanitarian principles of the
              Cuban Adjustment Act.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-foreground mb-6">Who we are</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We are a <strong className="text-foreground">non-profit organization</strong> created
                  under <strong className="text-foreground">Chapter 617 of the Florida Statutes</strong>,
                  eligible for federal tax exemption under{" "}
                  <strong className="text-foreground">Section 501(c)(3)</strong>.
                </p>
                <p>
                  Our headquarters are in Florida, with the possibility of
                  establishing local chapters in other states or cities as our
                  community grows.
                </p>
                <p>
                  All resources are used exclusively for institutional purposes.
                  Board members and directors do not receive personal financial
                  benefits from the organization.
                </p>
              </div>
            </div>
            <div className="bg-section-light rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Legal Status</h3>
                  <p className="text-sm text-muted-foreground">Florida Non-Profit</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                  <span>Organized under Chapter 617, Florida Statutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                  <span>Eligible for 501(c)(3) tax-exempt status</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                  <span>Non-partisan and politically independent</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                  <span>Community-governed with volunteer leadership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h2 className="heading-3 text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To promote social justice and human dignity for immigrants,
                especially Cubans, through civic education, community
                assistance, and social integration. We strengthen participation
                and positive contribution of Cuban and Latin American migrants
                to U.S. society.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="heading-3 text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To be a reference organization in education, freedom, and
                solidarity with immigrants, recognized for transparency and
                impact on civic and cultural integration of Cubans and Latinos
                in the United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="heading-2 text-foreground text-center mb-12">
            Core Objectives
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Civic Education
              </h3>
              <p className="text-sm text-muted-foreground">
                Provide civic and community education for Cuban and Latin
                American immigrants.
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Support Programs
              </h3>
              <p className="text-sm text-muted-foreground">
                Develop support and solidarity programs that foster integration,
                respect, and democratic values.
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">CAA Defense</h3>
              <p className="text-sm text-muted-foreground">
                Defend and preserve the humanitarian principles of the Cuban
                Adjustment Act as a pathway for family integration.
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Root Causes
              </h3>
              <p className="text-sm text-muted-foreground">
                Highlight the consequences of communism and dictatorships as
                root causes of forced migration.
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Dignity Campaigns
              </h3>
              <p className="text-sm text-muted-foreground">
                Run campaigns that dignify the image of migrants and highlight
                their social, economic, and cultural contributions.
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                Fraud Prevention
              </h3>
              <p className="text-sm text-muted-foreground">
                Monitor and report abusive practices targeting Cuban migrants in
                immigration services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <h2 className="heading-2 text-foreground text-center mb-12">
            Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-foreground text-center mb-6">
              Governance
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Our organization is governed democratically with full
              transparency.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  General Assembly
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The supreme decision-making body of the organization. Meets at
                  least once per year to approve budgets, elect directors, and
                  set strategic direction.
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Board of Directors
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Seven volunteer members responsible for administration,
                  budgeting, accountability, and transparency:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {boardPositions.map((position) => (
                    <li key={position} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {position}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Territorial Chapters */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h2 className="heading-2 text-foreground mb-4">
              Territorial Chapters
            </h2>
            <p className="text-muted-foreground mb-8">
              Local chapters can be created when there are enough active members
              in a city or state. Local boards help execute national programs,
              promote membership, and report regularly. Chapters do not have
              independent legal personality but operate under the national
              organization's governance.
            </p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                Read our bylaws (PDF)
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/get-involved">Join as a member</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
