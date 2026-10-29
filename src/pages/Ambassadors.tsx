import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { membersApi } from "@/config/members";
import { Award, Loader2, MapPin, Medal } from "lucide-react";

type Ambassador = {
  id: string;
  name: string;
  cities: string[];
  state?: string;
  chapter?: string;
  photo_url: string;
  founder: boolean;
  badges: string[];
};

export default function Ambassadors() {
  const { language } = useLanguage();
  const es = language === "ES";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-ambassadors"],
    queryFn: () => membersApi<{ items: Ambassador[] }>("/api/public/directory/ambassadors"),
    staleTime: 5 * 60_000,
  });
  const items = data?.items || [];

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/10 to-background py-14">
        <div className="container-wide max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">{es ? "Nuestros embajadores" : "Our ambassadors"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {es
              ? "Voluntarios que representan a la Fundación en sus ciudades: acompañan a la comunidad, levantan casos de ayuda y organizan capítulos."
              : "Volunteers who represent the Foundation in their cities: they support the community, report aid cases and organize chapters."}
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-wide max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : isError ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "No pudimos cargar el directorio. Intenta más tarde." : "We could not load the directory. Please try later."}</p>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">{es ? "Pronto publicaremos el directorio de embajadores." : "The ambassadors directory will be published soon."}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((a) => (
                <article key={a.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
                  <div className="aspect-square bg-muted">
                    <img src={a.photo_url} alt={a.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-2 p-4">
                    <h2 className="font-semibold text-foreground">{a.name}</h2>
                    {(a.cities.length > 0 || a.state) && (
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />{[a.cities.join(", "), a.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                    {a.chapter && <p className="text-xs text-muted-foreground">{es ? "Capítulo" : "Chapter"} {a.chapter}</p>}
                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#1e3a8a]/10 px-2 py-0.5 text-xs font-semibold text-[#1e3a8a]"><Medal className="h-3 w-3" />{es ? "Embajador" : "Ambassador"}</span>
                      {a.founder && <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-700"><Award className="h-3 w-3" />{es ? "Fundador" : "Founder"}</span>}
                      {a.badges.map((b) => <span key={b} className="rounded-full bg-slate-700/10 px-2 py-0.5 text-xs font-medium text-slate-700">{b}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
