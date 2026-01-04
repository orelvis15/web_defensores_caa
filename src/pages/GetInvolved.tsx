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
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  reason: z.string().trim().min(10, "Please tell us more about why you want to help").max(1000),
  note: z.string().max(500).optional(),
});

export default function GetInvolved() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    reason: "",
    note: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = applicationSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-member-application", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          reason: formData.reason.trim(),
          note: formData.note?.trim() || null,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        if (data.code === "DUPLICATE_EMAIL") {
          toast({
            title: "Application Already Exists",
            description: "An application with this email has already been submitted.",
            variant: "destructive",
          });
        } else if (data.code === "RATE_LIMITED") {
          toast({
            title: "Too Many Requests",
            description: "Please wait before submitting another application.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error);
        }
      } else {
        setSubmitted(true);
        toast({
          title: t("toast.applicationSubmitted"),
          description: t("toast.applicationDesc"),
        });
        setFormData({ name: "", email: "", city: "", state: "", reason: "", note: "" });
      }
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
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
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="heading-3 text-foreground mb-3">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Your application has been received. We will review it and get back to you soon with a decision.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <>
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
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                      )}
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
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email}</p>
                      )}
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
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1">{errors.city}</p>
                        )}
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
                        {errors.state && (
                          <p className="text-sm text-destructive mt-1">{errors.state}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reason">{t("getInvolved.form.interest")}</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleChange("reason", e.target.value)}
                        className="mt-1"
                        rows={3}
                        placeholder="Tell us why you want to become a member and how you'd like to help..."
                        required
                      />
                      {errors.reason && (
                        <p className="text-sm text-destructive mt-1">{errors.reason}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="note">
                        {t("getInvolved.form.aboutYou")}
                      </Label>
                      <Textarea
                        id="note"
                        value={formData.note}
                        onChange={(e) => handleChange("note", e.target.value)}
                        className="mt-1"
                        rows={2}
                        placeholder={t("getInvolved.form.placeholder")}
                      />
                      {errors.note && (
                        <p className="text-sm text-destructive mt-1">{errors.note}</p>
                      )}
                    </div>
                    <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        t("getInvolved.form.submit")
                      )}
                    </Button>
                  </form>
                </>
              )}
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
