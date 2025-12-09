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

const volunteerRoles = [
  { icon: Globe, title: "Ambassador", description: "Represent us in your local community" },
  { icon: Languages, title: "Translator", description: "Help translate materials to Spanish" },
  { icon: Palette, title: "Designer", description: "Create visual content and materials" },
  { icon: Megaphone, title: "Content Creator", description: "Write articles and social media content" },
  { icon: Calendar, title: "Event Organizer", description: "Help plan and run community events" },
];

const memberBenefits = [
  "Voice and vote in General Assembly meetings",
  "Participate in commissions and working groups",
  "Access to member-only resources and updates",
  "Opportunity to serve on the Board of Directors",
  "Connect with other community members nationwide",
];

export default function GetInvolved() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description: "Thank you for your interest. We will contact you soon.",
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
            <h1 className="heading-1 text-foreground mb-6">Get Involved</h1>
            <p className="text-xl text-muted-foreground">
              Join our community of Cuban migrants, professionals, and allies
              working together to protect rights and promote dignity.
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
                <h2 className="heading-2 text-foreground">Become a Member</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Members are adults who share our mission and want to actively
                participate in defending the rights of Cuban migrants. Membership
                is open to Cuban nationals, people of Cuban origin, and allies.
              </p>

              <h3 className="font-semibold text-foreground mb-4">
                Member rights include:
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
                Apply to become a member
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
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
                  <Label htmlFor="interest">How do you want to help?</Label>
                  <Select
                    value={formData.interest}
                    onValueChange={(value) => handleChange("interest", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">General membership</SelectItem>
                      <SelectItem value="ambassador">Community ambassador</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="professional">Professional support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">
                    Tell us about yourself (optional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Your background, skills, or why you want to join..."
                  />
                </div>
                <Button type="submit" variant="cta" className="w-full">
                  Submit application
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
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use your skills to make a difference. We have various roles for
              people with different talents and availability.
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
                  Support with a donation
                </h2>
                <p className="text-muted-foreground mb-6 md:mb-0">
                  Can't volunteer your time? Your financial support helps us
                  continue protecting Cuban migrants, fighting fraud, and
                  providing education to our community.
                </p>
              </div>
              <Button asChild variant="cta" size="lg" className="shrink-0">
                <Link to="/take-action">
                  Donate now
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
