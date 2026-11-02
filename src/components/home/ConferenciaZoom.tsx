import { useEffect, useState } from "react";
import { CalendarDays, CalendarPlus, Clock, KeyRound, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Next online conference. The section shows itself until the end time and
// then disappears on its own; replace these values for the next one.
const CONF = {
  title: "Análisis Pericial Psicológico en el Derecho Migratorio",
  start: "2026-11-05T19:30:00-05:00", // 7:30 PM ET
  end: "2026-11-05T21:30:00-05:00",
  zoomUrl: "https://us06web.zoom.us/j/84755242643?pwd=gNYAh3oRJ978kyBRmh9MUclRcvQbhW.1",
  meetingId: "847 5524 2643",
  passcode: "429159",
  phones: [
    { label: "+1 305 224 1968", tel: "+13052241968,,84755242643#,,,,*429159#" },
    { label: "+1 312 626 6799", tel: "+13126266799,,84755242643#,,,,*429159#" },
  ],
};

const TZ = "America/New_York";

function calendarLink(es: boolean) {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${es ? "Conferencia" : "Conference"}: ${CONF.title}`,
    dates: `${stamp(CONF.start)}/${stamp(CONF.end)}`,
    details: `Zoom: ${CONF.zoomUrl}\nMeeting ID: ${CONF.meetingId}\nPasscode: ${CONF.passcode}`,
    location: CONF.zoomUrl,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

function countdown(ms: number, es: boolean) {
  const min = Math.max(0, Math.floor(ms / 60000));
  const d = Math.floor(min / 1440);
  const h = Math.floor((min % 1440) / 60);
  const m = min % 60;
  if (d > 0) return es ? `Faltan ${d} d ${h} h` : `${d}d ${h}h to go`;
  if (h > 0) return es ? `Faltan ${h} h ${m} min` : `${h}h ${m}m to go`;
  return es ? `Comienza en ${m} min` : `Starts in ${m} min`;
}

export function ConferenciaZoom() {
  const { language } = useLanguage();
  const es = language === "ES";
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const start = new Date(CONF.start).getTime();
  const end = new Date(CONF.end).getTime();
  if (now >= end) return null;
  const live = now >= start;
  const locale = es ? "es-US" : "en-US";
  const date = new Date(CONF.start).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", timeZone: TZ });
  const time = new Date(CONF.start).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit", timeZone: TZ });

  return (
    <section className="border-b bg-primary text-primary-foreground" aria-labelledby="conferencia-title">
      <div className="container-wide py-8 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <Video className="h-3.5 w-3.5" />
                {es ? "Conferencia en línea · Zoom" : "Online conference · Zoom"}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${live ? "bg-red-500 text-white" : "bg-cta text-cta-foreground"}`}
              >
                {live && <span className="h-2 w-2 animate-pulse rounded-full bg-white" />}
                {live ? (es ? "En vivo ahora" : "Live now") : countdown(start - now, es)}
              </span>
            </div>
            <h2 id="conferencia-title" className="text-balance text-2xl font-bold leading-tight md:text-3xl">
              {CONF.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 opacity-80" /><span className="first-letter:uppercase">{date}</span></span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 opacity-80" />{time} {es ? "(hora del Este)" : "(Eastern Time)"}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm opacity-90">
              <span className="flex items-center gap-2"><Video className="h-4 w-4 opacity-80" />Meeting ID: <strong className="font-semibold">{CONF.meetingId}</strong></span>
              <span className="flex items-center gap-2"><KeyRound className="h-4 w-4 opacity-80" />{es ? "Código" : "Passcode"}: <strong className="font-semibold">{CONF.passcode}</strong></span>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-80">
              <Phone className="h-3.5 w-3.5" />
              {es ? "Por teléfono:" : "By phone:"}
              {CONF.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="underline-offset-2 hover:underline">{p.label}</a>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild variant="hero" size="lg" className="w-full sm:w-auto lg:w-56">
              <a href={CONF.zoomUrl} target="_blank" rel="noopener noreferrer">
                <Video className="mr-2 h-4 w-4" />
                {es ? "Unirme por Zoom" : "Join on Zoom"}
              </a>
            </Button>
            {!live && (
              <Button asChild variant="outline-light" size="lg" className="w-full sm:w-auto lg:w-56">
                <a href={calendarLink(es)} target="_blank" rel="noopener noreferrer">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  {es ? "Añadir al calendario" : "Add to calendar"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
