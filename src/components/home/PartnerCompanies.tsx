import { useEffect, useRef } from "react";
import companiesData from "@/assets/team/comanias.json";
import { useLanguage } from "@/contexts/LanguageContext";

type TeamMember = {
  name: string;
  position?: string;
  picture: string;
  url?: string;
};

const imageModules = import.meta.glob("@/assets/team/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function resolveImage(picture: string): string | undefined {
  return imageModules[`/src/assets/team/${picture}`];
}

const companies = (companiesData as TeamMember[])
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

function LogoTile({ member }: { member: TeamMember }) {
  const src = resolveImage(member.picture);
  const baseClasses =
    "group shrink-0 w-56 md:w-64 h-36 md:h-40 mx-3 md:mx-5 flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-white shadow-sm ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 hover:ring-primary/10 select-none";
  const content = src ? (
    <>
      <div className="flex-1 flex items-center justify-center w-full px-5 pt-4">
        <img
          src={src}
          alt={member.name}
          loading="lazy"
          draggable={false}
          className="max-h-16 md:max-h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        />
      </div>
      <div className="w-full px-4 pb-3 pt-1">
        <p className="text-center text-xs md:text-sm font-semibold text-foreground/80 truncate">
          {member.name}
        </p>
      </div>
    </>
  ) : (
    <span className="text-sm font-semibold text-foreground">{member.name}</span>
  );

  if (member.url) {
    return (
      <a
        href={member.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={member.name}
        draggable={false}
        className={`${baseClasses} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

const DRAG_THRESHOLD = 6;

export function PartnerCompanies() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    hovering: false,
    pending: false,
    dragging: false,
    pointerId: 0,
    startX: 0,
    startScroll: 0,
    suppressClick: false,
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const SPEED = 40; // px per second
    let last = performance.now();
    let raf = 0;

    const normalize = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const s = stateRef.current;
      if (!s.dragging && !s.pending && !s.hovering) {
        el.scrollLeft += SPEED * dt;
        normalize();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    const s = stateRef.current;
    s.pending = true;
    s.dragging = false;
    s.pointerId = e.pointerId;
    s.startX = e.clientX;
    s.startScroll = el.scrollLeft;
    s.suppressClick = false;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (!s.pending && !s.dragging) return;
    const el = trackRef.current;
    if (!el) return;
    const delta = e.clientX - s.startX;

    if (s.pending && Math.abs(delta) > DRAG_THRESHOLD) {
      s.pending = false;
      s.dragging = true;
      s.suppressClick = true;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }

    if (s.dragging) {
      const half = el.scrollWidth / 2;
      let next = s.startScroll - delta;
      if (half > 0) {
        while (next >= half) next -= half;
        while (next < 0) next += half;
      }
      el.scrollLeft = next;
    }
  };

  const endPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const s = stateRef.current;
    if (s.dragging && el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    s.pending = false;
    s.dragging = false;
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    const s = stateRef.current;
    if (s.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      s.suppressClick = false;
    }
  };

  if (companies.length === 0) return null;

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
          <h2 className="heading-2 text-foreground">{t("partners.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("partners.desc")}</p>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onPointerLeave={endPointer}
          onMouseEnter={() => {
            stateRef.current.hovering = true;
          }}
          onMouseLeave={() => {
            stateRef.current.hovering = false;
          }}
          onClickCapture={onClickCapture}
          className="relative overflow-x-auto overflow-y-hidden py-4 cursor-grab active:cursor-grabbing touch-pan-y select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="flex w-max">
            {loop.map((member, i) => (
              <LogoTile key={`${member.name}-${i}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
