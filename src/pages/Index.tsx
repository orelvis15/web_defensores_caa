import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { HumanitarianCampaign } from "@/components/campaign/HumanitarianCampaign";
import { PDFViewer } from "@/components/documents/PDFViewer";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Users,
  BookOpen,
  AlertTriangle,
  Heart,
  ArrowRight,
  ChevronRight,
  Download,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Index() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: t("blog.post1.title"),
      excerpt: t("blog.post1.excerpt"),
      date: "December 5, 2024",
      tag: t("blog.post1.tag"),
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: t("blog.post2.title"),
      excerpt: t("blog.post2.excerpt"),
      date: "December 1, 2024",
      tag: t("blog.post2.tag"),
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: t("blog.post3.title"),
      excerpt: t("blog.post3.excerpt"),
      date: "November 28, 2024",
      tag: t("blog.post3.tag"),
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop",
    },
  ];

  return (
    <Layout>
      {/* Annual Report Banner */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-wide py-3">
          <a 
            href="/documents/informe_anual_2025.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            
            <span className="text-sm md:text-base font-medium text-center">
              {t("lang") === "es" 
                ? "📄 Informe Institucional y Financiero 2025 disponible para descargar" 
                : "📄 2025 Institutional and Financial Report available for download"}
            </span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
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


      {/* Official Letter to Representatives */}
      <PDFViewer 
        pdfUrl="/documents/carta_representantes.pdf"
        title="Carta a Representantes del Congreso"
        description="Documento oficial de la Fundación Defensores del CAA dirigido a congresistas y senadores sobre la situación de la comunidad cubana en Estados Unidos."
      />

      {/* About Teaser */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-2 text-foreground mb-4">{t("whoWeAre.title")}</h2>
            <p 
              className="text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: t("whoWeAre.description") }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("whoWeAre.mission")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("whoWeAre.missionDesc")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("whoWeAre.vision")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("whoWeAre.visionDesc")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("whoWeAre.values")}</h3>
              <p className="text-muted-foreground text-sm">
                {t("whoWeAre.valuesDesc")}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button asChild variant="link" className="text-primary">
              <Link to="/about">
                {t("whoWeAre.readMore")}
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
            <h2 className="heading-2 text-foreground mb-4">{t("whatWeDo.title")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("whatWeDo.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-cta/10 flex items-center justify-center mb-4 group-hover:bg-cta/20 transition-colors">
                <AlertTriangle className="w-6 h-6 text-cta" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("whatWeDo.oeam.title")}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t("whatWeDo.oeam.desc")}
              </p>
              <span className="text-xs text-muted-foreground">
                {t("whatWeDo.oeam.note")}
              </span>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("whatWeDo.education.title")}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t("whatWeDo.education.desc")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t("whatWeDo.community.title")}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t("whatWeDo.community.desc")}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link to="/our-work">
                {t("whatWeDo.learnMore")}
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
            <h2 className="heading-2 text-foreground mb-4">{t("impact.title")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("impact.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-primary/5">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-muted-foreground">
                {t("impact.stat1")}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-cta/5">
              <div className="text-4xl font-bold text-cta mb-2">200+</div>
              <p className="text-sm text-muted-foreground">
                {t("impact.stat2")}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-primary/5">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-sm text-muted-foreground">
                {t("impact.stat3")}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-cta/5">
              <div className="text-4xl font-bold text-cta mb-2">15+</div>
              <p className="text-sm text-muted-foreground">
                {t("impact.stat4")}
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="link" className="text-primary">
              <Link to="/resources">
                {t("impact.transparency")}
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
              <h2 className="heading-2 text-foreground mb-2">{t("blog.title")}</h2>
              <p className="text-muted-foreground">
                {t("blog.description")}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/blog">{t("blog.visitBlog")}</Link>
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
