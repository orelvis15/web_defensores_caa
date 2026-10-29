import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Heart,
  Globe,
  Megaphone,
  Palette,
  Languages,
  Calendar,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { inscriptionUrl } from "@/config/members";

export default function GetInvolved() {
  const { t, language } = useLanguage();
  const volunteerRoles = [
    { icon: Globe, title: t("getInvolved.volunteer.ambassador"), description: t("getInvolved.volunteer.ambassadorDesc") },
    { icon: Languages, title: t("getInvolved.volunteer.translator"), description: t("getInvolved.volunteer.translatorDesc") },
    { icon: Palette, title: t("getInvolved.volunteer.designer"), description: t("getInvolved.volunteer.designerDesc") },
    { icon: Megaphone, title: t("getInvolved.volunteer.contentCreator"), description: t("getInvolved.volunteer.contentCreatorDesc") },
    { icon: Calendar, title: t("getInvolved.volunteer.eventOrganizer"), description: t("getInvolved.volunteer.eventOrganizerDesc") },
  ];

  const memberBenefits = [
    t("getInvolved.member.benefit1"),
    t("getInvolved.member.benefit2"),
    t("getInvolved.member.benefit3"),
    t("getInvolved.member.benefit4"),
    t("getInvolved.member.benefit5"),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">{t("getInvolved.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("getInvolved.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Become a Member */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h2 className="heading-2 text-foreground">{t("getInvolved.member.title")}</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {t("getInvolved.member.desc")}
              </p>

              <h3 className="font-semibold text-foreground mb-4">
                {t("getInvolved.member.rights")}
              </h3>
              <ul className="space-y-3 mb-8">
                {memberBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Membership sign-up lives in the members portal (ong_app) */}
            <div className="bg-card border rounded-xl p-8 flex flex-col justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="heading-3 text-foreground mb-3">{t("getInvolved.form.title")}</h3>
              <p className="text-muted-foreground mb-6">
                {language === "ES"
                  ? "La inscripción se hace en el portal de miembros. Toma un par de minutos y te contactaremos pronto."
                  : "Sign-up happens in our members portal. It takes a couple of minutes and we will get back to you soon."}
              </p>
              <Button asChild variant="cta" size="lg" className="mx-auto">
                <a href={inscriptionUrl}>
                  {language === "ES" ? "Inscribirme" : "Sign up"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="section-padding bg-section-light">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-foreground mb-4">
              {t("getInvolved.volunteer.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("getInvolved.volunteer.desc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {volunteerRoles.map((role) => (
              <div
                key={role.title}
                className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <role.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-cta/5 border border-cta/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-full bg-cta/10 flex items-center justify-center shrink-0">
                <Heart className="w-10 h-10 text-cta" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="heading-3 text-foreground mb-3">
                  {t("getInvolved.donate.title")}
                </h2>
                <p className="text-muted-foreground mb-6 md:mb-0">
                  {t("getInvolved.donate.desc")}
                </p>
              </div>
              <Button asChild variant="cta" size="lg" className="shrink-0">
                <Link to="/take-action">
                  {t("getInvolved.donate.button")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
