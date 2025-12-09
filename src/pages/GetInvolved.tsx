import { useState } from "react";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GetInvolved() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    interest: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("toast.applicationSubmitted"),
      description: t("toast.applicationDesc"),
    });
    setFormData({ name: "", email: "", city: "", state: "", interest: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

            {/* Membership Form */}
            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-semibold text-foreground mb-6">
                {t("getInvolved.form.title")}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">{t("getInvolved.form.name")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("getInvolved.form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t("getInvolved.form.city")}</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">{t("getInvolved.form.state")}</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="interest">{t("getInvolved.form.interest")}</Label>
                  <Select
                    value={formData.interest}
                    onValueChange={(value) => handleChange("interest", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t("getInvolved.form.selectOption")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">{t("getInvolved.form.generalMembership")}</SelectItem>
                      <SelectItem value="ambassador">{t("getInvolved.form.ambassador")}</SelectItem>
                      <SelectItem value="volunteer">{t("getInvolved.form.volunteer")}</SelectItem>
                      <SelectItem value="professional">{t("getInvolved.form.professional")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">
                    {t("getInvolved.form.aboutYou")}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder={t("getInvolved.form.placeholder")}
                  />
                </div>
                <Button type="submit" variant="cta" className="w-full">
                  {t("getInvolved.form.submit")}
                </Button>
              </form>
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
