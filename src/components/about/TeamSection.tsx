import boardData from "@/assets/team/junta-directiva.json";
import ambassadorsData from "@/assets/team/embajadores.json";
import companiesData from "@/assets/team/comanias.json";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";

type BoardMember = {
  name: string;
  position?: string;
  picture: string;
};

type Ambassador = {
  name: string;
  city: string;
  state: string;
  picture: string;
};

type Company = {
  name: string;
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

const board = boardData as BoardMember[];
const ambassadors = ambassadorsData as Ambassador[];
const companies = (companiesData as Company[])
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

const ambassadorsByState = (() => {
  const groups = new Map<string, Ambassador[]>();
  for (const a of ambassadors) {
    const bucket = groups.get(a.state) ?? [];
    bucket.push(a);
    groups.set(a.state, bucket);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([state, members]) => ({
      state,
      members: [...members].sort((a, b) =>
        a.city === b.city
          ? a.name.localeCompare(b.name)
          : a.city.localeCompare(b.city)
      ),
    }));
})();

function Avatar({ picture, name }: { picture: string; name: string }) {
  const src = resolveImage(picture);
  return (
    <div className="relative mb-5">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-1 ring-border bg-muted shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:ring-primary/30">
        {src ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-muted-foreground">
            {name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
}

function BoardCard({ member }: { member: BoardMember }) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      <Avatar picture={member.picture} name={member.name} />
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

function AmbassadorCard({ member }: { member: Ambassador }) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      <Avatar picture={member.picture} name={member.name} />
      <h3 className="font-semibold text-foreground text-base md:text-lg">
        {member.name}
      </h3>
      <div className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
        <span>
          <span className="font-medium text-foreground/90">{member.city}</span>
          <span className="text-muted-foreground">, {member.state}</span>
        </span>
      </div>
    </div>
  );
}

function CompanyCard({ member }: { member: Company }) {
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

function StateDivider({ state, count }: { state: string; count: number }) {
  return (
    <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-12">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <div className="flex items-center gap-2.5 shrink-0">
        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
          {state}
        </h3>
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary tabular-nums">
          {count}
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
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
              <BoardCard key={`${member.name}-${member.position}`} member={member} />
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
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
            {ambassadorsByState.map(({ state, members }) => (
              <div key={state}>
                <StateDivider state={state} count={members.length} />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                  {members.map((member) => (
                    <AmbassadorCard
                      key={`${member.name}-${member.city}`}
                      member={member}
                    />
                  ))}
                </div>
              </div>
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
