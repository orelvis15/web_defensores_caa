import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { membershipUrl } from "@/config/members";
import { ArrowRight, CheckCircle2, HeartHandshake, Lock, Users, Star } from "lucide-react";

const PRESETS = [5, 10, 20, 50];

export default function Membership() {
  const { language } = useLanguage();
  const es = language === "ES";
  const [amount, setAmount] = useState(5);
  const [custom, setCustom] = useState("");
  const value = custom ? Number(custom) : amount;
  const valid = Number.isInteger(value) && value >= 5 && value <= 1000;

  const benefits = es
    ? [
        "Sostienes la ayuda a presos políticos cubanos y a sus familias.",
        "Apoyas la orientación migratoria y la ayuda humanitaria a nuestra comunidad.",
        "Participas en capítulos, grupos de trabajo y eventos de la Fundación.",
        "Recibes recibos mensuales y puedes cambiar el monto o cancelar cuando quieras.",
      ]
    : [
        "You sustain aid to Cuban political prisoners and their families.",
        "You support immigration guidance and humanitarian aid for our community.",
        "You take part in chapters, work groups and Foundation events.",
        "You get monthly receipts and can change the amount or cancel anytime.",
      ];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container-wide max-w-5xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Users className="h-4 w-4" /> {es ? "Membresía" : "Membership"}
          </p>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            {es ? "Hazte miembro de Defensores del CAA" : "Become a member of Defensores del CAA"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {es
              ? "Con una cuota mensual desde $5 sostienes el trabajo de la Fundación por la comunidad cubana y la libertad de Cuba."
              : "With a monthly fee from $5 you sustain the Foundation's work for the Cuban community and a free Cuba."}
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-wide grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold">{es ? "Membresía Estándar" : "Standard Membership"}</h2></div>
              <p className="mt-1 text-3xl font-bold">$5<span className="text-base font-normal text-muted-foreground">/{es ? "mes" : "month"}</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{es ? "La cuota mínima aprobada por la Junta Directiva." : "The minimum fee approved by the Board of Directors."}</p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" /><h2 className="text-lg font-semibold">{es ? "Membresía Plus" : "Plus Membership"}</h2></div>
              <p className="mt-1 text-3xl font-bold">+$5<span className="text-base font-normal text-muted-foreground">/{es ? "mes" : "month"}</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{es ? "Eliges un monto mayor para multiplicar el impacto." : "Choose a larger amount to multiply the impact."}</p>
            </div>
            <ul className="space-y-2 pt-2">
              {benefits.map((b) => (
                <li key={b} className="flex gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <h2 className="text-lg font-semibold">{es ? "Elige tu cuota mensual" : "Choose your monthly fee"}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setAmount(p); setCustom(""); }}
                  className={`rounded-lg border px-3 py-3 text-center transition-colors ${!custom && amount === p ? "border-primary bg-primary/10 text-primary ring-1 ring-primary" : "hover:bg-muted"}`}
                >
                  <span className="block text-xl font-semibold">${p}</span>
                  <span className="block text-xs text-muted-foreground">{p === 5 ? (es ? "Estándar" : "Standard") : "Plus"}</span>
                </button>
              ))}
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              {es ? "Otro monto:" : "Other amount:"}
              <span className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
                <input
                  type="number"
                  min={5}
                  step={1}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="25"
                  className="h-10 w-28 rounded-md border bg-background pl-6 pr-2 text-foreground"
                />
              </span>
            </label>
            {!valid && <p className="mt-2 text-xs text-destructive">{es ? "Monto entero entre $5 y $1000." : "Whole amount between $5 and $1000."}</p>}
            <a href={valid ? membershipUrl(value) : undefined} aria-disabled={!valid} className="mt-6 block">
              <Button size="lg" className="w-full" disabled={!valid}>
                {es ? `Continuar con $${valid ? value : "—"}/mes` : `Continue with $${valid ? value : "—"}/month`}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              {es ? "Pago seguro con Stripe. Cobro automático mensual; cancela cuando quieras." : "Secure payment with Stripe. Automatic monthly charge; cancel anytime."}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
