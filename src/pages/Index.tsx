import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Users,
  BookOpen,
  AlertTriangle,
  Heart,
  Scale,
  HandHeart,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "What is the Cuban Adjustment Act (CAA) and how does it work?",
    excerpt:
      "Learn the basics of this important law that has helped Cuban migrants find stability in the United States for decades.",
    date: "December 5, 2024",
    tag: "CAA basics",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "How to avoid fraud in immigration services: 5 warning signs",
    excerpt:
      "Protect yourself and your family from scams and abusive practices when seeking immigration help.",
    date: "December 1, 2024",
    tag: "Fraud prevention",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Community ambassadors: Cuban voices protecting Cuban families",
    excerpt:
      "Meet the volunteers across the United States who share verified information and support our community.",
    date: "November 28, 2024",
    tag: "Community stories",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-section-light to-background section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left - Text Content */}
            <div className="animate-slide-up">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                Non-partisan community NGO for Cuban migrants
              </span>

              <h1 className="heading-1 text-foreground mb-6">
                Defending the Cuban Adjustment Act and the right to freedom
              </h1>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We defend the <strong>humane application of the Cuban Adjustment Act (CAA)</strong> so Cuban migrants and their families can obtain stability and legal status. Cuba is currently designated by the United States as a <strong>State Sponsor of Terrorism</strong>, reflecting a serious situation for human rights and security. Many people are fleeing repression and need protection and fair treatment.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-cta" />
                  </div>
                  <span className="text-foreground">
                    Legal information and civic education for Cuban migrants and their families.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-3.5 h-3.5 text-cta" />
                  </div>
                  <span className="text-foreground">
                    Monitoring abuses, fraud, and misuse of immigration processes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cta/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-cta" />
                  </div>
                  <span className="text-foreground">
                    Community support, ambassadors, and local outreach across the United States.
                  </span>
                </li>
              </ul>

              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  Learn more about our mission
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Right - Donation Widget */}
            <div className="animate-slide-in-right lg:sticky lg:top-24">
              <DonationWizard />
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-2 text-foreground mb-4">Who we are</h2>
            <p className="text-lg text-muted-foreground">
              We are formed by Cuban migrants, professionals, and allies committed to <strong>justice, dignity, and civic education</strong>. We operate as a non-profit under Florida law (Chapter 617 of the Florida Statutes) and are eligible for 501(c)(3) status. All resources are dedicated exclusively to institutional purposes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Mission</h3>
              <p className="text-muted-foreground text-sm">
                Promote social justice and human dignity for immigrants, especially Cubans, through civic education, community assistance, and social integration.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Vision</h3>
              <p className="text-muted-foreground text-sm">
                Be a reference organization in education, freedom, and solidarity with immigrants, recognized for transparency and impact on civic integration.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Core Values</h3>
              <p className="text-muted-foreground text-sm">
                Dignity, rule of law, transparency, solidarity, and non-violence guide everything we do.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button asChild variant="link" className="text-primary">
              <Link to="/about">
                Read our full mission and bylaws
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Work Teaser */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-2 text-foreground mb-4">What we do</h2>
            <p className="text-lg text-muted-foreground">
              Our programs protect, educate, and empower Cuban migrants across the United States.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-cta/10 flex items-center justify-center mb-4 group-hover:bg-cta/20 transition-colors">
                <AlertTriangle className="w-6 h-6 text-cta" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ethical and Anti-Fraud Migratory Observatory (OEAM)
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                We receive and document complaints about fraud, abusive practices, or misconduct by notaries, lawyers, and others offering immigration services. We escalate verified cases to authorities.
              </p>
              <span className="text-xs text-muted-foreground">
                Note: We do not provide individual legal representation.
              </span>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Civic Education and CAA Awareness
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Workshops, online materials, and guides that explain rights and duties under U.S. law, the basics of the Cuban Adjustment Act, and how to avoid misinformation.
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Community Support & Ambassadors Program
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                A network of community ambassadors in different cities and states that share verified information, detect patterns of abuse, and connect families with reliable resources.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link to="/our-work">
                Learn more about our work
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-2 text-foreground mb-4">How your donation helps</h2>
            <p className="text-lg text-muted-foreground">
              Every contribution strengthens our ability to protect and serve the Cuban community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-primary/5">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-muted-foreground">
                Educational materials created and updated regularly
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-cta/5">
              <div className="text-4xl font-bold text-cta mb-2">200+</div>
              <p className="text-sm text-muted-foreground">
                Community complaints documented and monitored against fraud
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary/5">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-sm text-muted-foreground">
                Ambassadors and volunteers supporting families in multiple states
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-cta/5">
              <div className="text-4xl font-bold text-cta mb-2">15+</div>
              <p className="text-sm text-muted-foreground">
                Reports and alerts issued to protect the community
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="link" className="text-primary">
              <Link to="/resources">
                See our transparency and reports
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="heading-2 text-foreground mb-2">Latest from our blog</h2>
              <p className="text-muted-foreground">
                News, guides, and stories from our community.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/blog">Visit the Blog</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                      {post.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-wide text-center">
          <h2 className="heading-2 mb-4">
            Cuban migrants deserve dignity, truth, and the protection of the law.
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join us in defending the Cuban Adjustment Act and protecting our community from fraud and abuse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/take-action">Take action</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link to="/get-involved">Become a member or volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
