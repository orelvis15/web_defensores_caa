import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: false,
  });

  const subjects = [
    { value: "general", label: t("contact.subjectGeneral") },
    { value: "media", label: t("contact.subjectMedia") },
    { value: "observatory", label: t("contact.subjectObservatory") },
    { value: "volunteer", label: t("contact.subjectVolunteer") },
    { value: "other", label: t("contact.subjectOther") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: t("toast.messageSent"),
      description: t("toast.messageDesc"),
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-narrow text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="heading-2 text-foreground mb-4">
              {t("contact.successTitle")}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t("contact.successDesc")}
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              {t("contact.sendAnother")}
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="heading-1 text-foreground mb-6">{t("contact.title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("contact.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="heading-3 text-foreground mb-6">{t("contact.getInTouch")}</h2>
              <p className="text-muted-foreground mb-8">
                {t("contact.formIntro")}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t("contact.email")}</h3>
                    <p className="text-sm text-muted-foreground">
                      contact@defenderscaa.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t("contact.location")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("contact.florida")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> {t("contact.legalNote")}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border rounded-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">{t("contact.yourName")}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("contact.emailAddress")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">{t("contact.subject")}</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleChange("subject", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t("contact.selectSubject")} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="mt-1"
                      rows={6}
                      placeholder={t("contact.messagePlaceholder")}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="subscribe"
                      checked={formData.subscribe}
                      onCheckedChange={(checked) =>
                        handleChange("subscribe", checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="subscribe" className="text-sm cursor-pointer">
                      {t("contact.subscribe")}
                    </Label>
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    {t("contact.send")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
