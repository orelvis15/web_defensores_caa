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
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const coreValues = [
    { icon: Heart, title: t("about.value.dignity"), description: t("about.value.dignityDesc") },
    { icon: Scale, title: t("about.value.law"), description: t("about.value.lawDesc") },
    { icon: Eye, title: t("about.value.transparency"), description: t("about.value.transparencyDesc") },
    { icon: Users, title: t("about.value.solidarity"), description: t("about.value.solidarityDesc") },
    { icon: Shield, title: t("about.value.nonviolence"), description: t("about.value.nonviolenceDesc") },
  ];

  const boardPositions = [
    t("about.governance.president"),
    t("about.governance.vp"),
    t("about.governance.secretary"),
    t("about.governance.pr"),
    t("about.governance.vocal1"),
    t("about.governance.vocal2"),
    t("about.governance.vocal3"),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">{t("about.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("about.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-foreground mb-6">{t("about.whoWeAre.title")}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p dangerouslySetInnerHTML={{ __html: t("about.whoWeAre.p1") }} />
                <p>{t("about.whoWeAre.p2")}</p>
                <p>{t("about.whoWeAre.p3")}</p>
              </div>
            </div>
            {/* TODO: Replace src with the actual photo path/URL */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src=""
                alt="Defensores de la CAA y la Libertad"
                className="w-full h-full object-cover"
              />
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
              <h2 className="heading-3 text-foreground mb-4">{t("about.mission.title")}</h2>
              <p className="text-muted-foreground">
                {t("about.mission.desc")}
              </p>
            </div>

            <div className="bg-card border rounded-xl p-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="heading-3 text-foreground mb-4">{t("about.vision.title")}</h2>
              <p className="text-muted-foreground">
                {t("about.vision.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="heading-2 text-foreground text-center mb-12">
            {t("about.objectives.title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                {t("about.obj.civicEd")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("about.obj.civicEdDesc")}
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                {t("about.obj.support")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("about.obj.supportDesc")}
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">{t("about.obj.caaDefense")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("about.obj.caaDefenseDesc")}
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                {t("about.obj.rootCauses")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("about.obj.rootCausesDesc")}
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                {t("about.obj.dignity")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("about.obj.dignityDesc")}
              </p>
            </div>
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">
                {t("about.obj.fraudPrev")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("about.obj.fraudPrevDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <h2 className="heading-2 text-foreground text-center mb-12">
            {t("about.values.title")}
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
              {t("about.governance.title")}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {t("about.governance.desc")}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t("about.governance.assembly")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("about.governance.assemblyDesc")}
                </p>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {t("about.governance.board")}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("about.governance.boardDesc")}
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
              {t("about.chapters.title")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("about.chapters.desc")}
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
                {t("about.cta.bylaws")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/get-involved">{t("about.cta.join")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
