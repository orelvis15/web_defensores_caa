import teamData from "@/assets/team/data.json";
import { useLanguage } from "@/contexts/LanguageContext";

type TeamMember = {
  name: string;
  position: string;
  group: string[];
  picture: string;
  url?: string;
};

const imageModules = import.meta.glob("@/assets/team/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function resolveImage(picture: string): string | undefined {
  const target = `/src/assets/team/${picture}`;
  return imageModules[target];
}

const members = teamData as TeamMember[];
const board = members.filter((m) => m.group.includes("junta directiva"));
const ambassadors = members.filter(
  (m) => m.group.includes("embajadores") && !m.group.includes("junta directiva")
);
const companies = members.filter((m) => m.group.includes("comanias"));

function PersonCard({ member }: { member: TeamMember }) {
  const src = resolveImage(member.picture);
  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-1 ring-border bg-muted shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:ring-primary/30">
          {src ? (
            <img
              src={src}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-muted-foreground">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <h3 className="font-semibold text-foreground text-base md:text-lg">
        {member.name}
      </h3>
      {member.position && (
        <p className="mt-1 text-sm text-muted-foreground max-w-[15rem]">
          {member.position}
        </p>
      )}
    </div>
  );
}

function CompanyCard({ member }: { member: TeamMember }) {
  const src = resolveImage(member.picture);
  const baseClasses =
    "group relative flex flex-col items-center text-center bg-card border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30";
  const content = (
    <>
      <div className="h-24 md:h-28 w-full flex items-center justify-center mb-4">
        {src ? (
          <img
            src={src}
            alt={member.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-lg font-semibold text-muted-foreground">
            {member.name}
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-foreground">{member.name}</p>
    </>
  );

  if (member.url) {
    return (
      <a
        href={member.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={member.name}
        className={`${baseClasses} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
        {eyebrow}
      </span>
      <h2 className="heading-2 text-foreground">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function TeamSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* Board of Directors — visually elevated as the flagship team section */}
      <section className="relative section-padding bg-background overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="container-wide relative">
          <SectionHeader
            eyebrow={t("about.team.eyebrow")}
            title={t("about.team.board.title")}
            description={t("about.team.board.desc")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
            {board.map((member) => (
              <PersonCard key={`${member.name}-${member.position}`} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Ambassadors */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <SectionHeader
            eyebrow={t("about.team.eyebrow")}
            title={t("about.team.ambassadors.title")}
            description={t("about.team.ambassadors.desc")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto">
            {ambassadors.map((member) => (
              <PersonCard key={`${member.name}-${member.position}`} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeader
            eyebrow={t("about.team.eyebrow")}
            title={t("about.team.companies.title")}
            description={t("about.team.companies.desc")}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {companies.map((member) => (
              <CompanyCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
