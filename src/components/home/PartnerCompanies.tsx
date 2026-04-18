import teamData from "@/assets/team/data.json";
import { useLanguage } from "@/contexts/LanguageContext";

type TeamMember = {
  name: string;
  position: string;
  group: string[];
  picture: string;
};

const imageModules = import.meta.glob("@/assets/team/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function resolveImage(picture: string): string | undefined {
  return imageModules[`/src/assets/team/${picture}`];
}

const companies = (teamData as TeamMember[]).filter((m) =>
  m.group.includes("comanias")
);

function LogoTile({ member }: { member: TeamMember }) {
  const src = resolveImage(member.picture);
  return (
    <div className="group shrink-0 w-56 md:w-64 h-36 md:h-40 mx-3 md:mx-5 flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-white shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 hover:ring-primary/10">
      {src ? (
        <>
          <div className="flex-1 flex items-center justify-center w-full px-5 pt-4">
            <img
              src={src}
              alt={member.name}
              loading="lazy"
              className="max-h-16 md:max-h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full px-4 pb-3 pt-1">
            <p className="text-center text-xs md:text-sm font-semibold text-foreground/80 truncate">
              {member.name}
            </p>
          </div>
        </>
      ) : (
        <span className="text-sm font-semibold text-foreground">
          {member.name}
        </span>
      )}
    </div>
  );
}

export function PartnerCompanies() {
  const { t } = useLanguage();

  if (companies.length === 0) return null;

  // Duplicate the list so the marquee loop is seamless
  const loop = [...companies, ...companies];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background via-section-light to-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/8%),transparent_60%)]" />
      <div className="container-wide relative">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t("partners.eyebrow")}
          </span>
          <h2 className="heading-2 text-foreground">
            {t("partners.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("partners.desc")}
          </p>
        </div>

        <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {loop.map((member, i) => (
              <LogoTile key={`${member.name}-${i}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
