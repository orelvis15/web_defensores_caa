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
    <div className="group shrink-0 w-48 md:w-56 h-28 md:h-32 mx-4 md:mx-6 flex items-center justify-center rounded-2xl border bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30">
      {src ? (
        <img
          src={src}
          alt={member.name}
          loading="lazy"
          className="max-h-16 md:max-h-20 max-w-[80%] object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
        />
      ) : (
        <span className="text-sm font-medium text-muted-foreground">
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
    <section className="section-padding bg-section-light">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            {t("partners.eyebrow")}
          </span>
          <h2 className="heading-2 text-foreground">
            {t("partners.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("partners.desc")}
          </p>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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
